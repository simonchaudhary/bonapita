import React, {useState} from "react";

// Custom Hook
import useFormData from "../../Hooks/useFormData";

// Components
import Input from "../Input";
import ButtonNLoading from "../../components/buttons/ButtonNLoading";

const SpecialInstruction = ({isLoading, addSpecialInstruction}) => {
	// Hooks
	const [formData, setFormData] = useState({
		specialInstruction: "",
	});

	const [formError, setFormError] = useState({
		specialInstruction: "",
	});

	// Custom Hook
	const {onChange, onFocus, setError} = useFormData(setFormData, setFormError);

	const validate = () => {
		if (formData?.specialInstruction === "") {
			setError("specialInstruction", "Field Required");
		} else {
			addSpecialInstruction(formData.specialInstruction);
		}
	};

	return (
		<>
			<Input
				label="Special Instruction"
				error={formError.specialInstruction}
				type="text"
				value={formData.specialInstruction}
				onChange={(e) => onChange(e, "specialInstruction")}
				onFocus={() => onFocus("specialInstruction")}
			/>

			<ButtonNLoading
				color="white"
				isLoading={isLoading}
				title="Add"
				onClick={validate}
			/>
		</>
	);
};

export default SpecialInstruction;
