import styled from "styled-components";

// import { EditText, EditTextarea } from "react-edit-text";
// import "react-edit-text/dist/index.css";

export const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	height: 80vh;
	background: white;
`;

export const SearchBackground = styled.div`
	position: absolute;
	top: 0%;
	width: 100%;
	height: 30vh;
	background: #faede9;
`;

export const SearchBox = styled.div`
	position: absolute;
	z-index: 2;
	width: 50%;
	top: 30vh;
	display: flex;
	left: 50%;
	transform: translate(-50%, -50%);
	/* background: red; */

	@media only screen and (max-width: 480px) {
		width: 80%;
	}
`;

export const SearchInput = styled.input`
	width: 100%;
	height: 55px;
	border-radius: 0.6rem;
	border: 1px solid #e5e5e5;
	outline: none;
	padding-left: 0.75rem;
	background: white;

	/* :hover {
		-webkit-box-shadow: 0px 1px 15px -3px rgba(0, 0, 0, 0.11);
		box-shadow: 0px 1px 15px -3px rgba(0, 0, 0, 0.11);
	} */
`;

export const SearchResult = styled.div`
	position: absolute;
	width: 60%;
	/* height: 150px; */
	min-height: 150px;
	z-index: 2;
	top: 38vh;
	left: 50%;
	background: white;
	transform: translate(-50%, 0);
	border-radius: 0.6rem;
	border: 1px solid #e5e5e5;
	/* background: red; */
	/* padding: 0.75rem; */

	@media only screen and (max-width: 480px) {
		top: 35vh;
		width: 90%;
	}
`;

export const SearchResultLoading = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;

	transform: translate(-50%, -50%);
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
`;

export const SearchProviderList = styled.div`
	position: absolute;
	width: 100%;
	z-index: 2;
	top: 50vh;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	padding: 0.875rem 0.875rem;

	@media only screen and (max-width: 480px) {
		top: 45vh;
	}
`;

export const ProviderContainer = styled.div`
	width: 200px;
	padding: 0.875rem 0.875rem;
	background: #faede9;
	color: #d65a31;
	/* display: grid;
	place-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 0.6rem;
	transition: 450ms;
	border-radius: 0.875rem;
	margin-right: 0.6rem;

	@media only screen and (max-width: 480px) {
		width: 120px;
	}
`;

export const Image = styled.img`
	position: absolute;
	width: 350px;
	bottom: 0%;
	top: 30vh;
	right: 10%;
	z-index: 1;
	transform: translate(0, -50%);

	@media only screen and (max-width: 480px) {
		top: 20vh;
		right: 0;
		transform: translate(0%, -50%);
	}
`;

export const Box = styled.div`
	height: 60px;
	border-radius: 0.5rem;
	background: white;
	-webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.2);
	box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.2);
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
`;
