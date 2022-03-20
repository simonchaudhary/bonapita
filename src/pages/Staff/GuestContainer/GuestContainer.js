import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {emptyCartAction} from "../../../Redux/actions";

import ToastBar from "../../../components/ToastBar";
import {Title} from "../../../components/texts/texts";
import {PrimaryButton} from "../../../components/buttons/buttons";
import QRContainer from "./QRContainer/QRContainer";
import DineInContainer from "./DineInContainer/DineInContainer";

const GuestContainer = React.memo(
	({
		index,
		guest,
		orderList,
		areaId,
		sectionId,
		tableId,
		tableAvailable,
		callback,
		tableCallback,
	}) => {
		console.log("GuestContainer", orderList);

		// Initilization
		const history = useHistory();
		const {Toast} = ToastBar();
		const dispatch = useDispatch();

		// Redux State
		const user = useSelector((state) => state.user?.user);

		// Hooks
		const [order, setOrder] = useState(null);
		const [itemServe, setItemServe] = useState(null);

		// UI
		const [isLoading, setIsLoading] = useState(false);

		// useEffect
		useEffect(() => {
			if (orderList) {
				console.log("orderlist not null");
				// Get Guest Order
				if (orderList?.[0]?.channel === "Dine In") {
					setOrder(orderList);
					// setOrder(
					// 	orderList?.filter((item) => item.guestId === guest.guestId)
					// );
				} else {
					if (orderList?.[0]?.orderType === "combined") {
						setOrder(orderList);
						isAllItemServeQR(orderList?.[0]?.id);
					} else if (orderList?.[0]?.orderType === "split") {
						setOrder(
							orderList?.filter((item) => item.guestId === guest.guestId)
						);
						isAllItemServeQR(
							orderList?.filter(
								(item) => item.guestId === guest.guestId
							)?.[0]?.id
						);
					}
				}
			}
		}, [orderList]);

		// Functions
		const isAllItemServeQR = (orderId) => {
			axios
				.get(
					"https://us-central1-afoodie-6d649.cloudfunctions.net/qr/orders/" +
						orderId +
						"/items-served"
				)
				.then((response) => {
					console.log(
						"Response all itemStatus is served QR",
						tableId,
						response
					);
					setItemServe(response.data.data.itemsServed);
				})
				.catch((error) => {
					console.log("Error all itemStatus", error.response);
				});
		};

		const viewOrder = (guest) => {
			// Check if table have order

			axios
				.get(
					"https://us-central1-afoodie-6d649.cloudfunctions.net/dineIn/orders?area=" +
						areaId +
						"&section=" +
						sectionId +
						"&table=" +
						tableId
				)
				.then((response) => {
					console.log("Response Getorderbytable", response);
					if (response.data.success) {
						// Open Order page QR or Dine
						if (response.data.data.channel === "Dine In") {
							history.push(
								`/dineorderpage/${order?.[0]?.id}/${areaId}/${sectionId}/${tableId}/${guest.guestId}/Dine In`
							);
						} else if (response.data.data.channel === "QR code") {
							// const orderId = response.data.data.orders[0].id;
							history.push(
								`/qrorderpage/${order?.[0]?.id}/${areaId}/${sectionId}/${tableId}/${guest.guestId}/QR code`
							);
						}
					}
				})
				.catch((error) => {
					console.error("Error Getorderbytable", error.response);
				});
		};

		const viewMenu = (guest) => {
			dispatch(emptyCartAction());

			console.log(
				"viewMenu",
				user.provider,
				areaId,
				sectionId,
				tableId,
				guest
			);
			let providerIdS = `p=${user.provider}`;
			let areaIdS = `a=${areaId}`;
			let sectionIdS = `s=${sectionId}`;
			let tableIdS = `t=${tableId}`;
			let guestIdS = `g=${guest.guestId}`;
			history.push(
				`/menuliststaff/${providerIdS}/${areaIdS}/${sectionIdS}/${tableIdS}/${guestIdS}/Dine In`
			);
		};

		// Order Functions
		const pay = () => {
			console.log("Pay orderid", order?.[0]?.id, areaId, sectionId, tableId);
			history.push(
				`/receipt/${order?.[0]?.id}/${user.provider}/${areaId}/${sectionId}/${tableId}/`
			);
		};

		const closeOrder = () => {
			console.log("order id", order?.[0]?.id);

			let data = {
				orderStatus: "closed",
				updatedBy: user.uid,
			};
			console.log("data", data, order?.[0]?.id);
			axios
				.put(
					"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
						order?.[0]?.id +
						"/update-order-status",
					data
				)
				.then((res) => {
					console.log("Response updateorderstatus to close", res);
					Toast("Ordered Closed", "success");
					callback();
				})
				.catch((err) => {
					console.error("Error closeorder", err.response);
					Toast(err.response.data.data, "error");
				});
		};

		const archiveOrder = () => {
			console.log("Order Id", order?.[0]?.id);
			setIsLoading(true);
			// axios
			// 	.post(
			// 		"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
			// 			order?.[0]?.id +
			// 			"/archive"
			// 	)
			// 	.then((res) => {
			// 		console.log("Response Order Archive", res);
			// 		setIsLoading(false);
			// 		Toast("Order Archive", "success");
			// 		tableCallback();
			// 	})
			// 	.catch((err) => {
			// 		setIsLoading(false);
			// 		console.error("Error Order Archive", err);
			// 	});
			let orderId = order?.[0]?.id;
			let tablePath = order?.[0].table;

			axios
				.post(
					`https://us-central1-afoodie-6d649.cloudfunctions.net/dineIn/orders/${orderId}/archive?tablePath=${tablePath}`
				)
				.then((res) => {
					console.log("Response  Order Archive", res);
					// setIsLoading(false);
					// Toast("Order Archive", "success");
					// setUpdateTable(!updateTable);
					// console.log("Response Order Archive", res);
					setIsLoading(false);
					Toast("Order Archive", "success");
					tableCallback();
				})
				.catch((err) => {
					setIsLoading(false);
					console.error("Error Order Archive", err.response);
				});
		};

		const acceptOrder = () => {
			const data = {
				orderStatus: "accepted",
				updatedBy: user.uid,
			};
			axios
				.put(
					"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
						order?.[0]?.id +
						"/update-order-status",
					data
				)
				.then((response) => {
					console.log("Response updateorderstatus", response);
					Toast("Order Has been Accepted", "success");
					callback();
				})
				.catch((err) => {
					console.error("Error updateorderstatus", err.response);
				});
		};

		// Boolean
		const isCombineGuest1 =
			order?.[0]?.orderType === "combined" && index === 0; //ordertype combined and first guest
		const isSplit = order?.[0]?.orderType === "split"; //ordertype split
		const isSplitCombinedPayGuest1 =
			isSplit && orderList?.[0]?.payType === "combinedPay" && index === 0; //ordertype split and combinedpay
		const isSplitSplitPay = isSplit && orderList?.[0]?.payType === "splitPay"; //ordertype split and splitpay

		// Show View Menu
		const hasNoOrderTable = order?.length === 0 && tableAvailable; //if there is no order and tableAbailable
		const hasNoOrderListTable = !orderList && tableAvailable; //if there is no order and tableAbailable

		return (
			<Guest>
				<Row>
					<Title style={{width: "auto"}}>
						{guest.guestName}
						{/* <span style={{ border: "1px solid #d65a31" }}></span> */}
					</Title>
					{isCombineGuest1 ||
					isSplitCombinedPayGuest1 ||
					isSplitSplitPay ? (
						<Detail
							style={{
								width: "auto",
								marginLeft: "0.25rem",
								padding: "0.2rem 0.25rem",
								borderRadius: "0.2rem",
								color: "#d65a31",
								background: "#faede9",
								textTransform: "capitalize",
							}}
						>
							{order?.[0]?.orderStatus}
						</Detail>
					) : null}
				</Row>
				<Horizontal />

				{/* QR code */}
				{order?.[0]?.channel === "QR code" || !orderList ? (
					<QRContainer
						order={order}
						tableAvailable={tableAvailable}
						viewOrder={viewOrder}
						guest={guest}
						itemServe={itemServe}
						closeOrder={closeOrder}
						archiveOrder={archiveOrder}
						index={index}
						pay={pay}
						orderList={orderList}
						isLoading={isLoading}
						acceptOrder={acceptOrder}
					/>
				) : null}

				{/* View Menu */}
				{hasNoOrderTable || hasNoOrderListTable ? (
					<PrimaryButton onClick={() => viewMenu(guest)}>
						View Menu
					</PrimaryButton>
				) : null}

				{/* Dine In */}
				{order?.[0]?.channel === "Dine In" ? (
					<DineInContainer
						order={order}
						viewOrder={viewOrder}
						guest={guest}
					/>
				) : null}
			</Guest>
		);
	}
);

