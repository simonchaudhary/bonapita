import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {ToastProvider} from "react-toast-notifications";
import {BrowserRouter as Router} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {store, persistor} from "./Redux/store";
// import {ConnectedRouter} from "connected-react-router";
// import {history} from "./Redux/store";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{/* <ConnectedRouter history={history}> */}
				<Router>
					<ToastProvider
						autoDismiss
						autoDismissTimeout={5000}
						placement="top-center"
					>
						<App />
					</ToastProvider>
				</Router>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
