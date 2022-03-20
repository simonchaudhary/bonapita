import { SAVE_USER, REMOVE_USER } from "../../actions/User/useraction";

import {
	FETCH_USER_PROVIDER_REQUEST,
	FETCH_USER_PROVIDER_SUCCESS,
	FETCH_USER_PROVIDER_FAILURE,
} from "../../actions/User/useraction";

const initialState = {
	user: null,
	providerDetail: {
		loading: false,
		data: null,
		error: "",
	},
};

const saveUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_USER:
			return {
				...state,
				user: action.payload,
			};
		case REMOVE_USER:
			return {
				user: null,
				providerDetail: {
					loading: false,
					data: null,
					error: "",
				},
			};

		// Provider
		case FETCH_USER_PROVIDER_REQUEST:
			return {
				...state,
				providerDetail: {
					loading: true,
					data: null,
					error: "",
				},
			};
		case FETCH_USER_PROVIDER_SUCCESS:
			return {
				...state,
				providerDetail: {
					loading: false,
					data: action.payload,
					error: "",
				},
			};
		case FETCH_USER_PROVIDER_FAILURE:
			return {
				...state,
				providerDetail: {
					loading: false,
					data: null,
					error: action.payload,
				},
			};

		default:
			return state;
	}
};

export default saveUserReducer;
