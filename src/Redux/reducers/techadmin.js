const initialValue = {
	provider: null,
};

export const saveProviderTAReducer = (state = initialValue, action) => {
	switch (action.type) {
		case "SAVE_PROVIDER_TA":
			return {
				...state,
				provider: action.payload,
			};
		case "REMOVE_PROVIDER_TA":
			return {
				...state,
				provider: action.payload,
			};

		default:
			return state;
	}
};
