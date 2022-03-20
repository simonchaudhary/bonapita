import {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";

// Icons
import {IconButton} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

// Functions
import {firestore} from "../../../config/firebaseConfig";

// components
import {
	StaffOrderPageContainer,
	Body,
	OrderedList,
	MenuHeader,
} from "./StaffOrderPageStyle";
import {Title, Detail} from "../../../components/texts/texts";
import InputWrapper from "../../../components/input/InputWrapper";
import Modals from "../../../components/modal/Modals";
import ToastBar from "../../../components/ToastBar";
import MenuListStaffOrder from "../../../ComponentsNew/MenuList/MenuListStaffOrder";
import OrderedItem from "./OrderedItem/OrderedItem";
import {useOrderDetail} from "../../../Hooks/useOrderDetail/useOrderDetail";

// Component
import {PrimaryButton} from "../../../components/buttons/buttons";

function StaffOrderPage() {
	// Initilization
	const history = useHistory();
	const {Toast} = ToastBar();

	// Router Params
	const {orderId} = useParams();
	const {areaId} = useParams();
	const {sectionId} = useParams();
	const {tableId} = useParams();
	const {guestId} = useParams();
	const {channel} = useParams();

	// Redux State
	const user = useSelector((state) => state.user?.user);
	const provider = useSelector((state) => state.menus.provider);

	// Hooks
	const [realTimeOrderStatus, setRealTimeOrderStatus] = useState(null);
	const [orderItemGuest, setorderItemGuest] = useState([]);
	const [specialInstruction, setSpecialInstruction] = useState("");
	const [specialInstructionError, setSpecialInstructionError] = useState("");
	const [guestSelectedOrderdItem, setguestSelectedOrderdItem] = useState(null);
	const specialInstructionFocus = () => {
		setSpecialInstructionError("");
	};

	// UI
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isOrderedItemUpdate, setIsOrderedItemUpdate] = useState(false);

	const {orderDetail} = useOrderDetail(orderId);

	// UseEffect
	useEffect(() => {
		console.log("Order Status Listener");
		firestore
			.collection("Orders")
			.doc(orderId)
			.onSnapshot((doc) => {
				console.log("Order Status Listener Current data: ", doc?.data());
				setRealTimeOrderStatus(doc?.data()?.orderStatus);
				// setRealTimeItemStatus(doc?.data()?.itemStatus);
			});
	}, []);

	useEffect(() => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dineIn/orders/items?orderId=" +
					orderId +
					"&guestId=" +
					guestId
			)
			.then((response) => {
				if (response.data.success) {
					console.log("Response Get order by guest", response);
					let totalPrice = 0;
					response.data?.data?.items.map((item, i) => {
						totalPrice = totalPrice + Number(item.price);
					});
					setorderItemGuest(response.data?.data?.items);
				}
			})
			.catch((error) => {
				console.log("Error Get order by guest", error);
			});
	}, [isOrderedItemUpdate]);

	// Functions
	const close = () => {
		setIsOpenModal(!isOpenModal);
	};

	const goBack = () => {
		history.push("/");
	};

	const specialInstructionDone = () => {
		console.log("SpecialInstruction", orderId);
		if (specialInstruction === "" || specialInstruction === null) {
			setSpecialInstructionError("Add some special instruction");
		} else {
			const data = {
				specialInstruction: specialInstruction,
				id: guestSelectedOrderdItem.id,
			};
			console.log(data);
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
					}
				})
				.catch((error) => {
					console.log("Error specialinsruction", error);
				});
		}
	};

	const addItem = (item) => {
		console.log("itemssadditems", item);
		const data = {
			...item,
			guest: guestId,
			itemName: item.name ?? item.itemName,
			itemStatus: "new",
		};
		console.log("data", data);
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dineIn/orders/" +
					orderId +
					"/item",
				data
			)
			.then((response) => {
				console.log("Response Order Item added", response);
				Toast(" Ordered", "success");
				setIsOrderedItemUpdate(!isOrderedItemUpdate);
			})
			.catch((error) => {
				console.log("Error Order Item added", error);
			});
	};
	const serveItem = (item) => {
		console.log("itemssadditems", item);

		const data = {
			itemStatus: "served",
			id: item.id,
		};
		console.log("datadata", data, "order id", orderId);
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					orderId +
					"/update-item-status",
				data
			)
			.then((response) => {
				console.log("Response Update Itemstatus", response);
				Toast("Item Status changed to Served", "success");
				setIsOrderedItemUpdate(!isOrderedItemUpdate);
			})
			.catch((error) => {
				console.log("Error Update Itemstatus", error);
			});
	};
	const deleteItem = (item) => {
		console.log("itemssadditems", item);

		axios
			.delete(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/order/${orderId}/delete-item?id=${item.id}`
			)
			.then((response) => {
				console.log("Response Item Delete", response);
				Toast("Item Deleted", "success");
				setIsOrderedItemUpdate(!isOrderedItemUpdate);
			})
			.catch((error) => {
				console.log("Error Item Delete", error);
			});
	};

	const openSpecialInstructionModal = (item) => {
		setguestSelectedOrderdItem(item);
		setIsOpenModal(true);
	};

	const pay = () => {
		console.log(
			"Pay orderid table view",
			orderId,
			user.provider,
			areaId,
			sectionId,
			tableId
		);
		history.push(
			`/receipt/${orderId}/${user.provider}/${areaId}/${sectionId}/${tableId}`
		);
	};

	return (
		<>
			<Modals isOpen={isOpenModal} className="checkoutSummaryModal">
				<div className="close__modal">
					<IconButton>
						<CloseRoundedIcon onClick={close} />
					</IconButton>
				</div>

				<InputWrapper
					label="Special Instruction"
					error={specialInstructionError}
					// prefixIcon={<EmailRoundedIcon />}
					onFocus={specialInstructionFocus}
					type="text"
					value={specialInstruction}
					onChangeText={(e) => setSpecialInstruction(e.target.value)}
				/>
				<button
					className="primary__button"
					onClick={specialInstructionDone}
				>
					Done
				</button>
			</Modals>

			<StaffOrderPageContainer>
				<MenuHeader>
					{provider?.loading ? (
						<h5>Loading...</h5>
					) : (
						<h6>
							Welcome to
							{" " +
								provider?.data?.providerDetail?.name +
								", " +
								provider?.data?.providerDetail?.location}
						</h6>
					)}

					<img
						height="60px"
						width="60"
						src={provider?.data?.pageInfo?.footerUrl}
					/>
				</MenuHeader>
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start">
						<IconButton onClick={goBack}>
							<ArrowBackIosIcon />
						</IconButton>
						<div style={{marginRight: "0.875rem"}}>
							<Detail>Channel</Detail>
							<Title>{channel}</Title>
						</div>
						<div style={{marginRight: "0.875rem"}}>
							<Detail>Table</Detail>
							<Title>{tableId}</Title>
						</div>
						<div style={{marginRight: "0.875rem"}}>
							<Detail>Guest</Detail>
							<Title>{guestId}</Title>
						</div>
						<div>
							<Detail>Order Status</Detail>
							<Title
								style={{
									textTransform: "capitalize",
									color:
										realTimeOrderStatus === "new"
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
								{"Order is "}
								{realTimeOrderStatus}
							</Title>
						</div>
					</div>
					<div>
						{realTimeOrderStatus === "served" ? (
							<PrimaryButton onClick={pay}>Pay</PrimaryButton>
						) : null}
					</div>
				</div>
				<Body>
					<OrderedList>
						{orderItemGuest.length === 0 ? <h5>No Items</h5> : null}
						{orderItemGuest?.map((item, i) => (
							<OrderedItem
								key={i}
								item={item}
								orderId={orderId}
								addItem={addItem}
								serveItem={serveItem}
								deleteItem={deleteItem}
								openSpecialInstructionModal={
									openSpecialInstructionModal
								}
								realTimeOrderStatus={realTimeOrderStatus}
							/>
						))}
					</OrderedList>
					<MenuListStaffOrder
						providerId={user?.provider}
						addItem={addItem}
						isPaid={orderDetail?.isPaid}
					/>
				</Body>
			</StaffOrderPageContainer>
		</>
	);
}

export default StaffOrderPage;
