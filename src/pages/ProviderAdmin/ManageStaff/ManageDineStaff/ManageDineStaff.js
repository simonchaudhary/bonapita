import React, {memo, useEffect, useCallback, useState} from "react";
// Package
import axios from "axios";
import {useSelector} from "react-redux";

// Icons
import {IconButton} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

// Utilities
import {auth} from "../../../../config/firebaseConfig";
import {redirectBaseURL} from "../../../../apis/baseURL";

// Components
import {
	ManageDineStaffContainer,
	Row,
	FloatingButton,
	Body,
	DineStaffList,
	ModalBody,
} from "./ManageDineStaffStyle";
import Modals from "../../../../components/modal/Modals";
import InputWrapper from "../../../../components/input/InputWrapper";
import {Horizontal, Vertical} from "../../../../components/elements/elements";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";
import ToastBar from "../../../../components/ToastBar";
import {Title} from "../../../../components/texts/texts";
import DineStaffItem from "./DineStaffItem/DineStaffItem";

const ManageDineStaff = () => {
	console.log("ManageDineStaff");

	// Initilization
	const {Toast} = ToastBar();

	// ReduxState
	const user = useSelector((state) => state.user?.user);

	// Hooks
	const [dineStaffForm, setDineStaffForm] = useState({
		firstName: {value: "", error: ""},
		lastName: {value: "", error: ""},
		email: {value: "", error: ""},
		password: {value: "", error: ""},
	});
	const [dineStaffList, setDineStaffList] = useState(null);

	// UI
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [whichButton, setWhichButton] = useState("addDine");
	const [isUpdateDineStaff, setIsUpdateDineStaff] = useState(false);

	useEffect(() => {
		getDineStaff();
	}, [isUpdateDineStaff]);

	// Functions
	const getDineStaff = () => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/dineInStaffs?providerId=${user?.provider}`
			)
			.then((res) => {
				console.log("Response getall dinestaff", res);
				if (res.data.success) {
					setDineStaffList(res.data.data.dineInStaffs);
				}
			})
			.catch((err) => {
				console.error("Error getall dinestaff", err.response);
			});
	};

	// Function
	const focus = (value) => {
		onChangeFormError("", value);
	};

	const onChangeForm = (e, key) => {
		setDineStaffForm((prevState) => {
			return {
				...prevState,
				[key]: {
					...prevState[key],
					value: e.target.value,
				},
			};
		});
	};

	const onChangeFormError = (error, key) => {
		setDineStaffForm((prevState) => {
			return {
				...prevState,
				[key]: {
					...prevState[key],
					error: error,
				},
			};
		});
	};

	const openAddModal = () => {
		setWhichButton("addDine");
		setIsOpenModal(true);
	};
	const close = () => {
		setIsOpenModal(false);
		setIsLoading(false);
		resetFormValue();
	};

	const resetFormValue = () => {
		setDineStaffForm({
			firstName: {value: "", error: ""},
			lastName: {value: "", error: ""},
			email: {value: "", error: ""},
			password: {value: "", error: ""},
		});
	};

	const addDineStaff = () => {
		let allValid = true;
		if (dineStaffForm.firstName.value === "") {
			onChangeFormError("Field is required", "firstName");
			allValid = false;
		}
		if (dineStaffForm.lastName.value === "") {
			onChangeFormError("Field is required", "lastName");
			allValid = false;
		}
		if (dineStaffForm.email.value === "") {
			onChangeFormError("Field is required", "email");
			allValid = false;
		}
		if (dineStaffForm.password.value === "") {
			onChangeFormError("Field is required", "password");
			allValid = false;
		}

		if (allValid) {
			console.log("all valid");
			setIsLoading(true);
			auth
				.createUserWithEmailAndPassword(
					dineStaffForm.email.value,
					dineStaffForm.password.value
				)
				.then((cred) => {
					console.log("User is register", cred.user.uid);
					var user = auth.currentUser;
					user
						.updateProfile({
							displayName: dineStaffForm.firstName.value,
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

	const updateDineStaff = () => {
		let allValid = true;
		if (dineStaffForm.firstName.value === "") {
			onChangeFormError("Field is required", "firstName");
			allValid = false;
		}
		if (dineStaffForm.lastName.value === "") {
			onChangeFormError("Field is required", "lastName");
			allValid = false;
		}
		if (dineStaffForm.email.value === "") {
			onChangeFormError("Field is required", "email");
			allValid = false;
		}

		if (allValid) {
			console.log("all valid", dineStaffForm);
			setIsLoading(true);

			let data = {
				staff: {
					firstName: dineStaffForm.firstName.value,
					lastName: dineStaffForm.lastName.value,
					email: dineStaffForm.email.value,
				},
			};
			console.log("data", data);
			axios
				.put(
					`https://us-central1-afoodie-6d649.cloudfunctions.net/dineInStaffs/${dineStaffForm.uid}?providerId=${user?.provider}`,
					data
				)
				.then((res) => {
					console.log("Response update dinestaff", res);
					if (res.data.success) {
						Toast(res.data.message, "success");
						setIsUpdateDineStaff(!isUpdateDineStaff);
						setIsLoading(false);
						resetFormValue();
						setIsOpenModal(false);
					}
				})
				.catch((err) => {
					console.error("Error update dinestaff", err.response);
					setIsLoading(false);
				});
		}
	};

	const saveRegisterUser = (cred) => {
		let data = {
			staff: {
				createdDate: Date().toLocaleString(),
				firstName: dineStaffForm.firstName.value,
				lastName: dineStaffForm.lastName.value,
				email: dineStaffForm.email.value,
				emailVerified: cred.user.emailVerified,
				uid: cred.user.uid,
				userType: "Staff",
				provider: user.provider,
				assigned: false,
			},
		};
		console.log("data", data);
		let uid = cred.user.uid;

		axios
			.post(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/dineInStaffs/${uid}?providerId=${user.provider}`,
				data
			)
			.then((res) => {
				console.log("Response add dineinstaff", res);
				if (res.data.success) {
					Toast("User Created", "success");
					// Send email to reset password

					var actionCodeSettings = {
						url: redirectBaseURL + "login",
					};

					auth
						.sendPasswordResetEmail(
							dineStaffForm.email.value,
							actionCodeSettings
						)
						.then(function () {
							Toast(
								`An email has been sent to ${dineStaffForm.email.value} for reset password`,
								"success"
							);
							setIsLoading(false);
							setIsOpenModal(false);
							resetFormValue();
							setIsUpdateDineStaff(!isUpdateDineStaff);
						})
						.catch(function (error) {
							// Error occurred. Inspect error.code.
						});
				}
			})
			.catch((err) => {
				console.log("firestore errorss " + err);
				setIsLoading(false);
			});
		// })
		// .catch((err) => {
		// 	console.log("firestore errorss " + err);
		// 	setIsLoading(false);
		// });
	};

	const memoizedEditDineStaff = useCallback((item) => {
		editDineStaffUser(item);
	}, []);

	const editDineStaffUser = (item) => {
		console.log(item);
		setWhichButton("updateDine");
		setIsOpenModal(true);
		setDineStaffForm({
			firstName: {value: item.firstName, error: ""},
			lastName: {value: item.lastName, error: ""},
			email: {value: item.email, error: ""},
			uid: item.uid,
		});
	};

	const memoizedDeleteStaff = useCallback(
		(item) => {
			deleteDineStaffUser(item);
		},
		[isUpdateDineStaff]
	);

	const deleteDineStaffUser = (item) => {
		console.log("item", item);
		axios
			.delete(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/dineInStaffs/${item.uid}?providerId=${user.provider}`
			)
			.then((res) => {
				console.log("Response delete  dinestaff", res);
				if (res.data.success) {
					Toast(res.data.message, "success");
					setIsUpdateDineStaff(!isUpdateDineStaff);
				}
			})
			.catch((err) => {
				console.error("Error delete dinestaff", err.response);
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
				<ModalBody>
					<Row>
						<InputWrapper
							label="First Name"
							error={dineStaffForm.firstName.error}
							onFocus={() => focus("firstName")}
							type="text"
							value={dineStaffForm.firstName.value}
							onChangeText={(e) => onChangeForm(e, "firstName")}
						/>
						<Vertical />
						<InputWrapper
							label="Last Name"
							error={dineStaffForm.lastName.error}
							onFocus={() => focus("lastName")}
							type="text"
							value={dineStaffForm.lastName.value}
							onChangeText={(e) => onChangeForm(e, "lastName")}
						/>
					</Row>
					{whichButton === "addDine" ? (
						<InputWrapper
							label="Email"
							error={dineStaffForm.email.error}
							onFocus={() => focus("email")}
							type="email"
							value={dineStaffForm.email.value}
							onChangeText={(e) => onChangeForm(e, "email")}
						/>
					) : null}
					{whichButton === "addDine" ? (
						<InputWrapper
							label="Password"
							error={dineStaffForm.password.error}
							onFocus={() => focus("password")}
							type="password"
							value={dineStaffForm.password.value}
							onChangeText={(e) => onChangeForm(e, "password")}
						/>
					) : null}
					<Horizontal />
					<ButtonNLoading
						onClick={
							whichButton === "addDine" ? addDineStaff : updateDineStaff
						}
						title={
							whichButton === "addDine"
								? "Add Dine Staff"
								: "Update Dine Staff"
						}
						color="white"
						isLoading={isLoading}
					/>
				</ModalBody>
			</Modals>
			<ManageDineStaffContainer>
				<FloatingButton onClick={openAddModal}>
					<AddIcon style={{color: "white"}} />
				</FloatingButton>
				<Body>
					<DineStaffList>
						<Title>Dine In Staffs</Title>
						<Horizontal />
						{dineStaffList ? (
							dineStaffList.length === 0 ? (
								<Title style={{textAlign: "center"}}>No Staff</Title>
							) : (
								dineStaffList?.map((item, i) => (
									<DineStaffItem
										item={item}
										key={i}
										memoizedDeleteStaff={memoizedDeleteStaff}
										memoizedEditDineStaff={memoizedEditDineStaff}
									/>
								))
							)
						) : (
							<Title style={{textAlign: "center"}}>Loading...</Title>
						)}
					</DineStaffList>
				</Body>
			</ManageDineStaffContainer>
		</>
	);
};

export default memo(ManageDineStaff);
