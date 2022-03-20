import styled from "styled-components";

export const Container = styled.div`
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
