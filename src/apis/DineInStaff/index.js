import axios from "axios";

export const createDineInOrder = (param) => {
	let cartItem = [];
	param.cart?.map((item, i) => {
		let data = {
			guest: param.guestId, // guest Id
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
		staffId: param.user.uid, // uid
		providerId: param.user.provider, // providerid
		channel: "Dine In",
		area: param.areaId, // areaId
		section: param.sectionId, // sectionId
		table: param.tableId, // tableId
		deliveryMode:
			"to be delivered by third party, to be delivered by the provider, customer will pickup",
		items: cartItem,
		orderStatus: "submit",
		isPaid: false,
	};

	console.log("Body data", data);
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
