import React from "react";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "react-edit-text/dist/index.css";

import "react-dragswitch/dist/index.css";

// Components
import {ManageStaffContainer} from "./ManageStaffStyle";
import ManageDineStaff from "./ManageDineStaff/ManageDineStaff";
import AssignSection from "./AssignSection/AssignSection";

function ManageStaff() {
	console.log("Manage Staff");

	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<ManageStaffContainer>
			<div className={classes.root}>
				<AppBar
					position="static"
					color="default"
					style={{boxShadow: "0 0 0 0"}}
				>
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
						aria-label="full width tabs example"
					>
						<Tab
							style={{
								fontSize: "0.875rem",
								fontWeight: "bold",
								textTransform: "capitalize",
							}}
							label="Dine In Staffs"
							{...a11yProps(0)}
						/>
						<Tab
							style={{
								fontSize: "0.875rem",
								textTransform: "capitalize",
								fontWeight: "bold",
							}}
							label="Assign Dine In Staff"
							{...a11yProps(1)}
						/>
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={theme.direction === "rtl" ? "x-reverse" : "x"}
					index={value}
					onChangeIndex={handleChangeIndex}
					style={{height: "100%"}}
				>
					<TabPanel value={value} index={0} dir={theme.direction}>
						<ManageDineStaff />
					</TabPanel>
					<TabPanel value={value} index={1} dir={theme.direction}>
						<AssignSection />
					</TabPanel>
				</SwipeableViews>
			</div>
		</ManageStaffContainer>
	);
}

function TabPanel(props) {
	const {children, value, index, ...other} = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
			style={{height: "100%"}}
		>
			{value === index && <>{children}</>}
		</div>
	);
}

// Tab
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: "100%",
		height: "100%",
	},
}));

export default ManageStaff;

// import React, { useState, useEffect, useContext } from "react";

// import Select from "react-select";

// import { Switch, Route } from "react-router-dom";
// import HistoryRoundedIcon from "@material-ui/icons/HistoryRounded";
// import { useSelector, useDispatch } from "react-redux";

// import Spinner from "react-spinkit";
// // import Toggle from "react-toggle";
// // import "react-toggle/style.css";

// import { EditText, EditTextarea } from "react-edit-text";
// import "react-edit-text/dist/index.css";

// import { ToggleSwitch } from "react-dragswitch";
// import "react-dragswitch/dist/index.css";
// import axios from "axios";
// import { redirectBaseURL } from "../../../apis/baseURL";

// import ApexCharts from "apexcharts";
// import Chart from "react-apexcharts";

// // Icons
// import { IconButton } from "@material-ui/core";
// import AddIcon from "@material-ui/icons/Add";
// import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
// import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
// import LockRoundedIcon from "@material-ui/icons/LockRounded";
// import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
// import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
// import RestaurantMenuRoundedIcon from "@material-ui/icons/RestaurantMenuRounded";
// import AddRoundedIcon from "@material-ui/icons/AddRounded";
// import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
// import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";

// import { auth, firestore, provider } from "../../../config/firebaseConfig";

// // Components
// import {
// 	ManageStaffContainer,
// 	Row,
// 	ModalBody,
// 	FloatingButton,
// } from "./ManageStaffStyle";
// import { Vertical, Horizontal } from "../../../components/elements/elements";
// import Modals from "../../../components/modal/Modals";
// import ToastBar from "../../../components/ToastBar";
// import InputWrapper from "../../../components/input/InputWrapper";
// import ButtonNLoading from "../../../components/buttons/ButtonNLoading";

// const options = [
// 	{ value: "chocolate", label: "Chocolate" },
// 	{ value: "strawberry", label: "Strawberry" },
// 	{ value: "vanilla", label: "Vanilla" },
// ];

// function ManageStaff({ user }) {
// 	console.log("Manage Staff");

// 	// update section when assign
// 	const [updateSection, setUpdateSection] = useState(false);
// 	const [updateTable, setUpdateTable] = useState(false);

// 	const { Toast } = ToastBar();

// 	const [staffList, setStaffList] = useState([]);
// 	const [sectionList, setSectionList] = useState([]);
// 	const [tableList, setTableList] = useState([]);

// 	const [selectStaff, setSelectStaff] = useState("");
// 	const [selectSection, setSelectSection] = useState(null);
// 	const [selectTable, setSelectTable] = useState(new Map());
// 	const [from, setFrom] = useState(0);
// 	const [to, setTo] = useState(0);

