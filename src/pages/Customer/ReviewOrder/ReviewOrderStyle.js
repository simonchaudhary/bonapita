import styled from "styled-components";

export const ReviewOrderContainer = styled.div`
	width: 100vw;
	height: 100vh;
	background: #f5f5f5;
	overflow: hidden;
`;
export const NavBarContainer = styled.div`
	position: sticky;
	top: 0px;
	z-index: 100;
	height: 70px;
	background: white;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0rem 0.875rem;

	/* overflow: hidden; */
	-webkit-box-shadow: 0px 1px 15px -3px rgba(0, 0, 0, 0.11);
	box-shadow: 0px 1px 15px -3px rgba(0, 0, 0, 0.11);

	@media only screen and (max-width: 480px) and (min-width: 100px) {
		height: 60px;
		padding: 0rem 0.6rem;
	}
`;

export const Logo = styled.div`
	font-size: 0.875rem;
	font-weight: 600;
	color: #d65a31;
	display: flex;
	align-items: center;
`;

export const Body = styled.div`
	height: calc(100vh - 70px);
	display: flex;
	align-items: center;
	justify-content: center;

	@media only screen and (max-width: 480px) {
		height: calc(100vh - 60px);
	}
`;
export const Modal = styled.div`
	width: 40%;
	height: auto;
	background: white;
	border-radius: 0.3rem;
	@media only screen and (max-width: 480px) {
		width: 80%;
	}
`;

export const Form = styled.div`
	width: 100%;
	height: 100%;
	padding: 0.875rem;
`;
