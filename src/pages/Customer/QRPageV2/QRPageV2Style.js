import styled from "styled-components";

export const QRPageV2Container = styled.div``;
export const Body = styled.div`
	padding: 0.75rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	background: #f9f9f9;
	padding: 0.75rem;
	padding-bottom: 0rem;
`;
export const TextDetail = styled.div`
	margin-right: 0.75rem;
	margin-bottom: 0.75rem;
`;

export const GuestContainer = styled.div`
	width: 100%;
	padding: 0.75rem;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const GuestList = styled.div`
	/* width: 50%; */
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	padding: 0.75rem;
	padding-bottom: 0rem;
	background: #f5f5f5;
	border-radius: 0.25rem;

	@media only screen and (max-width: 480px) {
		width: 100%;
		margin: 0rem;
	}
`;

export const GuestItem = styled.div`
	width: 50px;
	height: 50px;
	padding: 0.75rem;
	border-radius: 0.25rem;
	background: white;
	margin-right: 0.75rem;
	margin-bottom: 0.75rem;
	text-align: center;
	font-weight: 500;
`;
export const GuestDetail = styled.div`
	padding: 0.75rem;
	border-radius: 0.25rem;
	text-align: center;
	background: #f5f5f5;

	@media only screen and (max-width: 480px) {
		width: 100%;
	}
`;
export const OrderTypeContainer = styled.div`
	padding: 0.75rem;
	border-radius: 0.25rem;
	text-align: center;
	background: #f5f5f5;
	@media only screen and (max-width: 480px) {
		width: 100%;
	}
`;

export const TableStatus = styled.div`
	margin-left: 0.5rem;
	border-radius: 0.5rem;
	padding: 0.25rem;
	text-align: center;
	font-size: 0.5rem;
	color: white;
	font-weight: 600;
	background: ${(props) =>
		props.green
			? "#008140"
			: props.orange
			? "#F7A73E"
			: props.red
			? "red"
			: null}; ;
`;
