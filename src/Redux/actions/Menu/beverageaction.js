// Package
import axios from "axios";

export const FETCH_BEVERAGE_REQUEST = "FETCH_BEVERAGE_REQUEST";
export const FETCH_BEVERAGE_SUCCESS = "FETCH_BEVERAGE_SUCCESS";
export const FETCH_BEVERAGE_FAILURE = "FETCH_BEVERAGE_FAILURE";
export const CLEAR_BEVERAGE = "CLEAR_BEVERAGE";

// Actions
export const fetchBeverageRequestAction = () => {
	return {
		type: FETCH_BEVERAGE_REQUEST,
	};
};
export const fetchBeverageSuccessAction = (data) => {
	return {
		type: FETCH_BEVERAGE_SUCCESS,
		payload: data,
	};
};
export const fetchBeverageFailureAction = (error) => {
	return {
		type: FETCH_BEVERAGE_FAILURE,
		payload: error,
	};
};
// Empty Storage
export const clearBeverageAction = () => {
	return {
		type: CLEAR_BEVERAGE,
	};
};

export const fetchBeverage = (providerId) => {
	console.log("Fetch Beverage Action", providerId);
	return (dispatch, getState) => {
		let menus = getState().menus;

		if (!menus.beverage?.data) {
			fetchBeverageAfterCheck(dispatch, providerId);
		} else {
			console.log("Beverages Already loaded to redux");
		}
	};
};

const fetchBeverageAfterCheck = (dispatch, providerId) => {
	dispatch(fetchBeverageRequestAction());
	axios
		.get(
			// `https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerId}/display-rank?sortType=asc&itemType=beverage`
			`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/v2/${providerId}/display-rank?sortType=asc&itemType=beverage`
		)
		.then((res) => {
			console.log("Response GetBeverageList", res);
			dispatch(fetchBeverageSuccessAction(res.data.data));
			// filterListByTag(dispatch, res.data.data);
		})
		.catch((err) => {
			console.error("Error GetBeverageList", err.response);
			dispatch(fetchBeverageFailureAction(err.response?.toString()));
		});
};
