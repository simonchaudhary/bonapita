import React from "react";
import {ButtonLoading, PrimaryButton, SecondaryButton} from "../Button";

const ConfirmModal = ({title, deleteDone, cancel, isLoading}) => {
	return (
		<div>
			<p className="text-lg font-medium">{title}</p>
			<div className="flex items-center justify-end mt-2">
				<div className="w-24 mr-3">
					<ButtonLoading
						color="white"
						title="Ok"
						onClick={deleteDone}
						isLoading={isLoading}
					/>
				</div>
				{/* <PrimaryButton title="Ok" onClick={deleteDone} className="mr-2" /> */}
				<SecondaryButton title="Cancel" onClick={cancel} />
			</div>
		</div>
	);
};

export default ConfirmModal;
