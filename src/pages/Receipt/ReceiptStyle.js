import styled from "styled-components";

export const ReceiptContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Header = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	/* padding: 0 0.875rem; */
	background: #f9f9f9;
	justify-content: space-between;
`;

export const Body = styled.div`
	/* width: 80%; */
	/* background: red; */
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	/* background: red; */
`;
export const ListContainer = styled.div`
	margin-top: 0.875rem;
	padding: 0.75rem;
	border: 1px solid #f1f1f1;
`;
export const ItemsList = styled.div`
	margin-top: 0.75rem;
`;
export const ItemContainer = styled.div`
	display: flex;
	align-items: center;
	/* background: #f9f9f9; */
	padding: 0.5rem 0rem;
	/* background: red; */
`;

export const PriceContainer = styled.div`
	/* background: red; */
	margin-top: 0.875rem;
	padding-top: 0.875rem;
	border-top: 1px solid #f5f5f5;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

export const Title = styled.div`
	font-size: 0.75rem;
	font-weight: 600;

	/* background: blue; */
	overflow: hidden;
	text-overflow: ellipsis;
	/* white-space: nowrap; */
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	color: #212121;
	margin-bottom: 0.125rem;
	@media only screen and (max-width: 480px) {
		font-size: 0.75rem;
	}
`;

export const Detail = styled.div`
	font-size: 0.75rem;
	font-weight: 400;
	/* background: blue; */
	overflow: hidden;
	text-overflow: ellipsis; /* background: blue; */
	overflow: hidden;
	text-overflow: ellipsis;
	/* white-space: nowrap; */
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	color: #a5a5a5;
	@media only screen and (max-width: 480px) {
		font-size: 0.75rem;
	}
`;

export const Column = styled.div``;
