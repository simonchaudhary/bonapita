import React from "react";
import {SecondaryButton} from "../../../../components/buttons/buttons";

const DineInContainer = ({order, viewOrder, guest}) => {
	// Booleans
	const hasOrder = order?.length > 0; // has order

	return (
		<div>
			{hasOrder ? (
				<SecondaryButton onClick={() => viewOrder(guest)}>
					View Order
				</SecondaryButton>
			) : null}
		</div>
	);
};

export default DineInContainer;
