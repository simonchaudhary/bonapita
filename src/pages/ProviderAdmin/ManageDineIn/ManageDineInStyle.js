import styled from "styled-components";

export const ManageDineInContainer = styled.div`
	width: calc(100vw - 60px);
	height: calc(100vh - 70px);
	background: white;
	overflow-x: hidden;
	overflow-y: auto;
	padding: 0.75rem;

	@media only screen and (max-width: 480px) {
		height: calc(100vh - 60px);
		padding: 0.4rem;
	}
`;
export const Header = styled.div`
	width: 100%;
	/* padding: 0.6rem; */
	border-radius: 0.4rem;

	@media only screen and (max-width: 480px) {
		padding: 0.3rem;
	}
`;
export const Breadcrumbs = styled.div`
	/* border: 1px solid #d1d1d1; */
	width: 100%;
	overflow-x: auto;
	display: flex;
	background: #f1f1f1;
	border-radius: 0.4rem;
	align-items: center;
	padding: 0.6rem;
`;

export const Column = styled.div`
	padding: 0rem 0.6rem;
	/* background: red; */

	:hover {
		cursor: pointer;
	}

	@media only screen and (max-width: 480px) {
		padding: 0rem 0.2rem;
	}
`;

export const ModalBody = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	/* background: red; */
`;
export const ModalContent = styled.div`
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	overflow-y: auto;
`;
export const ModalTitle = styled.div`
	position: absolute;
	top: -25px;
	font-size: 0.75rem;
	font-weight: 600;
`;

export const QRContainer = styled.div`
	width: 400px;
	height: 300px;
	padding: 0.6rem;
	overflow: hidden;
	background: #f5f5f5;
	display: flex;
	flex-direction: column;
	margin: 0.725rem auto;
	background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23EC3463' stroke-width='5' stroke-dasharray='15%2c 15%2c 1' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
	@media only screen and (max-width: 480px) {
		/* width: 140px;
		height: 160px; */
		width: 100%;
	}
`;
export const QRImage = styled.img`
	width: 50%;
	/* height: 100%; */
	height: 160px;
	/* background: blue; */
	object-fit: contain;
	@media only screen and (max-width: 480px) {
		height: 140px;
	}
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
`;
export const LogoImg = styled.img`
	width: 50%;
`;
