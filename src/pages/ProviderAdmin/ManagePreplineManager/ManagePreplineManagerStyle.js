import styled from "styled-components";

export const ManagePreplineManagerContainer = styled.div`
	/* padding: 0.825rem; */
	/* background: red; */
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
`;

export const Body = styled.div`
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	/* background: red; */
`;

export const FloatingButton = styled.div`
	position: fixed;
	bottom: 0.875rem;
	right: 0.875rem;
	width: 50px;
	height: 50px;
	z-index: 1000;
	border-radius: 50%;
	background: #d65a31;
	color: whtie;
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const PreplineManagerList = styled.div`
	margin: 0.75rem 0.75rem;
`;
