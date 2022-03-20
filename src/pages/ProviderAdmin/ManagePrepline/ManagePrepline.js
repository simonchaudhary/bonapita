// Icons
import {IconButton} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import axios from "axios";
import React, {useEffect, useState} from "react";
import "react-dragswitch/dist/index.css";
import "react-edit-text/dist/index.css";
import {useSelector} from "react-redux";
import Modals from "../../../components/modal/Modals";
import {Detail, Title} from "../../../components/texts/texts";
// Components
import ToastBar from "../../../components/ToastBar";
import {
	Body,
	Buttons,
	FloatingButton,
	Header,
	ItemContainer,
	ListContainer,
	ManagePreplineContainer,
	ModalBody,
	Row,
} from "./ManagePrepLineStyle";
import AddPrepline from "./PreplineData/AddPrepline";
import TabComponent from "./TabComponent/TabComponent";

function ManagePrepline() {
	// Redux
	const user = useSelector((state) => state.user.user);

	// Hooks
	const [preplineList, setPreplineList] = useState(null);
	const [selectedPrepline, setSelectedPrepline] = useState(null);

	const [selectedPreplineDetail, setSelectedPreplineDetail] = useState(null);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [prepLineName, setPrepLineName] = useState("");
	const [printerIP, setPrinterIP] = useState(null);
	const [port, setPort] = useState(null);

	// Transfer List
	const [left, setLeft] = useState([]);
	const [right, setRight] = useState([]);

	// reset Value
	const resetFormValue = () => {
		setEmail("");
		setPassword("");
		setFirstName("");
		setLastName("");
		setPrepLineName("");
		setPrinterIP(null);
		setPort(null);
		setLeft([]);
		setRight([]);
		setSelectedPreplineType({
			value: "display",
			label: "Display",
		});
	};

	// UI
	const [whichModal, setWhichModal] = useState("add_prepline");
	const [isUpdatePreplineList, setIsUpdatePreplineList] = useState(false);
	const {Toast} = ToastBar();
	const [isLoading, setIsLoading] = useState(false);
	const [screenLoading, setScreenLoading] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const close = () => {
		setIsOpenModal(false);
		setIsLoading(false);
		resetFormValue();
	};
	const [selectedPreplineType, setSelectedPreplineType] = useState({
		value: "display",
		label: "Display",
	});
	// const handlePrepLineTypeChange = (selectedPrepLineType) => {
	// 	console.log("handle prepline type change", selectedPrepLineType);
	// 	setSelectedPreplineType(selectedPrepLineType);
	// };

	// UseEffects
	useEffect(() => {
		getAllPreplineUsers();
	}, [isUpdatePreplineList]);

	const callBack = () => {
		setIsOpenModal(false);
		setIsUpdatePreplineList(!isUpdatePreplineList);
	};

	// Functions
	const getAllPreplineUsers = () => {
		setScreenLoading(true);
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/preplines?providerId=${user?.provider}`
			)
			.then((res) => {
				console.log("Response get all prepline users", res);
				if (res.data.success) {
					// setPrepLineUserList(res.data.data.preplineStaffs);
					setPreplineList(res.data.data.preplines);
					setScreenLoading(false);
				}
			})
			.catch((err) => {
				console.error("Error get all prepline users", err.reponse);
				setScreenLoading(false);
			});
	};

	const prepLineSelect = (item) => {
		setSelectedPrepline(item);
		setWhichModal("update_modal");
		console.log("Prepline selectss", item);
		setIsOpenModal(true);
	};

	const updatePrepLine = () => {
		// alert("update");
		setIsLoading(true);
		let data = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			prepLineName: prepLineName,
			preplineType: selectedPreplineType.value,
			printerIP: printerIP,
			port: port,
			menuItems: selectedPreplineType.value === "display" ? null : right,
		};
		console.log(
			"data",
			data,
			user?.provider +
				selectedPreplineDetail.uid +
				"?prepLineName=" +
				selectedPreplineDetail.prepLineName
		);
		axios
			.put(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${user?.provider}/prep-line/${selectedPreplineDetail.uid}?prepLineName=${selectedPreplineDetail.prepLineName}`,
				data
			)
			.then((res) => {
				console.log("Response prepline update ", res);
				// setisUpdatePreplineUser(!isUpdatePreplineUser);
				resetFormValue();
				setIsOpenModal(false);
				setIsLoading(false);
				alert("Prepline update");
			})
			.catch((err) => {
				console.error("Error prepline update", err.response);
				setIsLoading(false);
			});
	};

	const openAddModal = () => {
		setWhichModal("add_prepline");
		setIsOpenModal(true);
	};

	const deletePrepline = (item) => {
		console.log("ddeletePrepline", item, user?.provider);
		axios
			.delete(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/preplines/${item.id}?providerId=${user?.provider}`
			)
			.then((res) => {
				console.log("Response delete  dinestaff", res);
				if (res.data.success) {
					Toast(res.data.message, "success");
					setIsUpdatePreplineList(!isUpdatePreplineList);
				}
			})
			.catch((err) => {
				console.error("Error delete dinestaff", err.response);
			});
	};

	return (
		<>
			{/* Modal */}
			<Modals
				isOpen={isOpenModal}
				className={
					whichModal === "add_prepline"
						? "manage__prepline__modal"
						: "manage__prepline__modal__fullpage"
				}
			>
				<div className="close__modal" onClick={close}>
					<IconButton>
						<CloseRoundedIcon />
					</IconButton>
				</div>
				<ModalBody>
					{whichModal === "add_prepline" ? (
						<AddPrepline callBack={callBack} />
					) : (
						<TabComponent
							callBack={callBack}
							selectedPrepline={selectedPrepline}
						/>
					)}
				</ModalBody>
			</Modals>

			<ManagePreplineContainer>
				<FloatingButton onClick={openAddModal}>
					<AddIcon style={{color: "white"}} />
				</FloatingButton>
				<Header>
					<h5>Manage Prepline</h5>
				</Header>
				<Body
					style={{
						display: screenLoading ? "grid" : null,
						placeItems: "center",
					}}
				>
					{screenLoading ? (
						<h3>Loading...</h3>
					) : (
						<ListContainer>
							{preplineList?.map((item, i) => (
								<ItemContainer key={i}>
									<Row>
										<Title>{item.preplineName}</Title>
										<Detail>{item.preplineType.value}</Detail>
									</Row>
									<Buttons>
										<div onClick={() => prepLineSelect(item)}>
											<IconButton>
												<EditRoundedIcon />
											</IconButton>
										</div>
										<div onClick={() => deletePrepline(item)}>
											<IconButton>
												<DeleteRoundedIcon />
											</IconButton>
										</div>
									</Buttons>
								</ItemContainer>
							))}
						</ListContainer>
					)}
				</Body>
			</ManagePreplineContainer>
		</>
	);
}

export default ManagePrepline;
