import React, {useState, useEffect} from "react";

// Package
import axios from "axios";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

// Component
import {SectionContainer, SectionList, ButtonContainer} from "./SectionStyle";
import SectionItem from "./SectionItem";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";
import ToastBar from "../../../../components/ToastBar";

function Section() {
	const {areaId} = useParams();

	// Redux State
	const user = useSelector((state) => state.user.user);

	// Section hooks
	const [sectionsList, setSectionsList] = useState(null);
	const [isSectionListUpdate, setIsSectionListUpdate] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	// UI
	const {Toast} = ToastBar();

	useEffect(() => {
		getSectionList();
	}, [isSectionListUpdate]);

	const getSectionList = () => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/sections?providerId=" +
					user?.provider +
					"&areaId=" +
					areaId
			)
			.then((response) => {
				console.log("Response sectionlist", response);
				if (response.data.success) {
					if (typeof response?.data?.data.sections === "undefined") {
						setSectionsList([]);
					} else {
						setSectionsList(response?.data?.data?.sections);
					}
					// console.log("DADA", response?.data?.data);
				}
			})
			.catch((err) => {
				console.error("Response sectionlist", err.response);
			});
	};
	// Add section
	const addSection = () => {
		setIsLoading(true);
		const data = {
			providerId: user?.provider,
			areaId: areaId,
			adminId: user.uid,
		};
		console.log("data", data);
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/sections/",
				data
			)
			.then((response) => {
				console.log("Add Section response ", response);
				setIsSectionListUpdate(!isSectionListUpdate);
				Toast("Section Added Successfully", "success");
				setIsLoading(false);
			})
			.catch((error) => {
				console.log("error", error);
				setIsLoading(false);
			});
	};

	const sectionItemCallBack = () => {
		setIsSectionListUpdate(!isSectionListUpdate);
	};

	return (
		<SectionContainer>
			<h5>Sections</h5>
			<SectionList>
				{sectionsList?.length === 0 ? (
					<h5>Section Empty</h5>
				) : sectionsList === null ? (
					<h5>Loading...</h5>
				) : (
					<>
						{sectionsList?.map((item, i) => (
							<SectionItem
								key={i}
								item={item}
								areaId={areaId}
								sectionItemCallBack={sectionItemCallBack}
							/>
						))}
					</>
				)}
			</SectionList>
			<ButtonContainer>
				<ButtonNLoading
					onClick={addSection}
					title="Add Section"
					color="white"
					isLoading={isLoading}
				/>
			</ButtonContainer>
		</SectionContainer>
	);
}

export default Section;
