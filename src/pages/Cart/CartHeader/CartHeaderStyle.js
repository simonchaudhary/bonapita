import styled from "styled-components";

export const Header = styled.div`
	height: 50px;
	position: sticky;
	top: 0px;
	z-index: 3;
	background: white;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #f1f1f1;
`;

export const TagRow = styled.div`
	display: flex;
`;
export const TagFilterContainer = styled.div`
	margin-right: 0.4rem;
	border-radius: 0.2rem;
	font-size: 0.625rem;
	font-weight: 600;

	display: flex;
	align-items: center;
	justify-content: center;
`;
