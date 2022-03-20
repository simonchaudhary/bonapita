import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useHistory, useParams} from "react-router-dom";

import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";

// Function
import {redirectBaseURL} from "../../../apis/baseURL";
import {auth, firestore} from "../../../config/firebaseConfig";
import {saveUser} from "../../../Redux/actions";

// Components
import {Title} from "../../../components/texts/texts";
import {ReviewOrderContainer, Body, Modal, Form} from "./ReviewOrderStyle";
import {Horizontal} from "../../../components/elements/elements";
import InputWrapper from "../../../components/input/InputWrapper";
import ButtonNLoading from "../../../components/buttons/ButtonNLoading";
import ToastBar from "../../../components/ToastBar";
import {SecondaryButton} from "../../../components/buttons/buttons";
import Modals from "../../../components/modal/Modals";
import GmailModal from "../../../components/modal/GmailModal";

function ReviewOrder() {
	// params
	const {providerId} = useParams();
	const {orderId} = useParams();
	const {channel} = useParams();

	const user = useSelector((state) => state.user.user);

	const history = useHistory();
	const dispatch = useDispatch();
	const {Toast} = ToastBar();

	// booleans
	const [isLoading, setIsLoading] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [callBackMessage, setCallBackMessage] = useState("");

	// const router = useSelector((state) => state.router);

	// useEffect(() => {
	// 	console.log("ReviewOrder useEffect", router.location.pathname);
	// 	// history.replace(router.location.pathname);
	// }, []);

	// error
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [urlType, setUrlType] = useState("");

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
					saveData(cred);
				})
				.catch((err) => {
					console.log("error " + err);
					setIsLoading(false);
					Toast(err.toString(), "error");
				});
		}
	};

	const saveData = async (cred) => {
		const snapshot = await firestore
			.collection("users")
			.doc(cred.user.uid)
			.get();
		if (snapshot.exists) {
			const user = snapshot.data();
			setIsLoading(false);
			// Save toredux
			dispatch(saveUser(user));
			Toast("User Successful Login", "success");

			history.replace(`/searchorder/${providerId}/${orderId}/${channel}`);
			// window.location.reload(
			// 	`/searchorder/${providerId}/${orderId}/${channel}`
			// );
		}
	};

	const reviewNow = () => {
		history.replace(`/searchorder/${providerId}/${orderId}/${channel}`);
	};

	const afterVerify = (message) => {
		setCallBackMessage(message);
		setIsOpenModal(true);
	};

	const passwordlessLogin = () => {
		let valid = true;
		if (email === "") {
			setEmailError("Email Field is required");
			valid = false;
		}

		if (valid) {
			console.log("split", email.toLowerCase().split("@")[1]);
			setUrlType(email.toLowerCase().split("@")[1]);

			let redirect =
				redirectBaseURL + `revieworder/${providerId}/${orderId}/${channel}`;
			var actionCodeSettings = {
				url: redirect,

				handleCodeInApp: true,
			};

			console.log(providerId);
			auth
				.sendSignInLinkToEmail(email, actionCodeSettings)
				.then(() => {
					localStorage.setItem("emailForSignIn", email);
					let message = "Email send to " + email;
					afterVerify(message);

					// Toast(message, "success");
					// window.location.href =
					// 	"https://mail.google.com/mail/u/0/#inbox";
				})
				.catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log("Error", errorCode, errorMessage);
				});
		}
	};

	useEffect(() => {
		var email = window.localStorage.getItem("emailForSignIn");
		if (email != null) {
			signIn();
		}
	}, []);

	const signIn = () => {
		// Confirm the link is a sign-in with email link.
		console.log("signIn");
		if (auth.isSignInWithEmailLink(window.location.href)) {
			var email = window.localStorage.getItem("emailForSignIn");
			if (!email) {
				email = window.prompt("Please provide your email for confirmation");
			}
			// The client SDK will parse the code from the link for you.
			auth
				.signInWithEmailLink(email, window.location.href)
				.then((result) => {
					window.localStorage.removeItem("emailForSignIn");
					console.log("Result", result);

					let data = {
						email: result.user.email,
						emailVerified: result.user.emailVerified,
						uid: result.user.uid,
						createdDate: Date().toLocaleString(),
						firstName: "",
						lastName: "",
						userType: "Customer",
						provider: "",
						prepLineName: "",
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

							openOrderpage(providerId, data);
						})
						.catch((err) => {
							console.log("firestore errorss " + err);
						});
				})
				.catch((error) => {
					console.log("Error", error);
				});
		}
	};

	const openOrderpage = (providerId, data) => {
		Toast("Email is Verified", "success");
		dispatch(saveUser(data));
		setTimeout(() => {
			history.push({
				pathname: `searchorder/${providerId}/${orderId}/${channel}`,
			});
		}, 2000);
	};

	const close = () => {
		setIsOpenModal(!isOpenModal);
		setIsLoading(false);
	};

	return (
		<>
			<Modals isOpen={isOpenModal} className="login__modal">
				<CloseRoundedIcon className="close__modal" onClick={close} />

				{/* <GmailModal title={callBackMessage} /> */}
				<GmailModal title={callBackMessage} urlType={urlType} />
			</Modals>

			<ReviewOrderContainer>
				{/* <NavBarContainer>
				<Logo style={{ color: "black" }}>
					aFoodie
					<span style={{ color: "#d65a31", fontWeight: "800" }}>
						.
					</span>
				</Logo>
			</NavBarContainer> */}

				<Body>
					{user.userType === "Customer" ? (
						<Modal>
							<button onClick={reviewNow}>Review Now</button>
						</Modal>
					) : (
						<Modal>
							<Form>
								<Title
									style={{
										fontSize: "0.875rem",
										fontWeight: "600",
										width: "100%",
										textAlign: "center",
									}}
								>
									Login First to Review Order
								</Title>
								<Horizontal />
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
									color="white"
									title="Login"
									onClick={login}
									isLoading={isLoading}
								/>

								<Horizontal />
								<SecondaryButton onClick={passwordlessLogin}>
									Passwordless Login
								</SecondaryButton>
							</Form>
						</Modal>
					)}
				</Body>
			</ReviewOrderContainer>
		</>
	);
}

export default ReviewOrder;
