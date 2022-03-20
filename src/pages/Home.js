import React from "react";

// Packages
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

// Pages
import Customer from "./Customer/Customer";
import PrepLineManager from "./PrepLine/PrepLineManager/PrepLineManager";
import ProviderAdmin from "./ProviderAdmin/ProviderAdmin";
import PrepLine from "./PrepLine/PrepLine";
import Staff from "./Staff/Staff";

// Version 2
import Navbar from "../ComponentsNew/Navbar";
import TechAdmin from "./TechAdmin/TechAdmin";

function Home() {
	return (
		<div>
			<Navbar />
			<SwitchContainer />
		</div>
	);
}

const SwitchContainer = React.memo(() => {
	console.log("Home SwitchContainer");

	// Redux State
	const user = useSelector((state) => state.user.user);

	if (user?.userType === "Customer") {
		return <Customer />;
	} else if (user?.userType === "ProviderAdmin") {
		return <ProviderAdmin />;
	} else if (user?.userType === "Staff") {
		return <Staff />;
	} else if (user?.userType === "PrepLineStaff") {
		return <PrepLine />;
	} else if (user?.userType === "PrepLineManager") {
		return <PrepLineManager />;
	} else if (user?.userType === "TechAdmin") {
		return <TechAdmin />;
	} else {
		return (
			<Redirect
				to={{
					pathname: "/",
				}}
			/>
		);
	}
});

export default Home;
