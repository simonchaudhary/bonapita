import React, {useState, useEffect} from "react";

// Package
import axios from "axios";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

// Component
import {TableContainer, TableList, ButtonContainer} from "./TableStyle";
import TableItem from "./TableItem";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";
import ToastBar from "../../../../components/ToastBar";

function Table() {
	const {areaId} = useParams();
	const {sectionId} = useParams();

	// Redux State
	const user = useSelector((state) => state.user.user);

	// Table hooks
	const [tablesList, setTablesList] = useState(null);
	const [isTableListUpdate, setIsTableListUpdate] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	// UI
	const {Toast} = ToastBar();

	useEffect(() => {
		getTableList();
	}, [isTableListUpdate]);

	const getTableList = () => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/tables?providerId=" +
					user?.provider +
					"&areaId=" +
					areaId +
					"&sectionId=" +
					sectionId
			)
			.then((response) => {
				console.log("Response tablelist", response);
				if (response.data.success) {
					setTablesList(response?.data?.data?.tables);
				}
			})
			.catch((err) => {
				console.error("Response tablelist", err.response);
			});
	};
	// Add table
	const addTable = () => {
		setIsLoading(true);
		axios
			.post(
				// "https://us-central1-afoodie-6d649.cloudfunctions.net/dining/tables/",
				// data

				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/tables?providerId=" +
					user?.provider +
					"&areaId=" +
					areaId +
					"&sectionId=" +
					sectionId +
					"&adminId=" +
					user?.uid
			)
			.then((response) => {
				console.log("Add Table response ", response);
				setIsTableListUpdate(!isTableListUpdate);
				Toast("Table Added Successfully", "success");
				setIsLoading(false);
			})
			.catch((error) => {
				console.log("error", error);
				setIsLoading(false);
			});
	};

	const tableItemCallBack = () => {
		setIsTableListUpdate(!isTableListUpdate);
	};

	return (
		<TableContainer>
			<h5>Tables</h5>
			<TableList>
				{tablesList?.length === 0 ? (
					<h3>Table Empty</h3>
				) : tablesList === null ? (
					<h3>Loading...</h3>
				) : (
					<>
						{tablesList?.map((item, i) => (
							<TableItem
								key={i}
								item={item}
								areaId={areaId}
								sectionId={sectionId}
								tableItemCallBack={tableItemCallBack}
							/>
						))}
					</>
				)}
			</TableList>
			<ButtonContainer>
				<ButtonNLoading
					onClick={addTable}
					title="Add Table"
					color="white"
					isLoading={isLoading}
				/>
			</ButtonContainer>
		</TableContainer>
	);
}

export default Table;
