import React from "react";

import {Switch, Route, withRouter, useRouteMatch} from "react-router-dom";
import "react-edit-text/dist/index.css";

import "react-dragswitch/dist/index.css";

// Components
import {ProviderAdminContainer, RightSide} from "./ProviderAdminStyle";
import Sidebar from "../../components/sidebar/Sidebar";
import ManageOrder from "./ManageOrder/ManageOrder";
import ManageDineIn from "./ManageDineIn/ManageDineIn";
import Finance from "./Finance/Finance";
import OrderAnalysis from "./OrderAnalysis/OrderAnalysis";
import Setting from "./Setting/Setting";
import SalesAnalysis from "./SalesAnalysis/SalesAnalysis";
import DashBoardPA from "./DashBoardPA/DashBoardPA";
import ManageMenu from "./ManageMenu/ManageMenu";
import ManageStaff from "./ManageStaff/ManageStaff";
import ManagePrepline from "./ManagePrepline/ManagePrepline";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import "./css/provideradmin.css";
import ManagePreplineManager from "./ManagePreplineManager/ManagePreplineManager";
import ReviewOrder from "../Customer/ReviewOrder/ReviewOrder";

function ProviderAdmin() {
	// Redux state

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
			<ProviderAdminContainer>
				<Sidebar />
				<RightSide>
					<SwitchContainer />
				</RightSide>
			</ProviderAdminContainer>
		);
	}
}

const SwitchContainer = () => {
	let {path} = useRouteMatch();
	console.log("Provideradmin SwitchContainer", path);

	// useEffect(() => {
	// 	history.replace(`${path}provideradmin`);
	// }, []);
	return (
		<Switch>
			<Route exact path="/" component={() => <DashBoardPA />}></Route>
			<ProtectedRoute
				exact
				path="/manageorders"
				component={() => <ManageOrder />}
			></ProtectedRoute>
			<ProtectedRoute
				exact
				path="/managemenu"
				component={() => <ManageMenu />}
			/>
			<ProtectedRoute
				path="/managedinein"
				component={() => <ManageDineIn />}
			/>

			<ProtectedRoute
				exact
				path="/managestaff"
				component={() => <ManageStaff />}
			/>
			<ProtectedRoute
				exact
				path="/manageprepline"
				component={() => <ManagePrepline />}
			/>
			<ProtectedRoute
				exact
				path="/managepreplinemanager"
				component={() => <ManagePreplineManager />}
			/>
			<ProtectedRoute exact path="/finance" component={() => <Finance />} />
			<ProtectedRoute
				path="/orderanalysis"
				component={() => <OrderAnalysis />}
			/>
			<ProtectedRoute
				exact
				path="/salesanalysis"
				component={() => <SalesAnalysis />}
			/>
			<ProtectedRoute
				exact
				path="/supplies"
				component={() => <Supplies />}
			/>
			<ProtectedRoute
				exact
				path="/workorders"
				component={() => <WorkOrders />}
			/>
			<ProtectedRoute exact path="/setting" component={() => <Setting />} />

			<Route component={() => <p>Provider Page not found</p>} />
		</Switch>
	);
};

function Supplies() {
	return <div className="header">Supplies</div>;
}
function WorkOrders() {
	return <div className="header">WorkOrders</div>;
}

export default withRouter(ProviderAdmin);
