// Package
import axios from "axios";

// Save user detail from user Collection (firebase)
export const SAVE_USER = "SAVE_USER";
export const REMOVE_USER = "REMOVE_USER";

// Save provider details like (location,logo,address and others)
export const FETCH_USER_PROVIDER_REQUEST = "FETCH_USER_PROVIDER_REQUEST";
export const FETCH_USER_PROVIDER_SUCCESS = "FETCH_USER_PROVIDER_SUCCESS";
export const FETCH_USER_PROVIDER_FAILURE = "FETCH_USER_PROVIDER_FAILURE";

// save user
export const saveUser = (user) => {
	return {
		type: SAVE_USER,
		payload: user,
	};
};
// remove user
export const removeUser = () => {
	return {
		type: REMOVE_USER,
	};
};

// Actions
export const fetchUserProviderRequestAction = () => {
	return {
		type: FETCH_USER_PROVIDER_REQUEST,
	};
};
export const fetchUserProviderSuccessAction = (data) => {
	return {
		type: FETCH_USER_PROVIDER_SUCCESS,
		payload: data,
	};
};
export const fetchUserProviderFailureAction = (error) => {
	return {
		type: FETCH_USER_PROVIDER_FAILURE,
		payload: error,
	};
};

export const fetchUserProviderDetail = (providerId) => {
	console.log("Fetch User Provider Action", providerId);

	return (dispatch) => {
		dispatch(fetchUserProviderRequestAction());
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerId}/page-info`
			)
			.then((res) => {
				console.log("Response getProvider Info", res);
				getProviderDetail(dispatch, providerId, res.data.data.pageInfo);
			})
			.catch((err) => {
				console.error("Error getProvider Info", err?.response);
				dispatch(
					fetchUserProviderFailureAction(
						err?.response?.data?.data?.toString()
					)
				);
			});
	};
};

const getProviderDetail = (dispatch, providerId, pageInfo) => {
	axios
		.get(
			`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerId}`
		)
		.then((res) => {
			console.log("Response Provider Detail", res);
			if (res.data.success) {
				let modify = res.data.data.provider?.tags;
				modify?.splice(0, 0, { name: "all", imageUrl: "" });
				let data = {
					pageInfo: pageInfo,
					providerDetail: res.data.data.provider,
				};
				console.log("Provider", data);
				dispatch(fetchUserProviderSuccessAction(data));
			}
		})
		.catch((err) => {
			console.error("Error Provider Detail", err);
			dispatch(
				fetchUserProviderFailureAction(err?.response?.data?.data.toString())
			);
		});
};
