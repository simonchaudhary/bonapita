import React from "react";
import {ButtonLoading, PrimaryButton, SecondaryButton} from "../Button";

const AlertModal = ({title, ok}) => {
	return (
		<div>
			<p className="text-lg font-medium">{title}</p>
			<div className="flex items-center justify-end mt-2">
				<PrimaryButton title="Ok" onClick={ok} className="mr-2" />
			</div>
		</div>
	);
};

export default AlertModal;
