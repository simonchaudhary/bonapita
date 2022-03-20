import React from "react";
import styled from "styled-components";

import {HeaderText} from "../texts/texts";
import {PrimaryButton} from "../buttons/buttons";

function GmailModal({title, urlType}) {
	const openGmail = () => {
		switch (urlType) {
			case "yahoo.com":
				window.location.href = "https://mail.yahoo.com/d/folders/1";
				break;

			case "gmail.com":
				window.location.href = "https://mail.google.com/mail/u/0/#inbox";
				break;
			case "outlook.com":
				window.location.href = "https://outlook.live.com/mail/0/junkemail";
				break;
			default:
				console.log("non of url");
		}
	};

	return (
		<Container>
			<HeaderText>{title}</HeaderText>

			<Row>
				<PrimaryButton onClick={openGmail}>
					Open{" "}
					{urlType === "yahoo.com"
						? "Yahoo"
						: urlType === "gmail.com"
						? "Gmail"
						: urlType === "outlook.com"
						? "Outlook"
						: null}
				</PrimaryButton>
			</Row>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	/* background: red; */
`;

const Row = styled.div`
	display: flex;
`;

export default GmailModal;
