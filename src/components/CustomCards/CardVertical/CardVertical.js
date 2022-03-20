import React from "react";

// Icons
import { IconButton } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import image from "../../../assets/image.svg";

import {
	CardVerticalContainer,
	ImageContainer,
	Image,
	PriceTag,
	Row,
	TextContainer,
	AddButton,
	DeleteButton,
	AddToCart,
	Title,
	Detail,
	OutlineLabel,
} from "./CardVerticalStyle";
import { Vertical, Horizontal } from "../../elements/elements";

function CardVertical(props) {
	// const type = "order","cart","provider"

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
		<CardVerticalContainer>
			<ImageContainer
				onClick={() => (menuDetail === null ? null : menuDetail(item))}
			>
				<PriceTag>
					{"$ "} {item?.price}
				</PriceTag>
				{item?.imageUrl === "firebase storage url" ? (
					// <p>No Image</p>
					<Image src={image} />
				) : (
					<Image src={item?.imageUrl}></Image>
				)}
			</ImageContainer>
			<TextContainer>
				{type === "order" ||
				type === "provider" ||
				type === "revieworder" ? (
					<Title>{item?.name}</Title>
				) : (
					<Title>{item?.itemName}</Title>
				)}

				<Row style={{ justifyContent: "space-between" }}>
					{type === "order" ||
					type === "provider" ||
					type === "revieworder" ? (
						<Detail>{item?.description}</Detail>
					) : (
						<>
							<Detail>
								{item?.specialInstruction === "" ? (
									"Special Instruction"
								) : (
									<> {item?.specialInstruction}</>
								)}
							</Detail>
							<Vertical />
						</>
					)}
					{type === "cart" ? (
						<EditRoundedIcon onClick={() => editSpecial(item)} />
					) : null}
				</Row>
			</TextContainer>
			{type === "order" ? (
				<AddToCart onClick={() => addToCart(item)}>
					Add to Cart
				</AddToCart>
			) : type === "revieworder" ? (
				<AddToCart onClick={() => orderNow(item)}>Add</AddToCart>
			) : type === "cart" ? (
				<Row
					style={{
						justifyContent: "space-between",
					}}
				>
					<AddButton onClick={() => addItem(item)}>
						<AddRoundedIcon />
					</AddButton>
					<DeleteButton onClick={() => deleteItem(item)}>
						<DeleteRoundedIcon />
					</DeleteButton>
				</Row>
			) : type === "provider" ? (
				<Row style={{ justifyContent: "space-between" }}>
					<OutlineLabel unavailable={!item?.available}>
						{item?.available ? "Available" : "Unavailable"}
					</OutlineLabel>
					<IconButton
						style={{ color: "#e13f3f" }}
						onClick={() => deleteMenuItem(item)}
					>
						<DeleteRoundedIcon />
					</IconButton>
				</Row>
			) : null}
		</CardVerticalContainer>
	);
}

export default CardVertical;
