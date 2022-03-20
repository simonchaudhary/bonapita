export const TAB_SELECTED = "TAB_SELECTED";

// UI
export const tabSelected = (data) => {
	return {
		type: TAB_SELECTED,
		payload: data,
	};
};
