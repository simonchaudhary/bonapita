import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {redirectBaseURL} from "../../../apis/baseURL";
import {auth, firestore} from "../../../config/firebaseConfig";
import {saveUser} from "../../../Redux/actions";
import ButtonLoading from "../../buttons/ButtonLoading";
import {PrimaryButton, SecondaryButton} from "../../buttons/buttons";
import {Horizontal} from "../../elements/elements";
// components
import InputWrapper from "../../input/InputWrapper";
import ToastBar from "../../ToastBar";
import {Form} from "./SearchLoginFormStyle";

function SearchLoginForm({parentCallback}) {
	const history = useHistory();
	const dispatch = useDispatch();
	const {Toast} = ToastBar();

	// Redux
	const selectSearchItemNDetails = useSelector(
		(state) => state.selectSearchItemNDetails
	);

	// booleans
	const [isLoading, setIsLoading] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// error
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	//focus
	const emailFocus = () => {
		setEmailError("");
	};
	const passwordFocus = () => {
		setPasswordError("");
	};

	// Login
	const login = (e) => {
		e.preventDefault();

		let valid = true;

		if (email === "") {
			setEmailError("Field is required");
			valid = false;
		}
		if (password === "") {
			setPasswordError("Field is required");
			valid = false;
		}

		if (valid) {
			setIsLoading(true);
			auth
				.signInWithEmailAndPassword(email, password)
				.then((cred) => {
					console.log("cred", cred.user);

					getUserFromFirebase(cred);
				})
				.catch((err) => {
					console.log("error " + err);
					setIsLoading(false);
					Toast(err.toString(), "error");
				});
		}
	};

	const getUserFromFirebase = async (cred) => {
		// Get data from firestore
		const snapshot = await firestore
			.collection("users")
			.doc(cred.user.uid)
			.get();

		const user = snapshot.data();
		//
		setIsLoading(false);
		Toast("User Successful Login", "success");
		// Save toredux
		dispatch(saveUser(user));

		if (selectSearchItemNDetails.type === "Item") {
			let providerId = "p=" + selectSearchItemNDetails.item.provider.id;
			history.push(`/menulistcustomer/${providerId}/Customer`);
		} else {
			console.log("", selectSearchItemNDetails.provider.id);
			let providerId = "p=" + selectSearchItemNDetails.provider.id;
			history.push(`/menulistcustomer/${providerId}/Customer`);
		}
	};

	const passwordlessLogin = (e) => {
		e.preventDefault();
		// alert("hello");
		let valid = true;
		if (email === "") {
			setEmailError("Email Field is required");
			valid = false;
		}

		if (valid) {
			// URL to redierct if from review goto order page,
			let redirect = "";

			if (selectSearchItemNDetails.type === "Item") {
				redirect =
					redirectBaseURL +
					`/authenticationpagewithdata/${selectSearchItemNDetails.item.provider.id}`;
			} else {
				console.log("", selectSearchItemNDetails.provider.id);
				redirect =
					redirectBaseURL +
					`/authenticationpagewithdata/${selectSearchItemNDetails.provider.id}`;
			}

			var actionCodeSettings = {
				url: redirect,
				handleCodeInApp: true,
			};
			console.log("email", email);
			auth
				.sendSignInLinkToEmail(email, actionCodeSettings)
				.then(() => {
					localStorage.setItem("emailForSignIn", email);
					let message = "Email send to " + email;
					parentCallback(message);
					// Toast("Email send to " + email, "success");
					// alert("Email send to " + email, "success");
					// Close Tab

					// window.open("https://mail.google.com/mail/u/0/#inbox");
					// window.close();
				})
				.catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log("Error", errorCode, errorMessage);
				});
		}
	};

	return (
		<Form>
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
			<Horizontal />
			{isLoading ? (
				<ButtonLoading is="true" />
			) : (
				<PrimaryButton onClick={login}>Login</PrimaryButton>
			)}
			<Horizontal />
			<SecondaryButton onClick={passwordlessLogin}>
				Passwordless Login
			</SecondaryButton>
		</Form>
	);
}

export default SearchLoginForm;
