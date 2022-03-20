import React from "react";

// Package
import StripeCheckout from "react-stripe-checkout";

// Custom Hook
import {useProviderDetail} from "../../../Hooks/useProvider/useProvider";

// Component
import {Title, Detail} from "../../../components/texts/texts";
import InputWrapper from "../../../components/input/InputWrapper";
import {PrimaryButton} from "../../../components/buttons/buttons";

const GratuityModal = ({
	providerId,
	subTotal,
	gratuity,
	totalPriceAfterGratuity,
	gratuityOnChange,
	gratuityError,
	isGratuityPositive,
	gratuityFocus,
	handleToken,
}) => {
	// Custom Hook
	const {providerDetail} = useProviderDetail(providerId);

	return (
		<div className="w-full">
			<div className="flex items-center w-full">
				<div style={{width: "100%"}}>
					<Detail>Sub Total</Detail>
					<Title>{Number(subTotal)?.toFixed(2)}</Title>
				</div>
				<div style={{width: "100%"}}>
					<Detail>Gratuity</Detail>
					<Title>{gratuity}%</Title>
				</div>
				<div style={{width: "100%"}}>
					<Detail>Total Price</Detail>
					<Title>{Number(totalPriceAfterGratuity).toFixed(2)}</Title>
				</div>
			</div>

			<div className="flex items-center w-full">
				<div
					style={{
						width: "200px",
						display: "flex",
						alignItems: "center",
					}}
				>
					<InputWrapper
						label=""
						error={gratuityError}
						// prefixIcon={<EmailRoundedIcon />}
						onFocus={gratuityFocus}
						type="number"
						value={gratuity}
						onChangeText={(e) => gratuityOnChange(e)}
					/>
					<Title>%</Title>
				</div>
			</div>
			{isGratuityPositive ? (
				<>
					{providerDetail?.payFirst ? (
						<StripeCheckout
							stripeKey="pk_test_51InIyfAljeQoxwF8bEWEgokRJsqoam5DsBNXBdqA3NBACmVuzRyXV0YtfEELWf7zaKOdFxjYCnyktyEgOibrI0Nu0032A4LzDu"
							token={handleToken}
							name={
								providerDetail?.name + "," + providerDetail?.location
							}
						>
							<PrimaryButton>Make Payment</PrimaryButton>
						</StripeCheckout>
					) : null}
				</>
			) : null}
		</div>
	);
};

export default GratuityModal;
