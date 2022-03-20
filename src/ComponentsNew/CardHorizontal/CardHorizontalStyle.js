import styled, { css } from "styled-components";

export const CardHorizontalContainer = styled.div`
	position: relative;
	width: 360px;
	min-height: auto;
	max-height: auto;
	/* border-radius: 0.875rem; */
	border-left: 1px solid #f0f0f0;
	background: #fafafa;
	overflow: hidden;
	/* margin: 4rem; */
	/* border: 1px solid #fcfcfc; */
	border-bottom: 1px solid #f0f0f0;
	/* margin: 0.85rem 0.425rem; */
	margin-top: 0.6rem;
	margin-right: 0.6rem;
	margin-left: 0rem;
	margin-bottom: 0.425rem;
	padding: 0.6rem 0.75rem;
	@media only screen and (max-width: 480px) {
		width: 100%;
		margin-right: 0rem;
	}

	:hover {
		/* box-shadow: 2px 2px 30px -10px rgba(0, 0, 0, 0.1); */
		-webkit-box-shadow: 0px 0px 13px -6px rgba(0, 0, 0, 0.08);
		box-shadow: 0px 0px 13px -6px rgba(0, 0, 0, 0.08);
	}
`;

export const AddButton = styled.div`
	position: absolute;
	bottom: 0px;
	right: 0px;
	height: 30px;
	z-index: 2;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.6rem;
	background: green;
`;

export const TextContainer = styled.div`
	/* background: red; */
	/* width: calc(360px - 50px); */
`;

export const Row = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	/* background: red; */
`;

export const Column = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	/* background: red; */
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
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
	color: #a5a5a5;
	@media only screen and (max-width: 480px) {
		font-size: 0.75rem;
	}
`;

export const PriceTag = styled.div`
	min-width: 50px;
	color: #212121;
	font-size: 0.75rem;
	font-weight: 700;
	/* background: blue; */
	color: #d65a31;
	display: flex;
	justify-content: flex-end;
`;

export const FilterBorder = styled.div`
	margin-right: 0.2rem;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	font-size: 0.75rem;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	${(props) =>
		props.spicy &&
		css`
			border: 1px solid red;
			color: red;
		`}

	${(props) =>
		props.vegan &&
		css`
			border: 1px solid #22b483;
			color: #22b483;
		`}
	${(props) =>
		props.gluten &&
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
`;

export const OutlineLabel = styled.div`
	width: 90px;
	height: 30px;
	border-radius: 0.2rem;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid green;
	color: green;
	font-size: 0.75rem;
	padding: 0.4rem;
`;

export const IconContainer = styled.button`
	outline: none;
	border: none;
	background: #f1f1f1;
	border-radius: 0.2rem;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	color: #616161;
	margin-right: 0.6rem;
	padding: 0.3rem;
`;

export const AddToCart = styled.div`
	border-radius: 0.25rem;
	font-size: 0.75rem;
	padding: 0.4rem 0.75rem;
	margin-top: 0.4rem;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	/* border: 1px solid #1d7f29; */
	background: rgba(29, 127, 41, 0.9);
	font-weight: 600;
	display: flex;
	align-items: center;
	color: white;
	justify-content: center;

	:hover {
		background: rgba(29, 127, 41, 1);
	}
`;

// Counter
export const Decrement = styled.div`
	width: 35px;
	height: 35px;
	margin-top: 0.4rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.4rem;
	background: white;
	font-size: 0.875rem;
	font-weight: 800;
	margin-right: 0.4rem;
	border: 1px solid #f1f1f1;

	-webkit-box-shadow: 0px 0px 13px -6px rgba(0, 0, 0, 0.08);
	box-shadow: 0px 0px 13px -6px rgba(0, 0, 0, 0.08);

	:hover {
		-webkit-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.08);
		box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.08);
	}
`;

export const Increment = styled(Decrement)``;
export const Display = styled(Decrement)`
	width: 50px;
	font-weight: 500;

	:hover {
		-webkit-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0);
		box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0);
	}
`;