// 	// Hooks
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [firstName, setFirstName] = useState("");
// 	const [lastName, setLastName] = useState("");

// 	// UI
// 	const [isOpenModal, setIsOpenModal] = useState(false);
// 	const [isLoading, setIsLoading] = useState(false);

// 	// error
// 	const [emailError, setEmailError] = useState("");
// 	const [passwordError, setPasswordError] = useState("");
// 	const [firstNameError, setFirstNameError] = useState("");
// 	const [lastNameError, setLastNameError] = useState("");

// 	//focus
// 	const emailFocus = () => {
// 		setEmailError("");
// 	};
// 	const passwordFocus = () => {
// 		setPasswordError("");
// 	};
// 	const firstNameFocus = () => {
// 		setFirstNameError("");
// 	};
// 	const lastNameFocus = () => {
// 		setLastNameError("");
// 	};

// 	// reset Value
// 	const resetFormValue = () => {
// 		setEmail("");
// 		setPassword("");
// 		setFirstName("");
// 		setLastName("");

// 		setEmailError("");
// 		setPasswordError("");
// 		setFirstNameError("");
// 		setLastNameError("");
// 	};

// 	const close = () => {
// 		setIsOpenModal(false);
// 		resetFormValue();
// 	};

// 	useEffect(() => {
// 		getAllStaff();
// 	}, []);

// 	useEffect(() => {
// 		getAllSection();
// 	}, [updateSection]);

// 	// useEffect(() => {
// 	// 	getAllTable();
// 	// }, [updateTable]);

// 	const getAllSection = async () => {
// 		// let response = await axios.get(
// 		// 	// "https://us-central1-afoodie-6d649.cloudfunctions.net/dining/sections?provider=" +
// 		// 	// 	user.provider

// 		// 	// "https://us-central1-afoodie-6d649.cloudfunctions.net/dining/sections?providerId=" +
// 		// 	// 	user.provider

// 		// 	"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/sections?providerId=ambrosiaIndiaBistro_aptos"
// 		// );

// 		// console.log("Response All section", response.data.data.sections);
// 		// setSectionList(response.data.data.sections);

// 		try {
// 			await axios
// 				.get(
// 					"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/sections?providerId=ambrosiaIndiaBistro_aptos"
// 				)
// 				.then((response) => {
// 					console.log("Response All section", response.data.data.sections);
// 					setSectionList(response.data.data.sections);
// 					setSelectSection(null);
// 				});
// 		} catch (e) {
// 			console.log("Error get all unassign section", e);
// 		}
// 	};

// 	const getAllTable = async () => {
// 		axios
// 			.get(
// 				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/tables?provider=" +
// 					user?.provider
// 			)
// 			.then((response) => {
// 				if (response.data.success) {
// 					console.log("Response getTableforassign", response);
// 					setTableList(response.data.data.tables);
// 				}
// 			})
// 			.catch((error) => {
// 				console.log("Error getTableforassign", error);
// 			});
// 	};

// 	const getAllStaff = async () => {
// 		let response = await axios.get(
// 			"https://us-central1-afoodie-6d649.cloudfunctions.net/staff?provider=" +
// 				user?.provider
// 		);

// 		console.log("Response All Staff", response.data.data.staffs);
// 		setStaffList(response.data.data.staffs);
// 	};

// 	const staffSelectButton = (item) => {
// 		setSelectStaff(item.uid);
// 	};

// 	const assignButton = () => {
// 		if (selectStaff === "") {
// 			alert("Select Staff");
// 		} else if (selectSection === null) {
// 			alert("Select Section");
// 		} else {
// 			setIsLoading(true);
// 			// Convert Back to json from string
// 			let selectedSection = JSON.parse(selectSection);

// 			const data = {
// 				providerId: user.provider,
// 				areaId: selectedSection.areaId,
// 				sectionId: selectedSection.sectionId,
// 				from: from,
// 				to: to,
// 			};

// 			console.log("data", data, selectStaff);
// 			axios
// 				.post(
// 					// "https://us-central1-afoodie-6d649.cloudfunctions.net/staff/" +
// 					// 	selectStaff +
// 					// 	"/assign-section",
// 					// data

