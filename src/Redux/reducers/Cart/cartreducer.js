import {
	EMPTY_CART,
	ADD_CART,
	ADD_IITEM_TO_CART,
	REMOVE_IITEM_TO_CART,
	ADD_SPECIAL_INSTRUCTION_TO_ITEM,
	SAVE_USER_FOR_CART,
	SAVE_PROVIDER_FOR_CART,
} from "../../actions/Cart/cartaction";

const initialCartState = {
	user: "",
	provider: "",
	cart: [],
};

export const cartReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case SAVE_USER_FOR_CART:
			return {
				...state,
				user: action.payload,
			};
		case SAVE_PROVIDER_FOR_CART:
			return {
				...state,
				provider: action.payload,
			};
		case EMPTY_CART:
			return {
				...state,
				cart: [],
			};
		case ADD_CART:
			return {
				...state,
				cart: action.payload,
			};

		case ADD_IITEM_TO_CART:
			return {
				...state,
				cart: [...state.cart, action.payload],
			};

		case REMOVE_IITEM_TO_CART:
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

		case ADD_SPECIAL_INSTRUCTION_TO_ITEM:
			return {
				...state,
				cart: [
					...state.cart.map((item, i) => {
						if (item.uuid === action.payload.item.uuid) {
							return {
								...item,
								specialInstructions: action.payload.specialInstruction,
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
