import firebase from "firebase/app";
import "firebase/messaging";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyANyJKBWVKpsqCy8zS8iH8CSpEWSW7kxZk",
	authDomain: "afoodie-6d649.firebaseapp.com",
	projectId: "afoodie-6d649",
	storageBucket: "afoodie-6d649.appspot.com",
	messagingSenderId: "198374229567",
	appId: "1:198374229567:web:3e241030409c527b8a9a8a",
};
firebase.initializeApp(firebaseConfig);

// firebase
// 	.auth()
// 	.setPersistence(firebase.auth.Auth.Persistence.SESSION)
// 	.then(function () {
// 		console.log("Set presistence to Session");
// 	})
// 	.catch(function (error) {
// 		var errorCode = error.code;
// 		var errorMessage = error.message;
// 		console.log("Set presistence ", errorMessage);
// 	});

// const messaging = firebase.messaging();
const firestore = firebase.firestore();
const auth = firebase.auth();

// const provider = new firebase.auth.FacebookAuthProvider();
// // provider.addScope("user_birthday");
// // auth.languageCode = "it";
// provider.setCustomParameters({
// 	display: "popup",
// });

// const requestFirebaseNotificationPermission = () =>
// 	new Promise((resolve, reject) => {
// 		messaging
// 			.requestPermission()
// 			.then(() => messaging.getToken())
// 			.then((firebaseToken) => {
// 				resolve(firebaseToken);
// 			})
// 			.catch((err) => {
// 				reject(err);
// 			});
// 	});

// const onMessageListener = () =>
// 	new Promise((resolve) => {
// 		messaging.onMessage(function (payload) {
// 			resolve(payload);
// 		});
// 	});

export {
	// requestFirebaseNotificationPermission,
	// onMessageListener,
	firestore,
	auth,
	// provider,
};
