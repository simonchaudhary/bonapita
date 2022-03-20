// Stripe

import axios from "axios";

// To Charge
export const toCharge = (
	token,
	totalPriceAfterGratuity,
	orderId,
	providerId,
	user
) => {
	let data = {
		stripeToken: token.id,
		amount: parseInt(totalPriceAfterGratuity * 100),
		// amount: parseInt(totalPriceAfterGratuity),
		orderId: orderId,
		providerId: providerId,
		customerId: user.uid,
		email: token.email,
	};
	console.log("strip api data", data);
	return new Promise((resolve, reject) => {
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/stripe/charge",
				data
			)
			.then((response) => {
				console.log("Response Stripe Pay");
				resolve(response);
			})
			.catch((err) => {
				console.error("Error Stripe Pay");
				reject(err);
			});
	});
};

// To add payment in firestore
export const addPayment = (paymentData) => {
	const data = {
		payment: paymentData,
	};
	console.log("payment data", data);
	return new Promise((resolve, reject) => {
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/payments",
				data
			)
			.then((res) => {
				console.log("Response add payment", res);
				resolve(res);
			})
			.catch((err) => {
				console.log("Error add payment", err);
				reject(err);
			});
	});
};

// Update Order TranstionId
export const updateOrderTranstionId = (
	orderId,
	transactionId,
	totalPriceAfterGratuity
) => {
	const data = {
		transactionId: transactionId,
		isPaid: true,
		totalPrice: Number(totalPriceAfterGratuity).toFixed(2),
	};
	return new Promise((resolve, reject) => {
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					orderId,
				data
			)
			.then((res) => {
				console.log("Response updateordertranstionid");
				resolve(res);
			})
			.catch((err) => {
				console.error("Response updateordertranstionid");
				reject(err);
			});
	});
};

//  To refund a charge
export const refundCharge = (chargeId) => {
	return new Promise((resolve, reject) => {
		axios
			.post(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/stripe/${chargeId}/refund`
			)
			.then((res) => {
				console.log("Response refund charge");
				resolve(res);
			})
			.catch((err) => {
				console.log("Error refund charge");
				reject(err);
			});
	});
};
