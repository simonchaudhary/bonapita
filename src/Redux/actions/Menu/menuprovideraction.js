// Package
import axios from "axios";

// import clearAction
import { fetchFood, clearFoodAction } from "./foodaction";
import { fetchBeverage, clearBeverageAction } from "./beverageaction";

export const FETCH_PROVIDER_REQUEST = "FETCH_PROVIDER_REQUEST";
export const FETCH_PROVIDER_SUCCESS = "FETCH_PROVIDER_SUCCESS";
export const FETCH_PROVIDER_FAILURE = "FETCH_PROVIDER_FAILURE";
export const CLEAR_PROVIDER = "CLEAR_PROVIDER";

// Actions
export const fetchProviderRequestAction = () => {
	return {
		type: FETCH_PROVIDER_REQUEST,
	};
};
export const fetchProviderSuccessAction = (data) => {
	return {
		type: FETCH_PROVIDER_SUCCESS,
		payload: data,
	};
};
export const clearProviderAction = () => {
	return {
		type: CLEAR_PROVIDER,
	};
};
export const fetchProviderFailureAction = (error) => {
	return {
		type: FETCH_PROVIDER_FAILURE,
		payload: error,
	};
};

export const fetchProvider = (providerId) => {
	console.log("Fetch Provider Actionss", providerId);

	return (dispatch, getState) => {
		console.log("Fetch Provider state", getState().menus);
		let menus = getState().menus;

		if (!menus.provider?.data) {
			console.log(" Fetch Provider provider null");
			fetchProviderAfterCheck(dispatch, providerId);
		} else if (menus.provider?.data?.providerDetail?.id != providerId) {
			console.log(" Fetch Provider provider not same");
			dispatch(clearMenuAction());
			fetchProviderAfterCheck(dispatch, providerId);
		}
	};
};

const fetchProviderAfterCheck = (dispatch, providerId) => {
	dispatch(fetchProviderRequestAction());
	// Fetch food
	dispatch(fetchFood(providerId));
	// Fetch Beverage
	dispatch(fetchBeverage(providerId));
	axios
		.get(
			`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerId}/page-info`
		)
		.then((res) => {
			console.log("Response getProvider Info", res);
			getProviderDetail(dispatch, providerId, res.data.data.pageInfo);
		})
		.catch((err) => {
			console.error("Error getProvider Info", err.response);
			dispatch(
				fetchProviderFailureAction(err?.response?.data?.data?.toString())
			);
		});
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
				dispatch(fetchProviderSuccessAction(data));
			}
		})
		.catch((err) => {
			console.error("Error Provider Detail", err);
			dispatch(
				fetchProviderFailureAction(err?.response?.data?.data?.toString())
			);
		});
};

// Clear Menu
export const clearMenuAction = () => {
	return (dispatch) => {
		dispatch(clearProviderAction());
		dispatch(clearFoodAction());
		dispatch(clearBeverageAction());
	};
};
