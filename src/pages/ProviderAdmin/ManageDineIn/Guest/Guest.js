import React, {useState, useEffect} from "react";

// Package
import axios from "axios";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

// Icons
import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import {ReactComponent as QRIcon} from "../../../../assets/qrcode.svg";

// Component
import {GuestContainer, GuestList, ButtonContainer} from "./GuestStyle";
import GuestItem from "./GuestItem";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";
import ToastBar from "../../../../components/ToastBar";
import Modals from "../../../../components/modal/Modals";

function Guest() {
	const {areaId} = useParams();
	const {sectionId} = useParams();
	const {tableId} = useParams();

	// Redux State
	const user = useSelector((state) => state.user.user);

	// Guest hooks
	const [guestsList, setGuestsList] = useState(null);
	const [isGuestListUpdate, setIsGuestListUpdate] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [qrImageURL, setQrImageURL] = useState(null);

	// UI
	const {Toast} = ToastBar();
	const [isOpenModal, setIsOpenModal] = useState(false);
	const close = () => {
		setIsOpenModal(!isOpenModal);
		setIsLoading(false);
	};

	useEffect(() => {
		getGuestList();
	}, [isGuestListUpdate]);

	const getGuestList = () => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/guests?providerId=" +
					user?.provider +
					"&areaId=" +
					areaId +
					"&sectionId=" +
					sectionId +
					"&tableId=" +
					tableId
			)
			.then((response) => {
				console.log("Response guestlist", response);
				if (response.data.success) {
					if (typeof response?.data?.data?.guests === "string") {
						setGuestsList([]);
					} else {
						setGuestsList(response?.data?.data?.guests);
					}
				}
			})
			.catch((err) => {
				console.error("Response guestlist", err.response);
			});
	};
	// Add guest
	const addGuest = () => {
		setIsLoading(true);
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/guests?providerId=" +
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
			.then((response) => {
				console.log("Add Guest response ", response);
				setIsGuestListUpdate(!isGuestListUpdate);
				Toast("Guest Added Successfully", "success");
				setIsLoading(false);
			})
			.catch((error) => {
				console.log("error", error);
				setIsLoading(false);
			});
	};

	const guestItemCallBack = () => {
		setIsGuestListUpdate(!isGuestListUpdate);
	};

	const getQRCode = async () => {
		console.log("Get qrcode", user.provider, areaId, sectionId, tableId);
		setQrImageURL(null);
		setIsOpenModal(!isOpenModal);
		let data = {
			providerId: user.provider,
			areaId: areaId,
			sectionId: sectionId,
			tableId: tableId,
		};
		console.log("data", data);
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/barcode",
				data
			)
			.then((response) => {
				console.log("Response create qr", response);
				if (response.data.success) {
					// Toast(response.data.data.message, "success");
					setQrImageURL(response.data.data.publicUrl);
				}
			})
			.catch((error) => {
				console.log("Error create qr");
			});
	};

	return (
		<>
			{/* Modal */}
			<Modals isOpen={isOpenModal} className="showQRCodeModal">
				<div className="close__modal">
					<IconButton>
						<CloseRoundedIcon onClick={close} />
					</IconButton>
				</div>
				{qrImageURL === null ? (
					<h4>Loading...</h4>
				) : (
					<img width="300" src={qrImageURL} alt="hello" />
				)}
			</Modals>
			<GuestContainer>
				<h5>Guests</h5>
				<div
					onClick={getQRCode}
					style={{
						position: "absolute",
						bottom: "3rem",
						right: "0.75rem",
						height: "10px",
						zIndex: "13",
					}}
				>
					<QRIcon style={{width: "25px"}} />
					<p
						style={{
							marginTop: "0px",
							fontSize: "0.5rem",
							fontWeight: "600",
						}}
					>
						Get QR
					</p>
				</div>
				<GuestList>
					{guestsList?.length === 0 ? (
						<h5>Guest Empty</h5>
					) : guestsList === null ? (
						<h5>Loading...</h5>
					) : (
						<>
							{guestsList?.map((item, i) => (
								<GuestItem
									key={i}
									item={item}
									areaId={areaId}
									sectionId={sectionId}
									tableId={tableId}
									guestItemCallBack={guestItemCallBack}
								/>
							))}
						</>
					)}
				</GuestList>
				<ButtonContainer>
					<ButtonNLoading
						onClick={addGuest}
						title="Add Guest"
						color="white"
						isLoading={isLoading}
					/>
				</ButtonContainer>
			</GuestContainer>
		</>
	);
}

export default Guest;
