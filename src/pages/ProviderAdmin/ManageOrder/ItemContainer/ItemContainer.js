import React from "react";

// Components
import {
	Container,
	ItemContainerLeft,
	ItemContainerCenter,
	ItemContainerRight,
} from "./ItemContainerStyle";

const ItemContainer = ({ item, itemPickup }) => {
	console.log("ItemContainer", item);

	return (
		<Container>
			<ItemContainerLeft>
				<Title>{item.itemName ?? item.name}</Title>
			</ItemContainerLeft>
			<ItemContainerCenter style={{ width: "100px" }}>
				<Title>{item.tax}</Title>
			</ItemContainerCenter>
			<ItemContainerRight style={{ marginRight: "0.875rem" }}>
				<Title>
					{"$"} {item.price}
				</Title>
			</ItemContainerRight>
			{title === "Ready" ? (
				<>
					{selectedOrder?.channel === "Customer" ? (
						<>
							{item.itemStatus === "ready" ? (
								<button onClick={() => itemPickup(item)}>Pickup</button>
							) : null}
						</>
					) : null}
				</>
			) : null}
		</Container>
	);
};

export default ItemContainer;
