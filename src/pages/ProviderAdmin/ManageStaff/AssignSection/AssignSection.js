import React, {useEffect, useState} from "react";

// Package
import axios from "axios";
import {useSelector} from "react-redux";

// Components
import {
	AssignSectionContainer,
	StaffList,
	StaffItem,
	Row,
} from "./AssignSectionStyle";
import {Title, Detail} from "../../../../components/texts/texts";
import InputWrapper from "../../../../components/input/InputWrapper";
import {Horizontal, Vertical} from "../../../../components/elements/elements";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";
import ToastBar from "../../../../components/ToastBar";

const AssignSection = () => {
	console.log("AssignSection");

	// Initilization
	const {Toast} = ToastBar();

	// Redux state
	const user = useSelector((state) => state.user?.user);

	// Hooks
	const [staffList, setStaffList] = useState(null);
	const [sectionList, setSectionList] = useState(null);
	const [selectSection, setSelectSection] = useState(null);
	const [from, setFrom] = useState(0);
	const [to, setTo] = useState(0);

	// UI
	const [selectStaff, setSelectStaff] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [updateSection, setUpdateSection] = useState(false);
	const [updateAllStaff, setUpdateAllStaff] = useState(false);

	useEffect(() => {
		getAllStaff();

		return () => {
			setStaffList(null);
		};
	}, [updateAllStaff]);

	useEffect(() => {
		getUnassignedSection();

		return () => {
			setSectionList(null);
		};
	}, [updateSection]);

	const getAllStaff = () => {
		axios
			.get(
				// "https://us-central1-afoodie-6d649.cloudfunctions.net/staff?provider=" +
				// 	user?.provider

				`https://us-central1-afoodie-6d649.cloudfunctions.net/dineInStaffs?providerId=${user?.provider}`
			)
			.then((res) => {
				// console.log("Response All Staff", res.data.data.staffs);
				// setStaffList(res.data.data.staffs);
				console.log("Response All Staff", res.data.data.dineInStaffs);
				setStaffList(res.data.data.dineInStaffs);
			})
			.catch((err) => {
				console.error("Error all staff", err.response);
			});
	};

	const getUnassignedSection = () => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/dining/sections?providerId=${user?.provider}`
			)
			.then((response) => {
				console.log("Response All unassign", response.data.data.sections);
				setSectionList(response.data.data.sections);
				// setSelectSection(null);
			})
			.catch((err) => {
				console.log("Error get all unassign section", err?.response);
			});
	};

	const staffSelectButton = (item) => {
		setSelectStaff(item);
	};

	const assignButton = () => {
		if (selectStaff === "") {
			Toast("Select Staff", "success");
		} else if (selectSection === null) {
			Toast("Select Section", "success");
		} else if (from === 0) {
			Toast("Select From Time", "success");
		} else if (to === 0) {
			Toast("Select To Time", "success");
		} else {
			setIsLoading(true);
			// Convert Back to json from string
			let selectedSection = JSON.parse(selectSection);

			const data = {
				providerId: user.provider,
				areaId: selectedSection.areaId,
				sectionId: selectedSection.sectionId,
				from: from,
				to: to,
			};

			console.log("data", data, selectStaff);
			axios
				.post(
					"https://us-central1-afoodie-6d649.cloudfunctions.net/staff/" +
						selectStaff.uid +
						"/assign-section",
					data
				)
				.then((response) => {
					console.log("Response asssign", response);
					setUpdateSection(!updateSection);
					setSelectSection(null);
					setTo(0);
					setFrom(0);
					setSelectStaff("");
					Toast(`${selectStaff.firstName} Section Assigned`, "success");
					setIsLoading(false);
					setUpdateAllStaff(!updateAllStaff);
					setUpdateSection(!updateSection);
				})
				.catch((error) => {
					console.log("Response assign catch error", error);
					setIsLoading(false);
				});
		}
	};

	return (
		<AssignSectionContainer>
			<StaffList>
				{staffList ? (
					staffList.length === 0 ||
					staffList.filter((item) => item.assigned === false).length ===
						0 ? (
						<Title style={{textAlign: "center"}}>No Staff</Title>
					) : (
						staffList
							.filter((item) => item.assigned === false)
							.map((item, i) => (
								<StaffItem
									key={i}
									style={{
										background:
											selectStaff.uid === item.uid
												? "#d65a31"
												: null,
									}}
									onClick={() => staffSelectButton(item)}
								>
									<Title>{item?.firstName}</Title>
									{/* <Title>{item?.assigned.toString()}</Title> */}
									<Detail>{item?.lastName}</Detail>
								</StaffItem>
							))
					)
				) : (
					<Title style={{textAlign: "center"}}>Loading...</Title>
				)}
			</StaffList>
			<Horizontal />
			<InputWrapper
				type="text"
				value={selectSection}
				onChangeText={(e) => setSelectSection(e.target.value)}
				section
				optionArray={sectionList}
			/>
			<Horizontal />
			<Row>
				<InputWrapper
					label="From"
					// error={userTypeError}
					// prefixIcon={<GroupRoundedIcon />}
					// onFocus={userTypeFocus}
					type="time"
					value={from}
					onChangeText={(e) => setFrom(e.target.value)}
				/>
				<Vertical />
				<InputWrapper
					label="To"
					// error={userTypeError}
					// prefixIcon={<GroupRoundedIcon />}
					// onFocus={userTypeFocus}
					type="time"
					value={to}
					onChangeText={(e) => setTo(e.target.value)}
				/>
			</Row>
			<ButtonNLoading
				onClick={assignButton}
				title="Assign Section"
				color="white"
				isLoading={isLoading}
			/>
		</AssignSectionContainer>
	);
};

export default AssignSection;
