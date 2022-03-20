import React from "react";

// Package
import {useSelector} from "react-redux";

// Components
import {
	CheckoutSummary,
	Column,
	Instruction,
	ItemContainer,
	ItemList,
	ModalTitle,
	Name,
	Row,
} from "../CartStyle";
import {PrimaryButton} from "../../../components/buttons/buttons";
import {Horizontal} from "../../../components/elements/elements";

const CheckoutSummaryModal = ({
	totalPrice,
	subTotal,
	totalPriceAfterGratuity,
	goToOrder,
}) => {
	// Redux State
	const cart = useSelector((state) => state.cart.cart);

	return (
		<CheckoutSummary>
			<ModalTitle>Checkout Summary</ModalTitle>
			<p className="tex-sm font-medium">Items</p>
			<ItemList>
				{cart?.map((item, i) => (
					<ItemContainer
						key={i}
						style={{
							width: "100%",
							height: "auto",
							padding: "0.6rem",
							display: "flex",
							borderRadius: "0.4rem",
							marginButton: "0.6rem",
							justifyContent: "space-between",
						}}
					>
						<p className="tex-sm font-medium">{item.name}</p>
						<p className="tex-sm font-thin">{"$" + item.price}</p>
					</ItemContainer>
				))}
			</ItemList>

			<Row style={{justifyContent: "space-between"}}>
				<Column>
					<Name>Sub Price </Name>
					<Instruction>
						{"$ "}
						{subTotal}
					</Instruction>
				</Column>
				{/* <Column>
					<Name>Total Price </Name>
					<Instruction>
						{"$ "}
						{Number(totalPrice).toFixed(2)}
					</Instruction>
				</Column> */}
				<Column style={{width: "160px"}}>
					<Name style={{width: "100%"}}>Total Price </Name>
					<Instruction>
						{"$ "}
						{Number(totalPriceAfterGratuity).toFixed(2)}
					</Instruction>
				</Column>
			</Row>
			<Horizontal />
			<PrimaryButton onClick={goToOrder}>Go to Order</PrimaryButton>
		</CheckoutSummary>
	);
};

export default CheckoutSummaryModal;
