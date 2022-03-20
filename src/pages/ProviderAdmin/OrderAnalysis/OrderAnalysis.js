import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Switch, Route, useHistory} from "react-router-dom";

// Action
import {tabSelected} from "../../../Redux/actions";

// Component
import {
	OrderAnalysisContainer,
	Header,
	Tab,
	Tabmenu,
} from "./OrderAnalysisStyle";
import {Vertical} from "../../../components/elements/elements";
import ArchivedOrder from "./ArchivedOrder/ArchivedOrder";
import ActiveOrder from "./ActiveOrder/ActiveOrder";

// data

function OrderAnalysis() {
	const dispatch = useDispatch();

	// Redux State

	const selectedTabMenu = useSelector(
		(state) => state.provideradmin.orderAnalysis.selectedTabMenu
	);
	const history = useHistory();

	const activeOrder = () => {
		dispatch(tabSelected("activeOrder"));
		history.push("/orderanalysis/activeOrder");
	};
	const archiveOrder = () => {
		dispatch(tabSelected("archiveOrder"));
		history.push("/orderanalysis");
	};

	useEffect(() => {
		// dispatch(tabSelected("archiveOrder"));
		console.log("Current URL", window.location.pathname);
	}, []);

	return (
		<>
			<OrderAnalysisContainer>
				<Header>
					<Tab>
						<Tabmenu
							style={{
								background:
									selectedTabMenu === "activeOrder" ? "#f1f1f1" : null,
							}}
							onClick={activeOrder}
						>
							Active Order
						</Tabmenu>
						<Vertical />
						<Tabmenu
							style={{
								background:
									selectedTabMenu === "archiveOrder"
										? "#f1f1f1"
										: null,
							}}
							onClick={archiveOrder}
						>
							Archived Order
						</Tabmenu>
					</Tab>
				</Header>

				<Switch>
					<Route
						exact
						path="/orderanalysis"
						component={() => <ArchivedOrder />}
					></Route>
					<Route
						exact
						path="/orderanalysis/activeOrder"
						component={() => <ActiveOrder />}
					></Route>
				</Switch>
			</OrderAnalysisContainer>
		</>
	);
}

export default OrderAnalysis;
