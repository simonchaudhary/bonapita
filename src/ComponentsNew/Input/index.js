import React from "react";

const Input = ({label, error, type, value, onChange, onFocus}) => {
	return (
		<div className="w-full mb-3">
			<div className="flex justify-between items-center mb-2">
				<p className="text-sm font-normal">{label}</p>
				<p className="text-sm font-normal text-red-500">{error}</p>
			</div>
			<input
				className="w-full border border-gray-00 p-2 rounded"
				value={value}
				type={type}
				onChange={(e) => onChange(e)}
				onFocus={onFocus}
			/>
		</div>
	);
};

export default Input;
