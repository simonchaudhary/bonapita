import { auth } from "../config/firebaseConfig";
import ToastBar from "../components/ToastBar";

import { redirectBaseURL } from "../apis/baseURL";

var actionCodeSettings = {
	url: redirectBaseURL + "login",
};

export const passwordResetEmail = (email) => {
	const { Toast } = ToastBar();

	console.log("passwordResetEmail");

	auth
		.sendPasswordResetEmail(email, actionCodeSettings)
		.then(function () {
			Toast(
				`An email has been sent to ${email} for reset password`,
				"success"
			);
		})
		.catch(function (error) {
			// Error occurred. Inspect error.code.
		});
};
