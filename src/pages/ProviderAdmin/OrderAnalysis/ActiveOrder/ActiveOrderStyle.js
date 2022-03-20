import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const OrderAnalysisContainer = styled.div`
	/* background: red; */
	height: calc(100vh - 70px);

	@media only screen and (max-width: 480px) {
		height: calc(100vh - 60px);
	}
`;
export const Header = styled.div`
	height: 60px;
`;
export const Tab = styled.div`
	width: 100%;
	height: 100%;
	background: #f5f5f5;
	padding: 0.4rem;
	display: flex;
`;
export const Tabmenu = styled.div`
	background: white;
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: 500ms;

	:hover {
		filter: brightness(98%);
	}
`;

export const Body = styled.div`
	/* background: red; */
`;

export const FilterContainer = styled.div`
	/* position: sticky;
	top: 0;
	z-index: 11; */
	border-top: 1px solid #f5f5f5;
	display: flex;
	background: white;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.75rem;
	padding: 0.75rem;
	-webkit-box-shadow: 0px 1px 15px -3px rgba(0, 0, 0, 0.11);
	box-shadow: 0px 1px 15px -3px rgba(0, 0, 0, 0.11);

	@media only screen and (min-width: 100px) and (max-width: 480px) {
		flex-direction: column;
	}
`;

export const Column = styled.div`
	width: 150px;

	:not(:last-of-type) {
		margin-right: 0.875rem;
	}

	@media only screen and (min-width: 100px) and (max-width: 480px) {
		width: 100%;
		/* background: red; */
		:not(:last-of-type) {
			margin-bottom: 0.875rem;
		}
	}
`;

export const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const CustomDatePicker = styled(DatePicker)`
	width: 100%;
	padding: 0.75rem;
	background: #f5f5f5;
	outline: none;
	border: none;
	border-radius: 0.4rem;
	@media only screen and (min-width: 100px) and (max-width: 480px) {
		width: 152%;
	}
`;

export const CustomButtton = styled.button`
	width: 100%;
	padding: 0.75rem;
	background: #f5f5f5;
	outline: none;
	border: none;
	border-radius: 0.4rem;
	@media only screen and (min-width: 100px) and (max-width: 480px) {
		width: 152%;
	}
`;

export const Table = styled.table`
	width: 100%;
	/* background: #f5f5f5; */
	border-collapse: collapse;
	margin: 0.875rem;
`;

export const Th = styled.th`
	border: 1px solid #dddddd;
	text-align: left;
	padding: 8px;
`;

export const Td = styled.td`
	border: 1px solid #dddddd;
	text-align: left;
	padding: 8px;
`;
export const Tr = styled.tr`
	:nth-child(even) {
		background-color: #f5f5f5;
	}

	:hover {
		background-color: #e5e5e5;
	}
`;

export const ModalBody = styled.div`
	/* background: red; */
	height: 100%;
	/* display: flex;
	align-items: center;*/
	overflow-y: auto;
`;

export const OrderResultContainer = styled.div`
	height: 100%;
	/* background: red; */
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const OrderContainer = styled.div`
	background: #f9f9f9;
	padding: 0.75rem;
	border-radius: 0.4rem;
	margin: 0.4rem;
`;

// Order history analysis
export const OrderHistoryContainer = styled.div`
	width: 200px;
	height: 100px;
	/* background: #ff0000; 
	background: #ff8000;*/
	/* background: #bfff00; */
	background: #63ff00;
	/* background: #ff0000; */
`;

export const LongArrowRight = styled.div`
	display: block;
	margin: 30px auto;
	width: 25px;
	height: 25px;
	border-top: 2px solid #000;
	border-left: 2px solid #000;
	transform: rotate(135deg);

	::after {
		content: "";
		display: block;
		width: 2px;
		height: 45px;
		background-color: black;
		transform: rotate(-45deg) translate(15px, 4px);
		left: 0;
		top: 0;
	}
`;