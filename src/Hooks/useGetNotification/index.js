import {useState, useEffect} from "react";
import {firestore} from "../../config/firebaseConfig";

export const useGetNotification = (uid) => {
	console.log("useGetNotification", uid);
	const [notifications, setNotifications] = useState(null);

	useEffect(() => {
		firestore
			.collection("users")
			.doc(uid)
			.collection("notification")
			.where("type", "==", "notification")
			.onSnapshot((querySnapshot) => {
				let data = [];
				querySnapshot.forEach((doc) => {
					console.log("docs", doc.id);
					data.push(doc.data());
				});
				console.log("array", data);
				setNotifications(data);
			});
	}, []);

	return {notifications};
};
