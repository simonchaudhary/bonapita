// Components
import {IconButton} from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import axios from "axios";
import {useState} from "react";
import "react-dragswitch/dist/index.css";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import ButtonNLoading from "../../components/buttons/ButtonNLoading";
import {Horizontal} from "../../components/elements/elements";
import InputWrapper from "../../components/input/InputWrapper";
import {HeaderText} from "../../components/texts/texts";
import ToastBar from "../../components/ToastBar";
import {auth} from "../../config/firebaseConfig";
import {removeProviderTAAction} from "../../Redux/actions";

function ProviderAdminForm() {
	// Redux
	const dispatch = useDispatch();
	// Redux State
	const techadmin = useSelector((state) => state.techadmin);

	const history = useHistory();

	const {Toast} = ToastBar();
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		provider: "",
	});

	const [formError, setFormError] = useState(null);

	const onChange = (key, e) => {
		// console.log(key, e.target.value);
		setFormData((prevState) => ({
			...prevState,
			[key]: e.target.value,
		}));
	};

	const focus = (key) => {
		setFormError((prevState) => ({
			...prevState,
			[key]: "",
		}));
	};

	const handleForm = (e) => {
		e.preventDefault();
		let valid = true;

		if (formData.firstName === "") {
			setFormError((prevState) => ({
				...prevState,
				firstNameError: "Enter First Name",
			}));
			valid = false;
		}
		if (formData.lastName === "") {
			setFormError((prevState) => ({
				...prevState,
				lastNameError: "Enter Last Name",
			}));
			valid = false;
		}
		if (formData.email === "") {
			setFormError((prevState) => ({
				...prevState,
				emailError: "Enter Email",
			}));
			valid = false;
		}
		if (formData.password === "") {
			setFormError((prevState) => ({
				...prevState,
				passwordError: "Enter Password",
			}));
			valid = false;
		}

		if (valid) {
			console.log(formData);
			setIsLoading(true);
			auth
				.createUserWithEmailAndPassword(formData.email, formData.password)
				.then((cred) => {
					console.log("User is register", cred.user.uid);
					var user = auth.currentUser;
					user
						.updateProfile({
							displayName: formData.firstName,
						})
						.then(function () {
							console.log("display update successful");
						})
						.catch(function (error) {
							console.log("display update unsuccessful");
						});

					saveRegisterUser(cred);
				})
				.catch((err) => {
					console.log("error " + err);
					Toast(err.toString(), "error");
					setIsLoading(false);
					resetForm();
				});
		}
	};

	const saveRegisterUser = (cred) => {
		let data = {
			providerAdmin: {
				createdDate: Date().toLocaleString(),
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				emailVerified: cred.user.emailVerified,
				uid: cred.user.uid,
				userType: "ProviderAdmin",
				provider: techadmin.provider.id,
			},
		};

		axios
			.post(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/providerAdmins/${cred.user.uid}?providerId=${techadmin.provider.id}`,
				data
			)
			.then((res) => {
				console.log("Response", res);
				if (res.data.success) {
					console.log("save to firebase");
					Toast("User Saved", "success");
					setIsLoading(false);
					auth.signOut();
					resetForm();
					dispatch(removeProviderTAAction());
					goBack();
				}
			})
			.catch((err) => {
				console.error("Error", err.response);
			});

		// save to firebase using api
		// let uid = cred.user.uid;
		// let data = {
		// 	admin: {
		// 		id: uid,
		// 		createdDate: Date().toLocaleString(),
		// 		firstName: formData.firstName,
		// 		lastName: formData.lastName,
		// 		email: formData.email,
		// 		emailVerified: cred.user.emailVerified,
		// 		uid: cred.user.uid,
		// 		userType: "ProviderAdmin",
		// 		provider: techadmin.provider.id,
		// 	},
		// };
		// firestore
		// 	.collection("users")
		// 	.doc(cred.user.uid)
		// 	.set(userData)
		// 	.then(() => {
		// 		console.log("save to firebase");
		// 		Toast("User Saved", "success");
		// 		setIsLoading(false);
		// 		auth.signOut();
		// 		resetForm();
		// 		dispatch(removeProviderTAAction());
		// 		goBack();
		// 	})
		// 	.catch((err) => {
		// 		console.log("firestore errorss " + err);
		// 		setIsLoading(false);
		// 		resetForm();
		// 	});
	};

	const resetForm = () => {
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			provider: "",
		});
	};

	const goBack = () => {
		history.push("/");
	};

	return (
		<ProviderContainer>
			<GoBack onClick={goBack}>
				<IconButton>
					<ArrowBackIosRoundedIcon />
				</IconButton>
			</GoBack>
			<Form>
				<HeaderText style={{textAlign: "center"}}>
					Provider Admin
				</HeaderText>
				<HeaderText style={{textAlign: "center", color: "#D65A31"}}>
					{techadmin.provider?.name}
				</HeaderText>
				<Horizontal />
				<InputWrapper
					label="First Name"
					error={formError?.firstNameError}
					onFocus={() => focus("firstNameError")}
					type="text"
					value={formData?.firstName}
					onChangeText={(e) => onChange("firstName", e)}
				/>
				<InputWrapper
					label="Last Name"
					error={formError?.lastNameError}
					onFocus={() => focus("lastNameError")}
					type="text"
					value={formData?.lastName}
					onChangeText={(e) => onChange("lastName", e)}
				/>
				<InputWrapper
					label="Email"
					error={formError?.emailError}
					onFocus={() => focus("emailError")}
					type="text"
					value={formData?.email}
					onChangeText={(e) => onChange("email", e)}
				/>
				<InputWrapper
					label="Password"
					error={formError?.passwordError}
					onFocus={() => focus("passwordError")}
					type="password"
					value={formData?.password}
					onChangeText={(e) => onChange("password", e)}
				/>
				<Horizontal />
				<ButtonNLoading
					color="white"
					isLoading={isLoading}
					title="Add"
					onClick={handleForm}
				/>
			</Form>
		</ProviderContainer>
	);
}

const ProviderContainer = styled.div``;

const GoBack = styled.div`
	height: 60px;
	/* background: red; */
`;

const Form = styled.div`
	padding: 0.875rem;
	background: white;
	border-radius: 0.4rem;

	width: 60%;
	margin-left: auto;
	margin-right: auto;
	@media only screen and (max-width: 480px) and (min-width: 100px) {
		width: 90%;
		/* margin-top: 0.875rem; */
	}
`;

export default ProviderAdminForm;
