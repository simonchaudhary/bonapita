import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Icons
import { IconButton } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

// Functions
import { firestore } from "../../../../../config/firebaseConfig";
import { Title } from "../../../../../components/texts/texts";

const ItemContainer = React.memo(
	({
		menuitem,
		orderId,
		realTimeOrderStatus,
		editSpecial,
		addItem,
		deleteItem,
	}) => {
		// Hooks
		const [realTimeItemStatus, setRealTimeItemStatus] = useState(null);

		// UseEffect
		useEffect(() => {
			// ItemStatus listener
			console.log("CardHorizontalOrder Current");
			firestore
				.collection("Orders")
				.doc(orderId)
				.collection("orderedItems")
				.doc(menuitem.id)
				.onSnapshot((doc) => {
					console.log("Current data: ", doc?.data());
					setRealTimeItemStatus(doc?.data()?.itemStatus);
				});

			return () => {
				setRealTimeItemStatus(null);
			};
		}, [menuitem]);

		return (
			<Container
				style={{
					background:
						realTimeItemStatus === "new"
							? "#FF0000"
							: realTimeItemStatus === "acknowledged"
							? "#ff8000"
							: realTimeItemStatus === "beingPrepared"
							? "#bfff00"
							: realTimeItemStatus === "ready"
							? "#63FF00"
							: realTimeItemStatus === "served" ||
							  realTimeItemStatus === "picked up"
							? "grey"
							: "white",
				}}
			>
				<Row>
					<div>
						<Title>{menuitem.itemName}</Title>
					</div>
				</Row>
				{realTimeOrderStatus != "paid" ? (
					<div id="cart_button" style={{ marginTop: "0.25rem" }}>
						{realTimeItemStatus === "served" ||
						realTimeItemStatus === "picked up" ? (
							<p>Picked Up</p>
						) : realTimeItemStatus === "new" ? (
							<div
								style={{
									display: "flex",
									justifyContent: "flex-start",
								}}
							>
								<IconContainer onClick={() => editSpecial(menuitem)}>
									<EditRoundedIcon style={{ fontSize: "0.875rem" }} />
								</IconContainer>
								<IconContainer onClick={() => addItem(menuitem)}>
									<AddRoundedIcon style={{ fontSize: "0.875rem" }} />
								</IconContainer>
								<IconContainer onClick={() => deleteItem(menuitem)}>
									<DeleteRoundedIcon
										style={{ fontSize: "0.875rem" }}
									/>
								</IconContainer>
							</div>
						) : null}
					</div>
				) : null}
			</Container>
		);
	}
);

const Container = styled.div`
	width: 360px;
	min-height: auto;
	max-height: auto;
	border-left: 1px solid #f0f0f0;
	background: #fafafa;
	overflow: hidden;
	border-bottom: 1px solid #f0f0f0;
	margin-top: 0.25rem;
	margin-right: 0.6rem;
	margin-left: 0rem;
	padding: 0.6rem 0.75rem;
	border-radius: 0.2rem;
	@media only screen and (max-width: 480px) {
		width: 100%;
		margin-right: 0rem;
	}
`;

const Row = styled.div`
	display: flex;
	align-items: center;
`;

const IconContainer = styled.button`
	outline: none;
	border: none;
	background: #f1f1f1;
	border-radius: 0.2rem;
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
	color: #616161;
	margin-right: 0.6rem;
	padding: 0.3rem;
`;

export default ItemContainer;
