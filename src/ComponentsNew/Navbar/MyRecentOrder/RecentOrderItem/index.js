import React, {useState, useCallback, useEffect} from "react";

// Package
import {useHistory} from "react-router-dom";

const RecentOrderItem = ({item, showComponent}) => {
	// Initilization
	const history = useHistory();

	// Functions
	const recentOrderSelect = () => {
		console.log("select recent order", item);

		// dispatch(selectedMyRecentOrderAction(item));
		history.push(
			`/searchorder/${item.providerId}/${item.id}/${item.channel}`
		);
		showComponent("recentOrder");
	};

	return (
		<div
			className="p-2 py-3 bg-white rounded-sm hover:bg-gray-50 border-b border-gray-100 transition duration-500 ease-in-out"
			onClick={recentOrderSelect}
		>
			<p className="text-sm font-medium">
				{item?.updatedBy}
				<span
					className={`${
						item?.channel === "Customer"
							? "bg-green-500"
							: item?.channel === "Dine In"
							? "bg-blue-500"
							: item?.channel === "QR code"
							? "bg-purple-500"
							: ""
					} text-xs text-white rounded-md px-2 py-1 ml-2`}
				>
					{item?.channel}
				</span>
			</p>
			<div className="flex items-center mt-2">
				<div className="inline-block p-2 bg-gray-100 rounded-sm mr-2">
					<p className="text-xs font-medium">Order Status</p>
					<p className="text-xs font-normal text-gray-600">
						{item?.orderStatus}
					</p>
				</div>
				<div className="inline-block p-2 bg-gray-100 rounded-sm mr-2">
					<p className="text-xs font-medium">Provider</p>
					<p className="text-xs font-normal text-gray-600">
						{item?.providerId}
					</p>
				</div>
				<div className="inline-block p-2 bg-gray-100 rounded-sm">
					<p className="text-xs font-medium">Time</p>
					<p className="text-xs font-normal text-gray-600">{item?.time}</p>
				</div>
			</div>
		</div>
	);
};

export default RecentOrderItem;
