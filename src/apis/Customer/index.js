import axios from "axios";

// Get Recent Order
export const getRecentOrders = (uid, sortBy) => {
	console.log("getRecentOrders", uid, sortBy);
	return new Promise((resolve, reject) => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/customer/${uid}/recent-orders?sortBy=${sortBy}`
			)
			.then((response) => {
				console.log("Response getRecentOrders");
				resolve(response);
			})
			.catch((err) => {
				console.error("Error getRecentOrders");
				reject(err);
			});
	});
};
