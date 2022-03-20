import styled from "styled-components";

export const GuestContainer = styled.div`
	position: relative;
	padding: 0.75rem;
	padding-right: 50px;
	border-radius: 0.4rem;
	background: #f9f9f9;
	@media only screen and (max-width: 480px) {
		padding: 0.4rem;
	}
`;

export const GuestList = styled.div`
	margin-bottom: 0.875rem;
	display: flex;
	flex-wrap: wrap;
`;
export const ButtonContainer = styled.div`
	width: 20%;

	@media only screen and (max-width: 480px) {
		width: 50%;
	}
`;
