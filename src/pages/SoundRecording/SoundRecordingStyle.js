import styled from "styled-components";

export const SoundRecordingContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const StartButton = styled.button`
	min-width: 120px;
	border: none;
	outline: none;
	padding: 0.675rem;
	background-color: red;
	font-weight: 600;
	color: white;
	margin: 0.75rem 0rem;
	border-radius: 0.25rem;
`;

export const StopButton = styled(StartButton)`
	background-color: white;
	color: black;
	border: 1px solid #f1f1f1;
`;
