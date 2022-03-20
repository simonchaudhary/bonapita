import styled from "styled-components";

export const OrderedItemV2Container = styled.div``;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #f9f9f9;
	padding: 0rem 0.75rem;
	padding-bottom: 0.75rem;
`;

export const Body = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 0rem 0.75rem;
`;

export const MenuContainer = styled.div`
	width: 100%;
	margin-bottom: 0.5rem;
	@media only screen and (max-width: 480px) {
		width: 100%;
	}
`;

export const ItemList = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	/* align-items: center; */
	/* background: blue; */
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
`;
