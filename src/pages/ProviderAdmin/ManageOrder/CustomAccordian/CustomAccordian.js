import React, {useState} from "react";

import {useSelector} from "react-redux";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";
import axios from "axios";

// Functions
import {redirectBaseURL} from "../../../../apis/baseURL";

// Icons
import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

// Components
import {
	ItemList,
	ItemContainer,
	ItemContainerLeft,
	ItemContainerCenter,
	ItemContainerRight,
	OrderDetailModal,
	Row,
	Column,
} from "./CustomAccordianStyle";
import {Title, Detail} from "../../../../components/texts/texts";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";
import {Horizontal, Vertical} from "../../../../components/elements/elements";
import ToastBar from "../../../../components/ToastBar";
import InputWrapper from "../../../../components/input/InputWrapper";
import Modals from "../../../../components/modal/Modals";
import {sendReviewNotification} from "../../../../apis/Notification";

const CustomAccordian = ({parentCallBack, title, items}) => {
	console.log("Custom Accordian ", items);

	// Redux State
	const user = useSelector((state) => state.user.user);
	const smsEnable = useSelector(
		(state) => state.user?.providerDetail?.data?.providerDetail?.smsEnable
	);

	const [selectedOrder, setSelectedOrder] = useState(null);
	const [orderHistory, setOrderHistory] = useState(null);
	const [isAllItemServedDineIn, setIsAllItemServedDineIn] = useState(false);
	const [isAllItemServedQR, setIsAllItemServedQR] = useState(false);

	// SelectedOrder item

	const {Toast} = ToastBar();
	const [isLoading, setIsLoading] = useState(false);

	const [reviewMessage, setReviewMessage] = useState("");
	const [reviewMessageError, setReviewMessageError] = useState("");
	const reviewMessageFocus = () => {
		setReviewMessageError("");
	};

	const [isOpenModal, setIsOpenModal] = useState(false);
	const close = () => {
		setIsOpenModal(!isOpenModal);
		setIsLoading(false);
		parentCallBack();
	};

	const openOrder = (item) => {
		console.log("Open", item);
		let totalPrice = 0;
		item.orderedItems.map((item) => {
			// totalPrice = Number(item.price) + totalPrice;
			let tax = item?.tax?.replace("%", "");
			let taxAmount = Number(item.price) * (Number(tax) / 100);
			totalPrice = taxAmount + totalPrice + Number(item.price);
			return totalPrice;
		});
		console.log("totalPrice", totalPrice);
		let data = {
			...item,
			subTotal: item.totalPrice,
			totalPrice: totalPrice,
		};
		setSelectedOrder(data);
		if (title === "ready") {
			if (item.channel === "Dine In") {
				checkIfAllItemServedDineIn(item.id);
			} else if (item.channel === "QR code") {
				checkIfAllItemServedQR(item.id);
			}
		}
		setIsOpenModal(!isOpenModal);
	};

	const checkIfAllItemServedQR = (orderId) => {
		setIsAllItemServedQR(null);
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/qr/orders/" +
					orderId +
					"/items-served"
			)
			.then((res) => {
				console.log("Response checkAllItemServed QR", res);
				if (res.data.success) {
					setIsAllItemServedQR(res.data.data.itemsServed);
				}
			})
			.catch((err) => {
				console.error("Error checkAllItemServed", err.response);
			});
	};
	const checkIfAllItemServedDineIn = (orderId) => {
		setIsAllItemServedDineIn(null);
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dineIn/orders/" +
					orderId +
					"/items-served"
			)
			.then((res) => {
				console.log("Response checkAllItemServed Dine In", res);
				if (res.data.success) {
					setIsAllItemServedDineIn(res.data.data.itemsServed);
				}
			})
			.catch((err) => {
				console.error("Error checkAllItemServed", err.response);
			});
	};

	const [isLoadingReview, setIsLoadingReview] = useState(false);

	// Api function
	const sendReview = () => {
		// alert("hdkfhdkfh;dlfh;alkdsfh;lakhdf");

		if (reviewMessage === "") {
			setReviewMessageError("Field required");
		} else {
			setIsLoadingReview(true);

			let orderLink = "revieworder/";
			const link =
				redirectBaseURL +
				orderLink +
				user?.provider +
				"/" +
				selectedOrder.id +
				"/" +
				selectedOrder.channel;
			const newLink = link.replaceAll(" ", "%20");
			const dataMessage =
				"Please review this  " + reviewMessage + " Click Link " + newLink;
			const data = {
				customerId: selectedOrder.customerId,
				message: dataMessage,
				type: "notification",
			};
			console.log("Review Data", data);
			sendReviewNotification(selectedOrder.customerId, data).then((res) => {
				console.log("Response", res);
			});
			axios
				.post(
					"https://us-central1-afoodie-6d649.cloudfunctions.net/notification/send-email",
					data
				)
				.then((response) => {
					console.log("Response review", response);
					if (response.data.success) {
						let datas = {
							phoneNumber: "+9779849920341",
							message: dataMessage,
						};
						if (smsEnable) {
							axios
								.post(
									"https://us-central1-afoodie-6d649.cloudfunctions.net/sms/send",
									datas
								)
								.then((response) => {
									console.log("Response sms", response);
								})
								.catch((error) => {
									console.log("Error sms", error.response);
									setIsLoading(true);
								});
						}
						changeOrderStatus();
					}
				})
				.catch((error) => {
					console.log("Error review", error.response);
					setIsLoading(false);
				});
		}
	};
	const acceptOrder = () => {
		const data = {
			orderStatus: "accepted",
			updatedBy: user.uid,
		};
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					selectedOrder.id +
					"/update-order-status",
				data
			)
			.then((response) => {
				console.log("Response updateorderstatus", response);
				setIsOpenModal(!isOpenModal);
				parentCallBack();
				Toast("Order Has been Accepted", "success");
			})
			.catch((err) => {
				console.error("Error updateorderstatus", err.response);
			});
	};

	const changeOrderStatus = () => {
		// Change order status to customer review
		const datas = {
			orderStatus: "customer review",
			updatedBy: user.uid,
		};
		console.log("data", datas);
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					selectedOrder.id +
					"/update-order-status",
				datas
			)
			.then((response) => {
				console.log("response customer review order", response);
				if (response.data.success) {
					setIsLoading(false);
					setIsOpenModal(!isOpenModal);
					Toast("Review Send", "success");
					parentCallBack();
				}
			})
			.catch((error) => {
				console.error("Error review", error.response);
				setIsLoading(false);
			});
	};

	const [isLoadingCancel, setIsLoadingCancel] = useState(false);

	const cancelOrderButton = () => {
		console.log("cancel order", selectedOrder);
		setIsLoadingCancel(true);
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/stripe/" +
					selectedOrder.transactionId +
					"/refund"
			)
			.then((res) => {
				console.log("Response canceltrancaction", res);
				updateOrderStatusToCancelled();
			})
			.catch((err) => {
				console.error("Error canceltrancaction", err);
				setIsLoadingCancel(false);
			});
	};

	const updateOrderStatusToCancelled = () => {
		setIsLoadingCancel(true);
		const data = {
			orderStatus: "cancelled",
			updatedBy: user.uid,
		};
		console.log("order id", selectedOrder.id);
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					selectedOrder.id +
					"/update-order-status",
				data
			)
			.then((response) => {
				console.log("Response updateorderstatus", response);
				setIsOpenModal(!isOpenModal);
				parentCallBack();
				Toast("Order Cancel", "success");
				setIsLoadingCancel(false);
			})
			.catch((err) => {
				console.error("Error updateorderstatus", err.response);
				setIsLoadingCancel(false);
			});
	};

	const showHistory = (item) => {
		setIsOpenModal(true);
		console.log("order Performance", item);
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/history/" +
					item.id
			)
			.then((response) => {
				console.log("Response getHistory", response);
				// setHistoryDetail(response.data.data);
				setOrderHistory(response.data.data);
			})
			.catch((err) => {
				console.error("Error getHistory", err.response);
			});
	};

	const orderClosed = () => {
		setIsLoading(true);
		console.log("order id", selectedOrder.id);

		let data = {
			orderStatus: "closed",
			updatedBy: user.uid,
		};
		console.log("data", data);
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					selectedOrder.id +
					"/update-order-status",
				data
			)
			.then((res) => {
				console.log("Response updateorderstatus to close", res);
				parentCallBack();
				setIsLoading(false);
				setIsOpenModal(false);
				Toast("Ordered Closed", "success");
			})
			.catch((err) => {
				console.error("Error closeorder", err.response);
				Toast(err.response.data.data, "error");
				setIsLoading(false);
				setIsOpenModal(false);
			});
	};

	const orderArchive = () => {
		console.log(selectedOrder.id);
		setIsLoading(true);
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					selectedOrder.id +
					"/archive"
			)
			.then((res) => {
				console.log("Response Order Archive", res);
				setIsLoading(false);
				Toast("Order Archive", "success");
				parentCallBack();
				setIsOpenModal(false);
			})
			.catch((err) => {
				setIsLoading(false);
				console.error("Error Order Archive", err.response);
			});
	};

	return (
		<>
			<Modals isOpen={isOpenModal} className="orderdetail__modal">
				<div className="close__modal">
					<IconButton>
						<CloseRoundedIcon onClick={close} />
					</IconButton>
				</div>
				<h3
					style={{
						width: "100%",
						textAlign: "center",
						marginBottom: "0.875rem",
						// background: "red",
					}}
				>
					{title}
				</h3>
				{title === "order performance" ? (
					<div style={{height: "60vh", overflowY: "auto"}}>
						<h3>History</h3>
						<Horizontal />
						<Column>
							<Detail>Created On</Detail>
							<Title>
								{orderHistory ? orderHistory?.createdOn : ". . . ."}
							</Title>
						</Column>
						<Horizontal />
						<Column>
							<Detail>Created By</Detail>
							<Title>
								{orderHistory ? orderHistory?.createdBy : ". . . ."}
							</Title>
						</Column>
						<Horizontal />
						<Column>
							<Detail>Accepted On</Detail>
							<Title>
								{" "}
								{orderHistory ? orderHistory?.acceptedOn : ". . . ."}
							</Title>
						</Column>
						<Horizontal />
						<Column>
							<Detail>Accepted By</Detail>
							<Title>
								{orderHistory ? orderHistory?.acceptedBy : ". . . ."}
							</Title>
						</Column>
						<Horizontal />
						<Column>
							<Detail>Paid By</Detail>
							<Title>
								{orderHistory ? orderHistory?.paidBy : ". . . ."}
							</Title>
						</Column>
						<Horizontal />
						<Column>
							<Detail>Paid On</Detail>
							<Title>
								{orderHistory ? orderHistory?.paidOn : ". . . ."}
							</Title>
						</Column>
						<Horizontal />
					</div>
				) : (
					<OrderDetailModal>
						<div style={{marginBottom: "0.75rem"}}>
							<Detail>Order Id</Detail>
							<Title>{selectedOrder?.id}</Title>
						</div>
						<Row>
							<div style={{width: "40%"}}>
								<Detail>Name</Detail>
								{selectedOrder?.channel === "Dine In" ? (
									<Title>{selectedOrder?.staffName} </Title>
								) : (
									<Title>{selectedOrder?.customerName}</Title>
								)}
							</div>
							<div style={{width: "27%"}}>
								<Detail>Sub Total</Detail>
								<Title>
									{"$"} {Number(selectedOrder?.subTotal).toFixed(2)}
								</Title>
							</div>
							<div>
								<Detail>Total Price</Detail>
								<Title>
									{"$"} {Number(selectedOrder?.totalPrice).toFixed(2)}
								</Title>
							</div>
						</Row>
						<Horizontal />
						{selectedOrder?.orderedItems.length !== 0 ? (
							<Detail style={{marginBottom: "0.6rem"}}>Items</Detail>
						) : (
							<Detail style={{marginBottom: "0.6rem"}}>Empty</Detail>
						)}
						<ItemList style={{padding: "0rem", height: "220px"}}>
							{selectedOrder?.orderedItems.map((item, i) => (
								<Item
									key={i}
									item={item}
									selectedOrder={selectedOrder}
									title={title}
								/>
							))}
						</ItemList>
						<Horizontal />
						{title === "paid" || title === "submit" ? (
							<Column>
								<Row>
									<InputWrapper
										style={{marginBottom: "0rem"}}
										label="Review Message"
										error={reviewMessageError}
										onFocus={reviewMessageFocus}
										type="text"
										value={reviewMessage}
										onChangeText={(e) =>
											setReviewMessage(e.target.value)
										}
									/>
									<Vertical />
									<ButtonNLoading
										onClick={sendReview}
										title="Send Review"
										color="white"
										isLoading={isLoadingReview}
									/>
								</Row>

								<Row>
									<ButtonNLoading
										onClick={
											title === "submit"
												? updateOrderStatusToCancelled
												: cancelOrderButton
										}
										title="Cancel"
										color="white"
										isLoading={isLoadingCancel}
									/>
									<Vertical />

									<ButtonNLoading
										onClick={acceptOrder}
										title="Accept"
										color="white"
										isLoading={isLoading}
									/>
								</Row>
							</Column>
						) : title === "served" || title === "picked up" ? (
							<Column style={{alignItems: "center"}}>
								<ButtonNLoading
									color="white"
									title="Close"
									onClick={orderClosed}
									isLoading={isLoading}
								/>
							</Column>
						) : title === "closed" ? (
							<ButtonNLoading
								color="white"
								title="Archive"
								onClick={orderArchive}
								isLoading={isLoading}
							/>
						) : null}
					</OrderDetailModal>
				)}
			</Modals>

			<Accordion allowZeroExpanded style={{margin: "0rem"}}>
				<AccordionItem>
					<AccordionItemHeading>
						<AccordionItemButton style={{textTransform: "capitalize"}}>
							{title}
						</AccordionItemButton>
					</AccordionItemHeading>
					<AccordionItemPanel style={{padding: "0rem"}}>
						<ItemList>
							{items === undefined ? (
								<p style={{textAlign: "center"}}>Loading</p>
							) : (
								<>
									{items?.map((item, i) => (
										<ItemContainer
											key={i}
											onClick={() =>
												title === "order performance"
													? showHistory(item)
													: openOrder(item)
											}
										>
											<ItemContainerLeft>
												<Detail>Name</Detail>
												{item.channel === "Dine In" ? (
													<Title>{item.staffName}</Title>
												) : (
													<Title>{item.customerName}</Title>
												)}
											</ItemContainerLeft>
											<ItemContainerCenter>
												<Detail>Channel</Detail>
												<Title>{item.channel}</Title>
											</ItemContainerCenter>
											<ItemContainerRight>
												<Detail>Sub Total</Detail>
												<Title>
													{"$"} {item.totalPrice}
												</Title>
											</ItemContainerRight>
										</ItemContainer>
									))}
								</>
							)}
						</ItemList>
					</AccordionItemPanel>
				</AccordionItem>
			</Accordion>
		</>
	);
};

