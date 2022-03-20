import React, { useState } from "react";

import axios from "axios";

import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

function EditableTextTable({
	user,
	selectedArea,
	selectedSection,
	item,
	updateTableListCallback,
}) {
	const [tableName, setTableName] = useState(item.tableName);

	function updateTable(value) {
		const data = {
			table: {
				tableId: item.tableId,
				tableName: value,
			},
		};
		console.log("data", data, selectedArea, selectedSection);
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/tables/" +
					item.tableId +
					"?providerId=" +
					user.provider +
					"&areaId=" +
					selectedArea +
					"&sectionId=" +
					selectedSection +
					"&adminId=" +
					user.uid,
				data
			)
			.then((response) => {
				updateTableListCallback();
				console.log("Table Update response ", response);
				setTableName(response.data.data.table.tableName);
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
			updateTable(value);
		} else {
			console.log("same");
		}
	};

	return (
		<EditText
			name="tableName"
			value={tableName}
			onChange={setTableName}
			onSave={handleSave}
		/>
	);
}

export default EditableTextTable;
