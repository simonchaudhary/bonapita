import React, { useState } from "react";

// Package
import styled from "styled-components";
import Select from "react-select";
import axios from "axios";
import { useSelector } from "react-redux";

// Component
import InputWrapper from "../../../../components/input/InputWrapper";
import TransferList from "../TranserList/TransferList";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";
import InputIPMask from "./InputIPMask/IPInputMask";

const PreplineData = React.memo(({ callBack, selectedPrepline }) => {
	console.log("PreplineData", selectedPrepline);

	// Redux State
	const user = useSelector((state) => state.user?.user);

	// Hooks
	const [form, setForm] = useState({
		preplineName: {
			value: selectedPrepline?.preplineName ?? "",
			error: "",
		},
		preplineType: selectedPrepline?.preplineType ?? {
			value: "display",
			label: "Display",
		},
		printerIP: {
			value: selectedPrepline?.printerIP ?? "",
			mask: "999.999.999.999",
			error: "",
		},
		port: {
			value: selectedPrepline?.port ?? "",
			error: "",
		},
	});

	// UI
	const [isLoading, setIsLoading] = useState(false);

	// Transfer List
	const [left, setLeft] = useState(null);
	const [right, setRight] = useState(selectedPrepline?.menuItems);

	// Function
	const focus = (value) => {
		onChangeFormError("", value);
	};

	const handlePrepLineTypeChange = (selectedPrepLineType) => {
		console.log("handle prepline type change", selectedPrepLineType);
		setForm((prevState) => {
			return {
				...prevState,
				preplineType: {
					value: selectedPrepLineType.value,
					label: selectedPrepLineType.label,
				},
			};
		});
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

	const updatePrepline = () => {
		let allValid = true;
		if (form.preplineName.value === "") {
			onChangeFormError("Field is required", "preplineName");
			allValid = false;
		}
		if (form.preplineType.value === "print") {
			if (form.printerIP.value === 0) {
				onChangeFormError("Field is required", "printerIP");
				allValid = false;
			}
			if (form.port.value === "") {
				onChangeFormError("Field is required", "port");
				allValid = false;
			}
		}
		if (allValid) {
			setIsLoading(true);
			// console.log(form, right);
			let data = {
				preplineName: form.preplineName.value,
				printerIP:
					form.preplineType.value === "print"
						? form.printerIP.value
						: null,
				port: form.preplineType.value === "print" ? form.port.value : null,
				menuItems: right,
				preplineType: form.preplineType,
				preplineUsers: [],
			};
			console.log("Data", data);
			axios
				.put(
					`https://us-central1-afoodie-6d649.cloudfunctions.net/preplines/${selectedPrepline?.id}?providerId=${user?.provider}`,
					data
				)
				.then((res) => {
					console.log("Response updateprepline", res);
					setIsLoading(false);
					callBack();
					alert("Updated");
				})
				.catch((err) => {
					console.error("Error updateprepline", err.response);
					setIsLoading(false);
				});
		}
	};

	return (
		<PreplineDataContainer>
			<Form>
				<InputWrapper
					label="Prepline Name"
					error={form.preplineName.error}
					onFocus={() => focus("preplineName")}
					type="text"
					value={form.preplineName.value}
					onChangeText={(e) => onChangeForm(e, "preplineName")}
				/>
				<SelectContainer>
					<Label>PrepLine Type</Label>
					<Select
						value={form.preplineType}
						onChange={handlePrepLineTypeChange}
						options={prepLineTypeList}
					/>
				</SelectContainer>
				{form.preplineType.value === "print" ? (
					<>
						<Horizontal />
						{/* <InputWrapper
							label="Printer IP"
							error={form.printerIP.error}
							onFocus={() => focus("printerIP")}
							type="number"
							value={form.printerIP.value}
							onChangeText={(e) => onChangeForm(e, "printerIP")}
						/> */}{" "}
						<InputIPMask
							label="Printer IP"
							error={form.printerIP.error}
							printerIP={form.printerIP}
							setForm={setForm}
						/>
						<InputWrapper
							label="Port"
							error={form.port.error}
							onFocus={() => focus("port")}
							type="number"
							value={form.port.value}
							onChangeText={(e) => onChangeForm(e, "port")}
						/>
					</>
				) : null}
				<TransferList
					left={left}
					setLeft={setLeft}
					right={right}
					setRight={setRight}
				/>
				<Horizontal />
				<ButtonNLoading
					onClick={updatePrepline}
					title="Update Prepline"
					color="white"
					isLoading={isLoading}
				/>
			</Form>
		</PreplineDataContainer>
	);
});

const prepLineTypeList = [
	{ value: "display", label: "Display" },
	{ value: "print", label: "Print" },
];

// Styled
const PreplineDataContainer = styled.div`
	padding: 0.75rem;
	padding-bottom: 2rem;
`;

const Label = styled.p`
	font-size: 0.75rem;
	font-weight: 600;
	color: #393e46;
	margin-bottom: 10px;
`;

const Horizontal = styled.div`
	width: 100%;
	height: 0.875rem;
`;

const Form = styled.div``;

const SelectContainer = styled.div``;

export default PreplineData;
