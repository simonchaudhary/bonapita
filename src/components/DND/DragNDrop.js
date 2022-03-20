import React, { useState, useRef, useEffect } from "react";

import { auth, firestore, provider } from "../config/firebaseConfig";
import axios from "axios";

import DragItems from "./DragItems";

function DragNDrop({ user }) {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		get();
	}, []);

	const get = async () => {
		let response = await axios.get(
			"https://us-central1-afoodie-6d649.cloudfunctions.net/order/get-orders-items/prep-line/" +
				user?.prepLineName +
				"?providerId=" +
				user?.provider
		);
		console.log("response get Prepline order", response.data.data);
		setOrders(response.data.data);
	};

	return (
		<div>
			{orders.map((item, i) => (
				<div key={i}>
					<div className="title" style={{ marginLeft: "5rem" }}>
						{item.orderId}
					</div>
					<DragItems orderId={item.orderId} items={item.items} />
				</div>
			))}
		</div>
	);
}

export default DragNDrop;
