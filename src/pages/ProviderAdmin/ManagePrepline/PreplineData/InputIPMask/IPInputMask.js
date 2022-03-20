import React from "react";

// Package
import InputMask from "react-input-mask";
import styled from "styled-components";

const InputIPMask = React.memo(({label, error, printerIP, setForm}) => {
	const onChange = (event) => {
		var value = event.target.value;
		var newState = {
			mask: "999.999.999.999",
			value: value,
			error: "",
		};
		if (/^3[47]/.test(value)) {
			newState.mask = "999.999.999.999";
		}
		setForm((prevState) => {
			return {
				...prevState,
				printerIP: newState,
			};
		});
	};
	return (
		<InputMaskWrapper>
			<Row>
				<Label>{label}</Label>
				<Error>{error}</Error>
			</Row>
			<InputMaskCustom
				value={printerIP.value}
				mask={printerIP.mask}
				onChange={onChange}
			/>
		</InputMaskWrapper>
	);
});

const InputMaskWrapper = styled.div`
	width: 100%;
	/* background: red; */
	margin-bottom: 10px;
`;

const Row = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	margin-bottom: 0.4rem;
`;

const Label = styled.div`
	font-size: 0.75rem;
	font-weight: 600;
	color: #393e46;
`;
const Error = styled.div`
	font-size: 0.75rem;
	font-weight: 300;
	color: #db714e;
`;

const InputMaskCustom = styled(InputMask)`
	width: 100%;
	display: flex;
	align-items: center;
	background: white;
	border-radius: 0.4rem;
	border: 0.5px solid #f3f3f3;
	padding: 0.75rem 0.75rem;
`;

export default InputIPMask;
