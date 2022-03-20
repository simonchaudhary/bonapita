import React, {useState, useCallback, useEffect} from "react";

// Package
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

// Actions
import {
	saveUser,
	removeUser,
	selectSearchItemNDetailsAction,
	emptyCartAction,
} from "../../../Redux/actions";

// Firebase
import {auth} from "../../../config/firebaseConfig";

// Icons
import {Avatar} from "@material-ui/core";
import {KeyboardArrowUpRounded} from "@material-ui/icons";

// Components
import ToastBar from "../../../components/ToastBar";

const Profile = React.memo(({showComponent, show, openMyRecent}) => {
	console.log("Profile");

	const user = useSelector((state) => state?.user.user);

	const dispatch = useDispatch();
	const history = useHistory();
	const Toast = ToastBar();

	const logout = useCallback(() => {
		auth
			.signOut()
			.then((cred) => {
				auth.signOut();
				// dispatch(loggedStatus(false));
				dispatch(saveUser(null));
				dispatch(removeUser(null));
				dispatch(selectSearchItemNDetailsAction(null));
				dispatch(emptyCartAction());
				history.replace("/");
				Toast("User Signout Successfully", "success");
			})
			.catch((error) => {
				console.log("error logout " + error);
			});
	}, []);

	return (
		<div className="relative  mx-4 ">
			<div onClick={() => showComponent("profile")}>
				<Avatar />
			</div>
			<div
				className={`${
					show ? "visible" : "invisible"
				} fixed md:absolute top-18 z-50 md:top-12 flex flex-col justify-between right-0 w-full md:w-80  h-auto  md:h-auto overflow-y-auto border border-gray-200 bg-white rounded-md shadow-md transition duration-500 ease-in-out`}
			>
				<div className="text-sm p-3 ">
					<div className="bg-gray-50 rounded-xl p-3 mb-2 overflow-x-auto">
						{user?.firstName && user?.lastName && (
							<p className="font-medium text-gray-700">
								{user?.firstName + " " + user?.lastName}
							</p>
						)}
						<p className="font-light text-gray-500">{user?.email}</p>
					</div>
					<div className="bg-gray-50 rounded-xl p-3 mb-2">
						<p className="font-medium text-gray-700">User Type</p>
						<p className="font-light text-gray-500">{user?.userType}</p>
					</div>

					{user?.userType === "Customer" ? (
						<div
							className="bg-gray-50 rounded-xl p-3 mb-2"
							onClick={openMyRecent}
						>
							<p className="font-medium text-gray-700">Recent Orders</p>
							<p className="font-light text-gray-500">
								Recent order list
							</p>
						</div>
					) : null}

					{user?.userType != "Customer" && user?.provider ? (
						<div>
							<div className="bg-gray-50 rounded-xl p-3 mb-2 overflow-x-auto">
								<p className="font-medium text-gray-700">Provider</p>
								<p className="font-light text-gray-500">
									{user?.provider}
								</p>
							</div>
						</div>
					) : null}

					{user?.userType === "PrepLineStaff" ? (
						<div className="bg-gray-50 rounded-xl p-3 mb-2">
							<p className="font-medium text-gray-700">Preline</p>
							<p className="font-light text-gray-500">
								{user?.prepLineName}
							</p>
						</div>
					) : null}

					<div
						className="bg-primary rounded-xl text-center text-white p-3 mb-2"
						onClick={logout}
					>
						Logout
					</div>
				</div>
				<div
					onClick={() => showComponent("profile")}
					className="w-full text-center py-1"
				>
					<KeyboardArrowUpRounded />
				</div>
			</div>
		</div>
	);
});

export default Profile;
