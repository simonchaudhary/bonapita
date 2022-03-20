import axios from "axios";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import ButtonNLoading from "../../../components/buttons/ButtonNLoading";
import ToastBar from "../../../components/ToastBar";
import GuestContainer from "../GuestContainer/GuestContainer";

function TableContainer(props) {
	const {item, areaId, sectionId, tableCallback} = props;

	const [updateTable, setUpdateTable] = useState(false);
	const {orderList, orderId, orderDetail} = TableContainerLogic(
		props,
		updateTable
	);

	const user = useSelector((state) => state.user?.user);

	// custome hook
	// const {orderDetail} = useOrderDetail(orderId);

	const {Toast} = ToastBar();

	const history = useHistory();

	const pay = () => {
		history.push(
			`/receipt/${orderId}/${user.provider}/${areaId}/${sectionId}/${item.tableId}`
		);
	};

	const closeOrder = () => {
		console.log("order id", orderId);

		let data = {
			orderStatus: "closed",
			updatedBy: user.uid,
		};
		console.log("data", data);
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					orderId +
					"/update-order-status",
				data
			)
			.then((res) => {
				console.log("Response updateorderstatus to close", res);
				Toast("Ordered Closed", "success");
				setUpdateTable(!updateTable);
			})
			.catch((err) => {
				console.error("Error closeorder", err.response);
				Toast(err.response.data.data, "error");
			});
		// const data = {
		// 	updatedBy: user.uid,
		// };
		// axios
		// 	.put(
		// 		"https://us-central1-afoodie-6d649.cloudfunctions.net/dineIn/orders/" +
		// 			orderId +
		// 			"/close",
		// 		data
		// 	)
		// 	.then((response) => {
		// 		console.log("Response close order", response);
		// 		setUpdateTable(!updateTable);
		// 	})
		// 	.catch((error) => {
		// 		console.log("Error close order", error.response);
		// 	});
	};

	const archiveOrder = () => {
		console.log("Order Id", orderId, orderList[0].table);
		let tablePath = orderList[0].table;
		setIsLoading(true);
		axios
			.post(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/dineIn/orders/${orderId}/archive?tablePath=${tablePath}`
			)
			.then((res) => {
				console.log("Response Staff Order Archive", res);
				setIsLoading(false);
				Toast("Order Archive", "success");
				setUpdateTable(!updateTable);
				tableCallback();
			})
			.catch((err) => {
				setIsLoading(false);
				console.error("Error Order Archive", err.response);
			});
	};

	const [isLoading, setIsLoading] = useState(false);

	const callback = () => {
		console.log("Callback updateTable");
		setUpdateTable(!updateTable);
	};

	const dineInOrder = orderList?.[0]?.channel === "Dine In";
	const dineInOrderStatus = orderList?.[0]?.orderStatus;
	const hasItems = orderList?.[0]?.items?.length > 0;

	const dineInServed =
		dineInOrder && hasItems && orderList?.[0]?.orderStatus === "served";
	const dineInClosed = dineInOrder && dineInOrderStatus === "closed";
	const dineInPaid =
		dineInOrder &&
		orderList?.[0]?.isPaid &&
		orderList?.[0]?.orderStatus === "served";

	return (
		<Container>
			<Row>
				<Left>
					<Title>{item.tableName} </Title>
					{item?.available && item?.dineInOrder ? (
						<MediumText green>Available</MediumText>
					) : (
						<MediumText>Unavailable</MediumText>
					)}
					{orderList?.[0]?.channel && (
						<Detail>{orderList?.[0]?.channel}</Detail>
					)}
					{orderList?.[0]?.channel === "QR code" ? (
						<Detail>{orderList?.[0]?.orderType}</Detail>
					) : null}
					{orderList?.[0]?.payType && (
						<Detail>{orderList?.[0]?.payType}</Detail>
					)}
					{orderDetail?.channel === "Dine In" ? (
						<Detail>{orderDetail?.orders[0]?.orderStatus}</Detail>
					) : null}
				</Left>
				{/* For Dine Staff Order only */}
				<Right>
					{/* Pay */}
					{/* {orderDetail?.orderStatus} */}
					{dineInServed ? (
						<button
							style={{
								width: "60px",
								padding: "0.75rem 0rem",
								borderRadius: "0.3rem",
								background: "#0217FF",
								border: "none",
								color: "white",
								// border: "1px solid black",
								fontSize: "0.75rem",
								margin: "0.5rem 0rem",
							}}
							onClick={pay}
						>
							Pay
						</button>
					) : null}
					{/* Show Archive */}
					{dineInClosed ? (
						<ButtonNLoading
							onClick={archiveOrder}
							title="Archive Order"
							color="white"
							isLoading={isLoading}
						/>
					) : null}

					{/* Show Closed */}
					{/* {orderList?.[0]?.isPaid.toString()} */}
					{dineInPaid ? (
						<button
							style={{
								marginLeft: "0.6rem",
								padding: "0.3rem 0.4rem",
								background: "#d65a31",
								borderRadius: "0.3rem",
								color: "white",
							}}
							onClick={closeOrder}
						>
							Close Order
						</button>
					) : null}
				</Right>
			</Row>
			<Horizontal />
			<GuestList>
				{item?.guests?.map((guest, i) => (
					<GuestContainer
						key={i}
						guest={guest}
						orderList={orderList}
						index={i}
						areaId={areaId}
						sectionId={sectionId}
						tableId={item.tableId}
						tableAvailable={item?.available && item?.dineInOrder}
						callback={callback}
						tableCallback={tableCallback}
					/>
				))}
			</GuestList>
		</Container>
	);
}

const TableContainerLogic = (props, updateTable) => {
	const {item, areaId, sectionId} = props;

	const [orderId, setOrderId] = useState(null);
	// const [orderStatus, setOrderStatus] = useState(null);
	const [orderDetail, setOrderDetail] = useState(null);

	// Hooks
	const [orderList, setOrderList] = useState(null);

	useEffect(() => {
		// Get order by table
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dineIn/orders?area=" +
					areaId +
					"&section=" +
					sectionId +
					"&table=" +
					item.tableId
			)
			.then((response) => {
				console.log("Response GetOrdersbytable", item.tableName, response);
				if (response.data.success) {
					setOrderList(response.data.data.orders);
					// For DineStaff
					setOrderId(response.data.data.orders[0].id);
					setOrderDetail(response.data.data);
				}
			})
			.catch((error) => {
				console.log(
					"Error GetOrdersbytable",
					item.tableName,
					error.response
				);
				setOrderList(null);
			});
	}, [updateTable]);

	return {orderList, orderId, orderDetail};
};

const Container = styled.div`
	padding: 0.875rem;
	margin: 0.75rem;
	background: #faede9;
	border-radius: 0.6rem;
	:not(:last-of-type) {
		margin-bottom: 0.875rem;
		@media only screen and (min-width: 100px) and (max-width: 480px) {
			margin-bottom: 0.4rem;
		}
	}
	@media only screen and (min-width: 100px) and (max-width: 480px) {
		padding: 0.4rem;
		border-radius: 0.4rem;
		margin: 0.4rem;
	}
`;

const GuestList = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const Left = styled.div`
	width: 70%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
`;

const Title = styled.p`
	width: auto;
	font-size: 0.75rem;
	color: black;
	font-weight: 600;
	text-transform: capitalize;
	margin-right: 0.5rem;
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

const Right = styled.div`
	display: flex;
`;
const Horizontal = styled.div`
	width: 100%;
	height: 0.6rem;

	@media only screen and (min-width: 100px) and (max-width: 480px) {
		height: 0.4rem;
	}
`;

const MediumText = styled.p`
	font-size: 0.675rem;
	padding: 0.125rem 0.5rem;
	border-radius: 0.2rem;
	font-weight: 500;
	background: ${(props) => (props.green ? "green" : "red")};
	color: white;
	margin-right: 0.5rem;
`;

export default TableContainer;
