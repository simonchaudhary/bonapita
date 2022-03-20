import React, {useState, useCallback, useEffect} from "react";

// Package
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

// API
import {getRecentOrders} from "../../../apis/Customer";

// Icons
import {KeyboardArrowLeftRounded} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

// Components
import RecentOrderItem from "./RecentOrderItem";

const MyRecentOrder = React.memo(({showComponent}) => {
	console.log("MyRecentOrder");

	// Redux State
	const user = useSelector((state) => state?.user.user);

	// Hooks
	const [recentOrders, setRecentOrders] = useState(null);

	useEffect(() => {
		getRecentOrders(user?.uid, "newToOld")
			.then((res) => {
				console.log("Response", res);
				setRecentOrders(res.data.data?.orders);
			})
			.catch((err) => {
				console.log("Error", err);
			});
	}, []);

	return (
		<div className="fixed top-0 left-0 z-50 h-screen w-full bg-white md:w-96 shadow-xl overflow-y-auto overflow-x-hidden">
			<header className="sticky top-0 z-10 flex items-center justify-between p-2 border-b border-gray-200 bg-white">
				<p className="text-base font-medium">Recent Orders</p>
				<div onClick={() => showComponent("recentOrder")}>
					<IconButton>
						<KeyboardArrowLeftRounded />
					</IconButton>
				</div>
			</header>
			<div className="">
				{!recentOrders ? (
					<p className="mt-3 text-center font-medium">Loading</p>
				) : null}
				{recentOrders?.length === 0 ? (
					<p className="mt-3 text-center font-medium">No recent orders</p>
				) : null}
				{recentOrders?.map((item, i) => (
					<RecentOrderItem
						key={i}
						item={item}
						showComponent={showComponent}
					/>
				))}
			</div>
		</div>
	);
});

export default MyRecentOrder;
