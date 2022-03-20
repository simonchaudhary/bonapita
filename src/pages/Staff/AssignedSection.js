import {useState, useEffect} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";

import Spinner from "react-spinkit";

import Axios from "../../apis/API";

// Functions
import TableContainer from "./TableContainer/TableContainer";

// Icons
import NoInternet from "../../components/NoInternet/NoInternet";

function AssignedSection() {
	const [updateTable, setUpdateTable] = useState(false);

	const {tableList, sectionLoading} = AssignedSectionLogic(updateTable);

	const tableCallback = () => {
		setUpdateTable(!updateTable);
	};

	return (
		<Container>
			{sectionLoading ? (
				<Center>
					<Spinner name="double-bounce" color="#d65a31" />
				</Center>
			) : (
				<>
					{tableList === null ? (
						<Center>
							<h4>No Section Assigned Yet</h4>
						</Center>
					) : tableList === "No Internet" ? (
						<NoInternet />
					) : tableList.tables.length === 0 ? (
						<Center>
							<h4>No Table added in this Section</h4>
						</Center>
					) : (
						<>
							{tableList.tables?.map((item, i) => (
								<TableContainer
									key={i}
									item={item}
									areaId={tableList.areaId}
									sectionId={tableList.sectionId}
									tableCallback={tableCallback}
								/>
							))}
						</>
					)}
				</>
			)}
		</Container>
	);
}

const Container = styled.div`
	/* background: red; */
	height: calc(100vh - 70px);
	overflow-y: auto;

	@media only screen and (min-width: 100px) and (max-width: 480px) {
		font-size: 0.75rem;
		height: calc(100vh - 60px);
	}
`;

const Center = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const AssignedSectionLogic = (updateTable) => {
	const user = useSelector((state) => state.user?.user);

	const [sectionLoading, setSectionLoading] = useState(false);
	const [tableList, setTableList] = useState(null);

	useEffect(() => {
		setSectionLoading(true);
		Axios.get(
			"/staff/" +
				user?.uid +
				"/section/assigned-section?providerId=" +
				user?.provider
		)
			.then((response) => {
				if (response?.data.success) {
					console.log("Response Get Assign Section", response);
					setTableList(response?.data?.data);
					setSectionLoading(false);
				}
			})
			.catch((error) => {
				console.log(
					"Error  Get Assign Section",
					error,
					error.toJSON().message
				);
				if (
					error.toJSON().message === "Request failed with status code 404"
				) {
					setTableList(null);
					setSectionLoading(false);
				}
				if (error.toJSON().message === "Network Error") {
					setTableList("No Internet");
					setSectionLoading(false);
				}
			});
	}, [updateTable]);

	return {tableList, sectionLoading};
};

export default AssignedSection;

// Main branch

// import { useState, useContext, useEffect } from "react";
// import styled from "styled-components";
// import { useSelector } from "react-redux";

// import Spinner from "react-spinkit";

// import Axios from "../../apis/API";

// // Functions
// import TableContainer from "./TableContainer";

// function AssignedSection() {
// 	const { tableList, sectionLoading } = AssignedSectionLogic();

// 	return (
// 		<Container>
// 			{sectionLoading ? (
// 				<Center>
// 					<Spinner name="double-bounce" color="#d65a31" />
// 				</Center>
// 			) : (
// 				<>
// 					{tableList === null ? (
// 						<Center>
// 							<h4>No Section Assigned Yet</h4>
// 						</Center>
// 					) : tableList.tables.length === 0 ? (
// 						<Center>
// 							<h4>No Table added in this Section</h4>
// 						</Center>
// 					) : (
// 						<>
// 							{tableList.tables?.map((item, i) => (
// 								<TableContainer
// 									key={i}
// 									item={item}
// 									areaId={tableList.areaId}
// 									sectionId={tableList.sectionId}
// 								/>
// 							))}
// 						</>
// 					)}
// 				</>
// 			)}
// 		</Container>
// 	);
// }

// const Container = styled.div`
// 	/* background: red; */
// 	height: calc(100vh - 70px);
// 	overflow-y: auto;

// 	@media only screen and (min-width: 100px) and (max-width: 480px) {
// 		font-size: 0.75rem;
// 		height: calc(100vh - 60px);
// 	}
// `;

// const Center = styled.div`
// 	position: absolute;
// 	top: 50%;
// 	left: 50%;
// 	transform: translate(-50%, -50%);
// `;

// const AssignedSectionLogic = () => {
// 	const user = useSelector((state) => state.user.user);

// 	const [sectionLoading, setSectionLoading] = useState(false);
// 	const [tableList, setTableList] = useState(null);

// 	useEffect(() => {
// 		setSectionLoading(true);
// 		Axios.get(
// 			"/staff/" +
// 				user?.uid +
// 				"/section/assigned-section?providerId=" +
// 				user?.provider
// 		)
// 			.then((response) => {
// 				if (response?.data.success) {
// 					console.log("Response Get Assign Section", response);
// 					setTableList(response?.data?.data);
// 					setSectionLoading(false);
// 				}
// 			})
// 			.catch((error) => {
// 				console.log("Error  Get Assign Section", error.response);
// 				setSectionLoading(false);
// 			});
// 	}, []);

// 	return { tableList, sectionLoading };
// };

// export default AssignedSection;
