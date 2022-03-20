import React, { useState, useEffect } from "react";

import axios from "axios";

import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

import ToastBar from "../../components/ToastBar";

function EditableText({
	user,
	item,
	areaUpdateLoadingShow,
	areaUpdateLoadingDontShow,
}) {
	const [areaName, setAreaName] = useState(item.areaName);

	const { Toast } = ToastBar();

	function updateArea(value) {
		areaUpdateLoadingShow();
		// const data = {
		// 	provider: user.provider,
		// 	area: {
		// 		areaId: item.areaId,
		// 		name: value,
		// 		defaultName: item.defaultName,
		// 		currentValue: item.currentValue,
		// 		info: item.info,
		// 	},
		// };

		const data = {
			providerId: user.provider,
			adminId: user.uid,
			area: {
				areaId: item.areaId,
				areaName: value,
			},
		};

		console.log("data", data);
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/areas/" +
					item.areaId,
				data
			)
			.then((response) => {
				console.log("Area Update response ", response);
				if (response.data.success) {
					setAreaName(response.data.data.areaName);
					areaUpdateLoadingDontShow();
					Toast("Update Successfully", "success");
				}
			})
			.catch((error) => {
				if (!error.response.data.success) {
					areaUpdateLoadingDontShow();

					Toast("Update Failed", "error");
				}
				console.log("error", error.response);
			});
	}

	const handleSave = ({ name, value, previousValue }) => {
		console.log(
			name + " saved as: " + value + " (prev: " + previousValue + ")"
		);
		if (value != previousValue) {
			updateArea(value);
		} else {
			console.log("same");
		}
	};

	return (
		<EditText
			name="areaName"
			value={areaName}
			onChange={setAreaName}
			onSave={handleSave}
		/>
	);
}

export default EditableText;
