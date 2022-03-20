import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Route, Switch, withRouter} from "react-router-dom";
import axios from "axios";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import datetimeDifference from "datetime-difference";

import "./prepline.css";

import AccessTimeRounded from "@material-ui/icons/AccessTimeRounded";

// Components
import BeautifulDND from "../../components/DND/BeautifulDND";

import ReviewOrder from "../Customer/ReviewOrder/ReviewOrder";

function PrepLine() {
	// From context provider
	const [orderIdItem, setOrderIdItem] = useState(null);
	const user = useSelector((state) => state.user.user);

	const [update, setUpdate] = useState(false);

	useEffect(() => {
		get();
		return () => {
			// setOrderIdItem([]);
			console.log("Clean up", orderIdItem);
		};
	}, [update]);

	const get = async () => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/get-orders-items/prep-line/" +
					user?.prepLineName +
					// "appetizer____9f71" +
					"?providerId=" +
					user?.provider
			)
			.then((res) => {
				console.log("Response get Prepline order", res);

				let data = res.data.data.map((item) => {
					return {
						...item,
						id: Number(
							item.date.replaceAll("-", "") +
								item.time.replaceAll(":", "")
						),
					};
				});
				console.log("data", data);
				let sortdata = data.sort((a, b) =>
					a.id > b.id ? 1 : b.id > a.id ? -1 : 0
				);
				console.log("sortdata", sortdata);

				let orderList = sortdata;
				let newData = [];

				orderList.map((orderItem, i) => {
					// console.log("orderitem", orderItem.orderId);
					let itemData = new Map();
					let neww = [];
					let acknowledged = [];
					let beingPrepared = [];
					let ready = [];
					orderItem.items.forEach((item) => {
						itemData = {
							id: item.id,
							itemId: item.itemId,
							itemName: item.itemName,
						};
						if (item.itemStatus === "new") {
							neww.push(itemData);
						} else if (item.itemStatus === "acknowledged") {
							acknowledged.push(itemData);
						} else if (item.itemStatus === "beingPrepared") {
							beingPrepared.push(itemData);
						} else if (item.itemStatus === "ready") {
							ready.push(itemData);
						} else {
							console.log("none of it");
						}
					});
					const columnsFromBackend = [
						{
							id: "new",
							name: "new",
							items: neww,
						},
						{
							id: "acknowledged",
							name: "acknowledged",
							items: acknowledged,
						},
						{
							id: "beingPrepared",
							name: "beingPrepared",
							items: beingPrepared,
						},
						{
							id: "ready",
							name: "ready",
							items: ready,
						},
					];

					// Order Status
					let orderNew = neww.length > 0;
					let orderAck = neww.length === 0 && acknowledged.length > 0;
					let orderBeing =
						neww.length === 0 &&
						acknowledged.length === 0 &&
						beingPrepared.length > 0;
					let orderReady =
						neww.length === 0 &&
						acknowledged.length === 0 &&
						beingPrepared.length === 0 &&
						ready.length > 0;

					console.log(
						"Booleans",
						orderNew,
						orderAck,
						orderBeing,
						orderReady
					);
					let orderStatusAccordingToItemStatus = "";
					if (orderNew) {
						orderStatusAccordingToItemStatus = "new";
					}
					if (orderAck) {
						orderStatusAccordingToItemStatus = "acknowledged";
					}
					if (orderBeing) {
						orderStatusAccordingToItemStatus = "beingPrepared";
					}
					if (orderReady) {
						orderStatusAccordingToItemStatus = "ready";
					}

					modifyDateTime(orderItem.date, orderItem.time);
					// OrderStatus
					let mainData = {
						orderId: orderItem.orderId,
						items: columnsFromBackend,
						orderStatusAccordingToItemStatus:
							orderStatusAccordingToItemStatus,
						elapsedTime: modifyDateTime(orderItem.date, orderItem.time),
					};
					newData.push(mainData);
				});

				console.log("new data", newData.length);
				setOrderIdItem(newData);
			})
			.catch((err) => {
				console.error("Error getprepline", err?.response);
			});
	};

	const callBack = () => {
		setUpdate(!update);
	};

	const modifyDateTime = (date, time) => {
		let orderDate = modifyDate(date) + " " + modifyTime(time);
		console.log(" modify date and time", orderDate);

		// My Date and time
		let dateObj = new Date();
		let month = dateObj.getUTCMonth() + 1; //months from 1-12
		let day = dateObj.getUTCDate();
		let year = dateObj.getUTCFullYear();

		let hour =
			dateObj.getHours() < 10
				? "0" + dateObj.getHours().toString()
				: dateObj.getHours();
		let minutes =
			dateObj.getMinutes() < 10
				? "0" + dateObj.getMinutes().toString()
				: dateObj.getMinutes();
		let seconds =
			dateObj.getSeconds() < 10
				? "0" + dateObj.getSeconds().toString()
				: dateObj.getSeconds();

		let newdate = month + "/" + day + "/" + year;
		// console.log("Time", hour, minutes, seconds);
		let newTime = `${Number(hour)}:${Number(minutes)}:${Number(seconds)}`;
		let newDateTime = newdate + " " + tConvert(newTime);

		// console.log("newdatetime", newDateTime);

		const date3 = new Date(newDateTime);
		const date4 = new Date(orderDate);

		const result2 = datetimeDifference(date3, date4);
		console.log("Result", typeof result2, result2);
		return result2;
	};

	const modifyDate = (date) => {
		// console.log("Modify date", typeof date, date.split("-"));
		let dates = date.split("-");
		let newDate = dates[1] + "/" + dates[2] + "/" + dates[0];
		// Date From Order
		// console.log("Modifyed date", newDate);
		return newDate;
	};
	const modifyTime = (time) => {
		// console.log("Modify time", typeof time, time);
		let times = time.split(":");
		let hour = Number(times[0]) < 10 ? "0" + times[0].toString() : times[0];
		let minutes =
			Number(times[1]) < 10 ? "0" + times[1].toString() : times[1];
		let seconds =
			Number(times[2]) < 10 ? "0" + times[2].toString() : times[2];

		let newTime =
			Number(hour) + ":" + Number(minutes) + ":" + Number(seconds);
		// console.log("Modifyed time", tConvert(newTime));
		return tConvert(newTime);
	};
	function tConvert(time) {
		// Check correct time format and split into components
		time = time
			.toString()
			.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

		if (time.length > 1) {
			// If time format correct
			time = time.slice(1); // Remove full string match value
			time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
			time[0] = +time[0] % 12 || 12; // Adjust hours
		}
		return time.join(""); // return adjusted time or original string
	}

	if (window.location.pathname.substring(0, 12) === "/revieworder") {
		return (
			<Switch>
				<Route
					path="/revieworder/:providerId/:orderId/:channel"
					component={() => <ReviewOrder />}
				/>
			</Switch>
		);
	} else {
		return (
			<div className="prepline">
				<div className="prepline__header">
					<p className="prepline__status">New</p>
					<p className="prepline__status">Acknowledged</p>
					<p className="prepline__status">Being Prepared</p>
					<p className="prepline__status">Ready</p>
				</div>
				<div className="horizontal"></div>
				{!orderIdItem ? (
					<h4 style={{textAlign: "center", marginTop: "2rem"}}>
						Loading...
					</h4>
				) : null}
				{orderIdItem?.length === 0 ? (
					<h4 style={{textAlign: "center", marginTop: "2rem"}}>
						No orders
					</h4>
				) : null}
				<Accordion allowZeroExpanded className style={{padding: "0.25rem"}}>
					{orderIdItem?.map((item, i) => (
						<AccordianComponent key={i} item={item} callBack={callBack} />
					))}
				</Accordion>
			</div>
		);
	}
}

