import React, {useState} from "react";
// Package
import {ToggleSwitch} from "react-dragswitch";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
// API
import {addProvider} from "../../apis/TechAdmin";
import ButtonNLoading from "../../components/buttons/ButtonNLoading";
import ToastBar from "../../components/ToastBar";
// Components
import Input from "../../ComponentsNew/Input";
// Helpers
import {validateEmail} from "../../helper/emailValidator";
// Custom Hook
import useFormData from "../../Hooks/useFormData";
// Actions
import {saveProviderTAAction} from "../../Redux/actions";

const Provider = () => {
	// Initilization
	const dispatch = useDispatch();
	const {Toast} = ToastBar();
	const history = useHistory();

	// Hooks
	const [formData, setFormData] = useState({
		name: "",
		phoneNumber1: "",
		phoneNumber2: "",
		email: "",
		website: "",
		address: "",
		payFirst: false,
	});

	const [formError, setFormError] = useState({
		name: "",
		phoneNumber1: "",
		phoneNumber2: "",
		email: "",
		website: "",
		address: "",
		payFirst: false,
	});

	// UI Hooks
	const [isLoading, setIsLoading] = useState(false);

	// Custom Hook
	const {onChange, onFocus, setError} = useFormData(setFormData, setFormError);

	// Functions
	const onAddProvider = () => {
		let isValid = true;
		for (const [key, value] of Object.entries(formData)) {
			// console.log(`${key}: ${value}`);
			if (value === "") {
				setError(key, "Field Required");
				isValid = false;
			} else {
				if (key === "email" && !validateEmail(formData.email)) {
					setError(key, "Invalid Email");
					isValid = false;
				}
				if (key === "phoneNumber1" && formData.phoneNumber1.length < 10) {
					setError(key, "Must be 10 digit");
					isValid = false;
				}
				if (key === "phoneNumber2" && formData.phoneNumber2.length < 10) {
					setError(key, "Must be 10 digit");
					isValid = false;
				}
			}
		}

		if (isValid) {
			setIsLoading((prevState) => !prevState);
			// console.log("form data", formData);

			let id =
				formData.name.replaceAll(" ", "_") +
				"___" +
				formData.address.replaceAll(" ", "_");

			const dataForRedux = {
				id: id,
				name: formData.name,
				phoneNumber: [formData.phoneNumber1, formData.phoneNumber2],
				email: formData.email,
				website: formData.website,
				address: formData.address,
				payFirst: formData.payFirst,
			};
			addProvider(formData)
				.then((res) => {
					console.log("Response add provider", res);
					resetForm();
					setIsLoading((prevState) => !prevState);
					dispatch(saveProviderTAAction(dataForRedux));
					Toast("Provider Created Successfully", "success");
					let id = res.data.data.id;
					history.push(`/provideradmin/${id}`);
				})
				.catch((err) => {
					console.error("Error create a provider", err.response);
					setIsLoading((prevState) => !prevState);
					resetForm();
				});
		}
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

	return (
		<div className="flex justify-center">
			<div className="w-full md:w-3/6 m-2 mt-4">
				<Input
					label="Name"
					error={formError.name}
					type="text"
					value={formData.name}
					onChange={(e) => onChange(e, "name")}
					onFocus={() => onFocus("name")}
				/>
				<Input
					label="Phone Number 1"
					error={formError.phoneNumber1}
					type="number"
					value={formData.phoneNumber1}
					onChange={(e) => onChange(e, "phoneNumber1")}
					onFocus={() => onFocus("phoneNumber1")}
				/>
				<Input
					label="Phone Number 2"
					error={formError.phoneNumber2}
					type="number"
					value={formData.phoneNumber2}
					onChange={(e) => onChange(e, "phoneNumber2")}
					onFocus={() => onFocus("phoneNumber2")}
				/>
				<Input
					label="Email"
					error={formError.email}
					type="email"
					value={formData.email}
					onChange={(e) => onChange(e, "email")}
					onFocus={() => onFocus("email")}
				/>
				<Input
					label="Website"
					error={formError.website}
					type="text"
					value={formData.website}
					onChange={(e) => onChange(e, "website")}
					onFocus={() => onFocus("website")}
				/>
				<Input
					label="Address"
					error={formError.address}
					type="text"
					value={formData.address}
					onChange={(e) => onChange(e, "address")}
					onFocus={() => onFocus("address")}
				/>
				<div className="w-24 bg-gray-100 p-3.5 rounded-lg mb-4">
					<p className="text-xs font-normal mb-2">Pay First</p>

					<ToggleSwitch
						checked={formData?.payFirst}
						onChange={(e) => {
							setFormData((prevState) => ({
								...prevState,
								payFirst: e,
							}));
						}}
					/>
				</div>
				<ButtonNLoading
					color="white"
					isLoading={isLoading}
					title="Add Provider"
					onClick={onAddProvider}
				/>
			</div>
		</div>
	);
};

export default Provider;
