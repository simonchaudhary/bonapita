import {useState, useEffect} from "react";
import {firestore} from "../../config/firebaseConfig";

export const useOrderDetail = (orderId = "") => {
	console.log("useOrderDetail", orderId);
	const [orderDetail, setOrderDetail] = useState(null);

	useEffect(() => {
		firestore
			.collection("Orders")
			.doc(orderId)
			.onSnapshot((doc) => {
				console.log("RealTime OrderDetail Listener : ", doc?.data());
				setOrderDetail(doc?.data());
			});
	}, []);

	return {orderDetail};
};

export const useGetOrderedItem = (orderId = "") => {
	console.log("useGetOrderedItem", orderId);

	const [orderedItems, setOrderedItems] = useState(null);

	useEffect(() => {
		console.log("orderedItems", orderedItems);
	}, [orderedItems, setOrderedItems]);

	useEffect(() => {
		firestore
			.collection("Orders")
			.doc(orderId)
			.collection("orderedItems")
			.onSnapshot((snapshot) => {
				let items = [];
				let changeItem;

				snapshot.docChanges().forEach((change) => {
					if (change.type === "added") {
						console.log("New Data ", change.doc.data());
						items.push(change.doc.data());
					}
					if (change.type === "modified") {
						console.log("Modified data: ", change.doc.data());
						changeItem = change.doc.data();
					}
					if (change.type === "removed") {
						console.log("Removed data: ", change.doc.data());
						changeItem = change.doc.data();
					}
				});

				if (changeItem) {
					setOrderedItems((prevState) => {
						console.log("Old data", prevState);
						let newArray = [...prevState];
						let index = newArray?.findIndex(
							(item) => item.id === changeItem.id
						);
						console.log("index is", index);
						if (index !== -1) {
							newArray[index] = changeItem;
						}
						console.log("new array", newArray);
						return newArray;
					});
				} else {
					setOrderedItems(items);
				}
			});
	}, [setOrderedItems]);

	return {orderedItems};
};
