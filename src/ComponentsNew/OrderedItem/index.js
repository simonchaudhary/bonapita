import React, {useEffect, useState} from "react";

// Custom Hook
import {
	useGetOrderedItem,
	useOrderDetail,
} from "../../Hooks/useOrderDetail/useOrderDetail";

// Components
import Item from "./Item";

const OrderedItem = ({orderId}) => {
	const {orderedItems} = useGetOrderedItem(orderId);

	return (
		<div>
			<p className="text-xs font-bold mb-2">Ordered item</p>
			<div className="flex flex-wrap">
				{orderedItems?.map((item, i) => (
					<Item key={i} item={item} />
				))}
			</div>
		</div>
	);
};

export default OrderedItem;
