import {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import Spinner from "react-spinkit";
import {useSelector, useDispatch} from "react-redux";
import {EditText} from "react-edit-text";
import {useHistory} from "react-router-dom";
import {setSectionAction} from "../../../../Redux/actions";

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

function SectionItem({item, areaId, sectionItemCallBack}) {
	// Redux State
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);

	// hook
	const [sectionName, setSectionName] = useState(item.sectionName);

	// Initilize
	const history = useHistory();

	useEffect(() => {
		setSectionName(item.sectionName);
	}, [item]);

	// UI
	const [isLoading, setIsLoading] = useState(false);
	const [issectionUpdate, setIssectionUpdate] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const close = () => {
		setIsOpenModal(!isOpenModal);
		setIsLoading(false);
	};
	const {Toast} = ToastBar();

	function updateSection(value) {
		setIssectionUpdate(true);
		const data = {
			providerId: user.provider,
			areaId: areaId,
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
					sectionItemCallBack();
					setSectionName(response.data.data.section.sectionName);
					Toast("Update Successfully", "success");
					setIssectionUpdate(false);
				}
			})
			.catch((error) => {
				if (!error.response.data.success) {
					Toast("Update Failed", "error");
					setIssectionUpdate(false);
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
				setSectionName(item.sectionName);
			} else {
				updateSection(value);
			}
		} else {
			console.log("same");
		}
	};

	// Delet
	const openDeleteModal = () => {
		setIsOpenModal(true);
	};

	const deleteSection = () => {
		// console.log("section", item);
		setIsLoading(true);

		let data = {
			providerId: user.provider,
			areaId: areaId,
			adminId: user.uid,
		};

		console.log("Data", data, "Section Id", item.sectionId);

		axios
			.delete(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/sections/" +
					item.sectionId,
				{data}
			)
			.then((res) => {
				console.log("Response deteteSection", res);
				sectionItemCallBack();
				setIsLoading(false);
				setIsOpenModal(false);
				Toast("Section Delete", "success");
			})
			.catch((err) => {
				console.error("Error deleteSection", err.response);
				setIsOpenModal(false);
				setIsLoading(false);
			});

		// let data = {
		// 	providerId: user?.provider,
		// 	areaId: areaId,
		// 	adminId: user?.uid,
		// };
		// console.log("dataaa", data, item.sectionId);
		// axios
		// 	.delete(
		// 		"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/sections/" +
		// 			item.sectionId,
		// 		data
		// 	)
		// 	.then((res) => {
		// 		console.log("Response deteteSection", res);
		// 		sectionItemCallBack();
		// 		setIsLoading(false);
		// 		setIsOpenModal(false);
		// 		Toast(res.data.data.message, "success");
		// 	})
		// 	.catch((err) => {
		// 		console.error("Error deleteSection", err.response);
		// 		setIsOpenModal(false);
		// 		setIsLoading(false);
		// 	});
	};

	const sectionClick = () => {
		let data = {
			sectionName: item.sectionName,
			sectionId: item.sectionId,
		};
		dispatch(setSectionAction(data));
		history.push(`/managedinein/table/${areaId}/${item.sectionId}`);
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
					Are you sure want to delete{" "}
					<span style={{fontWeight: "600", color: "red"}}>
						{item.sectionName}
					</span>
				</Title>
				<Horizontal />
				<ButtonNLoading
					onClick={deleteSection}
					title="Delete Section"
					color="white"
					isLoading={isLoading}
				/>
			</Modals>

			<SectionItemContainer>
				<EditText
					name="sectionName"
					value={sectionName}
					onChange={setSectionName}
					onSave={handleSave}
				/>
				{issectionUpdate ? (
					<Spinner name="double-bounce" color="#d65a31" />
				) : (
					<>
						<div onClick={openDeleteModal}>
							<DeleteRoundedIcon />
						</div>
						<div onClick={() => sectionClick()}>
							<ReorderRoundedIcon />
						</div>
					</>
				)}
			</SectionItemContainer>
		</>
	);
}

// Style
const SectionItemContainer = styled.div`
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

export default SectionItem;
