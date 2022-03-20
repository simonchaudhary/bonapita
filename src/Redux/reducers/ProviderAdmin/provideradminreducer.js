import { TAB_SELECTED } from "../../actions/ProviderAdmin/orderanalysisaction";

const initialState = {
	orderAnalysis: {
		selectedTabMenu: "archiveOrder",
	},
};

// UI OrderAnalysis
export const providerAdminReducer = (state = initialState, action) => {
	switch (action.type) {
		case TAB_SELECTED:
			console.log("tab selected", action.payload);
			return {
				...state,
				orderAnalysis: {
					selectedTabMenu: action.payload,
				},
			};

		default:
			return state;
	}
};
