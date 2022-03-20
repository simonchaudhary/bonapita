export const EMAIL_FOR_SIGNIN = "EMAIL_FOR_SIGNIN";
export const REMOVE_EMAIL_FOR_SIGNIN = "REMOVE_EMAIL_FOR_SIGNIN";

// Functions
export const emailForSignInAction = (data) => {
	return {
		type: EMAIL_FOR_SIGNIN,
		payload: data,
	};
};
export const removeEmailForSignInAction = () => {
	return {
		type: REMOVE_EMAIL_FOR_SIGNIN,
	};
};
