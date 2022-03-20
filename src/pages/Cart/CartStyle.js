import styled, { css } from "styled-components";

export const CartContainer = styled.div`
	width: 100%;
	height: calc(100vh - 70px);
	overflow: hidden;
	/* background: red; */
	background: white;

	@media only screen and (max-width: 480px) and (min-width: 100px) {
		height: calc(100vh - 60px);
	}
`;

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

export const CartBody = styled.div`
	height: calc(100vh - 180px);
	overflow-y: auto;
	/* background: red; */
	padding: 0.875rem 2rem;
	padding-bottom: 40px;
	/* display: flex;
	flex-wrap: wrap;
	overflow-y: auto; */
	@media only screen and (max-width: 480px) and (min-width: 100px) {
		height: calc(100vh - 170px);
		padding: 0.75rem 0.75rem;
	}
`;

export const HorizontalLine = styled.div`
	width: 100%;
	height: 1px;
	background: #e1e1e1;
	margin: 0.75rem 0rem;
`;

export const CartFooter = styled.div`
	position: fixed;
	bottom: 0px;
	height: 60px;
	width: 100%;
	background: #f5f5f5;
	display: flex;
	align-items: center;

	padding: 0rem 2rem;
`;

export const ItemContainer = styled.div`
	width: 350px;
	height: 140px;
	border: 1px solid #e5e5e5;
	padding: 0.875rem;
	overflow: hidden;
	/* background: red; */
	border-radius: 0.875rem;
	:not(:last-of-type) {
		margin-bottom: 0.875rem;
		margin-right: 0.875rem;
	}

	:hover {
		background: #e5e5e5;
	}
	@media only screen and (max-width: 480px) and (min-width: 100px) {
		width: 100%;
		margin-bottom: 0.6rem;
		margin-right: 0rem;
	}
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

export const Image = styled.img`
	width: 100px;
	height: 100%;
	background: #d5d5d5;
	margin-right: 0.875rem;

	@media only screen and (max-width: 480px) and (min-width: 100px) {
		margin-right: 0.6rem;
	}
`;
export const ItemDetail = styled.div`
	width: 200px;
	display: flex;
	flex-direction: column;
	/* background: red; */
	justify-content: space-between;
`;
export const Name = styled.div`
	width: 100px;
	font-size: 0.875rem;
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #353535;
`;
export const Instruction = styled.div`
	font-size: 0.875rem;
	font-weight: 300;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #a5a5a5;
`;
export const Price = styled.div`
	font-size: 0.875rem;
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	border-radius: 0.4rem;
	padding: 0.4rem;
	background: yellowgreen;
	color: white;
`;
export const Tax = styled.div`
	font-size: 0.875rem;
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	border-radius: 0.4rem;
	padding: 0.4rem;
	border: 1px solid yellowgreen;
`;

export const CheckoutSummary = styled.div`
	/* background: red; */
	height: 100%;
	overflow: hidden;
`;

export const ModalTitle = styled.div`
	position: absolute;
	top: 10px;
	left: 50%;
	font-weight: 600;
	/* background: red; */
	transform: translate(-50%, 0%);
`;

export const ItemList = styled.div`
	height: 60%;
	overflow-y: auto;
	margin: 0.75rem 0rem;
	/* background: blue; */
`;

export const FilterContainer = styled.div`
	width: 40%;
`;

export const TagRow = styled.div`
	display: flex;
	/* background: blue; */
`;
export const TagFilterContainer = styled.div`
	margin-right: 0.4rem;
	/* padding: 0.0.875rem 0.2rem; */
	border-radius: 0.2rem;
	font-size: 0.625rem;
	font-weight: 600;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	/* border: 0.5px solid #f1f1f1; */
	/* ${(props) =>
		props.Spicy &&
		css`
			border: 1px solid red;
			color: red;
		`}

	${(props) =>
		props.Vegan &&
		css`
			border: 1px solid #22b483;
			color: #22b483;
		`}
	${(props) =>
		props.Gluten &&
		css`
			border: 1px solid blue;
			color: blue;
		`}
	${(props) =>
		props.Dairy &&
		css`
			border: 1px solid #286fde;
			color: #286fde;
		`}
	${(props) =>
		props.Veg &&
		css`
			border: 1px solid #1d7f29;
			color: #1d7f29;
		`}
	${(props) =>
		props.Nonveg &&
		css`
			border: 1px solid #8d272b;
			color: #8d272b;
		`}

		@media only screen and (max-width: 480px) {
		font-size: 0.625rem;
	} */
`;
