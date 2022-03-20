import axios from "axios";

// Add Provider
export const addProvider = (formData) => {
	let data = {
		name: formData.name,
		phoneNumber: [formData.phoneNumber1, formData.phoneNumber2],
		email: formData.email,
		website: formData.website,
		address: formData.address,
		payFirst: formData.payFirst,
	};
	let id =
		formData.name.replaceAll(" ", "_") +
		"___" +
		formData.address.replaceAll(" ", "_");

	console.log("Data ", data, id);

	return new Promise((resolve, reject) => {
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/provider/" +
					id,
				data
			)
			.then((res) => {
				// console.log("Response create a provider", res);
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

// Get Techadmin
export const getTechAdmin = () => {
	return new Promise((resolve, reject) => {
		axios
			.get(`https://us-central1-afoodie-6d649.cloudfunctions.net/techAdmins`)
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
