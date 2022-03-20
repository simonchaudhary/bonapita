import styled from "styled-components";
import {primaryColor, small, smallest} from "../../assets/values";

export const PrimaryButton = styled.button`
	width: 100%;
	/* min-width: 100%; */
	height: 40px;
	border: none;
	outline: none;
	font-size: 0.75rem;
	padding: 0rem ${small};
	border-radius: 0.25rem;
	background: ${primaryColor};
	color: white;
	transition: filter 300ms;

	@media only screen and (max-width: 480px) {
		/* width: 80px; */
		height: 40px;
		padding: 0.4rem;
		border-radius: ${smallest};
	}

	:hover {
		filter: brightness(95%);
	}
`;

export const SecondaryButton = styled(PrimaryButton)`
	border: 1.5px solid #f0f0f0;
	background: white;
	color: ${primaryColor};
	font-size: 0.75rem;
`;
