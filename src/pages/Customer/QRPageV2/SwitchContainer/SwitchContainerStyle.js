import styled from "styled-components";

// Styled
export const Container = styled.div`
	width: 60%;
	padding-bottom: 0rem;
	border-radius: 0.25rem;
	text-align: center;
	background: #f5f5f5;

	@media only screen and (max-width: 480px) {
		width: 100%;
	}
`;

export const Body = styled.div`
	padding: 0.75rem;
	border-bottom: 1px solid #e1e1e1;
`;

export const Bottom = styled.div`
	display: flex;
	justify-content: flex-end;
`;
export const NavButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
