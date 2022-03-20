const smsEnableReducer = (state = false, action) => {
	switch (action.type) {
		case "SMS_ENABLE":
			return action.payload;
		default:
			return state;
	}
};

export default smsEnableReducer;
