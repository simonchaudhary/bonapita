import styled, { css } from "styled-components";

export const MenuListContainer = styled.div`
	height: 100vh;
	overflow: hidden;
	/* width: 50%; */
	/* background: #f1f1f1; */
	/* padding: 0.75rem; */
	/* height: 100vh;
	padding: 0.875rem;
	overflow-y: auto; */
	/* background: blue; */
	padding: 0.75rem;
`;

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

export const BeverageListContainer = styled.div`
	/* background: blue; */
	/* min-height: 50vh;
	padding-bottom: 0.75rem;
	border-bottom: 1px solid #e1e1e1;
	margin-bottom: 0.75rem; */
	/* background: #fafafa; */
	background: white;
`;
export const FoodListContainer = styled.div`
	/* background: blue; */
	/* min-height: 50vh;
	padding-bottom: 0.75rem;
	border-bottom: 1px solid #e1e1e1;
	margin-bottom: 0.75rem; */
	background: #f1f1f1;
`;

export const SubMenuItemList = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;
export const SubMenuContainer = styled.div`
	padding: 0.75rem;
	/* margin-bottom: 0.75rem; */

	/* border-bottom: 1px solid #f1f1f1; */
`;

export const SubMenuTitle = styled.div`
	width: 100%;
	text-align: center;
	font-size: 0.75rem;
	font-weight: 500;
	margin-bottom: 0.75rem;
`;

export const TagFilterContainer = styled.div`
	margin-right: 0.4rem;
	padding: 0.2rem 0.4rem;
	border-radius: 0.4rem;
	font-size: 0.75rem;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #f1f1f1;
	${(props) =>
		props.spicy &&
		css`
			border: 1px solid red;
			color: red;
		`}

	${(props) =>
		props.vegan &&
		css`
			border: 1px solid green;
			color: green;
		`}
	${(props) =>
		props.gluten &&
		css`
			border: 1px solid blue;
			color: blue;
		`}
	${(props) =>
		props.protein &&
		css`
			border: 1px solid yellow;
			color: yellow;
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

export const BeverageBody = styled.div`
	height: 100%;
	width: 100%;
`;

export const LoadingContainer = styled.div`
	margin-top: 2rem;
	text-align: center;
	/* background: red; */
	font-size: 0.875rem;
	font-weight: 600;
`;
