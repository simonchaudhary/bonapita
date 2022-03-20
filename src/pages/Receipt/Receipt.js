import React, {useState, useEffect} from "react";
import {useHistory, useParams, withRouter} from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

import {useSelector} from "react-redux";
import {Tooltip} from "@varld/popover";

// Icons
import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import PrintRoundedIcon from "@material-ui/icons/PrintRounded";
import food from "../../assets/paywithcard.svg";

// API
import {addPayment, updateOrderTranstionId} from "../../apis/StripePayment";

// Custom Hooks
import {useProviderDetail} from "../../Hooks/useProvider/useProvider";

// Components
import {
	ReceiptContainer,
	Header,
	Row,
	Body,
	ListContainer,
	ItemsList,
	ItemContainer,
	PriceContainer,
	Title,
	Detail,
	Column,
} from "./ReceiptStyle";
import "./receipt.css";
import ToastBar from "../../components/ToastBar";
import FullPageLoading from "../../components/Loading/FullPageLoading";
import ReceiptProvider from "./ReceiptProvider/ReceiptProvider";
import Modals from "../../components/modal/Modals";
import InputWrapper from "../../components/input/InputWrapper";
import ButtonNLoading from "../../components/buttons/ButtonNLoading";
import {useOrderDetail} from "../../Hooks/useOrderDetail/useOrderDetail";

// Functions
import {onStripePayment} from "../../functions/Stripe";
import {useDispatch} from "react-redux";
import {updateOrderStatus} from "../../apis/Orders";

