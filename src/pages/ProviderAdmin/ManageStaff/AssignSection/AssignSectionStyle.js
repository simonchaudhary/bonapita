import styled from "styled-components";

export const AssignSectionContainer = styled.div`
	height: calc(100vh - 120px);
	padding: 0.75rem 0.75rem;
	overflow: hidden;
`;

export const StaffList = styled.div`
	display: flex;
	overflow-x: auto;
	/* background: red; */
`;
export const StaffItem = styled.div`
	min-width: 200px;
	border-radius: 0.25rem;
	padding: 0.75rem;
	background: #f5f5f5;
	margin-right: 0.75rem;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
`;
