import styled from "styled-components";

export const PrepLineContainer = styled.div`
	background: white;
`;
export const PrepLineHeader = styled.div`
	position: sticky;
	top: 70px;
	z-index: 9;
	background: #d65a31;
	display: flex;
	align-items: center;
	justify-content: center;

	@media only screen and (max-width: 480px) {
	}
`;
export const PrepLineStatus = styled.div`
	flex: 1;
	padding: 0.6rem 0rem;
	text-align: center;
	font-size: 0.875rem;
	color: white;
	font-weight: 600;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	:not(:last-of-type) {
		margin-right: 0.75rem;
		@media only screen and (max-width: 480px) {
			margin-right: 0.3rem;
		}
	}
`;
export const DragRow = styled.div`
	/* background: red; */
	display: flex;
	/* padding: 0.875rem; */
	align-items: center;
	justify-content: center;
	margin: 0.75rem;
	@media only screen and (max-width: 480px) {
		margin: 0.3rem;
	}
`;
export const DragContainer = styled.div`
	width: 100%;
	height: 100%;
	padding: 0.75rem;
	background: #faede9;
	white-space: nowrap;
	border-radius: 0.75rem;
	overflow: hidden;
	text-overflow: ellipsis;

	:not(:last-of-type) {
		margin-right: 0.75rem;
		@media only screen and (max-width: 480px) {
			margin-right: 0.3rem;
		}
	}

	@media only screen and (max-width: 480px) {
		margin-right: 0.2rem;
		padding: 0.875rem;
		border-radius: 0.3rem;
	}
`;
export const DragBox = styled.div`
	height: 300px;
	min-height: 100%;
	overflow-y: auto;

	@media only screen and (max-width: 480px) {
		padding: 0.875rem;
	}
`;
export const DragItem = styled.div`
	width: 100%;
	padding: 0.75rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	border-radius: 0.75rem;
	margin-bottom: 0.75rem;

	@media only screen and (max-width: 480px) {
		padding: 0.3rem;
		margin-bottom: 0.3rem;
		border-radius: 0.3rem;
	}
`;

const OrderTitle = styled.div`
	font-size: 0.75rem;
	color: #212121;
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
