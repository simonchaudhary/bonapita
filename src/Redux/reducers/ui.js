export const dialogBoxReducer = (state = false, action) => {
	switch (action.type) {
		case "DIALOG_BOX":
			return !state;
		default:
			return state;
	}
};

export const isQRCameraOpenReducer = (state = false, action) => {
	switch (action.type) {
		case "IS_QR_CAMERA_OPEN":
			return action.payload;
		default:
			return state;
	}
};

// Proivder admin
// Manage Dine In

const initState = {
	area: null,
	section: null,
	table: null,
	guest: null,
};

export const manageDineBreadcrumbsReducer = (state = initState, action) => {
	switch (action.type) {
		case "SET_AREA":
			return {
				...state,
				area: action.payload,
			};
		case "SET_SECTION":
			return {
				...state,
				section: action.payload,
			};
		case "SET_TABLE":
			return {
				...state,
				table: action.payload,
			};
		case "SET_GUEST":
			return {
				...state,
				guest: action.payload,
			};
		default:
			return state;
	}
};