// 					"https://us-central1-afoodie-6d649.cloudfunctions.net/staff/" +
// 						selectStaff +
// 						"/assign-section",
// 					data
// 				)
// 				.then((response) => {
// 					console.log("Response asssign", response);
// 					setUpdateSection(!updateSection);
// 					Toast("Section Assigned", "success");
// 					setIsLoading(false);
// 				})
// 				.catch((error) => {
// 					console.log("Response assign catch error", error);
// 					setIsLoading(false);
// 				});
// 		}
// 	};

// 	const assignTable = () => {
// 		if (selectStaff === "") {
// 			alert("Select Staff");
// 		} else {
// 			setIsLoading(true);
// 			let selectedTable = JSON.parse(selectTable);
// 			let data = {
// 				providerId: user.provider,
// 				areaId: selectedTable.areaId,
// 				sectionId: selectedTable.sectionId,
// 				tableId: selectedTable.tableId,
// 				from: from,
// 				to: to,
// 			};

// 			console.log("data", data, selectStaff);
// 			axios
// 				.post(
// 					"https://us-central1-afoodie-6d649.cloudfunctions.net/staff/" +
// 						selectStaff +
// 						"/assign-table",
// 					data
// 				)
// 				.then((response) => {
// 					console.log("Response assign table", response);
// 					setSelectStaff("");
// 					setUpdateTable(!updateTable);
// 					setIsLoading(false);
// 				})
// 				.catch((err) => {
// 					console.log("Error assign table", err);
// 					setIsLoading(false);
// 				});
// 		}
// 	};

// 	const [selectedOption, setSelectedOption] = useState(null);

// 	const handleChange = (selectedOption) => {
// 		setSelectedOption(selectedOption);
// 		// this.setState({ selectedOption }, () =>
// 		//   console.log(`Option selected:`, this.state.selectedOption)
// 		// );
// 	};

// 	const openAddModal = () => {
// 		setIsOpenModal(true);
// 	};

// 	const addDineStaff = () => {
// 		let allValid = true;
// 		if (firstName === "") {
// 			setFirstNameError("Field is required");
// 			allValid = false;
// 		}
// 		if (lastName === "") {
// 			setLastNameError("Field is required");
// 			allValid = false;
// 		}
// 		if (email === "") {
// 			setEmailError("Field is required");
// 			allValid = false;
// 		}
// 		if (password === "") {
// 			setPasswordError("Field is required");
// 			allValid = false;
// 		}

// 		if (allValid) {
// 			console.log("all valid");
// 			setIsLoading(true);
// 			auth
// 				.createUserWithEmailAndPassword(email, password)
// 				.then((cred) => {
// 					console.log("User is register", cred.user.uid);
// 					var user = auth.currentUser;
// 					user
// 						.updateProfile({
// 							displayName: firstName,
// 						})
// 						.then(function () {
// 							console.log("display update successful");
// 						})
// 						.catch(function (error) {
// 							console.log("display update unsuccessful");
// 						});
// 					saveRegisterUser(cred);
// 				})
// 				.catch((err) => {
// 					console.log("error " + err);
// 					Toast(err.toString(), "error");
// 				});
// 		}
// 	};

// 	const saveRegisterUser = (cred) => {
// 		// save to firebase
// 		let data = {
// 			createdDate: Date().toLocaleString(),
// 			firstName: firstName,
// 			lastName: lastName,
// 			email: email,
// 			emailVerified: cred.user.emailVerified,
// 			uid: cred.user.uid,
// 			userType: "Staff",
// 			provider: user.provider,
// 			assigned: false,
// 		};
// 		firestore
// 			.collection("users")
// 			.doc(cred.user.uid)
// 			.set(data)
// 			.then((cred) => {
// 				console.log("save to firebase");
// 				alert("User Created");
// 				setIsLoading(false);
// 				setIsOpenModal(false);
// 				resetFormValue();
// 			})
// 			.catch((err) => {
// 				console.log("firestore errorss " + err);
// 				setIsLoading(false);
// 			});
// 	};

