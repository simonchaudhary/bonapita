import styled from "styled-components";
import { Document, Page, pdfjs } from "react-pdf";

export const PDFViewerContainer = styled.div`
	width: 100vw;
	/* height: 100vh; */
	overflow-x: hidden;
	/* overflow-y: auto; */
	background: white;
`;

export const PDFViewerHeader = styled.div`
	position: sticky;
	top: 0px;
	left: 0px;
	z-index: 5;
	height: 70px;
	background: white;
	/* -webkit-box-shadow: 0px 1px 15px -3px rgba(0, 0, 0, 0.11);
	box-shadow: 0px 1px 15px -3px rgba(0, 0, 0, 0.11); */
	display: flex;
	align-items: center;
`;
export const PDFViewerBody = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background: white;
	padding: 0.875rem;

	@media only screen and (max-width: 480px) {
		max-width: 800px;
		overflow-x: auto;
		padding: 0.6rem;
	}
`;
export const PDFViewerBodyFooter = styled.div`
	/* position: fixed;
	bottom: 16px; */
	/* z-index: 3;
	background: #f1f1f1;
	padding: 0rem 0.75rem;
	border-radius: 0.4rem;
	display: flex;
	align-items: center;
	-webkit-box-shadow: 0px 1px 15px -3px rgba(0, 0, 0, 0.11);
	box-shadow: 0px 1px 15px -3px rgba(0, 0, 0, 0.11); */

	/* animation: cssAnimation 0s 3s forwards;
	opacity: 1;

	@keyframes cssAnimation {
		to {
			opacity: 0;
		}
	} */
`;

export const Previous = styled.button`
	position: fixed;
	top: 50%;
	left: 0px;
	transform: translate(0%, -50%);
	z-index: 10;
	background: #f1f1f1;
	border: none;
	outline: none;
	border-radius: 0.4rem;
`;
export const Next = styled.button`
	position: fixed;
	top: 50%;
	right: 15px;
	transform: translate(0%, -50%);
	z-index: 10;
	background: #f1f1f1;
	border: none;
	outline: none;
	border-radius: 0.4rem;

	@media only screen and (max-width: 480px) {
		right: 0px;
	}
`;
export const ShowPageNo = styled.button`
	position: fixed;
	bottom: 10px;
	left: 50%;
	transform: translate(-50%, 0%);
	z-index: 10;
	background: #f1f1f1;
	border: none;
	outline: none;
	padding: 0.875rem;
	border-radius: 0.4rem;
`;

// PDF View
export const CDocument = styled(Document)`
	width: 100%;
	padding: 0.875rem;
	/* background: red; */
	zoom: 100%;
	display: flex;
	justify-content: center;

	@media only screen and (max-width: 480px) {
		display: block;
		zoom: 80%;
	}
`;
export const CPage = styled(Page)``;
