import React, {useState, useCallback, useEffect} from "react";
import Logo from "../Logo";

// Package
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

// Actions
import {
	saveUser,
	removeUser,
	selectSearchItemNDetailsAction,
	emptyCartAction,
} from "../../Redux/actions";

// Firebase
import {auth} from "../../config/firebaseConfig";

// Icons
import {NotificationsNoneRounded} from "@material-ui/icons";
import {Avatar} from "@material-ui/core";
import {KeyboardArrowUpRounded} from "@material-ui/icons";
import {KeyboardArrowLeftRounded} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

// Hooks
import {useGetNotification} from "../../Hooks/useGetNotification";

// Helpers
import {timestampsToDate} from "../../helper/timestampsToDate";

// Components
import ToastBar from "../../components/ToastBar";
import {PrimaryButton, SecondaryButton} from "../Button";
import Profile from "./Profile";
import MyRecentOrder from "./MyRecentOrder";
import NotificationIcon from "./NotificationIcon";

const Navbar = () => {
	console.log("Navbar");

	// Initilization
	const history = useHistory();

	// Redex State
	const user = useSelector((state) => state.user.user);

	const [show, setShow] = useState({
		notification: false,
		profile: false,
		recentOrder: false,
	});

	const showComponent = useCallback(
		(key) => {
			setShow((prevState) => {
				console.log(key, prevState);
				return {
					[key]: !prevState?.[key],
				};
			});
		},
		[show]
	);
	const openMyRecent = useCallback(() => {
		setShow((prevState) => {
			return {
				recentOrder: true,
			};
		});
	}, [show]);

	const login = useCallback(() => {
		history.push("/login");
	}, []);

	const signup = useCallback(() => {
		history.push("/signup");
	}, []);

	const techadmin = () => {
		history.push("/techadminlogin");
	};

	return (
		<div className="flex items-center justify-between px-4 py-3 bg-gray-50">
			<Logo />
			{user && user?.userType === "Customer" && show?.recentOrder ? (
				<MyRecentOrder showComponent={showComponent} />
			) : null}

			{user ? (
				<div className="flex items-center">
					{user?.userType === "Customer" ? (
						<NotificationIcon
							showComponent={showComponent}
							show={show?.notification}
						/>
					) : null}
					<Profile
						showComponent={showComponent}
						show={show?.profile}
						openMyRecent={openMyRecent}
					/>
				</div>
			) : (
				<div className="flex items-center">
					<PrimaryButton title="Login" className="mr-2" onClick={login} />
					{/* <SecondaryButton
						title="Signup"
						className="mr-2"
						onClick={signup}
					/>
					<SecondaryButton title="Tech Admin" onClick={techadmin} /> */}
				</div>
			)}
		</div>
	);
};

export default Navbar;
