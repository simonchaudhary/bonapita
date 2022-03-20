import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {auth, firestore} from "../../config/firebaseConfig";
import {saveUser} from "../../Redux/actions";
import styled from "styled-components";
import ToastBar from "../../components/ToastBar";

function AuthenticationPageWithData() {
	const dispatch = useDispatch();
	const {Toast} = ToastBar();
	const history = useHistory();

	const {providerId} = useParams();

	// const router = useSelector((state) => state.router);

	// useEffect(() => {
	// 	console.log("Authentication useEffect", router.location.pathname);
	// 	history.replace(router.location.pathname);
	// }, []);

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

							openOrderpage(data);
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

	const openOrderpage = (data) => {
		dispatch(saveUser(data));
		setTimeout(() => {
			history.replace(`/orderpage/${providerId}/Customer`);
			Toast("Email is Verified", "success");
		}, 2000);
	};

	return (
		<AuthenticationPageContainer>
			<h3>Please wait Authenticating</h3>
		</AuthenticationPageContainer>
	);
}

const AuthenticationPageContainer = styled.div`
	background: #f5f5f5;
	height: calc(100vh - 70px);
	display: flex;
	align-items: center;
	justify-content: center;

	@media only screen and (max-width: 480px) {
		height: calc(100vh - 60px);
	}
`;

export default AuthenticationPageWithData;