const Item = ({item, selectedOrder, title}) => {
	const {Toast} = ToastBar();

	const [newStatus, setNewStatus] = useState(item.itemStatus);

	const itemPickup = (item) => {
		console.log(item);

		const data = {
			itemStatus: "picked up",
			id: item.id,
		};
		console.log("datadata", data, "order id", selectedOrder.id);
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					selectedOrder.id +
					"/update-item-status",
				data
			)
			.then((response) => {
				console.log("Update result", response);
				Toast("ItemStatus Update to picked up", "success");
				setNewStatus("served");
			});
	};

	return (
		<ItemContainer>
			<ItemContainerLeft>
				<Title>{item.itemName ?? item.name}</Title>
			</ItemContainerLeft>
			<ItemContainerCenter style={{width: "80px"}}>
				<Title>{item.tax}</Title>
			</ItemContainerCenter>
			<ItemContainerRight style={{marginRight: "0.75rem"}}>
				<Title>
					{"$"} {item.price}
				</Title>
			</ItemContainerRight>
			{title === "ready" ? (
				<>
					{selectedOrder?.channel === "Customer" ? (
						<>
							{newStatus === "ready" ? (
								<button
									onClick={() => itemPickup(item)}
									className="text-xs font-normal border border-gray-200 rounded-lg px-2 py-1 hover:bg-primary hover:text-white"
								>
									Pickup
								</button>
							) : null}
						</>
					) : null}
				</>
			) : null}
		</ItemContainer>
	);
};

export default CustomAccordian;
