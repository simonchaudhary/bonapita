import styled from "styled-components";

export const CustomAccordian = styled.div`
	/* background: red; */
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* background: red; */
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
`;
export const ItemList = styled.div`
	width: 100%;
	padding: 0.75rem;
	/* background: red; */
	/* min-height: 300px; */
	height: 250px;
	overflow-y: auto;
	@media only screen and (max-width: 480px) {
		padding: 0.4rem;
		height: 200px;
	}
`;

export const ItemContainer = styled.div`
	width: 100%;
	background: #f5f5f5;
	padding: 0.75rem;
	border-radius: 0.4rem;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	overflow: hidden;

	:not(:last-of-type) {
		margin-bottom: 0.6rem;
		@media only screen and (max-width: 480px) {
			margin-bottom: 0.4rem;
		}
	}

	:hover {
		background: #e5e5e5;
	}

	@media only screen and (max-width: 480px) {
		padding: 0.4rem;
	}
`;

export const ItemContainerLeft = styled.div`
	width: 60%;
	margin-right: 0.4rem;
	/* background: red; */
`;
export const ItemContainerCenter = styled.div`
	width: 20%;
	margin-right: 0.4rem;

	/* background: blue; */
`;
export const ItemContainerRight = styled.div`
	/* flex: 0.25; */
	width: 20%;
	text-align: end;
	/* background: purple; */
`;
// Modal
export const OrderDetailModal = styled.div`
	/* width: 100%; */
	/* background: blue; */
`;

export const OrderHistoryModal = styled.div``;