const Guest = styled.div`
	width: 200px;
	min-height: 80px;
	background: white;
	padding: 0.6rem;
	display: flex;
	flex-direction: column;
	border-radius: 0.6rem;
	margin-right: 0.875rem;
	margin-bottom: 0.4rem;
	/* margin-bottom: 0.6rem; */
	color: #d65a31;
	@media only screen and (min-width: 100px) and (max-width: 480px) {
		width: 100px;
		padding: 0.4rem;
		border-radius: 0.4rem;
		margin-right: 0.4rem;
		margin-bottom: 0.4rem;
	}
`;
const Horizontal = styled.div`
	width: 100%;
	height: 0.6rem;

	@media only screen and (min-width: 100px) and (max-width: 480px) {
		height: 0.4rem;
	}
`;
const Row = styled.div`
	display: flex;
	align-items: center;
`;
const Detail = styled.p`
	font-size: 0.675rem;
	color: black;
	width: auto;
	font-weight: 500;
	text-transform: capitalize;
	margin-right: 0.5rem;
	padding: 0.125rem 0.5rem;
	border-radius: 0.2rem;
	background: blue;
	color: white;
`;
export default GuestContainer;

// import { useState, useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import styled from "styled-components";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { v4 as uuidv4 } from "uuid";
// import { useDispatch } from "react-redux";
// import { addCartAction } from "../../Redux/actions";

