import React, {useState, useEffect} from "react";

// Package
import {useParams} from "react-router-dom";

// Custom Hook
import useCart from "./useCart";

// Icons
import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

// Components
import CartBody from "./CartBody/CartBody";
import CartFooter from "./CartFooter";
import CartHeader from "./CartHeader/CartHeader";
import Modals from "../../components/modal/Modals";
import SpecialInstruction from "../../ComponentsNew/SpecialInstruction";
import CheckoutSummaryModal from "./CheckoutSummaryModal";
import GratuityModal from "./GratuityModal";
import FullPageLoading from "../../components/Loading/FullPageLoading";

const Cart2 = () => {
	// Param
	const {providerId, channel} = useParams();

	// QR and Dine In
	const {areaId, sectionId, tableId, guestId} = useParams();

	// Props to Send
	const qrProps = {areaId, sectionId, tableId, guestId};

	// Custom Hook
	const {
		onFilterSelect,
		selectedTag,
		showSubmenuOrTagmenu,
		displayRankCart,
		selectedMenuListByTag,
		addItem,
		deleteItem,
		editSpecial,
		// Modal
		isOpenModal,
		whichModal,
		closeModal,
		goToOrder,
		// Special
		isLoading,
		addSpecialInstruction,
		// Price
		totalPrice,
		subTotal,
		// Gratuity
		gratuity,
		totalPriceAfterGratuity,
		gratuityOnChange,
		gratuityError,
		isGratuityPositive,
		gratuityFocus,
		handleToken,
		addGratuity,

		// Create Order
		createOrder,
		providerDetail,
		stripePayLoading,
	} = useCart();

	return (
		<>
			{stripePayLoading ? <FullPageLoading /> : null}
			<Modals
				isOpen={isOpenModal}
				className={
					whichModal === "checkoutSummaryModal"
						? "checkoutSummery__modal"
						: "login__modal"
				}
			>
				<div className="close__modal">
					<IconButton>
						<CloseRoundedIcon onClick={closeModal} />
					</IconButton>
				</div>
				{/* Body */}
				{whichModal === "specialInstructionModal" ? (
					<SpecialInstruction
						isLoading={isLoading}
						addSpecialInstruction={addSpecialInstruction}
					/>
				) : whichModal === "checkoutSummaryModal" ? (
					<CheckoutSummaryModal
						totalPrice={totalPrice}
						subTotal={subTotal}
						totalPriceAfterGratuity={totalPriceAfterGratuity}
						goToOrder={goToOrder}
					/>
				) : whichModal === "gratuityModal" ? (
					<GratuityModal
						providerId={providerId}
						subTotal={subTotal}
						gratuity={gratuity}
						totalPriceAfterGratuity={totalPriceAfterGratuity}
						gratuityOnChange={gratuityOnChange}
						gratuityError={gratuityError}
						isGratuityPositive={isGratuityPositive}
						gratuityFocus={gratuityFocus}
						handleToken={handleToken}
					/>
				) : null}
			</Modals>

			<div className="h-full">
				<div className="sticky top-0 z-10 bg-white">
					<CartHeader
						qrProps={qrProps}
						providerId={providerId}
						channel={channel}
						onFilterSelect={onFilterSelect}
						selectedTag={selectedTag}
					/>
				</div>
				<div className="bg-gray-50 p-3 pb-20">
					<CartBody
						showSubmenuOrTagmenu={showSubmenuOrTagmenu}
						displayRankCart={displayRankCart}
						selectedMenuListByTag={selectedMenuListByTag}
						addItem={addItem}
						deleteItem={deleteItem}
						editSpecial={editSpecial}
					/>
				</div>
				<div className="fixed bottom-0 w-full">
					<CartFooter
						providerDetail={providerDetail}
						totalPrice={totalPrice}
						subTotal={subTotal}
						addGratuity={addGratuity}
						providerId={providerId}
						channel={channel}
						createOrder={createOrder}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</>
	);
};

export default Cart2;
