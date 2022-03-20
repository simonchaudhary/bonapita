import {useSelector} from "react-redux";

import {useProviderPageInfo} from "../../../Hooks/useProvider/useProvider";

// components
import {
	DashBoardPAContainer,
	BackgroundImage,
	Row,
	Header,
	HeaderTitle,
	HeaderDetail,
	Footer,
	FooterTitle,
	FooterDetail,
	FooterImage,
} from "./DashBoardPAStyle";

function DashBoardPA() {
	// Redux state
	const user = useSelector((state) => state.user.user);

	const {providerPageInfo} = useProviderPageInfo(user?.provider);

	// useEffect(() => {
	// 	axios
	// 		.get(
	// 			"https://us-central1-afoodie-6d649.cloudfunctions.net/provider/" +
	// 				user?.provider +
	// 				"/page-info"
	// 		)
	// 		.then((res) => {
	// 			console.log("Response getProvider Info", res);
	// 			if (res.data.success) {
	// 				setProviderInfo(res.data.data.pageInfo);
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.error("Error getProvider Info", err.response);
	// 		});
	// }, []);

	return (
		<DashBoardPAContainer>
			<BackgroundImage src={providerPageInfo?.logoUrl} />
			<Header>
				<HeaderTitle>{providerPageInfo?.header.message1}</HeaderTitle>
				<HeaderDetail>{providerPageInfo?.header.message2}</HeaderDetail>
			</Header>

			<Footer>
				<Row style={{justifyContent: "space-between"}}>
					<div>
						<FooterTitle>{providerPageInfo?.footer.message1}</FooterTitle>
						<FooterDetail>
							{providerPageInfo?.footer.message2}
						</FooterDetail>
					</div>
					<FooterImage src={providerPageInfo?.footerUrl}></FooterImage>
				</Row>
			</Footer>
		</DashBoardPAContainer>
	);
}

export default DashBoardPA;
