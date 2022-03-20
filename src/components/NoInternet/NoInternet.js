import React from "react";

import noInternet from "../../assets/nointernet.svg";

import styled from "styled-components";
import { Title } from "../texts/texts";

const NoInternet = () => {
	return (
		<NoInternetContainer>
			<img src={noInternet} width="150" />
			<Title style={{ textAlign: "center" }}>No Internet</Title>
		</NoInternetContainer>
	);
};

const NoInternetContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export default NoInternet;
