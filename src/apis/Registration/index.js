import {firestore, auth} from "../../config/firebaseConfig";
import axios from "axios";

// Login
export const login = (email, password) => {
	return new Promise((resolve, reject) => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then((cred) => {
				console.log("cred", cred.user);
				// resolve(cred);
				getUserData(cred.user.uid)
					.then((res) => {
						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			})
			.catch((err) => {
				console.log("Error signInWithEmailAndPassword ");
				reject({signIn: err.message});
			});
	});
};

// getUserData
export const getUserData = (uid) => {
	return new Promise((resolve, reject) => {
		//
		firestore
			.collection("users")
			.doc(uid)
			.get()
			.then((res) => {
				console.log("Response data exists", res);
				if (res.exists) {
					resolve(res.data());
				} else {
					getProviderAdminData(uid).then((user) => {
						resolve(user);
					});
					getStaffUserData(uid).then((user) => {
						resolve(user);
					});
					getPreplineManagerUserData(uid).then((user) => {
						resolve(user);
					});
					getPreplineStaffData(uid).then((user) => {
						resolve(user);
					});
				}
			})
			.catch((err) => {
				console.log("Error", err);
				reject({firestore: err});
			});
	});
};

const getStaffUserData = (uid) => {
	return new Promise((resolve, reject) => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/dineInStaffs/${uid}`
			)
			.then((res) => {
				console.log("Response getStaffdata", res);
				if (res.data.success) {
					console.log("Staff Data Exists", res.data.data.dineInStaff);
					resolve(res.data.data.dineInStaff);
				}
			})
			.catch((err) => {
				console.error("Error getstaffdata", err);
			});
	});
};

const getPreplineManagerUserData = (uid) => {
	return new Promise((resolve, reject) => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/preplineManagers/${uid}`
			)
			.then((res) => {
				console.log("Response preplineManagers", res);
				if (res.data.success) {
					console.log(
						"Prepline Manager Data Exists",
						res.data.data.preplineManger
					);
					resolve(res.data.data.preplineManger);
				}
			})
			.catch((err) => {
				console.error("Error preplineManagers", err);
			});
	});
};
const getPreplineStaffData = (uid) => {
	return new Promise((resolve, reject) => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/preplines/prepline-staffs/${uid}`
			)
			.then((res) => {
				console.log("Response prepline-staffs", res);
				if (res.data.success) {
					console.log(
						"Prepline Staff Data Exists",
						res.data.data.preplineStaff
					);
					resolve(res.data.data.preplineStaff);
				}
			})
			.catch((err) => {
				console.error("Error prepline-staffs", err);
			});
	});
};
const getProviderAdminData = (uid) => {
	return new Promise((resolve, reject) => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/providerAdmins/${uid}`
			)
			.then((res) => {
				console.log("Response providerAdmins", res);
				if (res.data.success) {
					// let user = res.data.data.providerAdmin;
					resolve(res.data.data.providerAdmin);
				}
			})
			.catch((err) => {
				console.error("Error providerAdmins", err);
			});
	});
};

// Signup
export const signup = (formData) => {
	console.log("signup ", formData);
	return new Promise((resolve, reject) => {
		auth
			.createUserWithEmailAndPassword(formData.email, formData.password)
			.then((cred) => {
				console.log("User is register", cred.user.uid);
				var user = auth.currentUser;
				user
					.updateProfile({
						displayName: formData.firstName,
					})
					.then(function () {
						console.log("display update successful");
						saveRegisterUser(cred, formData)
							.then((res) => {
								resolve(res);
							})
							.catch((err) => {
								reject(err);
							});
					})
					.catch(function (err) {
						console.log("display update unsuccessful");
						reject(err.message);
					});
			})
			.catch((err) => {
				console.log("error " + err);
				reject(err.message);
			});
	});
};

const saveRegisterUser = (cred, formData) => {
	let userData = new Map();

	userData = {
		createdDate: Date().toLocaleString(),
		firstName: formData.firstName,
		lastName: formData.lastName,
		email: formData.email,
		emailVerified: cred.user.emailVerified,
		uid: cred.user.uid,
		userType: "Customer",
	};

	return new Promise((resolve, reject) => {
		firestore
			.collection("users")
			.doc(cred.user.uid)
			.set(userData)
			.then(() => {
				console.log("save to firebase");
				getCustomerUser(cred.user.uid)
					.then((res) => {
						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			})
			.catch((err) => {
				console.log("firestore errorss " + err);
				reject(err.message);
			});
	});
};

export const getCustomerUser = (uid) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection("users")
			.doc(uid)
			.get()
			.then((snapshot) => {
				if (snapshot.exists) {
					const user = snapshot.data();
					resolve(user);
					// dispatch(saveUser(user));
				}
			})
			.catch((err) => {
				console.log("Error", err);
				reject(err.message);
			});
	});
};

// Passwrod login sign in with link
export const signInWithLink = (email, actionCodeSettings) => {
	return new Promise((resolve, reject) => {
		auth
			.sendSignInLinkToEmail(email, actionCodeSettings)
			.then(() => {
				let message = "Email send to " + email;
				resolve(message);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
export const onIsSignInWithEmailLink = (email, actionCodeSettings) => {
	return new Promise((resolve, reject) => {
		if (auth.isSignInWithEmailLink(window.location.href)) {
			auth
				.signInWithEmailLink(email, window.location.href)
				.then((res) => {
					resolve(res);
				})
				.catch((error) => {
					console.log("Error signInWithEmailLink", error);
					reject(error);
				});
		}
	});
};
