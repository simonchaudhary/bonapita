import React, {useState, useEffect, useCallback} from "react";

// Package
import {useSelector} from "react-redux";
import axios from "axios";

import {auth} from "../../../config/firebaseConfig";

// Icons
import {IconButton} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";

// Components
import {
	ManagePreplineManagerContainer,
	Row,
	Body,
	FloatingButton,
	PreplineManagerList,
} from "./ManagePreplineManagerStyle";
import PreplineManagerItem from "./PreplineManagerItem/PreplineManagerItem";
import ToastBar from "../../../components/ToastBar";
import {Vertical, Horizontal} from "../../../components/elements/elements";
import InputWrapper from "../../../components/input/InputWrapper";
import ButtonNLoading from "../../../components/buttons/ButtonNLoading";
import {Title} from "../../../components/texts/texts";
import Modals from "../../../components/modal/Modals";

function ManagePreplineManager() {
	// Initilization
	const {Toast} = ToastBar();

	// Redux State
	const user = useSelector((state) => state.user?.user);

	// Hooks
	const [preplineManagerList, setPreplineManagerList] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [selectedUid, setSelectedUid] = useState("");

	// UI
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [whichButton, setWhichButton] = useState("addPreplineManager");
	const [isUpdatePreplineManager, setIsUpdatePreplineManager] =
		useState(false);

	// error
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");

	//focus
	const emailFocus = () => {
		setEmailError("");
	};
	const passwordFocus = () => {
		setPasswordError("");
	};
	const firstNameFocus = () => {
		setFirstNameError("");
	};
	const lastNameFocus = () => {
		setLastNameError("");
	};

	useEffect(() => {
		getPreplineManager();
	}, [isUpdatePreplineManager]);

	// Functions
	const getPreplineManager = () => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/preplineManagers?providerId=${user?.provider}`
			)
			.then((res) => {
				console.log("Response getall preplinemanager", res);
				if (res.data.success) {
					setPreplineManagerList(res.data.data.preplineManagers);
				}
			})
			.catch((err) => {
				console.error("Error getall preplinemanager", err.response);
			});
	};

	// reset Value
	const resetFormValue = () => {
		setEmail("");
		setPassword("");
		setFirstName("");
		setLastName("");

		setEmailError("");
		setPasswordError("");
		setFirstNameError("");
		setLastNameError("");
	};

	const close = () => {
		setIsOpenModal(false);
		setIsLoading(false);
		resetFormValue();
	};

	const addPreplineManager = () => {
		let allValid = true;
		if (firstName === "") {
			setFirstNameError("Field is required");
			allValid = false;
		}
		if (lastName === "") {
			setLastNameError("Field is required");
			allValid = false;
		}
		if (email === "") {
			setEmailError("Field is required");
			allValid = false;
		}
		if (password === "") {
			setPasswordError("Field is required");
			allValid = false;
		}

		if (allValid) {
			console.log("all valid");
			setIsLoading(true);
			auth
				.createUserWithEmailAndPassword(email, password)
				.then((cred) => {
					console.log("User is register", cred.user.uid);
					var user = auth.currentUser;
					user
						.updateProfile({
							displayName: firstName,
						})
						.then(function () {
							console.log("display update successful");
						})
						.catch(function (error) {
							console.log("display update unsuccessful");
							setIsLoading(false);
						});
					saveRegisterUser(cred);
				})
				.catch((err) => {
					console.log("error " + err);
					Toast(err.toString(), "error");
					setIsLoading(false);
				});
		}
	};

	const saveRegisterUser = (cred) => {
		// save to firebase
		// let data = {
		// 	createdDate: Date().toLocaleString(),
		// 	firstName: firstName,
		// 	lastName: lastName,
		// 	email: email,
		// 	emailVerified: cred.user.emailVerified,
		// 	uid: cred.user.uid,
		// 	userType: "PrepLineManager",
		// 	provider: user.provider,
		// };
		// firestore
		// 	.collection("users")
		// 	.doc(cred.user.uid)
		// 	.set(data)
		// 	.then((cred) => {
		// 		console.log("save to firebase");
		// 		alert("User Created");
		// 		setIsLoading(false);
		// 		setIsOpenModal(false);
		// 		resetFormValue();
		// 	})
		// 	.catch((err) => {
		// 		console.log("firestore errorss " + err);
		// 		setIsLoading(false);
		// 	});

		let data = {
			manager: {
				createdDate: Date().toLocaleString(),
				firstName: firstName,
				lastName: lastName,
				email: email,
				emailVerified: cred.user.emailVerified,
				uid: cred.user.uid,
				userType: "PrepLineManager",
				provider: user.provider,
				assigned: false,
			},
		};
		console.log("data", data);
		let uid = cred.user.uid;
		axios
			.post(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/preplineManagers/${uid}?providerId=${user.provider}`,
				data
			)
			.then((res) => {
				console.log("Response add preplinemanager", res);
				if (res.data.success) {
					Toast("User Created", "success");
					setIsLoading(false);
					setIsOpenModal(false);
					resetFormValue();
					setIsUpdatePreplineManager(!isUpdatePreplineManager);
				}
			})
			.catch((err) => {
				console.log("firestore preplinemanager " + err);
				setIsLoading(false);
			});
	};

	const openAddModal = () => {
		setWhichButton("addPreplineManager");

		setIsOpenModal(true);
	};

	const updatePreplineManager = () => {
		let allValid = true;
		if (firstName === "") {
			setFirstNameError("Field is required");
			allValid = false;
		}
		if (lastName === "") {
			setLastNameError("Field is required");
			allValid = false;
		}
		if (email === "") {
			setEmailError("Field is required");
			allValid = false;
		}

		if (allValid) {
			console.log("all valid");
			setIsLoading(true);

			let data = {
				manager: {
					firstName: firstName,
					lastName: lastName,
					email: email,
				},
			};
			console.log("data", data, selectedUid);
			axios
				.put(
					`https://us-central1-afoodie-6d649.cloudfunctions.net/preplineManagers/${selectedUid}?providerId=${user?.provider}`,
					data
				)
				.then((res) => {
					console.log("Response update preplineManagers", res);
					if (res.data.success) {
						Toast(res.data.message, "success");
						setIsUpdatePreplineManager(!isUpdatePreplineManager);
						setIsLoading(false);
						resetFormValue();
						setIsOpenModal(false);
					}
				})
				.catch((err) => {
					console.error("Error update preplineManagers", err.response);
					setIsLoading(false);
				});
		}
	};

	const memoizedEditPreplineManager = useCallback((item) => {
		editPreplineManager(item);
	}, []);

	const editPreplineManager = (item) => {
		console.log(item);
		setWhichButton("updatePreplineManager");
		setIsOpenModal(true);
		setFirstName(item.firstName);
		setLastName(item.lastName);
		setEmail(item.email);
		setSelectedUid(item.uid);
	};

	const memoizedDeletePreplineManager = useCallback(
		(item) => {
			deletePreplineManagerUser(item);
		},
		[isUpdatePreplineManager]
	);

	const deletePreplineManagerUser = (item) => {
		console.log("item", item);
		axios
			.delete(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/preplineManagers/${item.uid}?providerId=${user.provider}`
			)
			.then((res) => {
				console.log("Response delete  preplineManagers", res);
				Toast(res.data.message, "success");
				setIsUpdatePreplineManager(!isUpdatePreplineManager);
			})
			.catch((err) => {
				console.error("Error delete preplineManagers", err.response);
			});
	};

	return (
		<>
			<Modals isOpen={isOpenModal} className="manage__prepline__modal">
				<div className="close__modal">
					<IconButton>
						<CloseRoundedIcon onClick={close} />
					</IconButton>
				</div>
				<Body>
					<Row>
						<InputWrapper
							label="First Name"
							error={firstNameError}
							prefixIcon={<PersonRoundedIcon />}
							onFocus={firstNameFocus}
							type="text"
							value={firstName}
							onChangeText={(e) => setFirstName(e.target.value)}
						/>
						<Vertical />
						<InputWrapper
							label="Last Name"
							error={lastNameError}
							prefixIcon={<PersonRoundedIcon />}
							onFocus={lastNameFocus}
							type="text"
							value={lastName}
							onChangeText={(e) => setLastName(e.target.value)}
						/>
					</Row>
					{whichButton === "addPreplineManager" ? (
						<InputWrapper
							label="Email"
							error={emailError}
							prefixIcon={<EmailRoundedIcon />}
							onFocus={emailFocus}
							type="email"
							value={email}
							onChangeText={(e) => setEmail(e.target.value)}
						/>
					) : null}
					{whichButton === "addPreplineManager" ? (
						<InputWrapper
							label="Password"
							error={passwordError}
							onFocus={passwordFocus}
							type="password"
							value={password}
							onChangeText={(e) => setPassword(e.target.value)}
						/>
					) : null}

					<Horizontal />

					<ButtonNLoading
						onClick={
							whichButton === "addPreplineManager"
								? addPreplineManager
								: updatePreplineManager
						}
						title={
							whichButton === "addPreplineManager"
								? "Add Prepline Manager"
								: "Update Prepline Manager"
						}
						color="white"
						isLoading={isLoading}
					/>
				</Body>
			</Modals>
			<ManagePreplineManagerContainer>
				<FloatingButton onClick={openAddModal}>
					<AddIcon style={{color: "white"}} />
				</FloatingButton>
				<PreplineManagerList>
					<Title>Prepline Manager </Title>
					<Horizontal />
					{preplineManagerList ? (
						preplineManagerList.length === 0 ? (
							<Title style={{textAlign: "center"}}>
								No Prepline Manager
							</Title>
						) : (
							preplineManagerList?.map((item, i) => (
								<PreplineManagerItem
									item={item}
									key={i}
									memoizedEditPreplineManager={
										memoizedEditPreplineManager
									}
									memoizedDeletePreplineManager={
										memoizedDeletePreplineManager
									}
								/>
							))
						)
					) : (
						<Title style={{textAlign: "center"}}>Loading...</Title>
					)}
				</PreplineManagerList>
			</ManagePreplineManagerContainer>
		</>
	);
}

export default ManagePreplineManager;