// import ToastBar from "../../components/ToastBar";
// import { Title } from "../../components/texts/texts";
// import {
// 	PrimaryButton,
// 	SecondaryButton,
// } from "../../components/buttons/buttons";
// import ButtonNLoading from "../../components/buttons/ButtonNLoading";
// function GuestContainer({
// 	guest,
// 	orderFound,
// 	viewOrder,
// 	areaId,
// 	sectionId,
// 	tableId,
// }) {
// 	const user = useSelector((state) => state.user?.user);

// 	const [isLoading, setIsLoading] = useState(false);
// 	const { Toast } = ToastBar();
// 	const history = useHistory();

// 	// Function
// 	const createOrderForTable = (guest) => {
// 		setIsLoading(true);

// 		const data = {
// 			staffId: user.uid,
// 			providerId: user.provider,
// 			channel: "Dine In",
// 			area: areaId,
// 			section: sectionId,
// 			table: tableId,
// 			deliveryMode:
// 				"to be delivered by third party, to be delivered by the provider, customer will pickup",
// 			items: [],
// 			orderStatus: "submit",
// 		};
// 		console.log("data", data);
// 		axios
// 			.post(
// 				"https://us-central1-afoodie-6d649.cloudfunctions.net/dineIn/orders",
// 				data
// 			)
// 			.then((response) => {
// 				console.log("Response Dine in OrderCreated", response);
// 				if (response.data.success) {
// 					let orderId = response.data.data.id;
// 					setIsLoading(false);
// 					history.push(
// 						`/orderpage/${orderId}/${tableId}/${guest.guestId}/Dine In`
// 					);
// 					Toast("Order Created", "success");
// 				}
// 			})
// 			.catch((error) => {
// 				console.log("Error Dine in Order added", error);
// 				setIsLoading(false);
// 			});
// 	};

// 	const viewMenu = (guest) => {
// 		console.log("viewMenu", user.provider, areaId, sectionId, tableId, guest);

// 		let providerIdS = `p=${user.provider}`;
// 		let areaIdS = `a=${areaId}`;
// 		let sectionIdS = `s=${sectionId}`;
// 		let tableIdS = `t=${tableId}`;
// 		let guestIdS = `g=${guest.guestId}`;
// 		history.push(
// 			`/menulist/${providerIdS}/${areaIdS}/${sectionIdS}/${tableIdS}/${guestIdS}`
// 		);
// 	};

// 	return (
// 		<Guest>
// 			<Title>{guest.guestName}</Title>
// 			<Horizontal />
// 			{orderFound === null ? (
// 				<p>loading</p>
// 			) : (
// 				<>
// 					{orderFound ? (
// 						<SecondaryButton onClick={() => viewOrder(guest)}>
// 							View Order
// 						</SecondaryButton>
// 					) : (
// 						// <button>order</button>
// 						// <ButtonNLoading
// 						// 	onClick={() => createOrderForTable(guest)}
// 						// 	title="Order"
// 						// 	color="white"
// 						// 	isLoading={isLoading}
// 						// />
// 						<PrimaryButton onClick={() => viewMenu(guest)}>
// 							View Menu
// 						</PrimaryButton>
// 					)}
// 				</>
// 			)}
// 		</Guest>
// 	);
// }

// const Guest = styled.div`
// 	width: 200px;
// 	background: white;
// 	padding: 0.6rem;
// 	display: flex;
// 	flex-direction: column;
// 	border-radius: 0.6rem;
// 	margin-right: 0.875rem;
// 	/* margin-bottom: 0.6rem; */
// 	color: #d65a31;
// 	@media only screen and (min-width: 100px) and (max-width: 480px) {
// 		width: 100px;
// 		padding: 0.4rem;
// 		border-radius: 0.4rem;
// 		margin-right: 0.4rem;
// 		margin-bottom: 0.4rem;
// 	}
// `;
// const Horizontal = styled.div`
// 	width: 100%;
// 	height: 0.6rem;

// 	@media only screen and (min-width: 100px) and (max-width: 480px) {
// 		height: 0.4rem;
// 	}
// `;
// export default GuestContainer;