function Receipt() {
	// Initilization
	const dispatch = useDispatch();

	// From context provider
	const user = useSelector((state) => state.user?.user);

	const {orderId} = useParams();
	const {providerId} = useParams();

	const {Toast} = ToastBar();

	const history = useHistory();

	// custom hook
	const {providerDetail} = useProviderDetail(providerId);

	const [itemList, setItemList] = useState(null);
	const [stripePayLoading, setStripePayLoading] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [gratuity, setGratuity] = useState(15);
	const [gratuityError, setgratuityError] = useState("");
	const [isGratuityPositive, setIsGratuityPositive] = useState(true);

	const [totalPriceAfterGratuity, setTotalPriceAfterGratuity] = useState(0);
	const gratuityFocus = () => {
		setgratuityError("");
	};

	// UI Hooks
	const [isLoading, setIsLoading] = useState(false);
	const [whichPayment, setWhichPayment] = useState("");

	const {orderDetail} = useOrderDetail(orderId);

	const close = () => {
		setIsOpenModal(!isOpenModal);
	};

	useEffect(() => {
		let total = Number(itemList?.totalPrice) + Number(gratuity);
		setTotalPriceAfterGratuity(total.toFixed(2));
	}, [gratuity]);

	useEffect(() => {
		console.log("getreceipt orderid", orderId);
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dineIn/orders/" +
					orderId +
					"/receipt"
			)
			.then((response) => {
				console.log("Response getreceiptitem", response);
				if (response.data.success) {
					setItemList(response.data.data);
				}
			})
			.catch((error) => {
				console.log("Error getreceiptitem", error.response);
			});
	}, []);

	function printReceipt() {
		window.print();
	}

	function handleToken(token) {
		console.log({token});

		setIsOpenModal(false);
		setStripePayLoading(true);

		onStripePayment(
			token,
			totalPriceAfterGratuity,
			orderId,
			providerId,
			user,
			Toast,
			setIsOpenModal,
			setStripePayLoading,
			dispatch
		);
	}

	const goBack = () => {
		history.goBack();
	};

	const openPayWithCashModal = () => {
		let total = Number(itemList?.totalPrice) + Number(gratuity);
		setTotalPriceAfterGratuity(total.toFixed(2));
		setWhichPayment("cash");
		setIsOpenModal((prevState) => !prevState);
	};
	const openPayWithCardModal = () => {
		let total = Number(itemList?.totalPrice) + Number(gratuity);
		setTotalPriceAfterGratuity(total.toFixed(2));
		setWhichPayment("card");
		setIsOpenModal((prevState) => !prevState);
	};

	const payWithCash = () => {
		const yourDate = new Date();

		let data = {
			date: yourDate.toISOString().split("T")[0],
			time:
				yourDate.getHours() +
				":" +
				yourDate.getMinutes() +
				":" +
				yourDate.getSeconds(),
			currency: "currency",
			orderId: orderId,
			providerId: providerId,
			customerId: orderDetail?.customerId ?? orderDetail?.staffId,
			serviceProvider: "cash",
			amount: Number(totalPriceAfterGratuity) * 100,
			type: "cash",
			brand: null,
			country: null,
			transactionId: null,
		};

		console.log("Pay wit cash data ", data);
		setIsLoading((prevState) => !prevState);

		addPayment(data)
			.then((res) => {
				console.log("Response add payment", res);
				Toast("Pay by cash Save to firestore", "success");
				setIsLoading((prevState) => !prevState);
				setIsOpenModal((prevState) => !prevState);

				// Update isPaid
				updateOrderTranstionId(orderId, null)
					.then((updateRes) => {})
					.catch((updateErr) => {
						Toast("Failed to update isPaid bool", "error");
					});

				updateOrderStatus(orderId, "paid", user)
					.then((updateOrderRes) => {})
					.catch((updateOrderErr) => {
						Toast("Failed to update order status", "error");
					});
			})
			.catch((err) => {
				console.log("Error add payment", err.response);
				setIsLoading((prevState) => !prevState);
			});
	};

	return (
		<>
			{stripePayLoading ? <FullPageLoading /> : null}

			<Modals isOpen={isOpenModal} className="login__modal">
				<div className="close__modal">
					<IconButton>
						<CloseRoundedIcon onClick={close} />
					</IconButton>
				</div>
				<>
					<Row style={{width: "100%"}}>
						<Column style={{width: "100%"}}>
							<Detail>Total Price</Detail>
							{/* <Title>{itemList?.sectionIdtotalPrice?.toFixed(2)}</Title> */}
							<Title>{Number(itemList?.totalPrice).toFixed(2)}</Title>
						</Column>
						<Column style={{width: "100%"}}>
							<Detail>Gratuity</Detail>
							<Title>{gratuity}</Title>
						</Column>
						<Column style={{width: "100%"}}>
							<Detail>Total After Gratuity</Detail>
							<Title>{Number(totalPriceAfterGratuity).toFixed(2)}</Title>
						</Column>
					</Row>

					<InputWrapper
						label="Gratuity Modal"
						error={gratuityError}
						// prefixIcon={<EmailRoundedIcon />}
						onFocus={gratuityFocus}
						type="number"
						value={gratuity}
						onChangeText={(e) => {
							if (e.target.value <= -1) {
								setgratuityError("Enter positive number");
								setIsGratuityPositive(false);
								// setGratuity(e.target.value);
							} else {
								setgratuityError("");
								setIsGratuityPositive(true);
								setGratuity(e.target.value);
							}
						}}
					/>
					{isGratuityPositive ? (
						<>
							{whichPayment === "cash" ? (
								<ButtonNLoading
									onClick={payWithCash}
									title="Pay with Cash"
									color="white"
									isLoading={isLoading}
								/>
							) : whichPayment === "card" ? (
								<StripeCheckout
									stripeKey="pk_test_51InIyfAljeQoxwF8bEWEgokRJsqoam5DsBNXBdqA3NBACmVuzRyXV0YtfEELWf7zaKOdFxjYCnyktyEgOibrI0Nu0032A4LzDu"
									token={handleToken}
									name={
										providerDetail?.name +
										"," +
										providerDetail?.location
									}
								></StripeCheckout>
							) : null}
						</>
					) : null}
				</>
			</Modals>

			<ReceiptContainer>
				<Header>
					<div onClick={goBack}>
						<Tooltip content="Go Back">
							<IconButton>
								<ArrowBackIosIcon />
							</IconButton>
						</Tooltip>
					</div>

					<Row>
						<div onClick={printReceipt}>
							<Tooltip content="Print">
								<IconButton>
									<PrintRoundedIcon />
								</IconButton>
							</Tooltip>
						</div>
						<div onClick={openPayWithCashModal}>
							<Tooltip content="Pay With Cash">
								<IconButton>
									<AttachMoneyRoundedIcon />
								</IconButton>
							</Tooltip>
						</div>
						<div onClick={openPayWithCardModal}>
							<Tooltip content="Pay With Card">
								<IconButton>
									<img src={food} width="25" alt="myfood"></img>
								</IconButton>
							</Tooltip>
						</div>
					</Row>
				</Header>

				<Body className="receipt__content">
					<ReceiptProvider providerId={providerId} />
					<ListContainer>
						<Detail>
							{itemList ? "Here is your receipt" : "Loading"}{" "}
						</Detail>
						<ItemsList>
							{itemList?.items?.map((item, i) => (
								<ItemContainer key={i}>
									<Title
										style={{
											flex: "0.6",
										}}
									>
										{item.itemName ?? item.name}
									</Title>
									<Detail style={{flex: "0.2", textAlign: "end"}}>
										{item.prepLine}
									</Detail>
									<Detail style={{flex: "0.2", textAlign: "end"}}>
										{"$ "}
										{Number(item.price).toFixed(2)}
									</Detail>
								</ItemContainer>
							))}
						</ItemsList>
						<PriceContainer>
							<Row style={{width: "140px"}}>
								<Detail style={{width: "140px"}}>Tax :</Detail>
								<Row>
									<Title style={{textAlign: "end"}}>
										{Number(itemList)?.tax?.toFixed(2)}
									</Title>
									<Title> {" %"}</Title>
								</Row>
							</Row>
							<Row style={{width: "140px"}}>
								<Detail style={{width: "140px"}}>Sub Total :</Detail>
								<Row>
									<Title>{"$ "}</Title>
									<Title style={{textAlign: "end"}}>
										{Number(itemList?.subTotal).toFixed(2)}
									</Title>
								</Row>
							</Row>
							<Row style={{width: "140px"}}>
								<Detail style={{width: "140px"}}>Total :</Detail>
								<Row>
									<Title>{"$ "}</Title>
									<Title style={{textAlign: "end"}}>
										{Number(itemList?.totalPrice).toFixed(2)}
									</Title>
								</Row>
							</Row>
						</PriceContainer>
					</ListContainer>
				</Body>
			</ReceiptContainer>
		</>
	);
}

export default withRouter(Receipt);
