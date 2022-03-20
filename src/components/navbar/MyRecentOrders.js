import React, { useEffect } from "react";
import ToastBar from "../ToastBar";
import { firestore } from "../../config/firebaseConfig";

const MyRecentOrders = React.memo(({ orderId }) => {
	const { Toast } = ToastBar();

	// OrderStatus
	useEffect(() => {
		console.log("Order Status Listener");
		firestore
			.collection("Orders")
			.doc(orderId)
			.onSnapshot((doc) => {
				console.log("Order Status Listener Current data: ", doc?.data());
				let Message =
					doc?.data()?.providerId +
					" Send Email To Edit Ordered Items of Ordered Id" +
					doc?.data()?.id;
				if (doc?.data()?.orderStatus === "customer review") {
					Toast(Message, "info");
				}
				// setRealTimeOrderStatus(doc?.data()?.orderStatus);
				// setRealTimeItemStatus(doc?.data()?.itemStatus);
			});
	}, []);

	return null;
});

export default MyRecentOrders;
