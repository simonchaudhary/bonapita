import React from "react";
// import PropTypes from "prop-types";
import "./inputwrapper.css";

function InputWrapper({
	label,
	error,
	prefixIcon,
	suffixIcon,
	onFocus,
	type,
	value,
	onChangeText,
	selectUserType,
	selectProvider,
	optionArray,
	section,
	table,
	imageUpload,
}) {
	return (
		<div className="inputwrapper">
			<div className="row">
				<div className="label">{label}</div>
				<div className="error">{error}</div>
			</div>
			<div className="input">
				<div className="prefix__icon">{prefixIcon}</div>

				{selectUserType ? (
					<select onChange={onChangeText} value={value} onFocus={onFocus}>
						<option disabled>Select {label}</option>
						{optionArray.map((item, i) => (
							<option key={i} value={item.value}>
								{item.name}
							</option>
						))}
					</select>
				) : selectProvider ? (
					<select onChange={onChangeText} value={value} onFocus={onFocus}>
						<option value="">Select {label}</option>
						{optionArray.map((item, i) => (
							<option key={i} value={item.id}>
								{item.id}
							</option>
						))}
					</select>
				) : section ? (
					<select onChange={onChangeText} value={value} onFocus={onFocus}>
						<option value="">Select {label}</option>
						{optionArray?.map((item, i) => (
							<option key={i} value={JSON.stringify(item)}>
								{item.path}
							</option>
						))}
					</select>
				) : table ? (
					<select onChange={onChangeText} value={value} onFocus={onFocus}>
						<option value="">Select {label}</option>
						{optionArray.map((item, i) => (
							<option key={i} value={JSON.stringify(item)}>
								{item.name}
							</option>
						))}
					</select>
				) : imageUpload ? (
					<input type={type} onChange={onChangeText} />
				) : (
					<input
						type={type}
						onFocus={onFocus}
						placeholder={`Enter ${label}`}
						value={value}
						onChange={onChangeText}
						readonly
					/>
				)}

				<div className="suffix__icon">{suffixIcon}</div>
			</div>
		</div>
	);
}

// InputWrapper.prototype = {
// 	label: PropTypes.string,
// 	error: PropTypes.string,
// 	onFocus: PropTypes.func.isRequired,
// 	type: PropTypes.string,
// 	value: PropTypes.string,
// 	onChangeText: PropTypes.func.isRequired,
// };

// InputWrapper.defaultProps = {
// 	label: "",
// 	error: "",
// 	type: "text",
// 	value: "",
// };

export default InputWrapper;
