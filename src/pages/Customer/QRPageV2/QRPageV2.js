import React, {useState, useEffect} from "react";

// Package
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";

// API
import {signInWithLink} from "../../../apis/Registration";

// Icons
import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
// Actions
import {
	saveSelectedGuestAction,
	saveQROrderTypeAction,
	saveSplitOrderPayType,
	saveNoOfGuest,
	saveGuestNo,
	emailForSignInAction,
} from "../../../Redux/actions";

// Functions
import {redirectBaseURL} from "../../../apis/baseURL";

// Components
import {
	QRPageV2Container,
	Header,
	Body,
	Row,
	TextDetail,
	TableStatus,
	GuestList,
	GuestItem,
	GuestDetail,
	OrderTypeContainer,
} from "./QRPageV2Style";
import {Title, Detail} from "../../../components/texts/texts";
import {Horizontal, Vertical} from "../../../components/elements/elements";
import {PrimaryButton} from "../../../components/buttons/buttons";
import InputWrapper from "../../../components/input/InputWrapper";
import ButtonNLoading from "../../../components/buttons/ButtonNLoading";
import Modals from "../../../components/modal/Modals";
import GmailModal from "../../../components/modal/GmailModal";
import SwitchContainer from "./SwitchContainer/SwitchContainer";

// const guestList = [1];
const guestIdFormate = "Guest_";

