import styled from "styled-components";

export const SettingContainer = styled.div`
	/* background: red; */
	padding: 0.75rem;
	@media only screen and (max-width: 480px) {
		padding: 0.6rem;
	}
`;

export const SMSContainer = styled.div`
	width: 200px;
	height: 100px;
	border-radius: 0.875rem;
	padding: 0.875rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: #f5f5f5;

	@media only screen and (max-width: 480px) {
		width: 100%;
		border-radius: 0.6rem;
		padding: 0.6rem;
		:not(:last-of-type) {
			margin-bottom: 0.75rem;
		}
	}
`;

export const PhotoContainer = styled.div`
	width: 250px;
	height: 200px;
	border-radius: 0.875rem;
	padding: 0.875rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: #f5f5f5;

	@media only screen and (max-width: 480px) {
		border-radius: 0.6rem;
		padding: 0.6rem;
	}
`;

export const Row = styled.div`
	display: flex;
	justify-content: flex-start;
	@media only screen and (max-width: 480px) {
		flex-direction: column;
	}
`;

export const Column = styled.div`
	background: #f5f5f5;
	margin-right: 0.875rem;
	border-radius: 0.875rem;
	padding: 0.875rem;
	@media only screen and (max-width: 480px) {
		margin-right: 0rem;
		margin-bottom: 0.6rem;
		padding: 0.6rem;
		border-radius: 0.6rem;
	}
`;

export const InputArea = styled.textarea`
	border: none;
	outline: none;
`;
