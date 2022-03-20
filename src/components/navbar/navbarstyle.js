import styled from "styled-components";

export const Container = styled.div`
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

export const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Logo = styled.div`
	font-size: 0.875rem;
	font-weight: 600;
	color: #d65a31;
	display: flex;
	align-items: center;
`;

export const Menu = styled.div`
	display: flex;
	align-items: center;
	/* background: red; */
`;
export const MenuItem = styled.div`
	flex: 1;
	min-width: 80px;
	/* background: blue; */
	font-size: 0.875rem;
	font-weight: 400;
	color: #6f7282;
	transition: 600ms;

	:not(:last-of-type) {
		margin-right: 0.4rem;
	}

	:hover {
		color: #d65a31;
		cursor: pointer;
		/* border-bottom: 1px solid #d65a31; */
	}
`;

export const NavRight = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	border-radius: 50%;
`;
export const MyRecentOrder = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: -4;
	width: 350px;
	height: 100%;
	overflow: hidden;
	display: none;
	box-sizing: border-box;
	background: white;
	transition: 450ms;
	box-shadow: 4px 0px 20px -4px rgba(0, 0, 0, 0.1);
	@media only screen and (max-width: 480px) {
		width: 100%;
	}
`;

export const MyRecentOrderHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* background: red; */
	padding: 0.4rem 0.75rem;
	border-bottom: 1px solid #f5f5f5;
	@media only screen and (max-width: 480px) {
		padding: 0.6rem;
	}
`;

export const MyRecentOrderBody = styled.div`
	height: 100%;
	overflow-y: auto;
	/* background: red; */
`;

export const RecentTitle = styled.div`
	flex: 0.7;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

export const OrderStatusText = styled.div`
	padding: 0.4rem 0.6rem;
	display: flex;
	align-items: center;
	border-radius: 0.6rem;
	justify-content: center;
	color: white;
	margin: 0 0.4rem;
`;

export const NavProfile = styled.div`
	position: absolute;
	top: 60px;
	right: 0;
	z-index: 20;
	width: 300px;
	padding: 0.75rem;
	background: white;
	border-radius: 0.75rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	-webkit-box-shadow: 0px 0px 20px 6px rgba(0, 0, 0, 0.11);
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.11);
	transition: 450ms ease;

	@media only screen and (max-width: 480px) {
		top: 50px;
		width: 200px;
		padding: 0.6rem;
		border-radius: 0.6rem;
	}
`;

export const NavProfileHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.6rem;
	overflow: hidden;
`;

export const ContainerBox = styled.div`
	width: 100%;
	background: #fafafa;
	padding: 0.875rem;
	border-radius: 0.875rem;

	transition: 400ms;
	overflow: hidden;

	:not(:last-of-type) {
		margin-bottom: 0.6rem;
	}

	@media only screen and (max-width: 480px) and (min-width: 100px) {
		padding: 0.6rem;
		border-radius: 0.6rem;
	}
`;
