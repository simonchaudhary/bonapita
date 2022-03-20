import styled from "styled-components";

export const OrderLogContainer = styled.div`
	width: 100%;
	height: 100%;
	overflow-x: auto;
	overflow-y: auto;
	/* background: blue; */
	/* display: flex;
	align-items: center;
	justify-content: space-between; */
`;
export const GoBack = styled.div`
	position: absolute;
	top: 0rem;
	left: 0.875rem;
`;

export const Row = styled.div`
	/* width: 100%; */
	display: flex;
	align-items: center;
	justify-content: flex-start;
	/* background: red; */
	@media only screen and (max-width: 480px) {
		flex-direction: column;
	}
`;
export const Column = styled.div`
	margin-bottom: 0.75rem;
`;

export const OrderHistoryContainer = styled.div`
	position: relative;
	width: 200px;
	height: 100px;
	border-radius: 0.4rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	/* background: #ff0000; 
	background: #ff8000;*/
	/* background: #bfff00; */
	/* background: #63ff00; */
	/* background: #ff0000; */
	padding: 0.6rem;
	-webkit-box-shadow: 0px 4px 15px -3px rgba(0, 0, 0, 0.11);
	box-shadow: 0px 4px 15px -3px rgba(0, 0, 0, 0.11);
`;

export const MoreDetailContainter = styled.div`
	/* position: absolute;
	top: 110px;
	left: 0px; */
	margin-top: 0.5rem;
	border-radius: 0.4rem;
	z-index: 3;
	width: 200px;
	height: 200px;
	overflow: hidden;
	background: #f1f1f1;
	padding: 0.6rem;
	margin-bottom: 0.75rem;

	@media only screen and (max-width: 480px) {
		width: 100%;
	}
`;

export const Arrow = styled.div`
	min-width: 60px;
	width: 60px;
	height: 100px;
	/* background: red; */
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const LongArrowRight = styled.div`
	display: block;
	margin: 30px auto;
	width: 25px;
	height: 25px;
	border-top: 2px solid #000;
	border-left: 2px solid #000;
	transform: rotate(135deg);

	::after {
		content: "";
		display: block;
		width: 2px;
		height: 45px;
		background-color: black;
		transform: rotate(-45deg) translate(15px, 4px);
		left: 0;
		top: 0;
	}

	@media only screen and (max-width: 480px) {
		transform: rotate(225deg);
	}
`;

export const OutlineButton = styled.div`
	border: 1px solid black;
	text-align: center;
	padding: 0.4rem;
	border-radius: 0.4rem;
	color: black;
	font-weight: 600;
`;
