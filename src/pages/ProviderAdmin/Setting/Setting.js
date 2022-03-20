import React, {useState, useEffect} from "react";
import {ToggleSwitch} from "react-dragswitch";
import "react-dragswitch/dist/index.css";
import ImageUpload from "image-upload-react";
import "image-upload-react/dist/index.css";
import axios from "axios";
import reactImageSize from "react-image-size";

// Redux
import {useSelector} from "react-redux";

// Components
import {PrimaryButton} from "../../../components/buttons/buttons";
import {
	SettingContainer,
	SMSContainer,
	Row,
	Column,
	InputArea,
} from "./SettingStyle";
import {Horizontal, Vertical} from "../../../components/elements/elements";
import {Title} from "../../../components/texts/texts";
import ToastBar from "../../../components/ToastBar";

function Setting() {
	// Redux
	const user = useSelector((state) => state.user.user);
	const {Toast} = ToastBar();

	// Hooks
	const [providerDetail, setProviderDetail] = useState(null);
	// const imgElement = React.useRef(null);

	// text
	const [headerTitle, setHeaderTitle] = useState("");
	const [headerDetail, setHeaderDetail] = useState("");
	const [footerTitle, setFooterTitle] = useState("");
	const [footerDetail, setFooterDetail] = useState("");
	const [logoImage, setLogoImage] = useState(null);
	const [footerImage, setfooterImage] = useState(null);

	// useEffect
	useEffect(() => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/provider/" +
					user?.provider
			)
			.then((res) => {
				console.log("Response get Provider detail", res);
				setProviderDetail(res.data.data.provider);
			})
			.catch((err) => {
				console.error("Error get Provider detail", err.response);
			});
	}, []);

	useEffect(() => {
		get();
	}, []);

	const get = () => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/provider/" +
					user?.provider +
					"/page-info"
			)
			.then((res) => {
				console.log("Response getProvider Info", res);
				if (res.data.success) {
					setHeaderTitle(res.data.data.pageInfo.header.message1);
					setHeaderDetail(res.data.data.pageInfo.header.message2);
					setFooterTitle(res.data.data.pageInfo.footer.message1);
					setFooterDetail(res.data.data.pageInfo.footer.message2);
				}
			})
			.catch((err) => {
				console.error("Error getProvider Info", err);
			});
	};

	const handleImageSelect = (e) => {
		console.log("image", e);
		// setLogoImage(URL.createObjectURL(e.target.files[0]));
		// setLogoImage(e.target.files[0]);
		let data = {
			url: URL.createObjectURL(e.target.files[0]),
			file: e.target.files[0],
		};
		console.log("image", data);
		reactImageSize(data.url)
			.then(({width, height}) => {
				console.log("Width Height", width, height);
				if (
					(width >= 600 && width <= 700) ||
					(height >= 200 && height <= 300)
				) {
					setLogoImage(data);
				} else {
					alert(
						"Please upload logo of width of 600px to 700px and height 200px to 300px for best viewing"
					);
				}
			})
			.catch((errorMessage) => {
				console.log("Error during getting image resolution", errorMessage);
			});
	};
	const handleFooterImageSelect = (e) => {
		let data = {
			url: URL.createObjectURL(e.target.files[0]),
			file: e.target.files[0],
		};
		setfooterImage(data);
	};

	const saveLogo = () => {
		const formData = new FormData();

		formData.append("image", logoImage?.file);
		formData.append("name", "logo");

		// Details of the uploaded file
		console.log(formData);
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/provider/" +
					user?.provider +
					"/logo",
				formData
			)
			.then((res) => {
				console.log("Response logoSave", res);
				Toast("Logo Saved", "success");
			})
			.catch((err) => {
				console.error("Error logoSave", err.response);
			});
	};
	const saveFooterImage = () => {
		const formData = new FormData();

		formData.append("image", footerImage?.file);
		formData.append("name", "logo");

		// Details of the uploaded file
		console.log(formData);
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/provider/" +
					user?.provider +
					"/footer-image",
				formData
			)
			.then((res) => {
				console.log("Response footerImage", res);

				Toast("Saved Footer Image", "success");
			})
			.catch((err) => {
				console.error("Error footerImage", err.response);
			});
	};

	const saveInfo = () => {
		const data = {
			header: {
				message1: headerTitle,
				message2: headerDetail,
			},
			footer: {
				message1: footerTitle,
				message2: footerDetail,
			},
		};

		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/provider/" +
					user?.provider +
					"/page-info",
				data
			)
			.then((res) => {
				console.log("Response providerinfo", res);
				Toast("Provider Info Save", "success");
			})
			.catch((err) => {
				console.error("Error providerinfo", err.response);
			});
	};

	const updateProviderSetting = (data) => {
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/provider/" +
					user?.provider,
				data
			)
			.then((res) => {
				console.log("Response update provider setting", res);
			})
			.catch((err) => {
				console.error("Error update provider setting", err.response);
			});
	};

	return (
		<SettingContainer>
			<Row>
				<SMSContainer>
					<Title>Online Order</Title>
					{providerDetail === null ? (
						<h6>Loading...</h6>
					) : (
						<ToggleSwitch
							checked={providerDetail?.onlineOrder}
							onChange={(e) => {
								const data = {
									onlineOrder: e,
								};
								updateProviderSetting(data);
								setProviderDetail((prevState) => {
									return {
										...prevState,
										onlineOrder: e,
									};
								});
							}}
						/>
					)}
				</SMSContainer>
				<Vertical />
				<SMSContainer>
					<Title>Self Service (OR Order)</Title>
					{providerDetail === null ? (
						<h6>Loading...</h6>
					) : (
						<ToggleSwitch
							checked={providerDetail?.selfService}
							onChange={(e) => {
								const data = {
									selfService: e,
								};
								updateProviderSetting(data);
								setProviderDetail((prevState) => {
									return {
										...prevState,
										selfService: e,
									};
								});
							}}
						/>
					)}
				</SMSContainer>
				<Vertical />
				<SMSContainer>
					<Title>SMS </Title>
					{providerDetail === null ? (
						<h6>Loading...</h6>
					) : (
						<ToggleSwitch
							checked={providerDetail?.smsEnable}
							onChange={(e) => {
								const data = {
									smsEnable: e,
								};
								updateProviderSetting(data);
								setProviderDetail((prevState) => {
									return {
										...prevState,
										smsEnable: e,
									};
								});
							}}
						/>
					)}
				</SMSContainer>
				<Vertical />
				<SMSContainer>
					<Title>Pay First</Title>
					{providerDetail === null ? (
						<h6>Loading...</h6>
					) : (
						<ToggleSwitch
							checked={providerDetail?.payFirst}
							onChange={(e) => {
								const data = {
									payFirst: e,
								};
								updateProviderSetting(data);
								setProviderDetail((prevState) => {
									return {
										...prevState,
										payFirst: e,
									};
								});
							}}
						/>
					)}
				</SMSContainer>
			</Row>

			<Horizontal />
			<Title>Theme</Title>
			<Horizontal />
			<Row>
				<Column>
					<Title>Logo</Title>
					<ImageUpload
						handleImageSelect={handleImageSelect}
						imageSrc={logoImage?.url}
						setImageSrc={setLogoImage}
						style={{
							width: 280,
							height: 200,
							background: "gold",
						}}
					/>
					<Horizontal />
					{logoImage && (
						<PrimaryButton onClick={saveLogo}>Save Logo</PrimaryButton>
					)}
				</Column>
				<Column>
					<Title>Footer Image</Title>
					<ImageUpload
						handleImageSelect={handleFooterImageSelect}
						imageSrc={footerImage?.url}
						setImageSrc={setfooterImage}
						style={{
							width: 280,
							height: 200,
							background: "gold",
						}}
					/>
					<Horizontal />
					{footerImage && (
						<PrimaryButton onClick={saveFooterImage}>
							Save Footer Image
						</PrimaryButton>
					)}
				</Column>
			</Row>
			<Horizontal />
			<Row>
				<Column>
					<Title>Header Title</Title>
					<Horizontal />
					<InputArea
						style={{width: "280px"}}
						name={headerTitle}
						value={headerTitle}
						onChange={(e) => setHeaderTitle(e.target.value)}
					></InputArea>
				</Column>
				<Column>
					<Title>Header Detail</Title>
					<Horizontal />
					<InputArea
						style={{width: "280px"}}
						name={headerDetail}
						value={headerDetail}
						onChange={(e) => setHeaderDetail(e.target.value)}
					></InputArea>
				</Column>
			</Row>
			<Horizontal />
			<Row>
				<Column>
					<Title>Footer Title</Title>
					<Horizontal />
					<InputArea
						style={{width: "280px"}}
						name={footerTitle}
						value={footerTitle}
						onChange={(e) => setFooterTitle(e.target.value)}
					></InputArea>
				</Column>
				<Column>
					<Title>Footer Detail</Title>
					<Horizontal />
					<InputArea
						style={{width: "280px"}}
						name={footerDetail}
						value={footerDetail}
						onChange={(e) => setFooterDetail(e.target.value)}
					></InputArea>
				</Column>
			</Row>
			<Horizontal />
			<PrimaryButton style={{width: "100px"}} onClick={saveInfo}>
				Save
			</PrimaryButton>
		</SettingContainer>
	);
}

export default Setting;
