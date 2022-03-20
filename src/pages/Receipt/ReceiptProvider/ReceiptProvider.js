import React from "react";
import styled from "styled-components";

// Component
import {Title, Detail} from "../../../components/texts/texts";
import {
	useProviderDetail,
	useProviderPageInfo,
} from "../../../Hooks/useProvider/useProvider";

const ReceiptProvider = React.memo(({providerId}) => {
	console.log("RecieiptProvier", providerId);

	// Custom Hook
	const {providerPageInfo} = useProviderPageInfo(providerId);
	const {providerDetail} = useProviderDetail(providerId);

	return (
		<ReceiptProviderContainer>
			<Column>
				<Logo src={providerPageInfo?.footerUrl}></Logo>
				<TextContainer>
					<Title style={{textAlign: "center"}}>
						{providerDetail === null ? "Loading" : providerDetail?.name}
					</Title>
					<Detail style={{textAlign: "center"}}>
						{providerDetail?.location}
					</Detail>
				</TextContainer>
			</Column>
		</ReceiptProviderContainer>
	);
});

const ReceiptProviderContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	/* background: red; */
`;

const Column = styled.div`
	/* background: red; */
`;

const TextContainer = styled.div`
	margin-top: 0.875rem;
`;

const Logo = styled.img`
	width: auto;
	max-width: 200px;
`;

export default ReceiptProvider;
