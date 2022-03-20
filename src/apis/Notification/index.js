import {firestore} from "../../config/firebaseConfig";

export const sendReviewNotification = (uid, message) => {
	return firestore
		.collection("users")
		.doc(uid)
		.collection("notification")
		.add(message)
		.then((res) => {
			// console.log("Response add review notification ", res);
			return "Review message successfully send";
		});
};
