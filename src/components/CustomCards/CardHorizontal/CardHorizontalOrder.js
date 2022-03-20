import React, { useState, useEffect } from "react";
import { auth, firestore, provider } from "../../../config/firebaseConfig";

// Icons
import { IconButton } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import image from "../../../assets/image.svg";

import {
	CardHorizontalContainer,
	TextContainer,
	Row,
	Column,
	Title,
	Detail,
	PriceTag,
	FilterBorder,
	OutlineLabel,
	IconContainer,
} from "./CardHorizontalStyle";
import { Vertical, Horizontal } from "../../elements/elements";

function CardHorizontalOrder(props) {
	// const type = "order","cart","provider"

	const { item, orderedId, addItem, deleteItem, editSpecial } = props;
	console.log("CardHorizontal Order ", item, orderedId);

	const [realTimeItemStatus, setRealTimeItemStatus] = useState(null);
	useEffect(() => {
		// ItemStatus listener
		console.log("CardHorizontalOrder Current");
		firestore
			.collection("Orders")
			.doc(orderedId)
			.collection("orderedItems")
			.doc(item.id)
			.onSnapshot((doc) => {
				console.log("Current data: ", doc?.data());
				setRealTimeItemStatus(doc?.data()?.itemStatus);
			});

		return () => {
			setRealTimeItemStatus(null);
		};
	}, [item]);

	return (
		<>
			{item === null ? (
				<p>loading</p>
			) : (
				<CardHorizontalContainer
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
					<Column>
						<Row style={{ justifyContent: "space-between" }}>
							<TextContainer>
								<Row>
									<Title style={{ color: "black" }}>
										{item?.itemName}
									</Title>

									<Vertical />
									<>
										{item?.tags?.map((item, i) => (
											<>
												{item === "spicy" ? (
													<FilterBorder spicy>S</FilterBorder>
												) : item === "vegan" ? (
													<FilterBorder vegan>V</FilterBorder>
												) : item === "gluten free" ? (
													<FilterBorder gluten>G</FilterBorder>
												) : item === "protein" ? (
													<FilterBorder spicy>P</FilterBorder>
												) : null}
											</>
										))}
									</>
								</Row>

								<div style={{ justifyContent: "space-between" }}>
									<Detail style={{ color: "black" }}>
										{item?.specialInstruction === "" ? (
											"Special Instruction"
										) : (
											<> {item?.specialInstruction}</>
										)}
									</Detail>
									<Vertical />
								</div>
							</TextContainer>
							<PriceTag style={{ color: "black" }}>
								{"$ "} {item?.price}
							</PriceTag>
						</Row>

						<div id="cart_button">
							{realTimeItemStatus === "served" ||
							realTimeItemStatus === "picked up" ? (
								<p>Picked Up</p>
							) : realTimeItemStatus === "new" ? (
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<IconContainer onClick={() => editSpecial(item)}>
										<EditRoundedIcon />
									</IconContainer>
									<IconContainer onClick={() => addItem(item)}>
										<AddRoundedIcon />
									</IconContainer>
									<IconContainer onClick={() => deleteItem(item)}>
										<DeleteRoundedIcon />
									</IconContainer>
								</div>
							) : null}
						</div>
					</Column>
				</CardHorizontalContainer>
			)}
		</>
	);
}

export default CardHorizontalOrder;
