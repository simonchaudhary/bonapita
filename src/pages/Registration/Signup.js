import React, {useState} from "react";

// Package
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

// Actions
import {saveUser} from "../../Redux/actions";

// API
import {signup} from "../../apis/Registration";

// Helpers
import {validateEmail} from "../../helper/emailValidator";

// Custom Hooks
import useFormData from "../../Hooks/useFormData";

// Components
import Header from "./Header";
import ToastBar from "../../components/ToastBar";
import Input from "../../ComponentsNew/Input";
import {ButtonLoading} from "../../ComponentsNew/Button";

const Signup = () => {
	console.log("Signup");

	// Initilization
	const history = useHistory();
	const {Toast} = ToastBar();
	const dispatch = useDispatch();

	// Hooks
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const [formError, setFormError] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	// UI Hooks
	const [isLoading, setIsLoading] = useState(false);

	// Custom Hooks
	const {onChange, onFocus, setError} = useFormData(setFormData, setFormError);

	// Functions
	const onLogin = () => {
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
				if (key === "password" && formData.password.length < 10) {
					setError(key, "Must be 10 digit");
					isValid = false;
				}
			}
		}
		if (isValid) {
			console.log(formData);
			setIsLoading(true);
			signup(formData)
				.then((res) => {
					console.log("Response ", res);
					dispatch(saveUser(res));
					setIsLoading(false);
					history.replace("/");
					Toast("User Register Successfully", "success");
				})
				.catch((err) => {
					console.log("Error ", err);
					setIsLoading(false);
				});
		}
	};

	const loginHere = () => {
		history.replace("/login");
	};

	return (
		<div className="h-screen flex flex-col justify-between bg-white">
			<Header onClick={loginHere} buttonLabel="Login Here" />
			{/* Form */}
			<div className="h-full flex justify-center items-center">
				<div className="w-full md:w-1/3 px-4 md:px-2 md:mt-10">
					<p className="text-center text-2xl font-medium mb-5">Signup</p>
					<Input
						label="FirstName"
						error={formError.firstName}
						type="text"
						value={formData.firstName}
						onChange={(e) => onChange(e, "firstName")}
						onFocus={() => onFocus("firstName")}
					/>
					<Input
						label="LastName"
						error={formError.lastName}
						type="email"
						value={formData.lastName}
						onChange={(e) => onChange(e, "lastName")}
						onFocus={() => onFocus("lastName")}
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
						label="Password"
						error={formError.password}
						type="password"
						value={formData.password}
						onChange={(e) => onChange(e, "password")}
						onFocus={() => onFocus("password")}
					/>
					<ButtonLoading
						color="white"
						title="Signup"
						onClick={onLogin}
						isLoading={isLoading}
					/>
				</div>
			</div>
			<footer className="flex justify-center items-center border-t border-gray-00 py-6">
				<p className="text-xs text-gray-400">
					© 2021 aFoodie, All rights reserved.
				</p>
			</footer>
		</div>
	);
};

export default Signup;
