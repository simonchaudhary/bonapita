import React, {useEffect, useState} from "react";
// Package
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
// API
import {getTableOrders} from "../../../apis/Orders";
import ButtonNLoading from "../../../components/buttons/ButtonNLoading";
// Component
import {PrimaryButton} from "../../../components/buttons/buttons";

const CartFooter = ({
	providerDetail,
	totalPrice,
	subTotal,
	addGratuity,
	providerId,
	channel,
	createOrder,
	isLoading,
}) => {
	console.log("CartFooter");

	// QR and Dine In
	const {areaId, sectionId, tableId, guestId} = useParams();

	// Redux State
	const cart = useSelector((state) => state.cart.cart);
	const QR = useSelector((state) => state.QR);

	// Hooks
	const [orderExists, setOrderExists] = useState({
		loading: null,
		orderType: null,
		payType: null,
		noOfGuest: null,
		guestNo: null,
	});

	// useEffect Get Order Detail
	useEffect(() => {
		// For QR Order
		getTableOrders(areaId, sectionId, tableId)
			.then((res) => {
				console.log("Response get table order", res);

				let order = res.data.data.orders[0];

				// For split order combine pay
				if (order?.channel === "QR code" && order?.orderType === "split") {
					setOrderExists({
						loading: true,
						orderType: order?.orderType,
						payType: order?.payType,
						noOfGuest: order?.noOfGuest,
						guestNo: order?.guestNo,
					});
				} else {
				}
			})
			.catch((err) => {
				console.log("Error get table order", err);
			});
	}, []);

	// PayFirst
	let payFirst = providerDetail?.payFirst;

	// Channels
	let customer = channel === "Customer";
	let qrCode = channel === "QR code";
	let dineIn = channel === "Dine In";

	// Customer
	let customerPay = customer && payFirst;
	let customerOrder = customer && payFirst === false;

	// QR
	// Split Order
	// Split pay
	let splitOrderSplitPay =
		QR?.orderType === "split" && QR?.splitOrderPayType === "splitPay";

	let splitOrderCombinePay =
		QR?.orderType === "split" &&
		QR?.splitOrderPayType === "combinedPay" &&
		QR?.guestNo === 1;

	// Combine Order
	let combineOrderFirstGuest =
		QR?.orderType === "combined" && QR?.guestNo === 1;

	// Show Pay Button
	let qrPay =
		qrCode &&
		payFirst &&
		(splitOrderSplitPay || splitOrderCombinePay || combineOrderFirstGuest);

	// Show Order Button
	let qrOrder = qrCode && payFirst === false;

	if (cart?.length > 0) {
		return (
			<div className="flex items-center justify-between px-3 py-2 bg-gray-50">
				<div>
					<p className="text-xs text-gray-400">Sub Total</p>
					<p className="text-xs font-bold">
						{"$ " + Number(subTotal)?.toFixed(2)}
					</p>
				</div>
				<div>
					<p className="text-xs text-gray-400">Total</p>
					<p className="text-xs font-bold">
						{"$ " + Number(totalPrice)?.toFixed(2)}
					</p>
				</div>
				<div className="w-24">
					{/* {providerDetail === null && !dineIn ? (
							<PrimaryButton>Loading</PrimaryButton>
						) : null} */}

					{/* {splitOrderSplitPay.toString()}
					{splitOrderCombinePay.toString()}
					{combineOrderFirstGuest.toString()} */}

					{customerPay || qrPay ? (
						<PrimaryButton onClick={addGratuity}>Pay</PrimaryButton>
					) : null}

					{customerOrder || qrOrder || dineIn ? (
						<ButtonNLoading
							style={{width: "100px"}}
							onClick={createOrder}
							title="Order"
							color="white"
							isLoading={isLoading}
						/>
					) : null}
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default CartFooter;
