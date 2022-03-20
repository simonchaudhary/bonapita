import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import axios from "axios";

// Component
import {AreaContainer, AreaList, ButtonContainer} from "./AreaStyle";
import AreaItem from "./AreaItem";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";
import ToastBar from "../../../../components/ToastBar";

function Area() {
	// Redux State
	const user = useSelector((state) => state.user.user);

	// Area hooks
	const [areasList, setAreasList] = useState(null);
	const [isAreaListUpdate, setIsAreaListUpdate] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	// UI
	const {Toast} = ToastBar();

	useEffect(() => {
		getAllAreas();
		// return () => {
		// 	setAreasList(null);
		// };
	}, [isAreaListUpdate]);

	const getAllAreas = () => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/areas?provider=" +
					user?.provider
			)
			.then((res) => {
				console.log("Response  getallareas", res);
				if (res.data.success) {
					setAreasList(res.data.data.areas);
				}
			})
			.catch((err) => {});
	};

	const addArea = () => {
		setIsLoading(true);
		const data = {
			providerId: user.provider,
			adminId: user.uid,
		};
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/areas",
				data
			)
			.then((response) => {
				console.log("Response Add area ", response);
				if (response.data.success) {
					// if no area
					if (areasList?.length === 0) {
						// Get area
						setTimeout(function () {
							setIsAreaListUpdate(!isAreaListUpdate);
							setIsLoading(false);
							Toast("Area Added Successfully", "success");
						}, 3000);
					} else {
						setIsAreaListUpdate(!isAreaListUpdate);
						Toast("Area Added Successfully", "success");
						setIsLoading(false);
					}
				}
			})
			.catch((error) => {
				console.log("error", error);
				setIsLoading(false);
			});
	};

	const areaItemCallBack = () => {
		setIsAreaListUpdate(!isAreaListUpdate);
	};

	return (
		<AreaContainer>
			<h5>Areas</h5>
			<AreaList>
				{areasList?.length === 0 ? (
					<h5>Area Empty</h5>
				) : areasList === null ? (
					<h5>Loading...</h5>
				) : (
					<>
						{areasList?.map((item, i) => (
							<AreaItem
								key={i}
								item={item}
								areaItemCallBack={areaItemCallBack}
							/>
						))}
					</>
				)}
			</AreaList>
			<ButtonContainer>
				<ButtonNLoading
					onClick={addArea}
					title="Add Area"
					color="white"
					isLoading={isLoading}
				/>
			</ButtonContainer>
		</AreaContainer>
	);
}

export default Area;
