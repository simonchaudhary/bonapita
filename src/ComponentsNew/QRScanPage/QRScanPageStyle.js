import styled from "styled-components";

export const Container = styled.div`
	place-items: center;
	background: #f5f5f5;
	height: 88vh;
`;

export const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	@media only screen and (max-width: 480px) and (min-width: 100px) {
		flex-direction: column;
	}
`;

export const QRContainer = styled.div`
	position: relative;
	width: 30%;
	margin-left: 2rem;
	@media only screen and (max-width: 480px) and (min-width: 100px) {
		width: 100%;
		margin-left: 0rem;
	}
`;

export const Column = styled.div`
	width: 50%;
	display: flex;
	padding: 0.875rem;
	flex-direction: column;
	@media only screen and (max-width: 480px) and (min-width: 100px) {
		width: 100%;
	}
`;

export const Button = styled.button`
	width: 100px;
	padding: 0.6rem 0.75rem;
	border: none;
	outline: none;
	background: var(--primaryOrange);
	color: white;
	font-size: 0.75rem;
	font-weight: 400;
	border-radius: 0.4rem;
	-webkit-box-shadow: 1px 1px 9px 2px rgba(214, 90, 49, 0.18);
	box-shadow: 1px 1px 9px 2px rgba(214, 90, 49, 0.18);
	transition: 500ms;
`;

export const ButtonSecondary = styled(Button)`
	color: var(--primaryOrange);
	background: white;
`;

export const ButtonChange = styled.button`
	position: absolute;
	bottom: 10px;
	right: 10px;
	z-index: 20;
	background: transparent;
`;

export const TableStatus = styled.div`
	margin-left: 0.875rem;

	border-radius: 0.6rem;
	padding: 0.4rem;
	text-align: center;
	font-size: 0.75rem;
	color: white;
	background: ${(props) =>
		props.green
			? "#63FF00"
			: props.orange
			? "orange"
			: props.red
			? "red"
			: null}; ;
`;

export const DialogBox = styled.div`
	margin: 0.75rem 0rem;
	border-radius: 0.6rem;
	padding: 0.75rem;
	text-align: center;
	font-size: 0.75rem;
	background: white;
`;

export const FullPage = styled.div`
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.75);
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
`;
