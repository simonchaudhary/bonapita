import React, {useEffect} from "react";
import {useParams} from "react-router-dom";

// Package
import {useDispatch, useSelector} from "react-redux";

// Action
import {removeEmailForSignInAction, saveUser} from "../../Redux/actions";

// config
import {auth, firestore} from "../../config/firebaseConfig";

// Components
import MenuList2 from "../../ComponentsNew/MenuList/MenuList2";
import ProviderHeader from "../../ComponentsNew/ProviderHeader";
import ToastBar from "../../components/ToastBar";

const MenuPage = () => {
	// Initilization
	const {Toast} = ToastBar();
	const dispatch = useDispatch();

	// Params
	const {providerId} = useParams();

	// QR and Dine In
	const {areaId} = useParams();
	const {sectionId} = useParams();
	const {tableId} = useParams();
	const {guestId} = useParams();
	const {channel} = useParams();

	// Props to Send
	const qrProps = {areaId, sectionId, tableId, guestId};

	// Redux State
	const other = useSelector((state) => state.other);

	// QR Sig in
	useEffect(() => {
		console.log("useeffect email", other.emailForSignIn);
		if (other.emailForSignIn && channel === "QR code") {
			signIn();
		}
	}, []);

	// Functions QR
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

	return (
		<div>
			<ProviderHeader
				providerId={providerId.substring(2, providerId?.length)}
				channel={channel}
				qrProps={qrProps}
			/>
			<MenuList2
				providerId={providerId.substring(2, providerId.length)}
				areaId={areaId?.substring(2, areaId?.length)}
				sectionId={sectionId?.substring(2, sectionId?.length)}
				tableId={tableId?.substring(2, tableId?.length)}
				guestId={guestId?.substring(2, guestId?.length)}
				channel={channel}
			/>
		</div>
	);
};

export default MenuPage;
