import {createStore, applyMiddleware} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

// import {routerMiddleware} from "connected-react-router";
// import {createBrowserHistory} from "history";
import rootReducer from "./reducers";

const persistConfig = {
	key: "root",
	storage,
};

// export const history = createBrowserHistory();

const persistedReducer = persistReducer(persistConfig, rootReducer());

let store = createStore(
	persistedReducer,
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	composeWithDevTools(applyMiddleware(thunk))
	// composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
);
let persistor = persistStore(store);

export {store, persistor};
