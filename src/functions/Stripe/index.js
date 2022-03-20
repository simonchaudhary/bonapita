// Actions
import {saveQRDetailAction} from "../../Redux/actions";

// API
import {updateOrderStatus} from "../../apis/Orders";
import {
	addPayment,
	toCharge,
	updateOrderTranstionId,
} from "../../apis/StripePayment";

// Stripe Payment
export const onStripePayment = (
	token,
	totalPriceAfterGratuity,
	orderId,
	providerId,
	user,
	Toast,
	setIsOpenModal,
	setStripePayLoading,
	dispatch,
	setWhichModal = null
) => {
	toCharge(token, totalPriceAfterGratuity, orderId, providerId, user)
		.then((res) => {
			console.log("Response stripe pay", res);

			// Call Add Payment
			addPayment(res.data.data.paymentData)
				.then((res) => {
					console.log("Response add payment", res);

					// update trantion id
					updateOrderTranstionId(
						orderId,
						res.data.data.transactionId,
						totalPriceAfterGratuity
					)
						.then((res) => {
							console.log("Response update transactionid", res);
						})
						.catch((err) => {
							console.log("Error update transactionid", err);
							setStripePayLoading(false);
							Toast("Failed to update transactionId", "error");
						});

					// update orderstatus
					updateOrderStatus(orderId, "paid", user)
						.then((res) => {
							console.log("Response update orderstatus", res);
							dispatch(saveQRDetailAction(null));
							setStripePayLoading(false);
							if (setWhichModal === null) {
							} else {
								setWhichModal("checkoutSummaryModal");
								setIsOpenModal(true);
							}
							Toast("Order has been Paid", "success");
						})
						.catch((err) => {
							console.log("Error update orderstatus", err);
							setStripePayLoading(false);
							Toast("Failed to update orderstatus", "error");
						});
				})
				.catch((err) => {
					console.log("Error add payment", err);
					setStripePayLoading(false);
					Toast("Failed to save payment to firestore", "error");
				});
		})
		.catch((err) => {
			console.log("Error stripe pay", err);
			setStripePayLoading(false);
			Toast("Failed to Pay", "error");
		});
};
