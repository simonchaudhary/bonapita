// Package
import {useToasts} from "react-toast-notifications";

function ToastBar() {
	const {addToast} = useToasts();

	const Toast = (message, type) => {
		addToast(message, {
			appearance: type,
			autoDismiss: true,
			autoDismissTimeout: 2000,
		});
	};

	return {Toast};
}

export default ToastBar;
