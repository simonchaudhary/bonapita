// Users
import {
	saveUser,
	removeUser,
	fetchUserProviderDetail,
} from "./User/useraction";

// QR
import {
	saveQRDetailAction,
	saveSelectedGuestAction,
	saveNoOfGuest,
	saveSplitOrderPayType,
	saveQROrderTypeAction,
	saveGuestNo,
} from "./QR/qraction";

// Others
import {
	emailForSignInAction,
	removeEmailForSignInAction,
} from "./Others/othersaction";

// Menu
// provider
import {
	fetchProvider,
	clearProviderAction,
	clearMenuAction,
} from "./Menu/menuprovideraction";
// Food
import { fetchFood, clearFoodAction } from "./Menu/foodaction";
// Beverage
import { fetchBeverage, clearBeverageAction } from "./Menu/beverageaction";

// ProviderAdmin
import { tabSelected } from "./ProviderAdmin/orderanalysisaction";

// Cart
import {
	emptyCartAction,
	addCartAction,
	addItemToCartAction,
	removeItemToCartAction,
	addSpecialInstructionToItemAction,
	checkUserProviderForCart,
	saveUserForCart,
	saveProviderForCart,
} from "./Cart/cartaction";

const smsEnableAction = (data) => {
	return {
		type: "SMS_ENABLE",
		payload: data,
	};
};

// Users
const loggedStatus = (data) => {
	return {
		type: "LOG_IN",
		payload: data,
	};
};

// Order
const selectSearchItemNDetailsAction = (data) => {
	return {
		type: "SELECT_SEARCH_ITEM_N_DETAIL",
		payload: data,
	};
};
const selectSearchItemEmptyAction = () => {
	return {
		type: "SELECT_SEARCH_EMPTY",
	};
};
const setChannelAction = (data) => {
	return {
		type: "SET_CHANNEL",
		payload: data,
	};
};
const setProviderIdAction = (data) => {
	return {
		type: "SET_PROVIDER_ID",
		payload: data,
	};
};

// Cart
// const emptyCartAction = () => {
// 	return {
// 		type: "EMPTY_CART",
// 	};
// };
// const addCartAction = (data) => {
// 	return {
// 		type: "ADD_CART",
// 		payload: data,
// 	};
// };
// const addItemToCartAction = (data) => {
// 	return {
// 		type: "ADD_IITEM_TO_CART",
// 		payload: data,
// 	};
// };
// const removeItemToCartAction = (data) => {
// 	return {
// 		type: "REMOVE_IITEM_TO_CART",
// 		payload: data,
// 	};
// };

// const addSpecialInstructionToItemAction = (data) => {
// 	return {
// 		type: "ADD_SPECIAL_INSTRUCTION_TO_ITEM",
// 		payload: data,
// 	};
// };

// Tech Admin
const saveProviderTAAction = (data) => {
	return {
		type: "SAVE_PROVIDER_TA",
		payload: data,
	};
};
const removeProviderTAAction = () => {
	return {
		type: "REMOVE_PROVIDER_TA",
		payload: null,
	};
};

// My Recent Orders
const selectedMyRecentOrderAction = (data) => {
	return {
		type: "SELECTED_RECENT_ORDER",
		payload: data,
	};
};
const deleteSelectedMyRecentOrderAction = () => {
	return {
		type: "DELETE_SELECTED_RECENT_ORDER",
	};
};

// UI
// Open Login Modal

// QR Camera close
const isQRCameraOpenAction = (data) => {
	return {
		type: "IS_QR_CAMERA_OPEN",
		payload: data,
	};
};

// Provider Admin
// Manage dine in breadcrumb
const setAreaAction = (data) => {
	return {
		type: "SET_AREA",
		payload: data,
	};
};
const setSectionAction = (data) => {
	return {
		type: "SET_SECTION",
		payload: data,
	};
};
const setTableAction = (data) => {
	return {
		type: "SET_TABLE",
		payload: data,
	};
};
const setGuestAction = (data) => {
	return {
		type: "SET_GUEST",
		payload: data,
	};
};

export {
	smsEnableAction,
	loggedStatus,
	saveUser,
	removeUser,
	fetchUserProviderDetail,
	selectSearchItemNDetailsAction,
	selectSearchItemEmptyAction,
	setChannelAction,
	setProviderIdAction,
	// QR
	saveQROrderTypeAction,
	saveQRDetailAction,
	saveSplitOrderPayType,
	saveSelectedGuestAction,
	saveNoOfGuest,
	saveGuestNo,
	// TA
	saveProviderTAAction,
	removeProviderTAAction,
	selectedMyRecentOrderAction,
	deleteSelectedMyRecentOrderAction,
	// UI
	isQRCameraOpenAction,
	// Provider admin
	setAreaAction,
	setSectionAction,
	setTableAction,
	setGuestAction,
	// Provider Admin
	tabSelected,
	// Menu
	fetchProvider,
	clearProviderAction,
	fetchFood,
	clearFoodAction,
	fetchBeverage,
	clearBeverageAction,
	clearMenuAction,
	// Cart
	emptyCartAction,
	addCartAction,
	addItemToCartAction,
	removeItemToCartAction,
	addSpecialInstructionToItemAction,
	checkUserProviderForCart,
	// Others
	emailForSignInAction,
	removeEmailForSignInAction,
};