const QRPageV2 = () => {
	// Initilization
	const history = useHistory();
	const {providerId} = useParams();
	const {areaId} = useParams();
	const {sectionId} = useParams();
	const {tableId} = useParams();
	const {guestId} = useParams();

	const dispatch = useDispatch();

	// Hooks
	const QR = useSelector((state) => state?.QR);

	// Hooks
	const [providerIdS, setProviderIdS] = useState(
		providerId.substring(2, providerId.length)
	);
	const [areaIdS, setAreaIdS] = useState(areaId.substring(2, areaId.length));
	const [sectionIdS, setSectionIdS] = useState(
		sectionId.substring(2, sectionId.length)
	);
	const [tableIdS, setTableIdS] = useState(
		tableId.substring(2, tableId.length)
	);
	const [guestIdS, setGuestIdS] = useState(
		guestId.substring(2, guestId.length)
	);
	const [guestList, setGuestList] = useState(null);
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [urlType, setUrlType] = useState("");

	//focus
	const emailFocus = () => {
		setEmailError("");
	};

	// UI
	const [whichModal, setWhichModal] = useState("gmailModal");
	const [isLoading, setIsLoading] = useState(false);
	const [tableAvailable, setTableAvailable] = useState(null);
	const [selectedGuest, setSelectedGuest] = useState(0);
	const [orderType, setOrderType] = useState(null);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [callBackMessage, setCallBackMessage] = useState("");
	const [pageIndex, setPageIndex] = useState(null);

	// pageIndex 1 Confirm  the number of  guest
	// pageIndex 2 Selected guest
	// pageIndex 3 Order Type (split, combine)
	// pageIndex 4 Confirm  the number of  guest
	// pageIndex 5 Confirm  the number of  guest

	const previous = () => {
		console.log("previous", pageIndex, orderType);
		// Go to previous page
		let goTo = true;

		if (pageIndex > 1) {
			if (pageIndex === 5) {
				if (orderType === "combine") {
					setPageIndex(3);
				} else {
					setPageIndex(4);
				}
			} else {
				setPageIndex((prevState) => prevState - 1);
			}
		}
	};
	const next = () => {
		console.log("next", pageIndex);
		// Go to next page
		let goTo = true;

		if (pageIndex === 1) {
			if (selectedGuest === 0) {
				alert("Choose Guest");
				goTo = false;
			}
		} else if (pageIndex === 3) {
			if (!orderType) {
				alert("Choose Any Order Type");
				goTo = false;
			}
		}

		if (goTo) {
			if (pageIndex < 5) {
				if (pageIndex === 3) {
					if (orderType === "combine") {
						setPageIndex(5);
					} else {
						setPageIndex(4);
					}
				} else {
					setPageIndex((prevState) => prevState + 1);
				}
			}
		}
	};

	// useEffect
	useEffect(() => {
		getGuestList();
	}, []);

	// Funcitons
	const checkTableAvailable = (number) => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/tables/" +
					tableIdS +
					"/available?providerId=" +
					providerIdS +
					"&areaId=" +
					areaIdS +
					"&sectionId=" +
					sectionIdS
			)
			.then((res) => {
				console.log("Response CheckTableAvailable", res);
				if (res.data.success) {
					setTableAvailable(res.data.data.tableAvailable);
					getTableOrder(number);
				}
			})
			.catch((error) => {
				console.log(
					"Error CheckTableAvailable",
					error?.response?.data?.data
				);
			});
	};

	const getGuestList = () => {
		setPageIndex(null);
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/guests?providerId=" +
					providerIdS +
					"&areaId=" +
					areaIdS +
					"&sectionId=" +
					sectionIdS +
					"&tableId=" +
					tableIdS
			)
			.then((response) => {
				console.log("Response guestlist", response);
				if (response.data.success) {
					if (typeof response?.data?.data?.guests === "string") {
						setGuestList([]);
					} else {
						if (response?.data?.data?.guests?.length === 1) {
							dispatch(saveQROrderTypeAction("combined"));
							setOrderType("combine");
							dispatch(
								saveSelectedGuestAction(
									response.data.data?.guests[0]?.guestId
								)
							);
							dispatch(saveNoOfGuest(1));
							// For GuestNo 1st guest
							dispatch(saveGuestNo(1));
							setGuestList(response?.data?.data?.guests);
							setPageIndex(5);
							checkTableAvailable(null);
						} else if (response?.data?.data?.guests?.length > 1) {
							// setPageIndex(1);
							checkTableAvailable(1);
						}
						setGuestList(response?.data?.data?.guests);
					}
				}
			})
			.catch((err) => {
				console.error("Response guestlist", err.response);
			});
	};

	const selectGuest = (item) => {
		console.log("item", item);
		dispatch(saveNoOfGuest(item));
		setSelectedGuest(item);
		setPageIndex(2);
	};
	const showOrderType = () => {
		// setShowOrderTypeContainer(true);
		// setStep({
		// 	showGuest: false,
		// 	showGuestConfirm: false,
		// 	showOrderType: true,
		// 	showSplit: false,
		// 	showVerify: false,
		// 	showStartOrder: false,
		// });

		setPageIndex(3);
	};

	const splitSelect = () => {
		dispatch(saveQROrderTypeAction("split"));
		setOrderType("split");
		setPageIndex(4);
		// setStep({
		// 	showGuest: false,
		// 	showGuestConfirm: false,
		// 	showOrderType: false,
		// 	showSplit: true,
		// 	showVerify: false,
		// 	showStartOrder: false,
		// });
	};
	const combineSelect = () => {
		dispatch(saveQROrderTypeAction("combined"));
		setOrderType("combine");
		setPageIndex(5);
	};

	const verifyEmail = () => {
		console.log("split", email.toLowerCase().split("@")[1]);
		setUrlType(email.toLowerCase().split("@")[1]);
		setWhichModal("gmailModal");

		var actionCodeSettings = {
			url: `${redirectBaseURL}menulistqr/${providerId}/${areaId}/${sectionId}/${tableId}/${guestId}/QR code`,
			handleCodeInApp: true,
		};
		if (email === "") {
			setEmailError("Enter email");
		} else {
			setIsLoading(true);
			signInWithLink(email, actionCodeSettings)
				.then((res) => {
					setIsLoading(false);
					afterVerify(res);
				})
				.catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log("Error", errorCode, errorMessage);
					setIsLoading(false);
				});
		}
	};

	const afterVerify = (message) => {
		setIsOpenModal(!isOpenModal);
		setCallBackMessage(message);
		dispatch(emailForSignInAction(email));
		// setWhichModal("gmailmodal");
		// setCloseCamera(true);
	};

	const close = () => {
		setIsLoading(false);
		setIsOpenModal(!isOpenModal);
	};

	// Get Table order
	const getTableOrder = (number) => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dineIn/orders?area=" +
					areaIdS +
					"&section=" +
					sectionIdS +
					"&table=" +
					tableIdS
			)
			.then((res) => {
				console.log("Response GetOrdersbytable", res);
				if (res.data.success) {
					let splitOrders = res.data.data.orders.filter(
						(item) => item.orderType === "split"
					);
					if (splitOrders.length === splitOrders[0].noOfGuest) {
						// Toast("Cannot do more order for this Table", "success");
						setPageIndex(7);
					} else {
						// For GuestNo
						console.log("splitOrders", splitOrders.length);
						dispatch(saveGuestNo(splitOrders.length + 1));
						// Set splitorderpaytype
						console.log("splitorder paytype", splitOrders[0].payType);
						dispatch(saveSplitOrderPayType(splitOrders[0].payType));
						// For Guest id
						let guestId = guestIdFormate + (splitOrders.length + 1);
						dispatch(saveSelectedGuestAction(guestId));
						dispatch(saveNoOfGuest(splitOrders[0].noOfGuest));
						dispatch(saveQROrderTypeAction(splitOrders[0].orderType));

						setPageIndex(5);
					}
				}
			})
			.catch((error) => {
				console.log("Error GetOrdersbytable", error.response);
				console.log("number", number);
				if (number === 1) {
					setPageIndex(1);
				}
				// For GuestNo 1st guest
				dispatch(saveGuestNo(1));
				// For Guest id
				let guestId = guestIdFormate + 1;
				console.log(typeof guestId);
				dispatch(saveSelectedGuestAction(guestId));
			});
	};

	// const
	const splitPay = () => {
		// alert("kk");
		dispatch(saveSplitOrderPayType("splitPay"));
		setPageIndex(5);
		setIsOpenModal(false);
	};
	const combinePay = () => {
		// alert("combine");
		dispatch(saveSplitOrderPayType("combinedPay"));
		setPageIndex(5);
		setIsOpenModal(!isOpenModal);
	};

	const combinePayCheckPayFirst = () => {
		setWhichModal("loading");
		setIsOpenModal(!isOpenModal);
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerIdS}`
			)
			.then((res) => {
				console.log("Response getProvider Info", res);
				if (res.data.success) {
					// setPayFirst(res.data.data.provider.payFirst);
					if (res.data.data.provider.payFirst) {
						setWhichModal("payFirstTrue");
					} else {
						setWhichModal("payFirstFalse");
					}
				}
			})
			.catch((err) => {
				console.error("Error getProvider Info", err.response);
			});
	};

	const startCombineOrder = () => {
		// alert("start combine order");
		history.push(
			`/menulistqr/${providerId}/${areaId}/${sectionId}/${tableId}/${guestId}/QR code`
		);
		// setTimeout(() => {
		// }, 2000);
	};

	return (
		<>
			<Modals isOpen={isOpenModal} className="login__modal">
				<div onClick={close} className="close__modal">
					<IconButton>
						<CloseRoundedIcon />
					</IconButton>
				</div>
				{whichModal === "gmailModal" ? (
					<GmailModal title={callBackMessage} urlType={urlType} />
				) : whichModal === "payFirstTrue" ? (
					<>
						<h5>
							This provider does not accept combine pay for split Order.
							The guests on this table will have to pay separately for
							their own orders
						</h5>
						<Horizontal />
						<Row>
							<PrimaryButton onClick={splitPay}>Split Pay</PrimaryButton>
						</Row>
					</>
				) : whichModal === "payFirstFalse" ? (
					<>
						<div>
							<h5>Start Split Order with Combine Pay</h5>
							<Horizontal />
							<Row>
								<PrimaryButton onClick={combinePay}>
									Combine Pay
								</PrimaryButton>
							</Row>
						</div>
					</>
				) : whichModal === "loading" ? (
					<Title>Loading...</Title>
				) : null}
			</Modals>

			<QRPageV2Container>
				<Header>
					<TextDetail>
						<Detail>Provider</Detail>
						<Title>{providerIdS}</Title>
					</TextDetail>
					<TextDetail>
						<Detail>Area</Detail>
						<Title>{areaIdS}</Title>
					</TextDetail>
					<TextDetail>
						<Detail>Section</Detail>
						<Title>{sectionIdS}</Title>
					</TextDetail>
					<TextDetail>
						<Row style={{justifyContent: "flex-start"}}>
							<Detail>Table</Detail>
							{tableAvailable === null ? (
								<h6 style={{marginLeft: "0.5rem"}}>Loading</h6>
							) : tableAvailable ? (
								<TableStatus green> Available</TableStatus>
							) : tableAvailable === false ? (
								<TableStatus orange> Unavailable</TableStatus>
							) : null}
						</Row>
						<Title>{tableIdS}</Title>
					</TextDetail>
				</Header>

				{tableAvailable ? (
					<Body>
						<SwitchContainer
							guestList={guestList}
							previous={previous}
							next={next}
							pageIndex={pageIndex}
						>
							{pageIndex === 1 ? (
								<GuestList>
									<Title>Confirm the Number of Guests</Title>
									<Horizontal />
									{guestList?.map((item, i) => (
										<GuestItem
											style={{
												background:
													selectedGuest === i + 1 ? "grey" : null,
												color:
													selectedGuest === i + 1 ? "white" : null,
											}}
											onClick={() => selectGuest(i + 1)}
											key={i}
										>
											{i + 1}
										</GuestItem>
									))}
								</GuestList>
							) : pageIndex === 2 ? (
								<GuestDetail>
									<Title>
										You selected{" "}
										<span
											style={{
												margin: "0.5rem",
												fontSize: "0.875rem",
												fontWeight: "800",
												color: "#d65a31",
											}}
										>
											{selectedGuest}
										</span>{" "}
										Guests for dining.
									</Title>
									<Horizontal />
									<PrimaryButton
										style={{width: "120px"}}
										onClick={showOrderType}
									>
										OK
									</PrimaryButton>
								</GuestDetail>
							) : pageIndex === 3 ? (
								<OrderTypeContainer>
									<Title>
										Split order for each guest, or combined?
									</Title>
									<Horizontal />
									<Row>
										<PrimaryButton
											style={{width: "120px"}}
											onClick={splitSelect}
										>
											Split
										</PrimaryButton>
										<Vertical />
										<PrimaryButton
											style={{width: "120px"}}
											onClick={combineSelect}
										>
											Combine
										</PrimaryButton>
									</Row>
								</OrderTypeContainer>
							) : pageIndex === 4 ? (
								<OrderTypeContainer>
									<div>
										<Title>Order Type</Title>
										<Detail>{orderType}</Detail>
									</div>
									<Horizontal />
									{/* <Detail>{orderType} </Detail> */}
									<Title>
										Split Pay for each guest or Combined Pay?{" "}
									</Title>
									<Horizontal />
									<Row>
										<PrimaryButton
											style={{width: "120px"}}
											onClick={splitPay}
										>
											Split Pay
										</PrimaryButton>
										<Vertical />
										<PrimaryButton
											style={{width: "120px"}}
											onClick={combinePayCheckPayFirst}
										>
											Combine Pay
										</PrimaryButton>
									</Row>
								</OrderTypeContainer>
							) : pageIndex === 5 ? (
								<OrderTypeContainer>
									<Title>Starting {orderType} order</Title>
									<Horizontal />
									<InputWrapper
										label="Email"
										error={emailError}
										onFocus={emailFocus}
										type="text"
										value={email}
										onChangeText={(e) => setEmail(e.target.value)}
									/>
									<Horizontal />
									<ButtonNLoading
										onClick={verifyEmail}
										title="Verify"
										color="white"
										isLoading={isLoading}
									/>
								</OrderTypeContainer>
							) : pageIndex === 6 ? (
								<OrderTypeContainer>
									<Title>Email Verified</Title>
									<Horizontal />
									<PrimaryButton onClick={startCombineOrder}>
										Start {QR?.orderType} Order
									</PrimaryButton>
								</OrderTypeContainer>
							) : pageIndex === 7 ? (
								<OrderTypeContainer>
									<Title>
										Table is already occupied and no order can be
										taken for additional guests
									</Title>
								</OrderTypeContainer>
							) : (
								<OrderTypeContainer>
									<Title>Loading...</Title>
								</OrderTypeContainer>
							)}
						</SwitchContainer>
					</Body>
				) : null}
			</QRPageV2Container>
		</>
	);
};

export default QRPageV2;
