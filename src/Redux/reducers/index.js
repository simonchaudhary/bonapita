import {combineReducers} from "redux";
// import {connectRouter} from "connected-react-router";
import saveUserReducer from "./User/userreducer";
import smsEnableReducer from "./smsEnable";
// QR
import {saveQRDetailReducer} from "./qr";
// order
import {
	selectSearchItemNDetailsReducer,
	Order,
	selectMyRecentOrderReducer,
} from "./order";

// Others
import {otherReducer} from "./Others/otherreducer";

// Tech Admin
import {saveProviderTAReducer} from "./techadmin";

// UI
import {isQRCameraOpenReducer, manageDineBreadcrumbsReducer} from "./ui";
// provider admin
import {providerAdminReducer} from "./ProviderAdmin/provideradminreducer";

// menu
import {menusReducer} from "./Menu/menureducer";

// Cart
import {cartReducer} from "./Cart/cartreducer";

const rootReducer = () =>
	combineReducers({
		// router: connectRouter(history),
		user: saveUserReducer,
		selectSearchItemNDetails: selectSearchItemNDetailsReducer,
		QR: saveQRDetailReducer,
		techadmin: saveProviderTAReducer,
		Order: Order,
		recentOrder: selectMyRecentOrderReducer,
		// UI
		isQRCameraOpen: isQRCameraOpenReducer,
		manageDineBreadcrumbs: manageDineBreadcrumbsReducer,

		menus: menusReducer,

		cart: cartReducer,

		// UI Provider Admin
		provideradmin: providerAdminReducer,

		// Others
		other: otherReducer,
	});

export default rootReducer;
