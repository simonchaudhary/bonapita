import React from "react";
// Package
import {useParams} from "react-router-dom";
import {PrimaryButton} from "../../components/buttons/buttons";
import MenuListOnly from "../../ComponentsNew/MenuList/MenuListOnly";
// Components
import OrderedItem from "../../ComponentsNew/OrderedItem";
import ProviderHeader from "../../ComponentsNew/ProviderHeader";
// Custom Hooks
import {useOrderDetail} from "../../Hooks/useOrderDetail/useOrderDetail";

const OrderPage = () => {
	// Params
	const {providerId} = useParams();
	const {orderId} = useParams();
	const {channel} = useParams();

	// QR and Dine In
	const {areaId} = useParams();
	const {sectionId} = useParams();
	const {tableId} = useParams();
	const {guestId} = useParams();

	// Props to Send
	const qrProps = {areaId, sectionId, tableId, guestId};

	// Custom Hooks
	const {orderDetail} = useOrderDetail(orderId);

	// Functions
	const addItemToOrder = () => {
		if (channel === "Customer") {
			alert("cc");
		} else if (channel === "QR code") {
			alert("qq");
		} else if (channel === "Dine In") {
			alert("dd");
		}
	};

	return (
		<div>
			{/* Header */}
			<ProviderHeader
				providerId={providerId}
				channel={channel}
				qrProps={qrProps}
			/>

			<div className="flex justify-between p-2 mb-2 border-b border-t border-gray-200">
				<div>
					<p className="text-xs font-bold">Order Status</p>
					<p className="text-xs text-gray-400">
						{orderDetail?.orderStatus}
					</p>
				</div>
				<div>
					<p className="text-xs font-bold">Total Price</p>
					<p className="text-xs text-gray-400">
						{orderDetail?.totalPrice}
					</p>
				</div>
				<div className="w-28">
					<PrimaryButton>Pay</PrimaryButton>
				</div>
			</div>

			{/* Order Items */}
			<div className="pl-2">
				<OrderedItem orderId={orderId} />
			</div>

			{/* Menu Components */}
			<div>
				<MenuListOnly
					providerId={providerId}
					addItemToOrder={addItemToOrder}
					isPaid={orderDetail?.isPaid}
				/>
			</div>
		</div>
	);
};

export default OrderPage;
