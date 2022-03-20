import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import Spinner from "react-spinkit";
import {useSelector} from "react-redux";

// Icon
import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

// Component
import {
	Body,
	FilterContainer,
	Column,
	Row,
	CustomDatePicker,
	CustomButtton,
	Table,
	Th,
	Td,
	Tr,
	OrderResultContainer,
	ModalBody,
	OrderContainer,
} from "./ActiveOrderStyle";
import {Title, Detail} from "../../../../components/texts/texts";
import {Horizontal} from "../../../../components/elements/elements";
import ToastBar from "../../../../components/ToastBar";
import Modals from "../../../../components/modal/Modals";
import OrderLog from "./OrderLog/OrderLog";

// data
const dayFilter = [
	{title: "Filter  by Range", value: "null"},
	{title: "Last 7 days", value: "last7Days"},
	{title: "Last 30 days", value: "last30Days"},
	{title: "Last Quater", value: "lastQuarter"},
	{title: "Last Year", value: "lastYear"},
];

function ActiveOrder() {
	// Redux
	const user = useSelector((state) => state.user.user);

	// hook
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [orderList, setOrderList] = useState(null);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [selectOrdersDetail, setSelectOrdersDetail] = useState(null);

	// UI
	// filter
	const {Toast} = ToastBar();
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [showViewButton, setShowViewButton] = useState(true);
	const [filterDay, setFilterDay] = useState("null");
	const [dataLoading, setDataLoading] = useState(false);
	const [whichModal, setWhichModal] = useState("orders");

	const startDateFocus = () => {
		setShowViewButton(true);
	};

	const endDateFocus = () => {
		setShowViewButton(true);
	};

	const close = () => {
		setIsOpenModal(false);
		// resetField();
	};

	useEffect(() => {
		getSalesByFilter();
		return () => {
			setOrderList(null);
		};
	}, [filterDay]);

	const showOrders = (item) => {
		console.log(item);
		setWhichModal("orders");
		setSelectOrdersDetail(item);
		setIsOpenModal(true);
	};

	const getSalesByFilter = () => {
		// console.log(filterDay, user.provider);
		if (filterDay !== "null") {
			setDataLoading(true);
			axios
				.get(
					"https://us-central1-afoodie-6d649.cloudfunctions.net/orderAnalysis-active/" +
						filterDay +
						"?providerId=" +
						user?.provider
				)
				.then((res) => {
					console.log(
						`Response ${filterDay} getOrderByFilter Archieved Order`,
						res
					);
					if (res.data.success) {
						// alert("true");
						setDataLoading(false);
						setOrderList(res.data.data.orders);
					}
				})
				.catch((err) => {
					console.error("Error getSalesByFilter Archieved Order", err);
					setDataLoading(false);
				});
		}
	};

	const getSalesByRange = (start, end) => {
		// console.log(start, end, user.provider);
		setDataLoading(true);
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/orderAnalysis-active/range?start=" +
					start +
					"&end=" +
					end +
					"&providerId=" +
					user?.provider
			)
			.then((res) => {
				console.log("Response getSalesByRange Archieved Order", res);
				if (res.data.success) {
					setOrderList(res.data.data.orders);
					setDataLoading(false);
				}
			})
			.catch((err) => {
				console.error("Error getSalesByRange Archieved Order", err);
				setDataLoading(false);
			});
	};

	const viewOrders = () => {
		// console.log("Start dates", startDate.valueOf());
		// let date = new Date(startDate.valueOf());

		if (startDate === null) {
			Toast("Select Start Date", "error");
		} else if (endDate === null) {
			Toast("Select End Date", "error");
		} else {
			setFilterDay("null");
			getSalesByRange(startDate.valueOf(), endDate.valueOf());
		}
	};
	const orderDetail = (item) => {
		console.log("selected Order detail", item);
		setSelectedOrder(item);
		// setOrderDetailForLog(null);
		setWhichModal("orderDetailModal");
		// axios
		// 	.get(
		// 		`https://us-central1-afoodie-6d649.cloudfunctions.net/order/${item.id}/logs`
		// 	)
		// 	.then((res) => {
		// 		console.log("Response getLog", res);
		// 		setOrderDetailForLog(res.data.data.logs);
		// 	})
		// 	.catch((err) => {
		// 		console.error("Error getLog", err.repsonse);
		// 	});
	};

	const goBackOrdersModal = () => {
		setWhichModal("orders");
	};
	return (
		<>
			<Modals
				isOpen={isOpenModal}
				className={
					whichModal === "orders"
						? "active_order__modal"
						: "active_order__logs__modal"
				}
			>
				<div className="close__modal">
					<IconButton>
						<CloseRoundedIcon onClick={close} />
					</IconButton>
				</div>
				<>
					{whichModal === "orders" ? (
						<ModalBody>
							<Column>
								<Detail>Date</Detail>
								<Title>{selectOrdersDetail?.date}</Title>
							</Column>
							<Horizontal />
							<Column style={{width: "100%"}}>
								<Detail>Payments</Detail>
								{selectOrdersDetail?.orders.map((item, i) => (
									<OrderContainer
										key={i}
										onClick={() => orderDetail(item)}
									>
										<Row>
											<Column>
												<Detail>Customer</Detail>
												<Title>{item.customerId}</Title>
											</Column>
											<Column>
												<Detail>Channel</Detail>
												<Title>{item.channel}</Title>
											</Column>
											<Column>
												<Detail>Order Status</Detail>
												<Title>{item.orderStatus}</Title>
											</Column>
											<Column>
												<Detail>Total Price</Detail>
												<Title>{item.totalPrice}</Title>
											</Column>
											<Column>
												<Detail>Update By</Detail>
												<Title>{item.updatedBy}</Title>
											</Column>
										</Row>
									</OrderContainer>
								))}
							</Column>
						</ModalBody>
					) : whichModal === "orderDetailModal" ? (
						<OrderLog
							goBackOrdersModal={goBackOrdersModal}
							selectedOrder={selectedOrder}
						/>
					) : null}
				</>
			</Modals>
			<Body>
				<div>
					<FilterContainer>
						<Column>
							<h5>Filter Day</h5>
							<select
								style={{background: "#f5f5f5"}}
								onChange={(e) => {
									// setStartDate(null);
									// setEndDate(null);
									console.log(e.target.value);

									if (e.target.value === "null") {
										setShowViewButton(true);
									} else {
										setShowViewButton(false);
									}
									setFilterDay(e.target.value);
								}}
								value={filterDay}
								disabled={dataLoading}
							>
								{dataLoading ? (
									<option>Loading</option>
								) : (
									<>
										{dayFilter.map((item, i) => (
											<option key={i} value={item.value}>
												{item.title}
											</option>
										))}
									</>
								)}
							</select>
						</Column>

						{filterDay === "null" ? (
							<>
								<Column>
									<h5>Start Date</h5>
									<CustomDatePicker
										selected={startDate}
										onFocus={startDateFocus}
										onChange={(date) => {
											setStartDate(date);
										}}
										selectsStart
										startDate={startDate}
										endDate={endDate}
										dateFormat="yyyy-MM-dd"
									/>
								</Column>
								<Column>
									<h5>End Date</h5>
									<CustomDatePicker
										selected={endDate}
										onFocus={endDateFocus}
										onChange={(date) => {
											setEndDate(date);
										}}
										selectsEnd
										startDate={startDate}
										endDate={endDate}
										minDate={startDate}
										dateFormat="yyyy-MM-dd"
									/>
								</Column>
							</>
						) : null}

						<Column>
							{showViewButton ? (
								<CustomButtton
									style={{width: "120px"}}
									onClick={viewOrders}
									disabled={dataLoading}
								>
									{dataLoading ? "Loading" : "View"}
								</CustomButtton>
							) : null}
						</Column>
					</FilterContainer>
				</div>{" "}
				<div style={{width: "100%", textAlign: "center"}}>
					<h4>Active Orders</h4>
				</div>
				<OrderResultContainer>
					{dataLoading ? (
						<Spinner name="double-bounce" color="#d65a31" />
					) : (
						<>
							{orderList && (
								<Table>
									<Tr>
										<Th>Date</Th>
										<Th>No of Orders</Th>
									</Tr>
									{orderList?.map((item, i) => (
										<Tr key={i}>
											<Td>{item.date}</Td>
											<Td onClick={() => showOrders(item)}>
												{item.orders.length}
											</Td>
										</Tr>
									))}
								</Table>
							)}
						</>
					)}
				</OrderResultContainer>
			</Body>
		</>
	);
}

export default ActiveOrder;
