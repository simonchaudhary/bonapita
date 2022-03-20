import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
// Icons
import ReorderRoundedIcon from "@material-ui/icons/ReorderRounded";
import axios from "axios";
import {useEffect, useState} from "react";
import {EditText} from "react-edit-text";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Spinner from "react-spinkit";
import styled from "styled-components";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";
import {Horizontal} from "../../../../components/elements/elements";
import Modals from "../../../../components/modal/Modals";
// Component
import {Title} from "../../../../components/texts/texts";
import ToastBar from "../../../../components/ToastBar";
import {setAreaAction} from "../../../../Redux/actions";

function AreaItem({item, areaItemCallBack}) {
	// Redux
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);

	// hook
	const [areaName, setAreaName] = useState(item.areaName);

	// Initilize
	const history = useHistory();

	useEffect(() => {
		setAreaName(item.areaName);
	}, [item]);

	// UI
	const [isLoading, setIsLoading] = useState(false);
	const [isAreaUpdate, setIsAreaUpdate] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const close = () => {
		setIsOpenModal(!isOpenModal);
		setIsLoading(false);
	};
	const {Toast} = ToastBar();

	function updateArea(value) {
		setIsAreaUpdate(true);
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
					Toast("Update Successfully", "success");
					setAreaName(response.data.data.areaName);
					areaItemCallBack();
					setIsAreaUpdate(false);
				}
			})
			.catch((error) => {
				if (!error.response.data.success) {
					Toast("Update Failed", "error");
					setIsAreaUpdate(false);
				}
				console.log("error", error.response);
			});
	}

	const handleSave = ({name, value, previousValue}) => {
		console.log(
			name + " saved as: " + value + " (prev: " + previousValue + ")"
		);
		if (value !== previousValue) {
			console.log("not same");
			if (value === "") {
				Toast("Value cant be empty", "error");
				setAreaName(item.areaName);
			} else {
				updateArea(value);
			}
		} else {
			console.log("same");
		}
	};

	// Delet
	const openDeleteModal = () => {
		setIsOpenModal(true);
	};

	const deleteArea = () => {
		console.log("area", item);
		setIsLoading(true);
		axios
			.delete(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/areas/" +
					item.areaId +
					"?providerId=" +
					user?.provider
			)
			.then((res) => {
				console.log("Response deteteArea", res);
				areaItemCallBack();
				setIsLoading(false);
				setIsOpenModal(false);
				Toast(res.data.data.message, "success");
			})
			.catch((err) => {
				console.error("Error deleteArea", err.response);
				setIsOpenModal(false);
				setIsLoading(false);
			});
	};

	const areaClick = () => {
		let data = {
			areaName: item.areaName,
			areaId: item.areaId,
		};
		dispatch(setAreaAction(data));
		history.push(`/managedinein/section/${item.areaId}`);
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
						<h4>{item.areaName}</h4>
					</span>
				</Title>
				<Horizontal />
				<ButtonNLoading
					onClick={deleteArea}
					title="Delete Area"
					color="white"
					isLoading={isLoading}
				/>
			</Modals>

			<AreaItemContainer>
				<EditText
					name="areaName"
					value={areaName}
					onChange={setAreaName}
					onSave={handleSave}
				/>
				{isAreaUpdate ? (
					<Spinner name="double-bounce" color="#d65a31" />
				) : (
					<>
						<div onClick={openDeleteModal}>
							<DeleteRoundedIcon />
						</div>
						<div onClick={() => areaClick()}>
							<ReorderRoundedIcon />
						</div>
					</>
				)}
			</AreaItemContainer>
		</>
	);
}

// Style
const AreaItemContainer = styled.div`
	width: 200px;
	background: white;
	display: flex;
	align-items: center;
	margin-right: 0.6rem;
	margin-bottom: 0.6rem;
	padding: 0.3rem;
	@media only screen and (max-width: 480px) {
		width: 135px;
	}
`;

export default AreaItem;
