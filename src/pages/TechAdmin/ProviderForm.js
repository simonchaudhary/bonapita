import { useState } from "react";
import styled from "styled-components";
import { ToggleSwitch } from "react-dragswitch";
import "react-dragswitch/dist/index.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	saveProviderTAAction,
	removeProviderTAAction,
} from "../../Redux/actions";

// Components
import ToastBar from "../../components/ToastBar";
import { HeaderText, Title } from "../../components/texts/texts";
import { Vertical, Horizontal } from "../../components/elements/elements";
import InputWrapper from "../../components/input/InputWrapper";
import { PrimaryButton } from "../../components/buttons/buttons";
import ButtonNLoading from "../../components/buttons/ButtonNLoading";

function ProviderForm() {
	// Initilization
	const dispatch = useDispatch();

	// Redux State
	const techadmin = useSelector((state) => state.techadmin);

	const history = useHistory();
	const { Toast } = ToastBar();
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		phoneNumber1: "",
		phoneNumber2: "",
		email: "",
		website: "",
		address: "",
		payFirst: false,
	});

	const [formError, setFormError] = useState(null);

	const onChange = (key, e) => {
		// console.log(key, e.target.value);
		setFormData((prevState) => ({
			...prevState,
			[key]: e.target.value,
		}));
	};

	const focus = (key) => {
		setFormError((prevState) => ({
			...prevState,
			[key]: "",
		}));
	};

	const check = (e) => {
		e.preventDefault();

		console.log("click");
		setIsLoading(true);
		setTimeout(function () {
			setIsLoading(false);
			console.log("false");
		}, 4000);
	};

	const handleForm = (e) => {
		e.preventDefault();
		let valid = true;

		if (formData.name === "") {
			setFormError((prevState) => ({
				...prevState,
				nameError: "Enter Name",
			}));

			valid = false;
		}
		if (formData.phoneNumber1 === "") {
			setFormError((prevState) => ({
				...prevState,
				phoneNumber1Error: "Enter Phone no 1",
			}));

			valid = false;
		}
		if (formData.phoneNumber2 === "") {
			setFormError((prevState) => ({
				...prevState,
				phoneNumber2Error: "Enter Phone no 2",
			}));

			valid = false;
		}
		if (formData.email === "") {
			setFormError((prevState) => ({
				...prevState,
				emailError: "Enter Email",
			}));
			valid = false;
		}
		if (formData.website === "") {
			setFormError((prevState) => ({
				...prevState,
				websiteError: "Enter website",
			}));

			valid = false;
		}
		if (formData.address === "") {
			setFormError((prevState) => ({
				...prevState,
				addressError: "Enter Address",
			}));

			valid = false;
		}

		if (valid) {
			let data = {
				name: formData.name,
				phoneNumber: [formData.phoneNumber1, formData.phoneNumber2],
				email: formData.email,
				website: formData.website,
				address: formData.address,
				payFirst: formData.payFirst,
			};
			let id = formData.name + formData.address;
			const dataForRedux = {
				id: id,
				name: formData.name,
				phoneNumber: [formData.phoneNumber1, formData.phoneNumber2],
				email: formData.email,
				website: formData.website,
				address: formData.address,
				payFirst: formData.payFirst,
			};
			// console.log("redux", dataForRedux);
			createProvider(id, data, dataForRedux);
		}
	};

	const createProvider = (id, data, dataForRedux) => {
		setIsLoading(true);
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/provider/" +
					id,
				data
			)
			.then((res) => {
				console.log("Response create a provider", res);
				if (res.data.success) {
					setIsLoading(false);
					dispatch(saveProviderTAAction(dataForRedux));
					Toast("Provider Created Successfully", "success");
					history.push(`/provideradminform/${id}`);
					resetForm();
				}
			})
			.catch((err) => {
				console.error("Error create a provider", err.response);
				setIsLoading(false);
				Toast("Provider Already Added", "error");
				resetForm();
			});
	};

	const resetForm = () => {
		setFormData({
			name: "",
			phoneNumber1: "",
			phoneNumber2: "",
			email: "",
			website: "",
			address: "",
			payFirst: false,
		});
	};

	const goToProviderAdminForm = () => {
		history.push(`/provideradminform/${techadmin.provider.id}`);
	};
	const goToStaffForm = () => {
		history.push(`/staffform/${techadmin.provider.id}`);
	};
	const goToPreplineManagerForm = () => {
		history.push(`/preplinemanagerform/${techadmin.provider.id}`);
	};

	const goBack = () => {
		dispatch(removeProviderTAAction());
	};

	return (
		<ProviderContainer>
			{techadmin?.provider ? (
				<>
					<PrimaryButton onClick={goBack}>Go Back</PrimaryButton>
					<Horizontal />
					<PrimaryButton onClick={goToProviderAdminForm}>
						Add Provider Admin
					</PrimaryButton>
					{/* <Horizontal />
					<PrimaryButton onClick={goToStaffForm}>Add Staff</PrimaryButton>
					<Horizontal />
					<PrimaryButton onClick={goToPreplineManagerForm}>
						Add PrepLine Manager
					</PrimaryButton> */}
				</>
			) : (
				<Form>
					<HeaderText style={{ textAlign: "center", color: "#D65A31" }}>
						Provider
					</HeaderText>
					<Horizontal />
					<InputWrapper
						label="Name"
						error={formError?.nameError}
						onFocus={() => focus("nameError")}
						type="text"
						value={formData?.name}
						onChangeText={(e) => onChange("name", e)}
					/>
					<InputWrapper
						label="Phone number 1"
						error={formError?.phoneNumber1Error}
						onFocus={() => focus("phoneNumber1Error")}
						type="number"
						value={formData?.phoneNumber1}
						onChangeText={(e) => onChange("phoneNumber1", e)}
					/>
					<InputWrapper
						label="Mobile number"
						error={formError?.phoneNumber2Error}
						onFocus={() => focus("phoneNumber2Error")}
						type="number"
						value={formData?.phoneNumber2}
						onChangeText={(e) => onChange("phoneNumber2", e)}
					/>
					<InputWrapper
						label="Email"
						error={formError?.emailError}
						onFocus={() => focus("emailError")}
						type="email"
						value={formData?.email}
						onChangeText={(e) => onChange("email", e)}
					/>
					<InputWrapper
						label="Website"
						error={formError?.websiteError}
						onFocus={() => focus("websiteError")}
						type="text"
						value={formData?.website}
						onChangeText={(e) => onChange("website", e)}
					/>
					<InputWrapper
						label="Address"
						error={formError?.addressError}
						onFocus={() => focus("addressError")}
						type="text"
						value={formData?.address}
						onChangeText={(e) => onChange("address", e)}
					/>

					<SwitchContainer>
						<Title>Pay First</Title>
						<Horizontal />
						<ToggleSwitch
							checked={formData?.payFirst}
							onChange={(e) => {
								setFormData((prevState) => ({
									...prevState,
									payFirst: e,
								}));
							}}
						/>
					</SwitchContainer>
					<Horizontal />
					<ButtonNLoading
						color="white"
						isLoading={isLoading}
						title="Add Provider"
						onClick={handleForm}
					/>
				</Form>
			)}
		</ProviderContainer>
	);
}

const ProviderContainer = styled.div`
	/* background: blue; */
	width: 60%;
	/* margin-top: 0.875rem;
	margin-bottom: 0.875rem; */
	margin-left: auto;
	margin-right: auto;
	@media only screen and (max-width: 480px) and (min-width: 100px) {
		width: 90%;
	}
`;

const Form = styled.form`
	padding: 0.875rem;
	background: white;
	border-radius: 0.4rem;
`;

const SwitchContainer = styled.div`
	width: 100px;
	padding: 0.875rem;
	border-radius: 0.875rem;
	background: #f5f5f5;
`;

export default ProviderForm;
