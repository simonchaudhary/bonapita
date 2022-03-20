import React, { useState } from "react";

import axios from "axios";

import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

function EditableTextGuest({
	user,
	selectedArea,
	selectedSection,
	selectedTable,
	item,
}) {
	const [guestName, setGuestName] = useState(item.guestName);

	function updateGuest(value) {
		const data = {
			guest: {
				guestId: item.guestId,
				guestName: value,
			},
		};
		console.log("data", data);
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/guests/" +
					item.guestId +
					"?providerId=" +
					user.provider +
					"&areaId=" +
					selectedArea +
					"&sectionId=" +
					selectedSection +
					"&tableId=" +
					selectedTable +
					"&adminId=" +
					user.uid,
				data
			)
			.then((response) => {
				console.log("Guest Update response ", response);
				setGuestName(response.data.data.guest.guestName);
			})
			.catch((error) => {
				console.log("error", error);
			});
	}

	const handleSave = ({ name, value, previousValue }) => {
		console.log(
			name + " saved as: " + value + " (prev: " + previousValue + ")"
		);
		if (value != previousValue) {
			updateGuest(value);
		} else {
			console.log("same");
		}
	};

	return (
		<EditText
			name="guestName"
			value={guestName}
			onChange={setGuestName}
			onSave={handleSave}
		/>
	);
}

export default EditableTextGuest;
