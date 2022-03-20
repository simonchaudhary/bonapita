import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import axios from "axios";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {auth, firestore} from "../../../config/firebaseConfig";
import {saveUser} from "../../../Redux/actions";
import ButtonLoading from "../../buttons/ButtonLoading";
import {PrimaryButton} from "../../buttons/buttons";
import {Horizontal, Vertical} from "../../elements/elements";
// components
import InputWrapper from "../../input/InputWrapper";
import ToastBar from "../../ToastBar";
import {Form} from "./SignupFormStyle";

function SignupForm({setIsOpenModal}) {
	const history = useHistory();
	const dispatch = useDispatch();
	const {Toast} = ToastBar();

	// States
	const [isLoading, setIsLoading] = useState(false);
	const [providerList, setProviderList] = useState([]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userType, setUserType] = useState("Customer");
	const [provider, setProvider] = useState("");
	const [prepLineName, setPrepLineName] = useState("");

	// error
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");
	const [userTypeError, setUserTypeError] = useState("");
	const [providerError, setProviderError] = useState("");
	const [prepLineNameError, setPrepLineNameError] = useState("");

	//focus
	const emailFocus = () => {
		setEmailError("");
	};
	const passwordFocus = () => {
		setPasswordError("");
	};
	const firstNameFocus = () => {
		setFirstNameError("");
	};
	const lastNameFocus = () => {
		setLastNameError("");
	};
	const userTypeFocus = () => {
		setUserTypeError("");
	};
	const providerFocus = () => {
		setProviderError("");
	};
	const prepLineNameFocus = () => {
		setPrepLineNameError("");
	};

	useEffect(() => {
		getProviderList();
	}, []);

	const getProviderList = () => {
		axios
			.get("https://us-central1-afoodie-6d649.cloudfunctions.net/provider")
			.then((response) => {
				console.log("Response getprovider", response);
				if (response.data.success) {
					setProviderList(response.data.data.providers);
				}
			})
			.catch((error) => {
				console.log("Error getprovider", error);
			});
	};

	// Signup
	const signup = async (e) => {
		e.preventDefault();

		let isValid = true;

		if (firstName === "") {
			setFirstNameError("Field is required");
			isValid = false;
		}
		if (lastName === "") {
			setLastNameError("Field is required");
			isValid = false;
		}
		if (email === "") {
			setEmailError("Field is required");
			isValid = false;
		}
		if (password === "") {
			setPasswordError("Field is required");
			isValid = false;
		}

		if (isValid) {
			console.log("main valid");
			setIsLoading(true);
			auth
				.createUserWithEmailAndPassword(email, password)
				.then((cred) => {
					console.log("User is register", cred.user.uid);
					var user = auth.currentUser;
					user
						.updateProfile({
							displayName: firstName,
						})
						.then(function () {
							console.log("display update successful");
							saveRegisterUser(cred);
						})
						.catch(function (error) {
							console.log("display update unsuccessful");
						});
				})
				.catch((err) => {
					console.log("error " + err);
					Toast(err.toString(), "error");
					setIsLoading(false);
				});
		}
	};

	const saveRegisterUser = (cred) => {
		let user = cred.user;
		// save to firebase
		let userData = new Map();

		userData = {
			createdDate: Date().toLocaleString(),
			firstName: firstName,
			lastName: lastName,
			email: email,
			emailVerified: cred.user.emailVerified,
			uid: cred.user.uid,
			// password: password,
			userType: "Customer",
			// provider: provider,
			// prepLineName: prepLineName,
		};

		firestore
			.collection("users")
			.doc(cred.user.uid)
			.set(userData)
			.then(() => {
				console.log("save to firebase");
				// parentCallback();
				renderPage(cred.user.uid);
			})
			.catch((err) => {
				console.log("firestore errorss " + err);
				setIsLoading(false);
			});
	};

	const renderPage = async (uid) => {
		const snapshot = await firestore.collection("users").doc(uid).get();

		if (snapshot.exists) {
			const user = snapshot.data();
			// Save toredux
			// setIsOpenModal(false);
			setIsLoading(false);
			Toast("User Successful Register", "success");
			dispatch(saveUser(user));

			// conditional rendering
			history.replace("/");
		}
	};

	return (
		<Form>
			<div style={{display: "flex"}}>
				<InputWrapper
					label="First Name"
					error={firstNameError}
					prefixIcon={<PersonRoundedIcon />}
					onFocus={firstNameFocus}
					type="text"
					value={firstName}
					onChangeText={(e) => setFirstName(e.target.value)}
				/>
				<Vertical />
				<InputWrapper
					label="Last Name"
					error={lastNameError}
					prefixIcon={<PersonRoundedIcon />}
					onFocus={lastNameFocus}
					type="text"
					value={lastName}
					onChangeText={(e) => setLastName(e.target.value)}
				/>
			</div>
			<InputWrapper
				label="Email"
				error={emailError}
				prefixIcon={<EmailRoundedIcon />}
				onFocus={emailFocus}
				type="text"
				value={email}
				onChangeText={(e) => setEmail(e.target.value)}
			/>
			<InputWrapper
				label="Password"
				error={passwordError}
				prefixIcon={<LockRoundedIcon />}
				onFocus={passwordFocus}
				type="password"
				value={password}
				onChangeText={(e) => setPassword(e.target.value)}
			/>
			<div style={{display: "flex"}}>
				{/* <InputWrapper
					label="User Type"
					error={userTypeError}
					prefixIcon={<GroupRoundedIcon />}
					onFocus={userTypeFocus}
					type=""
					value={userType}
					onChangeText={(e) => setUserType(e.target.value)}
					selectUserType
					optionArray={UserTypeList}
				/> */}

				{/* {userType != "Customer" ? (
					<>
						<Vertical />
						<InputWrapper
							label="Provider"
							error={providerError}
							prefixIcon={<RestaurantMenuRoundedIcon />}
							onFocus={providerFocus}
							type=""
							value={provider}
							onChangeText={(e) => setProvider(e.target.value)}
							selectProvider
							optionArray={providerList}
						/>
					</>
				) : null} */}
			</div>
			{/* {userType === "PrepLineStaff" ? (
				<InputWrapper
					label="Prep Line Staff"
					error={prepLineNameError}
					prefixIcon={<PersonRoundedIcon />}
					onFocus={prepLineNameFocus}
					type="text"
					value={prepLineName}
					onChangeText={(e) => setPrepLineName(e.target.value)}
				/>
			) : null} */}
			<Horizontal />
			{isLoading ? (
				<ButtonLoading is="true" />
			) : (
				<PrimaryButton onClick={signup}>Sign Up</PrimaryButton>
			)}
		</Form>
	);
}

export default SignupForm;
