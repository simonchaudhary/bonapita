import {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import Spinner from "react-spinkit";
import {useSelector} from "react-redux";
import {EditText} from "react-edit-text";

// Icons
import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

// Component
import {Title} from "../../../../components/texts/texts";
import ToastBar from "../../../../components/ToastBar";
import Modals from "../../../../components/modal/Modals";
import {Horizontal} from "../../../../components/elements/elements";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";

function GuestItem({item, areaId, sectionId, tableId, guestItemCallBack}) {
	// Redux State
	const user = useSelector((state) => state.user.user);

	// hook
	const [guestName, setGuestName] = useState(item.guestName);

	useEffect(() => {
		setGuestName(item.guestName);
	}, [item]);

	// UI
	const [isLoading, setIsLoading] = useState(false);
	const [isGuestUpdate, setIsGuestUpdate] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const close = () => {
		setIsOpenModal(!isOpenModal);
		setIsLoading(false);
	};
	const {Toast} = ToastBar();

	function updateGuest(value) {
		setIsGuestUpdate(true);
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
					areaId +
					"&sectionId=" +
					sectionId +
					"&tableId=" +
					tableId +
					"&adminId=" +
					user.uid,
				data
			)
			.then((response) => {
				console.log("Guest Update response ", response);

				if (response.data.success) {
					// Toast("Guest Update Successfully", "success");
					guestItemCallBack();
					setGuestName(response.data.data.guest.guestName);
					Toast("Update Successfully", "success");
					setIsGuestUpdate(false);
				}
			})
			.catch((error) => {
				if (!error.response.data.success) {
					Toast("Update Failed", "error");
					setIsGuestUpdate(false);
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
				setGuestName(item.guestName);
			} else {
				updateGuest(value);
			}
		} else {
			console.log("same");
		}
	};

	// Delet
	const openDeleteModal = () => {
		setIsOpenModal(true);
	};

	const deleteGuest = () => {
		console.log("guest", item);
		setIsLoading(true);
		axios
			.delete(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/guests/" +
					item.guestId +
					"?providerId=" +
					user?.provider +
					"&areaId=" +
					areaId +
					"&sectionId=" +
					sectionId +
					"&tableId=" +
					tableId +
					"&adminId=" +
					user?.uid
			)
			.then((res) => {
				console.log("Response deteteGuest", res);
				guestItemCallBack();
				setIsLoading(false);
				setIsOpenModal(false);
				Toast("Guest Deleted", "success");
			})
			.catch((err) => {
				console.error("Error deleteGuest", err.response);
				setIsOpenModal(false);
				setIsLoading(false);
			});
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
						{item.guestName}
					</span>
				</Title>
				<Horizontal />
				<ButtonNLoading
					onClick={deleteGuest}
					title="Delete Guest"
					color="white"
					isLoading={isLoading}
				/>
			</Modals>

			<GuestItemContainer>
				<EditText
					name="guestName"
					value={guestName}
					onChange={setGuestName}
					onSave={handleSave}
				/>
				{isGuestUpdate ? (
					<Spinner name="double-bounce" color="#d65a31" />
				) : (
					<div onClick={openDeleteModal}>
						<DeleteRoundedIcon />
					</div>
				)}
			</GuestItemContainer>
		</>
	);
}

// Style
const GuestItemContainer = styled.div`
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

export default GuestItem;
