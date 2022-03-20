export const EMPTY_CART = "EMPTY_CART";
export const ADD_CART = "ADD_CART";
export const ADD_IITEM_TO_CART = "ADD_IITEM_TO_CART";
export const REMOVE_IITEM_TO_CART = "REMOVE_IITEM_TO_CART";
export const ADD_SPECIAL_INSTRUCTION_TO_ITEM =
	"ADD_SPECIAL_INSTRUCTION_TO_ITEM";

export const SAVE_USER_FOR_CART = "SAVE_USER_FOR_CART";
export const SAVE_PROVIDER_FOR_CART = "SAVE_PROVIDER_FOR_CART";

// Functions
export const emptyCartAction = () => {
	return {
		type: "EMPTY_CART",
	};
};
export const addCartAction = (data) => {
	return {
		type: "ADD_CART",
		payload: data,
	};
};
export const addItemToCartAction = (data) => {
	return {
		type: "ADD_IITEM_TO_CART",
		payload: data,
	};
};
export const removeItemToCartAction = (data) => {
	return {
		type: "REMOVE_IITEM_TO_CART",
		payload: data,
	};
};

export const addSpecialInstructionToItemAction = (data) => {
	return {
		type: "ADD_SPECIAL_INSTRUCTION_TO_ITEM",
		payload: data,
	};
};
export const saveUserForCart = (data) => {
	return {
		type: "SAVE_USER_FOR_CART",
		payload: data,
	};
};
export const saveProviderForCart = (data) => {
	return {
		type: "SAVE_PROVIDER_FOR_CART",
		payload: data,
	};
};

// thunk actions
export const checkUserProviderForCart = (userUid, providerId) => {
	console.log("state checkUserProviderForCart", userUid, providerId);
	return (dispatch, getState) => {
		console.log("state", getState().cart);
		const cart = getState().cart;
		console.log("state user provicer", cart.user, cart.provider);

		if (
			cart.user === "" ||
			cart.user != userUid ||
			cart.provider === "" ||
			cart.provider != providerId
		) {
			console.log("state true");
			dispatch(saveUserForCart(userUid));
			dispatch(saveProviderForCart(providerId));
			dispatch(emptyCartAction());
		} else {
			console.log("Same user and Provfider on cart");
		}
	};
};
