import React, {useState, useEffect} from "react";

// Package
import styled from "styled-components";
import axios from "axios";
import {useSelector} from "react-redux";

// Icons
import {IconButton} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

// Functions
import {auth} from "../../../../config/firebaseConfig";

// Components
import {SecondaryButton} from "../../../../components/buttons/buttons";
import ToastBar from "../../../../components/ToastBar";
import {Title, Detail} from "../../../../components/texts/texts";
import {Horizontal, Vertical} from "../../../../components/elements/elements";
import InputWrapper from "../../../../components/input/InputWrapper";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";

const PreplineUsers = React.memo(({selectedPrepline}) => {
	// Initilization
	const {Toast} = ToastBar();

	// Redux state
	const user = useSelector((state) => state.user?.user);

	// Hooks
	const [preplineUserList, setPreplineUserList] = useState(null);
	const [form, setForm] = useState({
		firstName: {
			value: "",
			error: "",
		},
		lastName: {
			value: "",
			error: "",
		},
		email: {
			value: "",
			error: "",
		},
		password: {
			value: "",
			error: "",
		},
	});

	// UI
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdatePreplineUsers, setIsUpdatePreplineUsers] = useState(false);
	const [whichButton, setWhichButton] = useState("addPreplineUser");

	const resetField = () => {
		setForm({
			firstName: {
				value: "",
				error: "",
			},
			lastName: {
				value: "",
				error: "",
			},
			email: {
				value: "",
				error: "",
			},
			password: {
				value: "",
				error: "",
			},
		});
	};

	useEffect(() => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/preplines/${selectedPrepline.id}/staffs?providerId=${user?.provider}`
			)
			.then((res) => {
				console.log("Respnose get allprepline user", res);
				if (res.data.success) {
					setPreplineUserList(res.data.data.staffs);
				}
			})
			.catch((err) => {
				console.error("Error getallprepline user", err.response);
			});
	}, [isUpdatePreplineUsers]);

	// Function
	const focus = (value) => {
		onChangeFormError("", value);
	};

	const onChangeForm = (e, key) => {
		setForm((prevState) => {
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
		setForm((prevState) => {
			return {
				...prevState,
				[key]: {
					...prevState[key],
					error: error,
				},
			};
		});
	};

	const addPreplineUser = () => {
		let allValid = true;
		if (form.firstName.value === "") {
			onChangeFormError("Field is required", "firstName");
			allValid = false;
		}
		if (form.lastName.value === "") {
			onChangeFormError("Field is required", "lastName");
			allValid = false;
		}
		if (form.email.value === "") {
			onChangeFormError("Field is required", "email");
			allValid = false;
		}
		if (form.password.value === "") {
			onChangeFormError("Field is required", "password");
			allValid = false;
		}

		if (allValid) {
			setIsLoading(true);
			auth
				.createUserWithEmailAndPassword(
					form.email.value,
					form.password.value
				)
				.then((cred) => {
					console.log("User is register", cred.user.uid);
					var user = auth.currentUser;
					user
						.updateProfile({
							displayName: form.firstName.value,
						})
						.then(function () {
							console.log("display update successful");
						})
						.catch(function (error) {
							console.log("display update unsuccessful");
						});
					saveRegisterUser(cred);
				})
				.catch((err) => {
					console.log("error " + err);
					setIsLoading(false);
					Toast(err.toString(), "error");
				});
		}
	};

	const saveRegisterUser = (cred) => {
		// save to firebase
		let uid = cred.user.uid;
		let data = {
			createdDate: Date().toLocaleString(),
			firstName: form.firstName.value,
			lastName: form.lastName.value,
			email: form.email.value,
			emailVerified: cred.user.emailVerified,
			uid: cred.user.uid,
			userType: "PrepLineStaff",
			provider: user?.provider,
			prepLineName: selectedPrepline.preplineName,
		};

		saveUserToProviderCollection(uid, data);
		// firestore
		// 	.collection("users")
		// 	.doc(cred.user.uid)
		// 	.set(data)
		// 	.then((cred) => {
		// 		console.log("save to firebase");
		// 		saveUserToProviderCollection(uid, data);
		// 	})
		// 	.catch((err) => {
		// 		console.log("firestore errorss " + err);
		// 		setIsLoading(false);
		// 	});
	};

	const saveUserToProviderCollection = (uid, data) => {
		axios
			.post(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/preplines/${selectedPrepline.id}/staffs/${uid}?providerId=${user?.provider}`,
				data
			)
			.then((res) => {
				console.log("Response add user to Provider", res);
				Toast("User save to Firestore", "success");
				setIsUpdatePreplineUsers(!isUpdatePreplineUsers);
				resetField();
				setIsLoading(false);
			})
			.catch((err) => {
				console.error("Error add user to Provider", err.response);
				setIsLoading(false);
			});
	};

	const updatePreplineUser = () => {
		let allValid = true;
		if (form.firstName.value === "") {
			onChangeFormError("Field is required", "firstName");
			allValid = false;
		}
		if (form.lastName.value === "") {
			onChangeFormError("Field is required", "lastName");
			allValid = false;
		}
		if (form.email.value === "") {
			onChangeFormError("Field is required", "email");
			allValid = false;
		}

		if (allValid) {
			// form.password === uid
			setIsLoading(true);
			console.log("uid", form.password.value);
			let data = {
				firstName: form.firstName.value,
				lastName: form.lastName.value,
				email: form.email.value,
			};
			console.log("data", data);
			axios
				.put(
					`https://us-central1-afoodie-6d649.cloudfunctions.net/preplines/${selectedPrepline.id}/staffs/${form.password.value}?providerId=${user?.provider}`,
					data
				)
				.then((res) => {
					console.log("Response edit preplineuser");
					if (res.data.success) {
						Toast("Update Successfully", "success");
						setIsLoading(false);
					}
				})
				.catch((err) => {
					console.error("Error edit preplineuser", err?.response);
					setIsLoading(false);
				});
		}
	};

	const editPreplineUser = (item) => {
		setWhichButton("updatePreplineUser");
		setForm({
			firstName: {
				value: item.firstName,
				error: "",
			},
			lastName: {
				value: item.lastName,
				error: "",
			},
			email: {
				value: item.email,
				error: "",
			},
			password: {
				value: item.uid,
				error: "",
			},
		});
	};

	const deletePreplineUser = (item) => {
		console.log("Detele", item, selectedPrepline.preplineName);
		axios
			.delete(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/preplines/${selectedPrepline.id}/staffs/${item.uid}?providerId=${user?.provider}`
			)
			.then((res) => {
				console.log("Response delete preplineuser", res);
				if (res.data.success) {
					setIsUpdatePreplineUsers(!isUpdatePreplineUsers);
					Toast("Delete Successfully", "success");
				}
			})
			.catch((err) => {
				console.error("Error delete preplineuser", err.response);
				Toast("Delete Failded", "success");
			});
	};

	return (
		<PreplineUsersContainer>
			<Title>Prepline Users</Title>
			<Horizontal />
			<div style={{marginBottom: "0.875rem"}}>
				{preplineUserList?.map((item, i) => (
					<PreplineUserItem
						key={i}
						item={item}
						editPreplineUser={editPreplineUser}
						deletePreplineUser={deletePreplineUser}
					/>
				))}
			</div>
			<HorizontalLine />
			<Form>
				<Row>
					<InputWrapper
						label="First Name"
						error={form.firstName.error}
						onFocus={() => focus("firstName")}
						type="text"
						value={form.firstName.value}
						onChangeText={(e) => onChangeForm(e, "firstName")}
					/>
					<Vertical />
					<InputWrapper
						label="Last Name"
						error={form.lastName.error}
						onFocus={() => focus("lastName")}
						type="text"
						value={form.lastName.value}
						onChangeText={(e) => onChangeForm(e, "lastName")}
					/>
				</Row>
				{whichButton === "updatePreplineUser" ? null : (
					<InputWrapper
						label="Email"
						error={form.email.error}
						onFocus={() => focus("email")}
						type="email"
						value={form.email.value}
						onChangeText={(e) => onChangeForm(e, "email")}
					/>
				)}
				{whichButton === "updatePreplineUser" ? null : (
					<InputWrapper
						label="Password"
						error={form.password.error}
						onFocus={() => focus("password")}
						type="password"
						value={form.password.value}
						onChangeText={(e) => onChangeForm(e, "password")}
					/>
				)}

				<ButtonNLoading
					onClick={
						whichButton === "addPreplineUser"
							? addPreplineUser
							: updatePreplineUser
					}
					title={
						whichButton === "addPreplineUser"
							? "Add Prepline User"
							: "Update Prepline User"
					}
					color="white"
					isLoading={isLoading}
				/>
				<Horizontal />
				{whichButton === "updatePreplineUser" ? (
					<SecondaryButton
						onClick={() => {
							resetField();
							setWhichButton("addPreplineUser");
						}}
					>
						Add Prepline
					</SecondaryButton>
				) : null}
			</Form>
		</PreplineUsersContainer>
	);
});

const PreplineUserItem = React.memo(
	({item, editPreplineUser, deletePreplineUser}) => {
		return (
			<ItemContainer>
				<Title>{item.firstName}</Title>
				<Detail>{item.email}</Detail>
				<Buttons>
					<div onClick={() => editPreplineUser(item)}>
						<IconButton>
							<EditRoundedIcon />
						</IconButton>
					</div>
					<div onClick={() => deletePreplineUser(item)}>
						<IconButton>
							<DeleteRoundedIcon />
						</IconButton>
					</div>
				</Buttons>
			</ItemContainer>
		);
	}
);

// Styled
const PreplineUsersContainer = styled.div`
	padding: 0.75rem;
`;
const ItemContainer = styled.div`
	padding: 0rem 0.75rem;
	padding-right: 0rem;
	margin-bottom: 0.75rem;
	background: #f5f5f5;
	display: flex;
	align-items: center;
	border-radius: 0.4rem;
`;

const Buttons = styled.div`
	display: flex;
	align-items: center;
`;

const HorizontalLine = styled.div`
	width: 100%;
	height: 1px;
	background: #f5f5f5;
	margin-bottom: 0.875rem;
`;

const Form = styled.div`
	background: #f8f8f8;
	padding: 0.75rem;
	border-radius: 0.4rem;
`;

const Row = styled.div`
	display: flex;
	align-items: center;
`;

export default PreplineUsers;
