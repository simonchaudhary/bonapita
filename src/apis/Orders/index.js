// Package
import axios from "axios";

// Customer
// Create Customer order
export const createCustomerOrder = (user, providerId, cart) => {
	let cartItem = [];
	cart?.map((item, i) => {
		let data = {
			imageUrl: item.imageUrl,
			itemName: item.itemName,
			itemId: item.itemId,
			itemStatus: item.itemStatus,
			prepLine: item.prepLine,
			price: item.price,
			specialInstruction: item.specialInstructions,
			tax: item.tax,
			displayRank: item.displayRank,
		};
		cartItem.push(data);
	});
	const data = {
		customerId: user.uid,
		providerId: providerId,
		channel: "Customer",
		deliveryMode:
			"to be delivered by third party, to be delivered by the provider, customer will pickup",
		items: cartItem,
		orderStatus: "submit",
		orderLowStatus: "new",
	};

	console.log("Data", data);
	return new Promise((resolve, reject) => {
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/add-order",
				data
			)
			.then((res) => {
				console.log("Response Add order ");
				resolve(res);
			})
			.catch((err) => {
				console.log("Error Add Order");
				reject(err);
			});
	});
};

// QR
// Create QR order
export const createQROrder = (props) => {
	// Props
	const {
		user,
		providerId,
		cart,
		areaId,
		sectionId,
		tableId,
		QR,
		providerDetail,
	} = props;

	let cartItem = [];
	// Order Item Details
	cart?.map((item, i) => {
		let data = {
			imageUrl: item.imageUrl,
			itemName: item.itemName,
			itemId: item.itemId,
			itemStatus: item.itemStatus,
			prepLine: item.prepLine,
			price: item.price,
			specialInstruction: item.specialInstructions,
			tax: item.tax,
			displayRank: item.displayRank,
		};
		cartItem.push(data);
	});
	const data = {
		customerId: user.uid,
		providerId: providerId,
		channel: "QR code",
		area: areaId,
		section: sectionId,
		table: tableId,
		deliveryMode:
			"to be delivered by third party, to be delivered by the provider, customer will pickup",
		items: cartItem,
		orderStatus: "submit",
		orderType: QR?.orderType,
		guestId: QR?.selectedGuest,
		noOfGuest: QR?.noOfGuest,
		guestNo: QR?.guestNo,
		payType: QR?.orderType === "split" ? QR?.splitOrderPayType : null,
		isPaid: false,
		orderLowStatus: "new",
		isSubmitted: !providerDetail?.payFirst,
	};
	console.log("Data", data);
	return new Promise((resolve, reject) => {
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/qr/v3/orders",
				data
			)
			.then((res) => {
				console.log("Response qrorder v3");
				resolve(res);
			})
			.catch((err) => {
				console.error("Error qrorder v3");
				reject(err);
			});
	});
};

// Dine In
// Create Dine order
export const createDineInOrder = (props) => {
	const {
		user,
		providerId,
		cart,
		areaId,
		sectionId,
		tableId,
		guestId,
		providerDetail,
	} = props;
	let cartItem = [];
	cart?.map((item, i) => {
		let data = {
			guest: guestId, // guest Id
			imageUrl: item.imageUrl,
			itemName: item.itemName,
			itemId: item.itemId,
			itemStatus: item.itemStatus,
			prepLine: item.prepLine,
			price: item.price,
			specialInstruction: item.specialInstructions,
			tax: item.tax,
			displayRank: item.displayRank,
		};
		cartItem.push(data);
	});
	const data = {
		staffId: user.uid, // uid
		providerId: providerId, // providerid
		channel: "Dine In",
		area: areaId, // areaId
		section: sectionId, // sectionId
		table: tableId, // tableId
		deliveryMode:
			"to be delivered by third party, to be delivered by the provider, customer will pickup",
		items: cartItem,
		orderStatus: "submit",
		isPaid: false,
		orderLowStatus: "new",
		isSubmitted: !providerDetail?.payFirst,
	};
	console.log("Data", data);
	return new Promise((resolve, reject) => {
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dineIn/orders",
				data
			)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

// Update order status
export const updateOrderStatus = (orderId, orderStatus, user) => {
	const data = {
		orderStatus: orderStatus,
		updatedBy: user.email,
	};
	console.log("update order status data", data);
	return new Promise((resolve, reject) => {
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					orderId +
					"/update-order-status",
				data
			)
			.then((res) => {
				console.log("Response updateorderstatus");
				resolve(res);
			})
			.catch((err) => {
				console.log("Error updateorderstatus");
				reject(err);
			});
	});
};

// Get Table Orders
export const getTableOrders = (areaId, sectionId, tableId) => {
	return new Promise((resolve, reject) => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/dineIn/orders?area=${areaId}&section=${sectionId}&table=${tableId}`
			)
			.then((res) => {
				console.log("Response ", res);
				resolve(res);
			})
			.catch((err) => {
				console.error("Error ", err);
				reject(err);
			});
	});
};
