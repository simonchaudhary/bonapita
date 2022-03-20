import {useState, useEffect} from "react";
import {firestore} from "../../config/firebaseConfig";

export const useProviderDetail = (providerId = "") => {
	console.log("useProviderDetail providerid", providerId);

	const [providerDetail, setProviderDetail] = useState(null);

	useEffect(() => {
		firestore
			.collection("Providers")
			.doc(providerId)
			.onSnapshot((doc) => {
				console.log("provider detail realtime", doc?.data());
				setProviderDetail(doc?.data());
			});
	}, []);

	return {providerDetail};
};

export const useProviderPageInfo = (providerId = "") => {
	console.log("useProviderPageInfo providerid", providerId);

	const [providerPageInfo, setProviderPageInfo] = useState(null);

	useEffect(() => {
		firestore
			.collection("Providers")
			.doc(providerId)
			.collection("Page-info")
			.doc("main")
			.onSnapshot((doc) => {
				console.log("provider pageInfo realtime", doc?.data());
				setProviderPageInfo(doc?.data());
			});
	}, []);

	return {providerPageInfo};
};
