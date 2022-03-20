import styled from "styled-components";

export const DashBoardPAContainer = styled.div`
	position: relative;
	height: 100%;
	width: calc(100vw - 60px);
	/* background: #faede9; */
`;
export const BackgroundImage = styled.img`
	width: calc(100vw - 60px);
	height: 200px;
	object-fit: contain;
`;

export const Row = styled.div`
	height: 100%;
	display: flex;
	/* background: red; */
	justify-content: space-between;

	@media only screen and (max-width: 480px) {
		/* flex-direction: column; */
	}
`;

export const RowHeader = styled.div`
	height: calc(100vh - 100px - 70px);
	display: flex;
	/* background: red; */
	justify-content: space-between;

	@media only screen and (max-width: 480px) {
		height: calc(100vh - 100px - 60px);
		/* flex-direction: column; */
	}
`;

export const Header = styled.div`
	/* width: 300px; */
	/* background: blue; */
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	justify-content: center;
	padding-left: 0.875rem;
`;

export const HeaderTitle = styled.div`
	font-size: 3rem;
	font-weight: 600;
`;

export const HeaderDetail = styled.div`
	font-size: 0.875rem;
	font-weight: 300;
	color: #d65a31;
`;

export const Footer = styled.div`
	width: 100%;
	height: 100px;
	position: absolute;
	bottom: 0px;
	background: #faede9;
	padding: 0.5rem;
`;

export const FooterTitle = styled.div`
	font-size: 1.4rem;
	font-weight: 600;
`;

export const FooterDetail = styled.div`
	font-size: 0.875rem;
	font-weight: 300;
	color: #d65a31;
`;

export const LogoContainer = styled.div`
	width: 500px;
	/* background: green; */
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Image = styled.img`
	display: block;
	max-width: 200px;
	max-height: 130px;
	width: 100%;
	height: auto;
	object-fit: cover;
`;

export const FooterImage = styled.img`
	display: block;
	max-width: 200px;
	max-height: 200px;
	width: 100%;
	height: auto;
	object-fit: contain;
`;
