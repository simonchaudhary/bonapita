import styled, { css } from "styled-components";

export const CardVerticalContainer = styled.div`
	width: 200px;
	height: 265px;
	border-radius: 0.875rem;
	background: #f5f5f5;
	overflow: hidden;
	/* margin: 4rem; */
	border: 1px solid #f1f1f1;
	margin: 0.85rem 0.425rem;
	margin-right: 0.425rem;
	margin-left: 0.425rem;
	margin-bottom: 0.425rem;
	@media only screen and (max-width: 480px) {
		/* margin: 0 auto;
		margin-bottom: 0.875rem; */

		/* mobile */
		width: 150px;
		height: 215px;
		border-radius: 0.75rem;
		margin: 0.625rem 0rem;
		margin-left: 0.2025rem;
		margin-right: 0.2025rem;
		margin-bottom: 0.2125rem;
	}

	:hover {
		/* box-shadow: 4px 0px 20px -4px rgba(0, 0, 0, 0.1); */
	}
`;

export const ImageContainer = styled.div`
	width: 100%;
	height: 130px;
	/* background: blue; */
	overflow: hidden;
	position: relative;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;

	@media only screen and (max-width: 480px) {
		height: 100px;
	}
`;

export const PriceTag = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	width: 80px;
	height: 40px;
	border-top-right-radius: 0.4rem;
	border-bottom-left-radius: 0.5rem;
	background: rgba(255, 255, 255, 0.9);
	color: #212121;
	font-size: 1.125rem;
	font-weight: 700;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0px 2px 20px -4px rgba(0, 0, 0, 0.1);
`;

export const Image = styled.img`
	display: block;
	/* max-width: 400px;
	max-height: 400px; */
	width: 100%;
	height: auto;
	object-fit: cover;
	/* background: red; */

	/* @media only screen and (max-width: 480px) {
		height: 80px;
	} */
`;
export const TextContainer = styled.div`
	height: calc(265px - 130px - 50px);
	padding: 0.875rem;
	padding-bottom: 0rem;
	/* background: blue; */
	@media only screen and (max-width: 480px) {
		height: calc(215px - 110px - 40px);
		padding: 0.625rem;
	}
`;

export const Title = styled.div`
	font-size: 0.875rem;
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
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #a5a5a5;
	@media only screen and (max-width: 480px) {
		font-size: 0.75rem;
	}
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	/* background: red; */
`;

export const AddButton = styled.button`
	border: none;
	outline: none;
	width: 98px;
	height: 50px;
	border-top-right-radius: 0.5rem;
	border-bottom-left-radius: 0.875rem;
	background: #04b400;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	transition: filter 600ms;

	:hover {
		filter: brightness(85%);
	}
	@media only screen and (max-width: 480px) {
		height: 40px;
		border-bottom-left-radius: 0.75rem;
	}
`;

export const DeleteButton = styled.button`
	border: none;
	outline: none;
	width: 98px;
	height: 50px;
	border-top-left-radius: 0.5rem;
	border-bottom-right-radius: 0.875rem;
	background: #e13f3f;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	transition: filter 600ms;

	:hover {
		filter: brightness(85%);
	}

	@media only screen and (max-width: 480px) {
		height: 40px;
		border-bottom-right-radius: 0.75rem;
	}
`;

export const AddToCart = styled.button`
	border: none;
	outline: none;
	width: 100%;
	height: 50px;
	border-bottom-right-radius: 0.875rem;
	border-bottom-left-radius: 0.875rem;
	background: #04b400;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-weight: 600;
	transition: filter 600ms;

	:hover {
		filter: brightness(85%);
	}
	@media only screen and (max-width: 480px) {
		height: 40px;
	}
`;

export const OutlineLabel = styled.div`
	margin-left: 0.875rem;
	width: 90px;
	height: 30px;
	border-radius: 0.875rem;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #04b400;
	color: #04b400;
	font-size: 0.75rem;
	padding: 0rem 0.125rem;

	${(props) =>
		props.unavailable &&
		css`
			border: 1px solid #e13f3f;
			color: #e13f3f;
		`}
`;
