import React, {useState, useEffect} from "react";

// Package
import {useHistory} from "react-router-dom";
import {login} from "../../apis/Registration";
import Input from "../../ComponentsNew/Input";
import {useDispatch, useSelector} from "react-redux";

// Icons
import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

// API
import {signInWithLink} from "../../apis/Registration";

// Actions
import {
	saveUser,
	fetchUserProviderDetail,
	emailForSignInAction,
	removeEmailForSignInAction,
} from "../../Redux/actions";

// Helper
import {validateEmail} from "../../helper/emailValidator";
import {redirectBaseURL} from "../../apis/baseURL";
import {auth, firestore} from "../../config/firebaseConfig";

// Custom Hooks
import useFormData from "../../Hooks/useFormData";

// Components
import ToastBar from "../../components/ToastBar";
import Header from "./Header";
import {ButtonLoading} from "../../ComponentsNew/Button";
import Modals from "../../components/modal/Modals";
import GmailModal from "../../components/modal/GmailModal";
import FullPageLoading from "../../components/Loading/FullPageLoading";
import {getTechAdmin} from "../../apis/TechAdmin";

const Login = () => {
	console.log("Login");

	// Initilization
	const history = useHistory();
	const dispatch = useDispatch();
	const {Toast} = ToastBar();

	// Redux State
	const other = useSelector((state) => state.other);

	// Hooks
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [formError, setFormError] = useState({
		email: "",
		password: "",
	});

	// UI Hooks
	const [isLoading, setIsLoading] = useState(false);
	const [isLoading2, setIsLoading2] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [callBackMessage, setCallBackMessage] = useState("");
	const [urlType, setUrlType] = useState("");
	const [showLoginScreen, setShowLoginScreen] = useState("Customer");

	// Custom Hooks
	const {onChange, onFocus, setError} = useFormData(setFormData, setFormError);

	// useEffect

	useEffect(() => {
		console.log("useeffect email", other.emailForSignIn);
		if (other.emailForSignIn) {
			signIn();
		}
	}, []);

	const signIn = () => {
		// Confirm the link is a sign-in with email link.
		console.log("signIn", other.emailForSignIn);
		if (auth.isSignInWithEmailLink(window.location.href)) {
			// var email = window.localStorage.getItem("emailForSignIn");
			var email = "";

			if (!other?.emailForSignIn) {
				email = window.prompt("Please provide your email for confirmation");
			}
			// The client SDK will parse the code from the link for you.
			auth
				.signInWithEmailLink(other?.emailForSignIn, window.location.href)
				.then((result) => {
					// window.localStorage.removeItem("emailForSignIn");

					// setEmailForSignIn(null);
					console.log("Result", result);

					if (result.additionalUserInfo.isNewUser) {
						let data = {
							email: result.user.email,
							emailVerified: result.user.emailVerified,
							uid: result.user.uid,
							createdDate: Date().toLocaleString(),
							firstName: "",
							lastName: "",
							userType: "Customer",
						};

						// save to firestore
						firestore
							.collection("users")
							.doc(result.user.uid)
							.set(data)
							.then((cred) => {
								console.log("save to firebase");
								// Toast("User save to Firestore", "success");
								window.localStorage.removeItem("emailForSignIn");
								dispatch(removeEmailForSignInAction());

								// dispatch(loggedStatus(true));
								// let providerId = QR.qrDetail.providerId;
								// openOrderpage(data);
								dispatch(saveUser(data));
								Toast("Email is Verified", "success");
							})
							.catch((err) => {
								console.log("firestore errorss " + err);
							});
					} else {
						// Customer
						firestore
							.collection("users")
							.doc(result.user.uid)
							.get()
							.then((res) => {
								// console.log("Response data exists", res);
								if (res.exists) {
									console.log("Customer Data");
									// openOrderpage(res.data());
									dispatch(saveUser(res.data()));
									dispatch(removeEmailForSignInAction());
									history.push("/");
									Toast("Email is Verified", "success");
								}
							})
							.catch((err) => {
								console.log("Error", err);
							});
					}
				})
				.catch((error) => {
					console.log("Error signInWithEmailLink", error);
				});
		}
	};

	// Functions
	const onLogin = () => {
		let isValid = true;
		for (const [key, value] of Object.entries(formData)) {
			// console.log(`${key}: ${value}`);
			if (value === "") {
				setError(key, "Field Required");
				isValid = false;
			} else {
				if (key === "email" && !validateEmail(formData.email)) {
					setError(key, "Invalid Email");
					isValid = false;
				}
				if (key === "password" && formData.password.length < 10) {
					setError(key, "Must be 10 digit");
					isValid = false;
				}
			}
		}
		if (isValid) {
			setIsLoading(true);
			if (showLoginScreen === "TechAdmin") {
				auth
					.signInWithEmailAndPassword(formData.email, formData.password)
					.then((cred) => {
						console.log("Cred", cred);
						getTechAdmin()
							.then((res) => {
								console.log("res", res);

								let user = res.data.data.techAdmins.filter(
									(item) => item.uid === cred.user.uid
								);
								if (user.length === 1) {
									console.log(user[0]);
									dispatch(saveUser(user[0]));
									Toast(
										"Tech Admin successfully logged In",
										"success"
									);
									history.push("/");
								} else {
									Toast("User Not Found", "error");
								}
							})
							.catch((err) => {
								console.log("err", err);
								setIsLoading(false);
								Toast("User Not Found", "error");
								// signInWithEmailAndPassword
							});
					})
					.catch((err) => {
						setIsLoading(false);
						console.log(err);
						Toast(err?.message, "error");
					});
			} else {
				login(formData.email, formData.password)
					.then((user) => {
						console.log("Response", user);
						// For Customer
						dispatch(saveUser(user));
						// For Provider
						if (
							user.userType === "ProviderAdmin" ||
							user.userType === "Staff" ||
							user.userType === "PrepLineStaff" ||
							user.userType === "PrepLineManager"
						) {
							dispatch(fetchUserProviderDetail(user.provider));
						}
						setIsLoading(false);
						Toast("User Successful Login", "success");
						history.replace("/");
					})
					.catch((err) => {
						console.log("Error", err);
						setIsLoading(false);
						// signInWithEmailAndPassword
						if (err.signIn) {
							Toast(err.signIn, "error");
						} else if (err.firestore) {
						}
					});
			}
		}
	};

	const onPasswordlessLogin = () => {
		console.log("passwordless login");
		let isValid = true;
		if (formData.email === "") {
			setError("email", "Field Required");
			isValid = false;
		}
		if (!validateEmail(formData.email)) {
			setError("email", "Invalid Email");
			isValid = false;
		}
		if (isValid) {
			setUrlType(formData.email.toLowerCase().split("@")[1]);
			setIsLoading2(true);
			var actionCodeSettings = {
				url: `${redirectBaseURL}login`,
				handleCodeInApp: true,
			};
			signInWithLink(formData.email, actionCodeSettings)
				.then((res) => {
					setIsLoading2(false);
					afterVerify(res);
				})
				.catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log("Error", errorCode, errorMessage);
					setIsLoading2(false);
				});
		}
	};

	const afterVerify = (message) => {
		setIsOpenModal(!isOpenModal);
		setCallBackMessage(message);
		dispatch(emailForSignInAction(formData.email));
	};

	const close = () => {
		setIsLoading(false);
		setIsOpenModal(!isOpenModal);
	};

	const onLoginAs = (showLoginScreen) => {
		setShowLoginScreen(showLoginScreen);
	};

	return (
		<>
			{other?.emailForSignIn ? <FullPageLoading /> : null}
			<Modals isOpen={isOpenModal} className="login__modal">
				<div onClick={close} className="close__modal">
					<IconButton>
						<CloseRoundedIcon />
					</IconButton>
				</div>
				<GmailModal title={callBackMessage} urlType={urlType} />
			</Modals>
			<div className="h-full flex flex-col justify-between bg-white">
				{/* <Header onClick={signUpHere} /> */}
				<Header />

				{/* <Header onClick={signUpHere} buttonLabel="Create an account" /> */}

				{/* Form */}
				<div className="h-full flex justify-center items-center">
					<div className="w-full md:w-1/3 px-4 md:px-2">
						<p className="text-center text-2xl font-medium mb-5">
							Login{" "}
							{showLoginScreen === "Customer"
								? " as Customer"
								: showLoginScreen === "Provider"
								? " as Provider"
								: showLoginScreen === "TechAdmin"
								? " as Tech Admin"
								: null}
						</p>
						<Input
							label="Email"
							error={formError.email}
							type="email"
							value={formData.email}
							onChange={(e) => onChange(e, "email")}
							onFocus={() => onFocus("email")}
						/>
						{showLoginScreen === "Customer" ? null : (
							<Input
								label="Password"
								error={formError.password}
								type="password"
								value={formData.password}
								onChange={(e) => onChange(e, "password")}
								onFocus={() => onFocus("password")}
							/>
						)}

						{showLoginScreen === "Customer" ? (
							<ButtonLoading
								color="white"
								className="mt-6"
								title="Send Link To Email"
								onClick={onPasswordlessLogin}
								isLoading={isLoading2}
							/>
						) : (
							<ButtonLoading
								color="white"
								title="Login"
								className="mt-6"
								onClick={onLogin}
								isLoading={isLoading}
							/>
						)}
					</div>
				</div>
				<footer>
					<div className="flex flex-col items-center md:flex-row md:justify-evenly w-full mb-2">
						<p
							onClick={() => onLoginAs("Customer")}
							className={`${
								showLoginScreen === "Customer"
									? "text-green-600 font-bold"
									: null
							}  text-sm text-gray-400 hover:text-green-600 cursor-pointer mb-2`}
						>
							Login as Customer
						</p>
						<p
							onClick={() => onLoginAs("Provider")}
							className={`${
								showLoginScreen === "Provider"
									? "text-green-600 font-bold"
									: null
							} text-sm text-gray-400 hover:text-green-600 cursor-pointer mb-2`}
						>
							Login as Provider
						</p>
						<p
							onClick={() => onLoginAs("TechAdmin")}
							className={`${
								showLoginScreen === "TechAdmin"
									? "text-green-600 font-bold"
									: null
							} text-sm text-gray-400 hover:text-green-600 cursor-pointer mb-2`}
						>
							Login as Tech Admin
						</p>
					</div>
					<div className="border-t border-gray-00"></div>
					<p className="flex justify-center items-center flex-col  py-4 text-xs text-gray-400">
						© 2021 aFoodie, All rights reserved.
					</p>
				</footer>
			</div>
		</>
	);
};

export default Login;
