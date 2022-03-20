import React, {useEffect, useState} from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

// Icons
import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import {useSelector} from "react-redux";

// Custom Hooks
import {useProviderDetail} from "../../../../Hooks/useProvider/useProvider";

// Functions
import {firestore} from "../../../../config/firebaseConfig";

// Components
import {
	OrderedItemV2Container,
	Header,
	Body,
	ItemList,
	MenuContainer,
	Row,
	Column,
} from "./OrderedItemV2Style";

import FullPageLoading from "../../../../components/Loading/FullPageLoading";
import {Title, Detail} from "../../../../components/texts/texts";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";
import ItemContainer from "./ItemContainer/ItemContainer";
import InputWrapper from "../../../../components/input/InputWrapper";
import {PrimaryButton} from "../../../../components/buttons/buttons";
import ToastBar from "../../../../components/ToastBar";
import Modals from "../../../../components/modal/Modals";

const OrderedItemV2 = React.memo(({orderId, providerId, channel}) => {
	console.log("OrderedItemV2");

	// Initilization
	const {Toast} = ToastBar();

	// Redux State
	const user = useSelector((state) => state.user?.user);
	const QR = useSelector((state) => state.QR);

	// Hooks
	const [totalPrice, setTotalPrice] = useState(0);
	const [orderedItemList, setOrderedItemList] = useState(null);
	const [orderDetails, setOrderDetails] = useState(null);
	const [realTimeOrderStatus, setRealTimeOrderStatus] = useState(null);
	const [specialInstruction, setSpecialInstruction] = useState("");
	const [specialInstructionError, setSpecialInstructionError] = useState("");
	const [selectedItem, setSelectedItem] = useState(null);

	const [gratuity, setGratuity] = useState(15);
	const [gratuityError, setgratuityError] = useState("");
	const [isGratuityPositive, setIsGratuityPositive] = useState(true);

	const [totalPriceAfterGratuity, setTotalPriceAfterGratuity] = useState(0);
	const gratuityFocus = () => {
		setgratuityError("");
	};

	// custom hook
	const {providerDetail} = useProviderDetail(providerId);

	// UI
	const [stripePayLoading, setStripePayLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [whichModal, setWhichModal] = useState("specialInstruction");
	const [isUpdateOrderedItem, setIsUpdateOrderedItem] = useState(false);

	const specialInstructionFocus = () => {
		setSpecialInstructionError("");
	};

	const close = () => {
		setIsOpenModal(!isOpenModal);
		setIsLoading(false);
	};

	// UseEffect
	useEffect(() => {
		getOrderItem();
	}, [isUpdateOrderedItem]);

	const getOrderItem = () => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					orderId +
					"/ordered-items"
			)
			.then((res) => {
				console.log("Response getordereditem", res);
				if (res.data.success) {
					displayByRank(res.data.data?.items);
					setTotalPrice(res?.data?.data?.totalPrice);
					// let totalPrice = 0;
					// response.data?.data?.items.map((item, i) => {
					// 	totalPrice = totalPrice + Number(item.price);
					// });
					// setTotalPrice(totalPrice);
					// //
					// // displayByRank(response.data.data);
					// setOrderedItems(response.data.data);
				}
			})
			.catch((error) => {
				console.log("Error getordereditem", error);
			});
	};

	const displayByRank = (items) => {
		let vegAppetizers = [];
		let nonVegAppetizers = [];
		let soupSaladList = [];
		let preFixedMeal = [];
		let vegetarianDelicacies = [];
		let chickenDelicacies = [];
		let lambDelicacies = [];
		let seafoodDelicacies = [];
		let tandooriSizzlers = [];
		let riceVarieties = [];
		let naanVarieties = [];
		let desserts = [];
		let sides = [];
		let drinks = [];

		items?.map((item, i) => {
			if (item.displayRank === 1) {
				vegAppetizers.push(item);
			} else if (item.displayRank === 2) {
				nonVegAppetizers.push(item);
			} else if (item.displayRank === 3) {
				soupSaladList.push(item);
			} else if (item.displayRank === 4) {
				preFixedMeal.push(item);
			} else if (item.displayRank === 5) {
				vegetarianDelicacies.push(item);
			} else if (item.displayRank === 6) {
				chickenDelicacies.push(item);
			} else if (item.displayRank === 7) {
				lambDelicacies.push(item);
			} else if (item.displayRank === 8) {
				seafoodDelicacies.push(item);
			} else if (item.displayRank === 9) {
				tandooriSizzlers.push(item);
			} else if (item.displayRank === 10) {
				riceVarieties.push(item);
			} else if (item.displayRank === 11) {
				naanVarieties.push(item);
			} else if (item.displayRank === 12) {
				desserts.push(item);
			} else if (item.displayRank === 13) {
				sides.push(item);
			} else if (item.displayRank > 13) {
				drinks.push(item);
			}
		});

		let menuList = [
			{
				submenu: "Veg appetizers",
				items: vegAppetizers,
			},
			{
				submenu: "Non-veg appetizers",
				items: nonVegAppetizers,
			},
			{
				submenu: "Soup and salad",
				items: soupSaladList,
			},
			{
				submenu: "Pre-fixed meal (dine-in only)",
				items: preFixedMeal,
			},
			{
				submenu: "Vegetarian delicacies",
				items: vegetarianDelicacies,
			},
			{
				submenu: "Chicken delicacies",
				items: chickenDelicacies,
			},
			{
				submenu: "Lamb delicacies",
				items: lambDelicacies,
			},
			{
				submenu: "Seafood delicacies",
				items: seafoodDelicacies,
			},
			{
				submenu: "Tandoori sizzlers",
				items: tandooriSizzlers,
			},
			{
				submenu: "Rice varieties",
				items: riceVarieties,
			},
			{
				submenu: "Naan varieties",
				items: naanVarieties,
			},
			{
				submenu: "Desserts",
				items: desserts,
			},
			{
				submenu: "Sides",
				items: sides,
			},
			{
				submenu: "Drinks",
				items: drinks,
			},
		];

		let data = {
			totaItems: items.length,
			menus: menuList,
		};

		console.log("Data", data);
		setOrderedItemList(data);
	};

	useEffect(() => {
		let total = Number(totalPrice) + (Number(gratuity) / 100) * totalPrice;
		setTotalPriceAfterGratuity(total);
	}, [gratuity]);

	// OrderStatus
	useEffect(() => {
		console.log("Order Status Listener");
		firestore
			.collection("Orders")
			.doc(orderId)
			.onSnapshot((doc) => {
				console.log("Order Status Listener Current data: ", doc?.data());
				setOrderDetails(doc?.data());
				setRealTimeOrderStatus(doc?.data()?.orderStatus);
				// setRealTimeItemStatus(doc?.data()?.itemStatus);
			});
	}, []);

	const editSpecial = (item) => {
		console.log(item);
		setSpecialInstruction("");
		setSelectedItem(item);
		setIsOpenModal(true);
	};
	const addItem = (item) => {
		console.log("orderOrdered item", item);
		const data = {
			itemName: item.itemName,
			itemId: item.itemId,
			price: item.price,
			itemStatus: "new",
			prepLine: item.prepLine,
			specialInstruction: "here are some instructions",
			tax: item.tax,
			displayRank: item.displayRank,
		};
		console.log("order now", data, orderId);
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					orderId +
					"/add-item",
				data
			)
			.then((response) => {
				if (response.data.success) {
					console.log("Response additeminorder", response);
					Toast(item.itemName + " Ordered Successfully", "success");
					const addItem = (item) => {
						console.log("orderOrdered item", item);
						const data = {
							itemName: item.itemName,
							itemId: item.itemId,
							price: item.price,
							itemStatus: "new",
							prepLine: item.prepLine,
							specialInstruction: "here are some instructions",
							tax: item.tax,
							displayRank: item.displayRank,
						};
						console.log("order now", data, orderId);
						axios
							.post(
								"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
									orderId +
									"/add-item",
								data
							)
							.then((response) => {
								if (response.data.success) {
									console.log("Response additeminorder", response);
									Toast(
										item.itemName + " Ordered Successfully",
										"success"
									);
									setIsUpdateOrderedItem(!isUpdateOrderedItem);
								}
							})
							.catch((error) => {
								console.log("Error additeminorder", error);
							});
					};
				}
			})
			.catch((error) => {
				console.log("Error additeminorder", error);
			});
	};
	const deleteItem = (item) => {
		console.log(item);
	};

	const deleteItemReal = (item) => {
		console.log(item);
		setIsLoading(true);
		console.log("delete", orderId, item.id);
		axios
			.delete(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					orderId +
					"/delete-item?id=" +
					selectedItem.id
			)
			.then((response) => {
				if (response.data.success) {
					console.log("Response deleteitemfromorder ", response);
					setIsLoading(false);
					Toast(selectedItem.itemName + " delete Successfully", "success");
					setIsUpdateOrderedItem(!isUpdateOrderedItem);
					setIsOpenModal(false);
				}
			})
			.catch((error) => {
				console.log("Error deleteitemfromorder", error);
				setIsLoading(false);
			});
	};

	const specialInstructionDone = () => {
		console.log("SpecialInstruction", orderId);
		if (specialInstruction === "") {
			setSpecialInstructionError("Field cant be empty");
		} else {
			const data = {
				specialInstruction: specialInstruction,
				id: selectedItem.id,
			};
			console.log("special", data);
			axios
				.put(
					"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
						orderId +
						"/special-instruction",
					data
				)
				.then((response) => {
					console.log("Response Specialinstruction", response);
					if (response.data.success) {
						Toast("Special Instruction Added", "success");
						setIsOpenModal(!isOpenModal);
						// To get latest list of ordered item
						setIsUpdateOrderedItem(!isUpdateOrderedItem);
					}
				})
				.catch((error) => {
					console.log("Error specialinsruction", error);
				});
		}
	};

	// const updateOrderStatus = () => {
	// 	const data = {
	// 		orderStatus: "paid",
	// 		updatedBy: user.email,
	// 	};
	// 	console.log("update order status data", data);
	// 	axios
	// 		.put(
	// 			"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
	// 				orderId +
	// 				"/update-order-status",
	// 			data
	// 		)
	// 		.then((response) => {
	// 			console.log("Response updateorderstatus", response);
	// 			if (response.data.success) {
	// 				// dispatch(saveQRDetailAction(null));
	// 				// setStripePayLoading(false);
	// 				// setIsLoading(false);
	// 				Toast("Order has been Paid", "success");

	// 				// history.replace("/home/customer");
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.log("Error updateorderstatus", error);
	// 			// setStripePayLoading(false);
	// 		});
	// };

	// Stripe
	function handleToken(token) {
		setIsOpenModal(false);
		setWhichModal("checkoutSummaryModal");
		setStripePayLoading(true);
		stripeApi(orderId, token);
	}

	const stripeApi = (orderId, token) => {
		console.log("stripeApi", token);
		let data = {
			stripeToken: token.id,
			amount: parseInt(totalPrice * 100),
			orderId: orderId,
			providerId: providerId,
			customerId: user.uid,
			email: token.email,
		};
		console.log("strip api data", data);
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/stripe/charge",
				data
			)
			.then((response) => {
				console.log("Response Stripe Pay", response);
				if (response.data.success) {
					stripPayment(response.data.data.paymentData, orderId);
				}
			})
			.catch((err) => {
				console.error("Error Stripe Pay", err.response);
				setStripePayLoading(false);
				// setIsLoading(false);
			});
	};

	const stripPayment = (paymentData, orderId) => {
		const data = {
			payment: paymentData,
		};
		console.log("stripe payment data", data);
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/payments",
				data
			)
			.then((response) => {
				console.log("Response add Strip Payment", response);
				if (response.data.success) {
					updateOrderStatus(orderId);
					updateOrderTranstionId(orderId, paymentData.transactionId);
				}
			})
			.catch((error) => {
				console.error("Error  add Strip Payment", error.response);
				setStripePayLoading(false);
				// setIsLoading(false);
			});
	};

	const updateOrderTranstionId = (orderId, transactionId) => {
		const data = {
			transactionId: transactionId,
			isPaid: true,
		};
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					orderId,
				data
			)
			.then((res) => {
				console.log("Response updateordertranstionid", res);
			})
			.catch((err) => {
				console.error("Response updateordertranstionid", err.response);
			});
	};

	const updateOrderStatus = (orderId) => {
		const data = {
			orderStatus: "paid",
			updatedBy: user.email,
		};
		console.log("update order status data", data);
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					orderId +
					"/update-order-status",
				data
			)
			.then((response) => {
				console.log("Response updateorderstatus", response);
				if (response.data.success) {
					// dispatch(saveQRDetailAction(null));
					setStripePayLoading(false);

					Toast("Order has been Paid", "success");
				}
			})
			.catch((error) => {
				console.log("Error updateorderstatus", error);
				setStripePayLoading(false);
			});
	};

	const addGratuity = () => {
		setWhichModal("gratuityModal");
		setGratuity(15);
		let total = Number(totalPrice) + (Number(gratuity) / 100) * totalPrice;
		setTotalPriceAfterGratuity(total);
		setIsOpenModal(true);
	};

	// Show  Pay Button
	let channelQR = orderDetails?.channel === "QR code";
	let channelCustomer = orderDetails?.channel === "Customer";

	let orderedItems = orderedItemList?.totaItems > 0;

	let orderStatusSubmitCustomerReviewAccepted =
		realTimeOrderStatus === "submit" ||
		realTimeOrderStatus === "customer review" ||
		realTimeOrderStatus === "accepted";
	let orderTypeSplit = orderDetails?.orderType === "split";
	let orderTypeCombined = orderDetails?.orderType === "combined";

	let payTypeSplitPay = orderDetails?.payType === "splitPay";
	let payTypeCombinePay = orderDetails?.payType === "combinedPay";

	// QR order Split order split pay
	let showPayQRSplitOrderSplitPay =
		orderedItems &&
		channelQR &&
		orderStatusSubmitCustomerReviewAccepted &&
		orderTypeSplit &&
		payTypeSplitPay;

	// QR order Split order combine pay
	let showPayQRSplitOrderCombinePay =
		orderedItems &&
		channelQR &&
		orderStatusSubmitCustomerReviewAccepted &&
		orderTypeSplit &&
		payTypeCombinePay &&
		QR.guestNo === 1;

	// QR order combine order
	let showPayQRCombineOrder =
		orderedItems &&
		channelQR &&
		orderStatusSubmitCustomerReviewAccepted &&
		orderTypeCombined;

	//  Customer order
	let showPayCustomer =
		orderedItems && channelCustomer && !orderDetails.isPaid;

	return (
		<>
			{stripePayLoading ? <FullPageLoading /> : null}
			<Modals isOpen={isOpenModal} className="login__modal">
				<div className="close__modal">
					<IconButton>
						<CloseRoundedIcon onClick={close} />
					</IconButton>
				</div>
				{whichModal === "specialInstruction" ? (
					<>
						<h3>{selectedItem?.itemName}</h3>
						<InputWrapper
							label="Special Instruction"
							error={specialInstructionError}
							// prefixIcon={<EmailRoundedIcon />}
							onFocus={specialInstructionFocus}
							type="text"
							value={specialInstruction}
							onChangeText={(e) => setSpecialInstruction(e.target.value)}
						/>
						<PrimaryButton onClick={specialInstructionDone}>
							Done
						</PrimaryButton>
					</>
				) : whichModal === "deleteModal" ? (
					<>
						<Title>Are you sure want to delete?</Title>
						<ButtonNLoading
							onClick={deleteItemReal}
							title="OK"
							color="white"
							isLoading={isLoading}
						/>
					</>
				) : whichModal === "gratuityModal" ? (
					<>
						<Row style={{width: "100%"}}>
							<Column style={{width: "100%"}}>
								{/* <Detail>Total Price</Detail>
								<Title>{totalPrice?.toFixed(2)}</Title> */}
								{/* <Detail>Sub Total</Detail>
								<Title>{Number(subTotal)?.toFixed(2)}</Title> */}
							</Column>
							<Column style={{width: "100%"}}>
								<Detail>Gratuity</Detail>
								<Title>{gratuity}%</Title>
							</Column>
							<Column style={{width: "100%"}}>
								{/* <Detail>Total After Gratuity</Detail>
								<Title>{totalPriceAfterGratuity.toFixed(2)}</Title> */}
								<Detail>Total Price</Detail>
								<Title>
									{Number(totalPriceAfterGratuity).toFixed(2)}
								</Title>
							</Column>
						</Row>

						<Row style={{width: "100%"}}>
							<div
								style={{
									width: "200px",
									display: "flex",
									alignItems: "center",
								}}
							>
								<InputWrapper
									// label="Gratuity"
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
								<Title>%</Title>
							</div>
						</Row>
						{isGratuityPositive ? (
							<StripeCheckout
								stripeKey="pk_test_51InIyfAljeQoxwF8bEWEgokRJsqoam5DsBNXBdqA3NBACmVuzRyXV0YtfEELWf7zaKOdFxjYCnyktyEgOibrI0Nu0032A4LzDu"
								token={handleToken}
								name={
									providerDetail?.name + "," + providerDetail?.location
								}
								// opened={opened}
								// billingAddress
								// shippingAddress
								// amount="500"
								// name={providerId}
							>
								<PrimaryButton>Make Payment</PrimaryButton>
							</StripeCheckout>
						) : null}
					</>
				) : null}
			</Modals>

			<OrderedItemV2Container>
				<Header>
					<div>
						<Detail>Order Status</Detail>
						<Title
							style={{
								textTransform: "capitalize",
								color:
									realTimeOrderStatus === "new" || "submit"
										? "#FF0000"
										: realTimeOrderStatus === "accepted"
										? "#ff8000"
										: realTimeOrderStatus === "ready"
										? "#bfff00"
										: realTimeOrderStatus === "closed"
										? "#63FF00"
										: null,
							}}
						>
							{realTimeOrderStatus}
						</Title>
					</div>
					<div>
						<Detail>Total Price</Detail>
						<Title>$ {Number(totalPrice).toFixed(2)}</Title>
					</div>
					<div style={{width: "120px"}}>
						{showPayQRSplitOrderSplitPay ||
						showPayQRSplitOrderCombinePay ||
						showPayQRCombineOrder ||
						showPayCustomer ? (
							<PrimaryButton onClick={addGratuity}>Pay</PrimaryButton>
						) : null}
					</div>
				</Header>

				<Body>
					{orderedItemList?.menus?.map((item, i) => (
						<>
							{item.items?.length === 0 ? null : (
								<MenuContainer>
									<p>{item.submenu}</p>
									<ItemList>
										{item.items?.map((menuitem, j) => (
											<ItemContainer
												key={j}
												menuitem={menuitem}
												orderId={orderId}
												editSpecial={editSpecial}
												addItem={addItem}
												deleteItem={deleteItem}
												realTimeOrderStatus={realTimeOrderStatus}
											/>
										))}
									</ItemList>
								</MenuContainer>
							)}
						</>
					))}
				</Body>
			</OrderedItemV2Container>
		</>
	);
});

export default OrderedItemV2;
