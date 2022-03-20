import {
	EMAIL_FOR_SIGNIN,
	REMOVE_EMAIL_FOR_SIGNIN,
} from "../../actions/Others/othersaction";

const initialCartState = {
	emailForSignIn: null,
};

export const otherReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case EMAIL_FOR_SIGNIN:
			return {
				emailForSignIn: action.payload,
			};
		case REMOVE_EMAIL_FOR_SIGNIN:
			return {
				emailForSignIn: null,
			};

		default:
			return state;
	}
};
