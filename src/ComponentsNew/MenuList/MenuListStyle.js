import styled, { css } from "styled-components";

export const MenuListContainer = styled.div`
	position: relative;
	/* height: 88vh; */
	overflow: atuo;
	/* width: 50%; */
	/* background: #f1f1f1; */
	/* padding: 0.75rem; */
	/* height: 88vh;
	padding: 0.875rem;
	overflow-y: auto; */
	/* background: blue; */
	/* padding: 0.75rem; */
	background: white;
`;
export const MenuListOnlyContainer = styled.div`
	position: relative;
	/* height: calc(100vh - 150px);
	overflow: atuo; */
	/* width: 50%; */
	/* background: #f1f1f1; */
	/* padding: 0.75rem; */
	/* height: 88vh;
	padding: 0.875rem;
	overflow-y: auto; */
	/* background: blue; */
	/* padding: 0.75rem; */
	/* background: red; */
`;
export const MenuListStaffOrderContainer = styled.div`
	position: relative;
	/* height: 88vh;
	overflow: hidden; */
	/* background: red; */
`;

export const MenuContainer = styled.div`
	/* height: calc(88vh - 0.16rem); */
	/* padding: 0.75rem; */
	border: 1px solid #d1d1d1;
	display: flex;
	flex-direction: column;
`;

export const MenuHeader = styled.div`
	/* background: grey; */
	/* text-align: center; */
	height: 80px;
	font-size: 0.875rem;
	font-weight: 700;
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* margin-bottom: 0.75rem; */
	/* padding-top: 0.75rem;
	padding-left: 0.75rem; */

	padding: 0rem 0.75rem;
	border-bottom: 1px solid #d1d1d1;
	/* background: red; */
	overflow: hidden;
`;
export const MenuTab = styled.div`
	height: 60px;
	display: flex;
	/* background: red; */

	border-bottom: 1px solid #d1d1d1;
`;

export const MenuTabItem = styled.div`
	/* position: relative; */
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;

	:not(:last-of-type) {
		border-right: 1px solid #d1d1d1;
	}

	/* :hover {
		background: #f1f1f1;
	} */
`;

export const Menus = styled.div`
	/* height: calc(100vh - 140px); */
	overflow-y: auto;
	padding-bottom: 5rem;
	/* background: red; */
`;
export const MenusStaffOrder = styled.div`
	padding-bottom: 2rem;
	/* background: red; */
`;

export const FloatingCart = styled.div`
	position: fixed;
	bottom: 0.875rem;
	right: 2rem;
	width: 90px;
	height: 50px;
	border: 1px solid #f1f1f1;
	z-index: 100;
	border-radius: 0.75rem;
	padding: 0rem 0.6rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: white;
	-webkit-box-shadow: 0px 0px 13px -1px rgba(0, 0, 0, 0.08);
	box-shadow: 0px 0px 13px -1px rgba(0, 0, 0, 0.08);

	@media only screen and (max-width: 480px) {
		bottom: 0.875rem;
	}
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
`;

export const Badge = styled.div`
	/* position: absolute;
	top: -12px;
	right: 0px; */
	width: 35px;
	height: 35px;
	border: 1px solid #f5f5f5;
	/* padding: 0.75rem; */
	background: #63ff00;
	border-radius: 50%;
	color: black;
	font-weight: 700;
	font-size: 0.875rem;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const SimpleButton = styled.button`
	/* margin-top: 0.4rem; */
	outline: none;
	padding: 0.4rem 0.75rem;
	background: white;
	border: 1px solid #e1e1e1;

	:hover {
		background: #f5f5f5;
	}
`;
