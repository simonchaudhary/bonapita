import {
	FETCH_FOOD_REQUEST,
	FETCH_FOOD_SUCCESS,
	FETCH_FOOD_FAILURE,
	CLEAR_FOOD,
} from "../../actions/Menu/foodaction";

import {
	FETCH_BEVERAGE_REQUEST,
	FETCH_BEVERAGE_SUCCESS,
	FETCH_BEVERAGE_FAILURE,
	CLEAR_BEVERAGE,
} from "../../actions/Menu/beverageaction";

import {
	FETCH_PROVIDER_REQUEST,
	FETCH_PROVIDER_SUCCESS,
	FETCH_PROVIDER_FAILURE,
	CLEAR_PROVIDER,
} from "../../actions/Menu/menuprovideraction";

const initialState = {
	provider: {
		loading: false,
		data: null,
		error: "",
	},
	food: {
		loading: true,
		data: null,
		error: "",
	},
	beverage: {
		loading: true,
		data: null,
		error: "",
	},
};

export const menusReducer = (state = initialState, action) => {
	switch (action.type) {
		// Provider
		case FETCH_PROVIDER_REQUEST:
			return {
				...state,
				provider: {
					...state.provider,
					loading: true,
				},
			};
		case FETCH_PROVIDER_SUCCESS:
			return {
				...state,
				provider: {
					loading: false,
					data: action.payload,
					error: "",
				},
			};
		case FETCH_PROVIDER_FAILURE:
			return {
				...state,
				provider: {
					loading: false,
					data: null,
					error: action.payload,
				},
			};
		case CLEAR_PROVIDER:
			return {
				...state,
				provider: {
					loading: false,
					data: null,
					error: "",
				},
			};

		// Food
		case FETCH_FOOD_REQUEST:
			return {
				...state,
				food: {
					...state.food,
					loading: true,
				},
			};
		case FETCH_FOOD_SUCCESS:
			return {
				...state,
				food: {
					loading: false,
					data: action.payload,
					error: "",
				},
			};
		case FETCH_FOOD_FAILURE:
			return {
				...state,
				food: {
					loading: false,
					data: null,
					error: action.payload,
				},
			};
		case CLEAR_FOOD:
			return {
				...state,
				food: {
					loading: true,
					data: null,
					error: "",
				},
			};

		// Beverage
		case FETCH_BEVERAGE_REQUEST:
			return {
				...state,
				beverage: {
					...state.beverage,
					loading: true,
				},
			};
		case FETCH_BEVERAGE_SUCCESS:
			return {
				...state,
				beverage: {
					loading: false,
					data: action.payload,
					error: "",
				},
			};
		case FETCH_BEVERAGE_FAILURE:
			return {
				...state,
				beverage: {
					loading: false,
					data: null,
					error: action.payload,
				},
			};
		case CLEAR_BEVERAGE:
			return {
				...state,
				beverage: {
					loading: true,
					data: null,
					error: "",
				},
			};
		default:
			return state;
	}
};
