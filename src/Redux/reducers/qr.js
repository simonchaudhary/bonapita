import {
	SAVE_QR_DETAIL,
	SELECTED_GUEST,
	SAVE_NO_OF_GUEST,
	SPLIT_ORDER_PAY_TYPE,
	QR_ORDER_TYPE,
	SAVE_GUEST_NO,
} from "../actions/QR/qraction";

export const saveQRDetailReducer = (state = null, action) => {
	switch (action.type) {
		case SAVE_QR_DETAIL:
			return action.payload;

		case SAVE_NO_OF_GUEST:
			return {
				...state,
				noOfGuest: action.payload,
			};
		case SAVE_GUEST_NO:
			return {
				...state,
				guestNo: action.payload,
			};

		case SELECTED_GUEST:
			return {
				...state,
				selectedGuest: action.payload,
			};

		case SPLIT_ORDER_PAY_TYPE:
			return {
				...state,
				splitOrderPayType: action.payload,
			};

		case QR_ORDER_TYPE:
			return {
				...state,
				orderType: action.payload,
			};
		default:
			return state;
	}
};
