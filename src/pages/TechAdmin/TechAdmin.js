import React from "react";
import {useHistory, Switch, Route} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

// Actions
import {removeProviderTAAction} from "../../Redux/actions";

// Components
import ProviderAdminForm from "./ProviderAdminForm";
import {PrimaryButton, SecondaryButton} from "../../components/buttons/buttons";

// Page
import Provider from "./Provider";

function TechAdmin() {
	// Initilization
	const history = useHistory();
	const dispatch = useDispatch();

	// Redux State
	const techadmin = useSelector((state) => state.techadmin);

	const providerAdminPage = () => {
		let id = techadmin?.provider?.id;
		history.push(`/provideradmin/${id}`);
	};
	const providerPage = () => {
		dispatch(removeProviderTAAction());
		history.push("/");
	};

	return (
		<div className="h-full">
			<header className="sticky top-0 px-3 py-2 bg-white flex item-center justify-between ">
				{/* <Logo /> */}

				<div className="flex items-center">
					<PrimaryButton className="mr-2" onClick={providerPage}>
						Provider
					</PrimaryButton>
					{techadmin?.provider ? (
						<SecondaryButton onClick={providerAdminPage}>
							Provider Admin
						</SecondaryButton>
					) : null}
				</div>
			</header>
			<div>
				<Switch>
					<Route exact path="/" component={() => <Provider />} />
					<Route
						exact
						path="/provideradmin/:providerId"
						component={() => <ProviderAdminForm />}
					/>
					<Route
						component={() => <p>Techh amdin root page not found</p>}
					/>
				</Switch>
			</div>
		</div>
	);
}

export default TechAdmin;
