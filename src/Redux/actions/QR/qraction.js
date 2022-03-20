export const SAVE_QR_DETAIL = "SAVE_QR_DETAIL";
export const SELECTED_GUEST = "SELECTED_GUEST";
export const SAVE_NO_OF_GUEST = "SAVE_NO_OF_GUEST";
export const SPLIT_ORDER_PAY_TYPE = "SPLIT_ORDER_PAY_TYPE";
export const QR_ORDER_TYPE = "QR_ORDER_TYPE";
export const SAVE_GUEST_NO = "SAVE_GUEST_NO";

// QR Scan
export const saveQRDetailAction = (data) => {
	return {
		type: SAVE_QR_DETAIL,
		payload: data,
	};
};
export const saveSelectedGuestAction = (data) => {
	return {
		type: SELECTED_GUEST,
		payload: data,
	};
};
export const saveNoOfGuest = (data) => {
	return {
		type: SAVE_NO_OF_GUEST,
		payload: data,
	};
};
export const saveGuestNo = (data) => {
	return {
		type: SAVE_GUEST_NO,
		payload: data,
	};
};
export const saveSplitOrderPayType = (data) => {
	return {
		type: SPLIT_ORDER_PAY_TYPE,
		payload: data,
	};
};

export const saveQROrderTypeAction = (data) => {
	return {
		type: QR_ORDER_TYPE,
		payload: data,
	};
};
