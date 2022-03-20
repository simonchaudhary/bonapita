import React from "react";

// Packages
import {Switch, Route, Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

// Config
import {auth} from "./config/firebaseConfig";

//Components
import Indexpage from "./pages/Indexpage";
import Home from "./pages/Home";
import Login from "./pages/Registration/Login";
import Signup from "./pages/Registration/Signup";
import QRPageV2 from "./pages/Customer/QRPageV2/QRPageV2";
import PDFViewer from "./ComponentsNew/PDFViewer/PDFViewer";
import Receipt from "./pages/Receipt/Receipt";
import MenuListQR from "./ComponentsNew/MenuList/MenuListQR";

// Pages
import MenuPage from "./pages/MenuPage";

const App = () => {
	// Redux State
	const user = useSelector((state) => state.user.user);

	return (
		<Switch>
			{user ? (
				<Route path="/" component={() => <Home />} />
			) : (
				<Route exact path="/" component={() => <Indexpage />} />
			)}

			<Route exact path="/login" component={() => <Login />} />
			<Route exact path="/signup" component={() => <Signup />} />

			{/* Needed Here because it need to login*/}
			<Route
				exact
				path="/menulistqr/:providerId/:areaId/:sectionId/:tableId/:guestId/:channel"
				// component={() => <MenuListQR />}
				component={() => <MenuPage />}
			/>
			<Route
				exact
				path="/qr/:providerId/:areaId/:sectionId/:tableId/:guestId"
				component={() => <QRPageV2 />}
			/>
			<Route
				path="/revieworder/:providerId/:orderId"
				component={() => <p>Reivew</p>}
			/>
			<Route
				component={() => (
					<Redirect
						to={{
							pathname: "/",
						}}
					/>
				)}
			/>
		</Switch>
	);
};

export default App;
