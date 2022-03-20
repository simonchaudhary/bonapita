import styled from "styled-components";

export const Horizontal = styled.div`
	width: 100%;
	height: 0.875rem;

	@media only screen and (max-width: 480px) {
		height: 0.75rem;
	}
`;

export const Vertical = styled.div`
	width: 0.875rem;
	height: 100%;

	@media only screen and (max-width: 480px) {
		width: 0.75rem;
	}
`;
