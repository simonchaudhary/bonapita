import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import axios from "axios";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {redirectBaseURL} from "../../../apis/baseURL";
import {auth, firestore} from "../../../config/firebaseConfig";
import {fetchUserProviderDetail, saveUser} from "../../../Redux/actions";
import ButtonNLoading from "../../buttons/ButtonNLoading";
import {Horizontal} from "../../elements/elements";
// components
import InputWrapper from "../../input/InputWrapper";
import ToastBar from "../../ToastBar";
import {Form} from "./LoginFormStyle";

function LoginForm({parentCallback, review, setIsOpenModal}) {
	const history = useHistory();
	const dispatch = useDispatch();
	const {Toast} = ToastBar();

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
					let data = {
						displayName: cred.user.displayName,
						email: cred.user.email,
					};
					console.log(data);
					// renderPage(cred.user.uid);
					getUserData(cred.user.uid);
				})
				.catch((err) => {
					console.log("error " + err);
					setIsLoading(false);
					Toast(err.toString(), "error");
				});
		}
	};

	// getUserData
	const getUserData = (uid) => {
		console.log("getUserData", uid);

		// Customer
		firestore
			.collection("users")
			.doc(uid)
			.get()
			.then((res) => {
				// console.log("Response data exists", res);
				if (res.exists) {
					console.log("Customer Data");
					renderPage(res.data());
				} else {
					console.log("Provider User Data");
					getStaffUserData(uid);
					getPreplineManagerUserData(uid);
					getPreplineStaffData(uid);
					getProviderAdminData(uid);
				}
			})
			.catch((err) => {
				console.log("Error", err);
			});
	};

	const getStaffUserData = (uid) => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/dineInStaffs/${uid}`
			)
			.then((res) => {
				console.log("Response getStaffdata", res);
				if (res.data.success) {
					console.log("Staff Data Exists", res.data.data.dineInStaff);
					renderPage(res.data.data.dineInStaff);
				}
			})
			.catch((err) => {
				console.error("Error getstaffdata", err);
			});
	};
	const getPreplineManagerUserData = (uid) => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/preplineManagers/${uid}`
			)
			.then((res) => {
				console.log("Response preplineManagers", res);
				if (res.data.success) {
					console.log(
						"Prepline Manager Data Exists",
						res.data.data.preplineManger
					);
					renderPage(res.data.data.preplineManger);
				}
			})
			.catch((err) => {
				console.error("Error preplineManagers", err);
			});
	};
	const getPreplineStaffData = (uid) => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/preplines/prepline-staffs/${uid}`
			)
			.then((res) => {
				console.log("Response prepline-staffs", res);
				if (res.data.success) {
					console.log(
						"Prepline Staff Data Exists",
						res.data.data.preplineStaff
					);
					renderPage(res.data.data.preplineStaff);
				}
			})
			.catch((err) => {
				console.error("Error prepline-staffs", err);
			});
	};
	const getProviderAdminData = (uid) => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/providerAdmins/${uid}`
			)
			.then((res) => {
				console.log("Response providerAdmins", res);
				if (res.data.success) {
					console.log("providerAdmins  Data Exists");
					// let user = res.data.data.providerAdmin;
					renderPage(res.data.data.providerAdmin);
				}
			})
			.catch((err) => {
				console.error("Error providerAdmins", err);
			});
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
			redirect = redirectBaseURL + "authenticationpage";
			// if (review === null) {
			// 	redirect = redirectBaseURL + "home/customer";
			// } else {
			// 	let orderPage = "";
			// 	if (review.channel === "Customer") {
			// 		orderPage = "searchorder";
			// 	} else {
			// 		orderPage = "qrorder";
			// 	}

			// 	redirect =
			// 		redirectBaseURL +
			// 		"" +
			// 		orderPage +
			// 		"/" +
			// 		review.providerId +
			// 		"/" +
			// 		review.orderId +
			// 		"/" +
			// 		review.channel;
			// }

			var actionCodeSettings = {
				url: redirect,
				handleCodeInApp: true,
			};
			console.log("email", email, redirect);
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

	const renderPage = async (user) => {
		// const snapshot = await firestore.collection("users").doc(uid).get();
		// if (snapshot.exists) {
		// 	const user = snapshot.data();
		// 	//

		console.log("User", user);
		setIsLoading(false);
		Toast("User Successful Login", "success");
		// setIsOpenModal(false);

		// Save toredux
		dispatch(saveUser(user));
		if (
			user.userType === "ProviderAdmin" ||
			user.userType === "Staff" ||
			user.userType === "PrepLineStaff" ||
			user.userType === "PrepLineManager"
		) {
			dispatch(fetchUserProviderDetail(user.provider));
		}
		// dispatch(loggedStatus(true));
		// conditional rendering
		history.replace("/");
		// switch (user.userType) {
		// 	case "Customer":
		// 		history.replace("/home/customer");
		// 		console.log("custo");
		// 		break;
		// 	case "ProviderAdmin":
		// 		history.replace("/home/provideradmin");
		// 		console.log("adm");
		// 		break;
		// 	case "Staff":
		// 		history.replace("/home/staff");
		// 		console.log("staf");
		// 		break;
		// 	case "PrepLineStaff":
		// 		history.replace("/home/preplinestaff");
		// 		console.log("prepst");
		// 		break;
		// 	case "PrepLineManager":
		// 		history.replace("/home/preplinemanager");
		// 		console.log("prepman");
		// 		break;

		// 	default:
		// 		console.log("Sorry no usertype found");
		// 		break;
		// }
		// }
	};

	const resetPassword = (e) => {
		e.preventDefault();

		let valid = true;
		if (email === "") {
			setEmailError("Email Field is required");
			valid = false;
		} else {
			var actionCodeSettings = {
				url: "http://localhost:3000/",
			};
			auth
				.sendPasswordResetEmail(email, actionCodeSettings)
				.then(function () {
					// Password reset email sent.
					alert("Send email to reset password");
				})
				.catch(function (error) {
					// Error occurred. Inspect error.code.
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

			<ButtonNLoading
				onClick={login}
				title="Login"
				color="white"
				isLoading={isLoading}
			/>
			{/* {isLoading ? (
				<ButtonNLoading is="true" />
			) : (
				<PrimaryButton onClick={login}>Login</PrimaryButton>
			)} */}
			<Horizontal />
			{/* <SecondaryButton onClick={resetPassword}>
				Reset Password
			</SecondaryButton> */}
			{/* <SecondaryButton onClick={passwordlessLogin}>
				Passwordless Login
			</SecondaryButton> */}
		</Form>
	);
}

export default LoginForm;
