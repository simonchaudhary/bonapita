import React, {useEffect} from "react";
// Packages
import {Route, Switch} from "react-router-dom";
// Components
import Search from "../../components/Search/Search";
import PDFViewer from "../../ComponentsNew/PDFViewer/PDFViewer";
import QRScanPage from "../../ComponentsNew/QRScanPage/QRScanPage";
import QRPageV2 from "../../pages/Customer/QRPageV2/QRPageV2";
import Cart2 from "../Cart/Cart2";
import MenuPage from "../MenuPage";
import AuthenticationPage from "./AuthenticationPage";
import AuthenticationPageWithData from "./AuthenticationPageWithData";
import ReviewOrder from "./ReviewOrder/ReviewOrder";
// V2 SearchOrder
import SearchOrderV2 from "./SearchOrderV2/SearchOrderV2";

function Customer() {
	useEffect(() => {}, []);

	return (
		<Switch>
			<Route exact path="/" component={() => <Search />} />
			{/* MenuPage */}
			<Route
				exact
				path="/menulistcustomer/:providerId/:channel"
				component={() => <MenuPage />}
				// component={() => <MenuListCustomer />}
			/>
			<Route
				exact
				path="/menulistqr/:providerId/:areaId/:sectionId/:tableId/:guestId/:channel"
				component={() => <MenuPage />}
				// component={() => <MenuListQR />}
			/>
			<Route
				exact
				path="/cart/:providerId/:channel"
				component={() => <Cart2 />}
			/>
			{/* <Route
				exact
				path="/cart/:providerId/:channel"
				component={() => <Cart />}
			/> */}
			<Route
				exact
				path="/cartqr/:providerId/:areaId/:sectionId/:tableId/:guestId/:channel"
				component={() => <Cart2 />}
			/>
			<Route
				exact
				path="/menupdf/:providerId/:type"
				component={() => <PDFViewer />}
			/>
			<Route
				exact
				path="/searchorder/:providerId/:orderId/:channel"
				// component={() => <OrderPage />}
				component={() => <SearchOrderV2 />}
			/>
			{/* UnProtected route */}
			<Route
				exact
				path="/authenticationpage"
				component={() => <AuthenticationPage />}
			/>
			<Route
				exact
				path="/authenticationpagewithdata/:providerId"
				component={() => <AuthenticationPageWithData />}
			/>
			<Route exact path="/qrpage" component={() => <QRScanPage />} />
			<Route
				path="/revieworder/:providerId/:orderId/:channel"
				component={() => <ReviewOrder />}
			/>
			<Route
				exact
				path="/qr/:providerId/:areaId/:sectionId/:tableId/:guestId"
				component={() => <QRPageV2 />}
			/>
		</Switch>
	);
}

export default Customer;
