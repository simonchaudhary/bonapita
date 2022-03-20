import { useState, useEffect } from "react";

// Package
import axios from "axios";

import { IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";

import {
	OrderLogContainer,
	OrderHistoryContainer,
	LongArrowRight,
	GoBack,
	Row,
	Arrow,
	OutlineButton,
	MoreDetailContainter,
	Column,
} from "./OrderLogStyle";
import { Title, Detail } from "../../../../../components/texts/texts";

function OrderLog({ goBackOrdersModal, selectedOrder }) {
	console.log("order log modal", selectedOrder);

	// Hook
	const [orderDetailForLog, setOrderDetailForLog] = useState(null);

	useEffect(() => {
		setOrderDetailForLog(null);
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/order/${selectedOrder.id}/logs`
			)
			.then((res) => {
				console.log("Response getLog", res);
				setOrderDetailForLog(res.data.data.logs);
			})
			.catch((err) => {
				console.error("Error getLog", err.repsonse);
			});
	}, []);

	return (
		<OrderLogContainer>
			<GoBack onClick={goBackOrdersModal}>
				<IconButton>
					<ArrowBackIosIcon />
				</IconButton>
			</GoBack>
			<div style={{ marginBottom: "0.75rem" }}>
				<h3>{selectedOrder.id}</h3>
				<Detail>{selectedOrder.channel}</Detail>
			</div>

			{orderDetailForLog === null ? (
				<Detail>Loading</Detail>
			) : (
				<Row>
					{selectedOrder.channel === "Dine In" ? (
						<OrderStatusContainer
							orderDetailForLog={orderDetailForLog}
							orderType="submit"
						/>
					) : (
						<OrderStatusContainer
							orderDetailForLog={orderDetailForLog}
							orderType="new"
						/>
					)}
					<OrderStatusContainer
						orderDetailForLog={orderDetailForLog}
						orderType="paid"
					/>
					<OrderStatusContainer
						orderDetailForLog={orderDetailForLog}
						orderType="accepted"
					/>
					<OrderStatusContainer
						orderDetailForLog={orderDetailForLog}
						orderType="progress"
					/>
					<OrderStatusContainer
						orderDetailForLog={orderDetailForLog}
						orderType="ready"
					/>
					<OrderStatusContainer
						orderDetailForLog={orderDetailForLog}
						orderType="served"
					/>
					<OrderStatusContainer
						orderDetailForLog={orderDetailForLog}
						orderType="closed"
					/>
				</Row>
			)}
		</OrderLogContainer>
	);
}

const OrderStatusContainer = ({ orderDetailForLog, orderType }) => {
	const [showMoreDetail, setShowMoreDetail] = useState(false);

	const [orderDetail, setOrderDetail] = useState(null);
	useEffect(() => {
		let orderNew = orderDetailForLog.filter(
			(order) => order.newStatus === orderType
		);
		let data = orderNew;
		// console.log("value", data[0]);
		setOrderDetail(data[0]);
	}, []);

	const showMoreDetailFun = () => {
		if (showMoreDetail) {
			setShowMoreDetail(false);
		} else {
			setShowMoreDetail(true);
		}
	};
	const closeShowMore = () => {
		setShowMoreDetail(false);
	};

	if (orderDetail?.newStatus) {
		return (
			<Row>
				{orderDetail?.newStatus === "new" ? null : (
					<Arrow>
						<LongArrowRight />
					</Arrow>
				)}

				<OrderHistoryContainer
					style={{
						background:
							orderDetail?.newStatus === "new" ||
							orderDetail?.newStatus === "submit"
								? "#ff4800"
								: orderDetail?.newStatus === "paid"
								? "#ff7700"
								: orderDetail?.newStatus === "accepted"
								? "#ffbb00"
								: orderDetail?.newStatus === "progress"
								? "#ffea00"
								: orderDetail?.newStatus === "ready"
								? "#ddff00"
								: orderDetail?.newStatus === "served"
								? "#a2ff00"
								: orderDetail?.newStatus === "closed"
								? "#4dff00"
								: null,
					}}
				>
					<Title style={{ textTransform: "capitalize" }}>
						{orderDetail?.newStatus}
					</Title>
					<p>{orderDetail?.timeStamp}</p>
					<OutlineButton onClick={showMoreDetailFun}>
						More Detail
					</OutlineButton>
				</OrderHistoryContainer>
				{showMoreDetail ? (
					<MoreDetailContainter>
						<div onClick={closeShowMore}>
							<ExpandLessRoundedIcon />
							<Column>
								<Title>Customer</Title>
								<Detail>
									{orderDetail?.customerId
										? orderDetail?.customerId
										: "Null"}
								</Detail>
							</Column>
							<Column>
								<Title>Old Status</Title>
								<Detail>
									{orderDetail?.oldStatus
										? orderDetail?.oldStatus
										: "Null"}
								</Detail>
							</Column>
							<Column>
								<Title>Update By</Title>
								<Detail>{orderDetail?.updatedBy}</Detail>
							</Column>
						</div>
					</MoreDetailContainter>
				) : null}
			</Row>
		);
	} else {
		return null;
	}
};

export default OrderLog;
