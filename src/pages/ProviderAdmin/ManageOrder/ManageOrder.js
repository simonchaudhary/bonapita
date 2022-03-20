import React, {useState, useEffect} from "react";

// Package
import {useSelector} from "react-redux";
import axios from "axios";

// Components
import {ManageOrderContainer} from "./ManageOrderStyle";
import CustomAccordian from "./CustomAccordian/CustomAccordian";

function ManageOrder() {
	console.log("ManageOrder");

	// Redux State
	const user = useSelector((state) => state.user.user);

	// Hooks
	const [orderList, setOrderList] = useState(null);

	//useEffects
	useEffect(() => {
		getOrdersByStatus();
	}, []);

	// Functions
	const getOrdersByStatus = () => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/provider/" +
					user?.provider +
					"/order-by-status"
			)
			.then((response) => {
				console.log("Response GetOrderBystatus", response);
				// console.log(Object.entries(response.data.data));
				let orders = Object.entries(response.data.data);
				let arrangeOrders = [];

				orders.map((item, i) => {
					if (item[0] === "submit") {
						arrangeOrders[0] = item;
					} else if (item[0] === "paid") {
						arrangeOrders[1] = item;
					} else if (item[0] === "customer review") {
						arrangeOrders[2] = item;
					} else if (item[0] === "accepted") {
						arrangeOrders[3] = item;
					} else if (item[0] === "progress") {
						arrangeOrders[4] = item;
					} else if (item[0] === "ready") {
						arrangeOrders[5] = item;
					} else if (item[0] === "served") {
						arrangeOrders[6] = item;
					} else if (item[0] === "picked up") {
						arrangeOrders[7] = item;
					} else if (item[0] === "closed") {
						arrangeOrders[8] = item;
					}
				});
				console.log(arrangeOrders);
				setOrderList(arrangeOrders);
			})
			.catch((error) => {
				console.error("Error GetOrderBystatus", error.response);
			});
	};

	const callback = () => {
		getOrdersByStatus();
	};

	return (
		<ManageOrderContainer>
			{!orderList ? (
				<p className="text-center  mt-3 text-base font-medium">Loading</p>
			) : null}
			{orderList?.map((item, i) =>
				item[0] === "new" || item[0] === "draft" ? null : (
					<CustomAccordian
						key={i}
						title={item[0]}
						items={item[1]}
						parentCallBack={callback}
					/>
				)
			)}
		</ManageOrderContainer>
	);
}

export default ManageOrder;
