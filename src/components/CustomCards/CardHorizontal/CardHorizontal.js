import React from "react";

// Icons
import {IconButton} from "@material-ui/core";
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
import {Vertical, Horizontal} from "../../elements/elements";
import ToastBar from "../../ToastBar";

function CardHorizontal(props) {
	// const type = "order","cart","provider"

	const {Toast} = ToastBar();

	const {
		type,
		item,
		addItem,
		deleteItem,
		editSpecial,
		addToCart,
		menuDetail,
		orderNow,
		deleteMenuItem,
	} = props;

	return (
		<CardHorizontalContainer>
			<Column>
				<Row style={{justifyContent: "space-between"}}>
					<TextContainer>
						<Row>
							<>
								<Title>{item?.name}</Title>
							</>
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

						<div style={{justifyContent: "space-between"}}>
							{type === "order" ||
							type === "provider" ||
							type === "revieworder" ? (
								<Detail>{item?.description}</Detail>
							) : (
								<>
									<Detail>
										{item?.specialInstructions === "" ? (
											"Special Instruction"
										) : (
											<> {item?.specialInstructions}</>
										)}
									</Detail>
									<Vertical />
								</>
							)}
						</div>
					</TextContainer>
					<PriceTag>
						{"$ "} {Number(item?.price).toFixed(2)}
					</PriceTag>
				</Row>

				<div id="cart_button">
					{type === "order" ? (
						<OutlineLabel onClick={() => addToCart(item)}>
							Add to Cart
						</OutlineLabel>
					) : type === "revieworder" ? (
						<OutlineLabel onClick={() => orderNow(item)}>
							Add
						</OutlineLabel>
					) : type === "cart" ? (
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
					) : type === "provider" ? (
						<div style={{justifyContent: "space-between"}}>
							<div unavailable={!item?.available}>
								{item?.available ? "Available" : "Unavailable"}
							</div>
							<IconButton
								style={{color: "#e13f3f"}}
								onClick={() => deleteMenuItem(item)}
							>
								<DeleteRoundedIcon />
							</IconButton>
						</div>
					) : null}
				</div>
			</Column>
		</CardHorizontalContainer>
	);
}

export default CardHorizontal;
