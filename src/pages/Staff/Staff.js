import React, {useEffect} from "react";

// Package
import {Route, Switch, withRouter, useRouteMatch} from "react-router-dom";
import "react-accessible-accordion/dist/fancy-example.css";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";

// Actions
import {checkUserProviderForCart} from "../../Redux/actions";

import AssignedSection from "./AssignedSection";
// import Pagenotfound from "../../components/Pagenotfound";
import StaffOrderPage from "./StaffOrderPage/StaffOrderPage";
import QROrderPage from "./StaffOrderPage/QROrderPage";

import Receipt from "../Receipt/Receipt";
import PDFViewer from "../../ComponentsNew/PDFViewer/PDFViewer";

import Cart2 from "../../pages/Cart/Cart2";

import ReviewOrder from "../Customer/ReviewOrder/ReviewOrder";
import MenuPage from "../MenuPage";

function Staff() {
	// Initilization
	const dispatch = useDispatch();
	let {path} = useRouteMatch();
	console.log("staff", path);

	// Redux State
	const user = useSelector((state) => state.user?.user);

	useEffect(() => {
		console.log("Useeffect staff");
		dispatch(checkUserProviderForCart(user?.uid, user?.provider));
	}, []);

	if (window.location.pathname.substring(0, 12) === "/revieworder") {
		return (
			<Switch>
				<Route
					path="/revieworder/:providerId/:orderId/:channel"
					component={() => <ReviewOrder />}
				/>
			</Switch>
		);
	} else {
		return (
			<Container>
				<Switch>
					<Route
						exact
						// path="/home/staff"
						path={path}
						component={() => <AssignedSection />}
					/>
					{/* New menu */}
					<Route
						exact
						path={`/menuliststaff/:providerId/:areaId/:sectionId/:tableId/:guestId/:channel`}
						// component={() => <MenuListStaff />}
						component={() => <MenuPage />}
					/>
					{/* New Cart */}
					<Route
						exact
						path={`/cart/:providerId/:areaId/:sectionId/:tableId/:guestId/:channel`}
						component={() => <Cart2 />}
					/>
					{/* <Route
					exact
					path={`/cart/:providerId/:areaId/:sectionId/:tableId/:guestId/:channel`}
					component={() => <CartStaff />}
				/> */}

					<Route
						exact
						path={`/dineorderpage/:orderId/:areaId/:sectionId/:tableId/:guestId/:channel`}
						component={() => <StaffOrderPage />}
					/>
					<Route
						exact
						path={`/qrorderpage/:orderId/:areaId/:sectionId/:tableId/:guestId/:channel`}
						component={() => <QROrderPage />}
					/>

					<Route
						exact
						path="/:providerId/:type"
						component={() => <PDFViewer />}
					/>

					<Route
						exact
						path="/receipt/:orderId/:providerId/:areaId/:sectionId/:tableId"
						// component={() => <p>receitp</p>}
						component={() => <Receipt />}
					/>

					<Route component={() => <p>Page not found staff</p>}></Route>
				</Switch>
			</Container>
		);
	}
}

const Container = styled.div`
	/* padding: 0rem 4rem; */
	background: white;
	@media only screen and (min-width: 100px) and (max-width: 480px) {
		padding: 0.4rem;
	}
`;

export default withRouter(Staff);
