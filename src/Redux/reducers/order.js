export const selectSearchItemNDetailsReducer = (state = null, action) => {
	switch (action.type) {
		case "SELECT_SEARCH_ITEM_N_DETAIL":
			return action.payload;
		case "SELECT_SEARCH_EMPTY":
			return null;
		default:
			return state;
	}
};

// My recent order
export const selectMyRecentOrderReducer = (state = null, action) => {
	switch (action.type) {
		case "SELECTED_RECENT_ORDER":
			return action.payload;

		case "DELETE_SELECTED_RECENT_ORDER":
			return null;

		default:
			return state;
	}
};

// Cart
const initialCartState = {
	cart: [],
};

export const cartReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case "ADD_CART":
			return {
				...state,
				cart: action.payload,
			};
		case "EMPTY_CART":
			return {
				...state,
				cart: [],
			};

		case "ADD_IITEM_TO_CART":
			return {
				...state,
				cart: [...state.cart, action.payload],
			};

		case "REMOVE_IITEM_TO_CART":
			let selectItemId = action.payload.uuid;
			let data = state.cart;

			let index = 0;
			for (let i = 0; i < data.length; i++) {
				if (data[i].uuid === selectItemId) {
					index = i;
					break;
				}
			}
			if (index > -1) {
				data.splice(index, 1);
				console.log("Result", data);
			}
			return {
				...state,
				cart: [...data],
			};

		case "ADD_SPECIAL_INSTRUCTION_TO_ITEM":
			return {
				...state,
				cart: [
					...state.cart.map((item, i) => {
						if (item.uuid === action.payload.item.uuid) {
							return {
								...item,
								specialInstruction:
									action.payload.specialInstruction,
							};
						}
						return item;
					}),
				],
			};

		default:
			return state;
	}
};

const initialCreateOrder = {
	channel: null,
	providerId: null,
};

export const Order = (state = initialCreateOrder, action) => {
	switch (action.type) {
		case "SET_CHANNEL":
			return {
				...state,
				channel: action.payload,
			};
		case "SET_PROVIDER_ID":
			return {
				...state,
				providerId: action.payload,
			};
		default:
			return state;
	}
};