// 	return (
// 		<>
// 			<Modals isOpen={isOpenModal} className="manage__prepline__modal">
// 				<div className="close__modal">
// 					<IconButton>
// 						<CloseRoundedIcon onClick={close} />
// 					</IconButton>
// 				</div>
// 				<ModalBody>
// 					<Row>
// 						<InputWrapper
// 							label="First Name"
// 							error={firstNameError}
// 							prefixIcon={<PersonRoundedIcon />}
// 							onFocus={firstNameFocus}
// 							type="text"
// 							value={firstName}
// 							onChangeText={(e) => setFirstName(e.target.value)}
// 						/>
// 						<Vertical />
// 						<InputWrapper
// 							label="Last Name"
// 							error={lastNameError}
// 							prefixIcon={<PersonRoundedIcon />}
// 							onFocus={lastNameFocus}
// 							type="text"
// 							value={lastName}
// 							onChangeText={(e) => setLastName(e.target.value)}
// 						/>
// 					</Row>
// 					<InputWrapper
// 						label="Email"
// 						error={emailError}
// 						prefixIcon={<EmailRoundedIcon />}
// 						onFocus={emailFocus}
// 						type="email"
// 						value={email}
// 						onChangeText={(e) => setEmail(e.target.value)}
// 					/>
// 					<InputWrapper
// 						label="Password"
// 						error={passwordError}
// 						onFocus={passwordFocus}
// 						type="password"
// 						value={password}
// 						onChangeText={(e) => setPassword(e.target.value)}
// 					/>

// 					<Horizontal />

// 					<ButtonNLoading
// 						onClick={addDineStaff}
// 						title="Add Dine Staff"
// 						color="white"
// 						isLoading={isLoading}
// 					/>
// 				</ModalBody>
// 			</Modals>

// 			<ManageStaffContainer>
// 				<FloatingButton onClick={openAddModal}>
// 					<AddIcon style={{ color: "white" }} />
// 				</FloatingButton>

// 				<div className="managestaff__container">
// 					{staffList.map((item, i) => (
// 						<div
// 							key={i}
// 							className="fixed__height__conainer"
// 							style={{
// 								overflow: "hidden",
// 								background: selectStaff === item.uid ? "#d65a31" : null,
// 							}}
// 							onClick={() => staffSelectButton(item)}
// 						>
// 							{item.firstName}
// 							{item.lastName}
// 							{/* {item} */}
// 						</div>
// 					))}
// 				</div>
// 				<div className="managestaff__assign__">
// 					<div className="title">Assigned Section</div>
// 					<InputWrapper
// 						// label="User Type"
// 						// error={userTypeError}
// 						// prefixIcon={<GroupRoundedIcon />}
// 						// onFocus={userTypeFocus}
// 						type="text"
// 						value={selectSection}
// 						onChangeText={(e) => setSelectSection(e.target.value)}
// 						section
// 						optionArray={sectionList}
// 					/>
// 					{/* {tableList.map((item, i) => (
// 					<div>{item.name}</div>
// 				))} */}
// 					{/* <InputWrapper
// 					// label="User Type"
// 					// error={userTypeError}
// 					// prefixIcon={<GroupRoundedIcon />}
// 					// onFocus={userTypeFocus}
// 					type="text"
// 					value={selectTable}
// 					onChangeText={(e) => setSelectTable(e.target.value)}
// 					table
// 					optionArray={tableList}
// 				/> */}
// 					<div className="row">
// 						<InputWrapper
// 							label="From"
// 							// error={userTypeError}
// 							// prefixIcon={<GroupRoundedIcon />}
// 							// onFocus={userTypeFocus}
// 							type="time"
// 							value={from}
// 							onChangeText={(e) => setFrom(e.target.value)}
// 						/>
// 						<div className="vertical"></div>
// 						<InputWrapper
// 							label="To"
// 							// error={userTypeError}
// 							// prefixIcon={<GroupRoundedIcon />}
// 							// onFocus={userTypeFocus}
// 							type="time"
// 							value={to}
// 							onChangeText={(e) => setTo(e.target.value)}
// 						/>
// 					</div>
// 					<ButtonNLoading
// 						onClick={assignButton}
// 						title="	Assign Section"
// 						color="white"
// 						isLoading={isLoading}
// 					/>
// 					{/* <button className="primary__button" onClick={assignButton}>
// 					Assign Section
// 				</button> */}
// 					{/* <button className="primary__button" onClick={assignTable}>
// 					Assign Table
// 				</button> */}
// 				</div>
// 			</ManageStaffContainer>
// 		</>
// 	);
// }

// export default ManageStaff;
