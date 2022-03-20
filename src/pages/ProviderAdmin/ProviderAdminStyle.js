import styled from "styled-components";

export const ProviderAdminContainer = styled.div`
	width: 100vw;
	height: calc(100vh - 70px);
	overflow: hidden;
	display: flex;
	background: white;

	@media only screen and (max-width: 480px) {
		height: calc(100vh - 60px);
	}
`;

export const RightSide = styled.div`
	width: 100%;
	height: calc(100vh - 70px);
	overflow-y: auto;
	/* background: blue; */
	/* padding: 0.75rem; */

	@media only screen and (max-width: 480px) and (min-width: 100px) {
		height: calc(100vh - 60px);
	}
`;
