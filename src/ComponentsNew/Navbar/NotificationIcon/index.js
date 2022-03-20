import React, {useState, useCallback, useEffect} from "react";
import Logo from "../../Logo";

// Package
import {useDispatch, useSelector} from "react-redux";

// Icons
import {NotificationsNoneRounded} from "@material-ui/icons";
import {KeyboardArrowUpRounded} from "@material-ui/icons";

// Custom Hooks
import {useGetNotification} from "../../../Hooks/useGetNotification";

const NotificationIcon = React.memo(({showComponent, show}) => {
	console.log("NotificationIcon");

	// Redex State
	const user = useSelector((state) => state.user.user);

	// Hooks
	const {notifications} = useGetNotification(user?.uid);

	return (
		<div className="relative  mx-4">
			<div
				className="relative  mx-4"
				onClick={() => showComponent("notification")}
			>
				<NotificationsNoneRounded />
				{notifications?.length > 0 ? (
					<div className="flex items-center justify-center absolute bottom-2 left-2 w-6 h-6 text-xs font-bold bg-red-400 rounded-full text-white">
						{notifications?.length}
					</div>
				) : null}
			</div>
			<div
				className={`${
					show ? "visible" : "invisible"
				} fixed md:absolute z-50 top-16 md:top-10 flex flex-col justify-between right-0 w-full md:w-80 h-3/5 md:h-72 border border-gray-200 bg-white rounded-md shadow-md overflow-y-auto transition duration-500 ease-in-out`}
			>
				<div>
					<header className="font-normal border-b border-gray-300  p-3 bg-gray-50">
						Notification
					</header>
					<div className="text-sm p-3 ">
						{notifications?.map((notification, i) => (
							<div
								key={i}
								className="overflow-x-hidden border-b border-gray-200 pb-1 mb-2"
							>
								<p className="font-medium text-gray-700">
									{notification?.customerId}
								</p>
								<p className="font-light text-gray-500">
									{notification?.message}
								</p>
							</div>
						))}
					</div>
				</div>
				<div
					onClick={() => showComponent("notification")}
					className="w-full text-center py-1"
				>
					<KeyboardArrowUpRounded />
				</div>
			</div>
		</div>
	);
});

export default NotificationIcon;
