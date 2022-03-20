import React from "react";
import {
	PrimaryButton,
	SecondaryButton,
} from "../../../components/buttons/buttons";

const DeleteModal = ({title = "", deleteItem, deleteItemNo}) => {
	return (
		<div className="w-full">
			<p>Are you sure want to delete {title} </p>
			<div className="mt-4 flex items-center justify-between ">
				<PrimaryButton className="mr-4" onClick={deleteItem}>
					Yes
				</PrimaryButton>
				<SecondaryButton onClick={deleteItemNo}>No</SecondaryButton>
			</div>
		</div>
	);
};

export default DeleteModal;
