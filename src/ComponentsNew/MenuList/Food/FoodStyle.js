import styled, { css } from "styled-components";

export const Row = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.75rem;
	/* background: red; */
`;
export const TagRow = styled.div`
	display: flex;
	/* background: blue; */
`;

export const FoodListContainer = styled.div`
	/* background: blue; */
	/* min-height: 50vh;
	padding-bottom: 0.75rem;
	border-bottom: 1px solid #e1e1e1;
	margin-bottom: 0.75rem; */
	height: 100%;
	/* overflow-y: scroll; */
	background: white;
`;

export const SubMenuItemList = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 0.75rem;
`;
export const SubMenuContainer = styled.div`
	width: 100%;
	/* padding: 0.75rem; */
	/* margin-bottom: 0.75rem; */

	/* border-bottom: 1px solid #f1f1f1; */
`;

export const SubMenuTitle = styled.div`
	width: 100%;
	text-align: center;
	/* background: red; */
	font-size: 0.75rem;
	font-weight: 500;
	margin-bottom: 0.75rem;
`;

export const TagFilterContainer = styled.div`
	margin-right: 0.4rem;
	padding: 0.875rem 0.2rem;
	border-radius: 0.2rem;
	font-size: 0.625rem;
	font-weight: 600;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	border: 0.5px solid #f1f1f1;
	${(props) =>
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
	}
`;

export const MenuContainer = styled.div`
	height: calc(100vh - 0.16rem);
	border: 1px solid #d1d1d1;
	display: flex;
	flex-direction: column;
`;

export const MenuHeader = styled.div`
	/* background: grey; */
	/* text-align: center; */
	font-size: 0.875rem;
	font-weight: 700;
	/* margin-bottom: 0.75rem; */
	/* padding-top: 0.75rem;
	padding-left: 0.75rem; */

	padding: 0.75rem;
	border-bottom: 1px solid #d1d1d1;
`;
export const MenuTab = styled.div`
	display: flex;
	/* background: red; */

	border-bottom: 1px solid #d1d1d1;
`;

export const MenuTabItem = styled.div`
	flex: 1;
	padding: 0.75rem;
	text-align: center;

	:not(:last-of-type) {
		border-right: 1px solid #d1d1d1;
	}

	:hover {
		background: #f1f1f1;
	}
`;

export const Menus = styled.div`
	height: 70vh;
	/* background: red; */
`;

export const FoodBody = styled.div`
	width: 100%;
	height: 100%;
`;

export const LoadingContainer = styled.div`
	margin-top: 2rem;
	text-align: center;
	/* background: red; */
	font-size: 0.875rem;
	font-weight: 600;
`;