export default withRouter(PrepLine);

const AccordianComponent = ({item, callBack}) => {
	console.log("Accordian Component", item);

	// const {orderDetail} = useOrderDetail(item?.orderId);

	return (
		<AccordionItem style={{marginBottom: "0.25rem"}}>
			<AccordionItemHeading>
				<AccordionItemButton
					className=""
					style={{
						display: "flex",
						alignItems: "center",
						background: "#f8f8f8",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							overflow: "hidden",
							width:
								item?.orderStatusAccordingToItemStatus === "new"
									? "25%"
									: item?.orderStatusAccordingToItemStatus ===
									  "acknowledged"
									? "50%"
									: item?.orderStatusAccordingToItemStatus ===
									  "beingPrepared"
									? "75%"
									: item?.orderStatusAccordingToItemStatus === "ready"
									? "100%"
									: "0%",
							// orderDetail?.orderLowStatus === "new"
							// 	? "25%"
							// 	: orderDetail?.orderLowStatus === "acknowledged"
							// 	? "50%"
							// 	: orderDetail?.orderLowStatus === "beingPrepared"
							// 	? "75%"
							// 	: orderDetail?.orderLowStatus === "ready"
							// 	? "100%"
							// 	: "0%",
							padding: "0.75rem",
							background:
								item?.orderStatusAccordingToItemStatus === "new"
									? "#FF0000"
									: item?.orderStatusAccordingToItemStatus ===
									  "acknowledged"
									? "#ff8000"
									: item?.orderStatusAccordingToItemStatus ===
									  "beingPrepared"
									? "#bfff00"
									: item?.orderStatusAccordingToItemStatus === "ready"
									? "#63FF00"
									: "white",
							// orderDetail?.orderLowStatus === "new"
							// 	? "#FF0000"
							// 	: orderDetail?.orderLowStatus === "acknowledged"
							// 	? "#ff8000"
							// 	: orderDetail?.orderLowStatus === "beingPrepared"
							// 	? "#bfff00"
							// 	: orderDetail?.orderLowStatus === "ready"
							// 	? "#63FF00"
							// 	: "white",
							color: "black",
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginRight: "0.25rem",
							}}
						>
							<AccessTimeRounded
								style={{
									width: "15px",
									marginRight: "0.25rem",
								}}
							/>
							<div className="order__Title">
								{item.elapsedTime.hours}:{item.elapsedTime.minutes}:
								{item.elapsedTime.seconds}
							</div>
						</div>
						<div
							className="order__Title"
							style={{
								width: "90%",
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
							}}
						>
							{item.orderId}
						</div>
					</div>
				</AccordionItemButton>
			</AccordionItemHeading>
			<AccordionItemPanel style={{padding: "0rem"}}>
				<h5
					style={{
						marginLeft: "0.875rem",
					}}
				>
					{item.orderId}
				</h5>
				<BeautifulDND
					orderId={item.orderId}
					columnsFromBackend={item.items}
					// showHeader={i}
					callBack={callBack}
				/>
			</AccordionItemPanel>
		</AccordionItem>
	);
};
