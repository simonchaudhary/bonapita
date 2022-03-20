import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import HomeIcon from "@material-ui/icons/Home";
import axios from "axios";
import React, {useEffect, useState} from "react";
// new qrcode reader
import QrReader from "react-qr-reader";
// import QrReader from "react-qr-scanner";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {redirectBaseURL} from "../../apis/baseURL";
import ButtonNLoading from "../../components/buttons/ButtonNLoading";
import {PrimaryButton} from "../../components/buttons/buttons";
import {Horizontal} from "../../components/elements/elements";
import InputWrapper from "../../components/input/InputWrapper";
import GmailModal from "../../components/modal/GmailModal";
import Modals from "../../components/modal/Modals";
import ToastBar from "../../components/ToastBar";
import {auth, firestore} from "../../config/firebaseConfig";
import {
	isQRCameraOpenAction,
	saveQRDetailAction,
	saveQROrderTypeAction,
	saveSelectedGuestAction,
	saveUser,
	setProviderIdAction,
} from "../../Redux/actions";
// Component
import {
	ButtonSecondary,
	Column,
	Container,
	DialogBox,
	FullPage,
	QRContainer,
	Row,
	TableStatus,
} from "./QRScanPageStyle";

function QRScanPage() {
	const dispatch = useDispatch();

	// Redux state
	const user = useSelector((state) => state.user.user);
	const QR = useSelector((state) => state.QR);
	const isQRCameraOpen = useSelector((state) => state.isQRCameraOpen);

	const [delay, setDelay] = useState(100);
	const [isLoading, setIsLoading] = useState(false);
	const [facingMode, setFacingMode] = useState("environment");

	const [result, setResult] = useState(null);
	const [tableStatus, setTableStatus] = useState("");

	const [noOfGuest, setnoOfGuest] = useState(null);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [emailForSignIn, setEmailForSignIn] = useState(null);

	const history = useHistory();
	const {Toast} = ToastBar();

	useEffect(() => {
		// setResult(JSON.parse(localStorage.getItem("qrdata")));
		setResult(QR?.qrDetail);
		var email = window.localStorage.getItem("emailForSignIn");
		setEmailForSignIn(email);
		console.log("useeffect email", email);
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

							// dispatch(loggedStatus(true));
							let providerId = QR.qrDetail.providerId;
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
		dispatch(saveUser(data));
		setTimeout(() => {
			// history.push({
			// 	pathname: `orderpage/${providerId}/QR code`,
			// });
			let providerId = "p=" + QR.qrDetail.providerId;
			let areaId = "a=" + QR.qrDetail.areaId;
			let sectionId = "s=" + QR.qrDetail.sectionId;
			let tableId = "t=" + QR.qrDetail.tableId;
			let selectedGuest = "g=" + QR.selectedGuest;
			history.push({
				pathname: `menulist/${providerId}/${areaId}/${sectionId}/${tableId}/${selectedGuest}`,
			});
			Toast("Email is Verified", "success");
		}, 2000);
	};

	const close = () => {
		dispatch(saveSelectedGuestAction(null));
		setShowGuest(false);
		setnoOfGuest(null);
		setIsOpenModal(!isOpenModal);
		setIsLoading(false);
	};

	const verifyEmail = () => {
		var actionCodeSettings = {
			// url: redirectBaseURL + "orderpage",
			url: redirectBaseURL + "qrpage",
			handleCodeInApp: true,
		};
		if (email === "") {
			setEmailError("Enter email");
		} else {
			console.log("email", email);
			setIsLoading(true);
			auth
				.sendSignInLinkToEmail(email, actionCodeSettings)
				.then(() => {
					window.localStorage.setItem("emailForSignIn", email);
					// Toast("Email send to " + email, "success");
					// window.close();

					let message = "Email send to " + email;

					setIsLoading(false);
					afterVerify(message);
				})
				.catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log("Error", errorCode, errorMessage);
					setIsLoading(false);
				});
		}
	};

	const handleScan = (data) => {
		if (data === null) {
		} else {
			// console.log("raw data", data);
			let datas = JSON.parse(data);
			// console.log("data", datas);
			// setResult(datas);
			isAvailableTable(datas);
		}
	};

	const handleError = (err) => {
		console.error(err);
	};

	const changeFacingMode = () => {
		console.log("facing mode: ", facingMode);

		if (facingMode === "user") {
			setFacingMode("environment");
		} else {
			setFacingMode("user");
		}
	};

	const order = () => {
		// if (result.size === 0) {
		// 	alert("Scan First");
		// 	setIsLoading(false);
		// } else {
		// 	// isAvailableTable();
		// }
		console.log("order");
		createOrder();
	};

	const isAvailableTable = (data) => {
		setResult(data);

		let providerId = data?.providerId;
		let areaId = data?.areaId;
		let sectionId = data?.sectionId;
		let tableId = data?.tableId;
		console.log("isAvailableTable", providerId, areaId, sectionId, tableId);

		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/tables/" +
					tableId +
					"/available?providerId=" +
					providerId +
					"&areaId=" +
					areaId +
					"&sectionId=" +
					sectionId
			)
			.then((response) => {
				console.log("Response CheckTableAvailable", response);
				if (response.data.success) {
					if (response.data.data.tableAvailable) {
						// createOrder();
						// setTableStatus("TableAvailable");
						// localStorage.setItem("qrdata", JSON.stringify(data));
						// Save to redux
						// dispatch(saveQRDetailAction(data));
						// dispatch(qrTableAvailableAction(true));
						if (QR === null) {
							const qrDetail = {
								combinedOrder: response.data.data.combinedOrder,
								selectedGuest: null,
								orderType: null,
								tableAvailable: response.data.data.tableAvailable,
								qrDetail: data,
							};
							dispatch(saveQRDetailAction(qrDetail));
							dispatch(setProviderIdAction(data.providerId));
							setResult(data);
						}
					} else if (!response.data.data.tableAvailable) {
						// setTableStatus("TableUnavailable");
						// dispatch(qrTableAvailableAction(false));
						if (QR === null) {
							const qrDetail = {
								combinedOrder: response.data.data.combinedOrder,
								selectedGuest: null,
								orderType: null,
								tableAvailable: response.data.data.tableAvailable,
								qrDetail: data,
							};
							dispatch(saveQRDetailAction(qrDetail));
							dispatch(setProviderIdAction(data.providerId));
							setResult(data);
						}
					}
				}
			})
			.catch((error) => {
				console.log("Error CheckTableAvailable", error.response);
				alert(error.response.data.data);
				// if (!error?.response.data.success) {
				// 	setTableStatus("Tablenotfound");
				// }
			});
	};

	const createOrder = () => {
		// setIsLoading(true);

		const data = {
			customerId: user.uid,
			providerId: result?.providerId,
			channel: "QR code",
			area: result?.areaId,
			section: result?.sectionId,
			table: result?.tableId,
			deliveryMode:
				"to be delivered by third party, to be delivered by the provider, customer will pickup",
			items: [],
			orderStatus: "submit",
		};
		console.log("data", data);
		setIsLoading(true);
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/qr/orders",
				data
			)
			.then((response) => {
				console.log("Response QR OrderCreated", response);
				if (response.data.success) {
					let orderId = response.data.data.id;
					Toast("Order Created", "success");
					setIsLoading(false);
					let channel = "QR code";
					history.push(
						`/qrorder/${result?.providerId}/${orderId}/${channel}`
					);
				}
			})
			.catch((error) => {
				console.log("Error QR Order added", error.response);
			});
	};

	const goBack = () => {
		history.goBack();

		// let page = redirectBaseURL + "orderpage";

		// console.log(page);
	};

	const showTableStatus = () => {
		return (
			QR && (
				<>
					{QR?.tableAvailable ? (
						<TableStatus green>Table Available</TableStatus>
					) : (
						<TableStatus orange>Table Unavailable</TableStatus>
					)}
				</>
			)
		);
	};

	const showOrderTypeBox = () => {
		return (
			QR && (
				<>
					{QR?.tableAvailable ? (
						<DialogBox>
							<h5>Split order for each guest or combined?</h5>
							<Horizontal />
							<div className="row">
								{QR.combinedOrder ? (
									<>
										<PrimaryButton onClick={split}>
											Split
										</PrimaryButton>
										<ButtonSecondary onClick={combine}>
											Combined
										</ButtonSecondary>
									</>
								) : (
									<PrimaryButton onClick={split}>Split</PrimaryButton>
								)}
							</div>
						</DialogBox>
					) : null}
				</>
			)
		);
	};

	const [showGuest, setShowGuest] = useState(false);

	const split = () => {
		setShowGuest(true);
		dispatch(saveQROrderTypeAction("split"));
	};

	const combine = () => {
		dispatch(saveQROrderTypeAction("combined"));
		if (!user) {
			setIsOpenModal(!isOpenModal);
		} else {
			// history.push(`orderpage/${QR.qrDetail.providerId}/QR code`);
			let providerId = "p=" + QR.qrDetail.providerId;
			let areaId = "a=" + QR.qrDetail.areaId;
			let sectionId = "s=" + QR.qrDetail.sectionId;
			let tableId = "t=" + QR.qrDetail.tableId;
			let selectedGuest = "g=" + QR.selectedGuest;
			history.replace(
				`menulist/${providerId}/${areaId}/${sectionId}/${tableId}/${selectedGuest}`
			);
		}
	};

	const afterVerify = (message) => {
		// setIsOpenModal(!isOpenModal);
		setCallBackMessage(message);
		setWhichModal("gmailmodal");
		setCloseCamera(true);
		dispatch(isQRCameraOpenAction(true));
	};

	const scanStart = () => {
		dispatch(saveQRDetailAction(null));
		setResult(null);
		setCloseCamera(false);
		dispatch(isQRCameraOpenAction(false));
	};

	const [whichModal, setWhichModal] = useState("login");
	const [callBackMessage, setCallBackMessage] = useState("");

	const [closeCamera, setCloseCamera] = useState(false);

	const closeCam = () => {
		setCloseCamera(true);
		dispatch(isQRCameraOpenAction(true));
	};

	const nullFunction = () => {
		console.log("null function");
		setCloseCamera(true);
		dispatch(isQRCameraOpenAction(true));
	};

	return (
		<>
			<Modals isOpen={isOpenModal} className="login__modal">
				<CloseRoundedIcon className="close__modal" onClick={close} />

				{whichModal === "login" ? (
					<>
						<InputWrapper
							label="Verify Email"
							error={emailError}
							// prefixIcon={<EmailRoundedIcon />}
							// onFocus={specialInstructionFocus}
							type="text"
							value={email}
							onChangeText={(e) => setEmail(e.target.value)}
						/>
						<ButtonNLoading
							onClick={verifyEmail}
							title="Done"
							color="white"
							isLoading={isLoading}
						/>
					</>
				) : whichModal === "gmailmodal" ? (
					<GmailModal title={callBackMessage} />
				) : null}
			</Modals>

			{emailForSignIn ? (
				<FullPage>
					<h4 style={{color: "white"}}>Please wait authenticating</h4>
				</FullPage>
			) : null}
			<Container>
				<IconButton style={{marginLeft: "0.875rem"}} onClick={goBack}>
					<HomeIcon />
				</IconButton>
				{/* <button onClick={closeCam}>close</button> */}
				<Row>
					<QRContainer>
						{isQRCameraOpen ? null : (
							<QrReader
								delay={delay}
								style={{width: "100%"}}
								onError={handleError}
								facingMode={facingMode}
								onScan={QR === null ? handleScan : nullFunction}
							/>
						)}

						{/* <ButtonChange onClick={changeFacingMode}>
							<IconButton>
								<AutorenewRoundedIcon style={{ color: "white" }} />
							</IconButton>
						</ButtonChange> */}
					</QRContainer>

					<Column>
						{QR || isQRCameraOpen ? (
							<PrimaryButton
								style={{width: "100px"}}
								onClick={scanStart}
							>
								Re Scan
							</PrimaryButton>
						) : null}

						{/* {user && <p>{user?.email}</p>} */}
						<div className="row" style={{justifyContent: "flex-start"}}>
							{result && <h3>Results</h3>}
							{showTableStatus(tableStatus)}
						</div>

						{result && (
							<div>
								<p>{result?.providerId}</p>
								<p>{result?.areaId}</p>
								<p>{result?.sectionId}</p>
								<p>{result?.tableId}</p>

								{showOrderTypeBox()}

								{showGuest ? (
									<select
										value={noOfGuest}
										onChange={(e) => {
											dispatch(
												saveSelectedGuestAction(e.target.value)
											);
											setnoOfGuest(e.target.value);
											if (!user) {
												setIsOpenModal(!isOpenModal);
											} else {
												let providerId =
													"p=" + QR.qrDetail.providerId;
												let areaId = "a=" + QR.qrDetail.areaId;
												let sectionId =
													"s=" + QR.qrDetail.sectionId;
												let tableId = "t=" + QR.qrDetail.tableId;

												let selectedGuest = "g=" + e.target.value;

												// let page =
												// 	redirectBaseURL +
												// 	`orderpage/${providerId}`;
												history.replace(
													`menulist/${providerId}/${areaId}/${sectionId}/${tableId}/${selectedGuest}`
												);
												// window.location.replace(page);
											}
										}}
									>
										<option disabled selected>
											Select Guest
										</option>
										{result?.guests?.map((item, i) => (
											<option key={i} value={item.guestId}>
												{item.guestId}
											</option>
										))}
									</select>
								) : null}
							</div>
						)}
					</Column>
				</Row>
			</Container>
		</>
	);
}

export default QRScanPage;
