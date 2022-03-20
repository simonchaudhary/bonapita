import React, { useState } from "react";

import axios from "axios";

import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

// Component
import ToastBar from "../../components/ToastBar";

function EditableTextSection({
	user,
	selectedArea,
	item,
	updateSectionListCallback,
}) {
	const [sectionName, setsectionName] = useState(item.sectionName);

	const { Toast } = ToastBar();

	function updateSection(value) {
		const data = {
			providerId: user.provider,
			areaId: selectedArea,
			adminId: user.uid,
			section: {
				sectionId: item.sectionId,
				sectionName: value,
			},
		};
		console.log("data", data);
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/sections/" +
					item.sectionId,
				data
			)
			.then((response) => {
				console.log("Section Update response ", response);

				if (response.data.success) {
					// Toast("Section Update Successfully", "success");
					updateSectionListCallback();
					setsectionName(response.data.data.section.sectionName);

					Toast("Update Successfully", "success");
				}
			})
			.catch((error) => {
				if (!error.response.data.success) {
					Toast("Update Failed", "error");
				}
			});
	}

	const handleSave = ({ name, value, previousValue }) => {
		console.log(
			name + " saved as: " + value + " (prev: " + previousValue + ")"
		);
		if (value != previousValue) {
			updateSection(value);
		} else {
			console.log("same");
		}
	};

	return (
		<EditText
			name="sectionName"
			value={sectionName}
			onChange={setsectionName}
			onSave={handleSave}
		/>
	);
}

export default EditableTextSection;
