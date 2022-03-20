import React from "react";
import {SecondaryButton} from "../../../../components/buttons/buttons";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";

const QRContainer = ({
	order,
	tableAvailable,
	viewOrder,
	guest,
	itemServe,
	closeOrder,
	archiveOrder,
	index,
	pay,
	orderList,
	isLoading,
	acceptOrder,
}) => {
	// For View Menu
	// const hasNoOrderTable = order?.length === 0 && tableAvailable; //if there is no order and tableAbailable
	// const hasNoOrderListTable = !orderList && tableAvailable; //if there is no order and tableAbailable

	// Booleans
	const hasOrder = order?.length > 0; // has order
	const isCombineGuest1 =
		orderList?.[0]?.orderType === "combined" && index === 0; //ordertype combined and first guest
	const isSplit = orderList?.[0]?.orderType === "split"; //ordertype split
	const isSplitCombinedPayGuest1 =
		isSplit && orderList?.[0]?.payType === "combinedPay" && index === 0; //ordertype split and combinedpay
	const isSplitSplitPay = isSplit && orderList?.[0]?.payType === "splitPay"; //ordertype split and splitpay
	// Has items in order
	// const hasItems = order?.[0]?.items.length > 0;
	const isPaid = order?.[0]?.isPaid;

	const combinedPay = isSplit && orderList?.[0]?.payType === "combinedPay";

	// For Pay button
	const hasOrderSubmitCombinedGuest1 =
		hasOrder &&
		// order?.[0]?.orderStatus === "accepted" &&
		isCombineGuest1 &&
		!isPaid;

	const hasOrderSubmitSplit =
		hasOrder &&
		// order?.[0]?.orderStatus === "accepted" &&
		(isSplitCombinedPayGuest1 || isSplitSplitPay) &&
		!isPaid;

	// For Closed button
	const hasOrderPaidCombinedGuest1 =
		hasOrder &&
		order?.[0]?.orderStatus === "served" &&
		isPaid &&
		isCombineGuest1;

	const hasOrderPaidSplit =
		hasOrder &&
		order?.[0]?.orderStatus === "served" &&
		isPaid &&
		(isSplitCombinedPayGuest1 || isSplitSplitPay);

	//  For Archieved Button
	const hasOrderClosedCombinedGuest1 =
		hasOrder && order?.[0]?.orderStatus === "closed" && isCombineGuest1;

	const hasOrderClosedSplit =
		hasOrder &&
		order?.[0]?.orderStatus === "closed" &&
		(isSplitCombinedPayGuest1 || isSplitSplitPay);

	// For View Order
	const hasOrderCombineGuest1ViewOrder = hasOrder && isCombineGuest1;

	const hasOrderSplitViewOrder = hasOrder && (combinedPay || isSplitSplitPay);

	// For Accept Order
	// const hasOrderCombineGuest1AcceptButton =
	// 	hasOrder &&
	// 	isCombineGuest1 &&
	// 	order?.[0]?.orderStatus === "submit" &&
	// 	hasItems;

	// const hasOrderSplitAcceptButton =
	// 	hasOrder &&
	// 	(isSplitCombinedPayGuest1 || isSplitSplitPay) &&
	// 	order?.[0]?.orderStatus === "submit" &&
	// 	hasItems;

	return (
		<div>
			{/* View Menu */}
			{/* {hasNoOrderTable || hasNoOrderListTable ? (
				<PrimaryButton onClick={() => viewMenu(guest)}>
					View Menu
				</PrimaryButton>
			) : null} */}

			{/* Close Order */}
			{hasOrderPaidCombinedGuest1 || hasOrderPaidSplit ? (
				<button
					style={{
						width: "100%",
						marginBottom: "0.5rem",
						padding: "0.3rem 0.4rem",
						background: "#d65a31",
						borderRadius: "0.3rem",
						color: "white",
					}}
					onClick={closeOrder}
				>
					Close Order
				</button>
			) : null}

			{/* Archive Order */}
			{hasOrderClosedCombinedGuest1 || hasOrderClosedSplit ? (
				<ButtonNLoading
					onClick={archiveOrder}
					title="Archive Order"
					color="white"
					isLoading={isLoading}
				/>
			) : null}

			{/* View Order */}
			{hasOrderCombineGuest1ViewOrder || hasOrderSplitViewOrder ? (
				<SecondaryButton onClick={() => viewOrder(guest)}>
					View Order
				</SecondaryButton>
			) : null}

			{/* Pay */}
			{hasOrderSubmitCombinedGuest1 || hasOrderSubmitSplit ? (
				<button
					style={{
						padding: "0.75rem 0rem",
						borderRadius: "0.3rem",
						background: "#0217FF",
						border: "none",
						width: "100%",
						color: "white",
						// border: "1px solid black",
						fontSize: "0.75rem",
						margin: "0.5rem 0rem",
					}}
					onClick={pay}
				>
					Pay
				</button>
			) : null}

			{/* Accept button */}
			{/* {hasOrderCombineGuest1AcceptButton || hasOrderSplitAcceptButton ? (
				<ButtonNLoading
					onClick={acceptOrder}
					title="Accept"
					color="white"
					isLoading={isLoading}
				/>
			) : null} */}
		</div>
	);
};

export default QRContainer;
