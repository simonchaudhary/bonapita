import styled from "styled-components";

export const ManagePreplineContainer = styled.div``;

export const Header = styled.div`
	height: 40px;
	padding-left: 0.75rem;
	background: #f9f9f9;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #f1f1f1;
`;
export const Body = styled.div`
	height: calc(100vh - 110px);
	background: white;

	@media only screen and (max-width: 480px) {
		height: calc(100vh - 100px);
	}
`;

export const SelectContainer = styled.div``;

export const Row = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;

export const Buttons = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const ModalBody = styled.div`
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	/* background: red; */
`;

export const ListContainer = styled.div`
	padding: 0.75rem;
	@media only screen and (max-width: 480px) {
		padding: 0.4rem;
	}
`;

export const ItemContainer = styled.div`
	padding-left: 0.875rem;
	background: #f9f9f9;
	margin-bottom: 0.6rem;
	border-radius: 0.4rem;
	transition: 500ms;
	display: flex;
	align-items: center;
	justify-content: space-between;

	:hover {
		background: #f0f0f0;
	}

	@media only screen and (max-width: 480px) {
		padding: 0.6rem;
		margin-bottom: 0.4rem;
	}
`;

export const FloatingButton = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: #d65a31;
	position: fixed;
	bottom: 0.875rem;
	right: 0.875rem;
	color: whtie;
	display: flex;
	align-items: center;
	justify-content: center;
`;
