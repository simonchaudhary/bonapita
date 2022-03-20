import React from "react";
import styled from "styled-components";
import { Horizontal } from "../../components/elements/elements";
import { Title } from "../../components/texts/texts";

import LoginForm from "../../components/forms/login/LoginForm";

const LoginPage = () => {
	return (
		<LoginPageContainer>
			<h3>Login</h3>
			<Horizontal />
			<LoginForm />
		</LoginPageContainer>
	);
};

const LoginPageContainer = styled.div`
	padding: 2rem;
`;

export default LoginPage;
