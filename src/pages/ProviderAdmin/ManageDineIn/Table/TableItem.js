import {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import Spinner from "react-spinkit";
import {useSelector, useDispatch} from "react-redux";
import {EditText} from "react-edit-text";
import {useHistory} from "react-router-dom";
import {setTableAction} from "../../../../Redux/actions";

// Icons
import ReorderRoundedIcon from "@material-ui/icons/ReorderRounded";
import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

// Component
import {Title} from "../../../../components/texts/texts";
import ToastBar from "../../../../components/ToastBar";
import Modals from "../../../../components/modal/Modals";
import {Horizontal} from "../../../../components/elements/elements";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";

function TableItem({item, areaId, sectionId, tableItemCallBack}) {
	// Redux State
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);

	// hook
	const [tableName, setTableName] = useState(item.tableName);

	// Initilize
	const history = useHistory();

	useEffect(() => {
		setTableName(item.tableName);
	}, [item]);

	// UI
	const [isLoading, setIsLoading] = useState(false);
	const [isTableUpdate, setIsTableUpdate] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const close = () => {
		setIsOpenModal(!isOpenModal);
		setIsLoading(false);
	};
	const {Toast} = ToastBar();

	function updateTable(value) {
		setIsTableUpdate(true);
		const data = {
			table: {
				tableId: item.tableId,
				tableName: value,
			},
		};
		console.log("data", data);
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/tables/" +
					item.tableId +
					"?providerId=" +
					user?.provider +
					"&areaId=" +
					areaId +
					"&sectionId=" +
					sectionId +
					"&adminId=" +
					user?.uid,
				data
			)
			.then((response) => {
				console.log("Table Update response ", response);

				if (response.data.success) {
					// Toast("Table Update Successfully", "success");
					tableItemCallBack();
					setTableName(response.data.data.table.tableName);
					Toast("Update Successfully", "success");
					setIsTableUpdate(false);
				}
			})
			.catch((error) => {
				if (!error.response.data.success) {
					Toast("Update Failed", "error");
					setIsTableUpdate(false);
				}
			});
	}

	const handleSave = ({name, value, previousValue}) => {
		console.log(
			name + " saved as: " + value + " (prev: " + previousValue + ")"
		);
		if (value !== previousValue) {
			if (value === "") {
				Toast("Value cant be empty", "error");
				setTableName(item.tableName);
			} else {
				updateTable(value);
			}
		} else {
			console.log("same");
		}
	};

	// Delet
	const openDeleteModal = () => {
		setIsOpenModal(true);
	};

	const deleteTable = () => {
		console.log("table", item);
		setIsLoading(true);
		axios
			.delete(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/tables/" +
					item.tableId +
					"?providerId=" +
					user?.provider +
					"&areaId=" +
					areaId +
					"&sectionId=" +
					sectionId +
					"&adminId=" +
					user?.uid
			)
			.then((res) => {
				console.log("Response deteteTable", res);
				tableItemCallBack();
				setIsLoading(false);
				setIsOpenModal(false);
				Toast("Table Deleted", "success");
			})
			.catch((err) => {
				console.error("Error deleteTable", err.response);
				setIsOpenModal(false);
				setIsLoading(false);
			});
	};

	const tableClick = () => {
		let data = {
			tableName: item.tableName,
			tableId: item.tableId,
		};
		dispatch(setTableAction(data));
		history.push(
			`/managedinein/guest/${areaId}/${sectionId}/${item.tableId}`
		);
	};

	return (
		<>
			<Modals isOpen={isOpenModal} className="delete__modal">
				<div className="close__modal">
					<IconButton>
						<CloseRoundedIcon onClick={close} />
					</IconButton>
				</div>

				<Title>
					Are you sure want to delete
					<span style={{fontWeight: "600", color: "red"}}>
						{item.tableName}
					</span>
				</Title>
				<Horizontal />
				<ButtonNLoading
					onClick={deleteTable}
					title="Delete Table"
					color="white"
					isLoading={isLoading}
				/>
			</Modals>

			<TableItemContainer>
				<EditText
					name="tableName"
					value={tableName}
					onChange={setTableName}
					onSave={handleSave}
				/>
				{isTableUpdate ? (
					<Spinner name="double-bounce" color="#d65a31" />
				) : (
					<>
						<div onClick={openDeleteModal}>
							<DeleteRoundedIcon />
						</div>
						<div onClick={() => tableClick()}>
							<ReorderRoundedIcon />
						</div>
					</>
				)}
			</TableItemContainer>
		</>
	);
}

// Style
const TableItemContainer = styled.div`
	width: 200px;
	background: white;
	display: flex;
	align-items: center;
	margin-right: 0.6rem;
	margin-bottom: 0.6rem;
	padding: 0.6rem;
	@media only screen and (max-width: 480px) {
		width: 135px;
	}
`;

export default TableItem;
