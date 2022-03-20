import {useState, useEffect} from "react";

// Icons
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import AddIcon from "@material-ui/icons/Add";

import {firestore} from "../../../../config/firebaseConfig";

import {OrderedItemContainer, Row} from "./OrderedItemStyle";

function OrderedItem(props) {
	const {
		orderId,
		item,
		addItem,
		serveItem,
		deleteItem,
		openSpecialInstructionModal,
		realTimeOrderStatus,
	} = props;

	const [realTimeItemStatus, setRealTimeItemStatus] = useState(null);

	useEffect(() => {
		// ItemStatus listener
		console.log("Current");
		firestore
			.collection("Orders")
			.doc(orderId)
			.collection("orderedItems")
			.doc(item.id)
			.onSnapshot((doc) => {
				console.log("Current Item statusdata: ", doc?.data());
				setRealTimeItemStatus(doc?.data()?.itemStatus);
			});
	}, [item]);

	return (
		<>
			{realTimeItemStatus === null ? (
				<OrderedItemContainer
					style={{
						background: "#f9f9f9",
						border: "1px solid #f1f1f1",
					}}
				>
					Loading
				</OrderedItemContainer>
			) : (
				<OrderedItemContainer
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
								  realTimeItemStatus === "pickup"
								? "grey"
								: null,
					}}
				>
					<p>{item.name ?? item.itemName}</p>

					{realTimeItemStatus === "ready" ? (
						<button
							className="mt-2 border border-white rounded-2xl px-2 py-1 text-xs font-medium bg-transparent hover:bg-white transition duration-500 ease-in-out"
							onClick={() => serveItem(item)}
						>
							Serve
						</button>
					) : realTimeItemStatus === "served" ? (
						<h5>Served</h5>
					) : null}

					{realTimeOrderStatus === "new" ||
					realTimeOrderStatus === "submit" ? (
						<Row style={{justifyContent: "flex-start"}}>
							<EditRoundedIcon
								onClick={() => openSpecialInstructionModal(item)}
							/>
							<DeleteRoundedIcon onClick={() => deleteItem(item)} />
							<AddIcon onClick={() => addItem(item)}></AddIcon>
						</Row>
					) : null}
				</OrderedItemContainer>
			)}
		</>
	);
}

export default OrderedItem;

// Main branch
// import { useState, useEffect } from "react";

// import axios from "axios";

// // Icons
// import { IconButton } from "@material-ui/core";
// import EditRoundedIcon from "@material-ui/icons/EditRounded";
// import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
// import DeleteIcon from "@material-ui/icons/Delete";
// import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
// import AddIcon from "@material-ui/icons/Add";

// import { firestore } from "../../../../config/firebaseConfig";

// import { OrderedItemContainer, Row } from "./OrderedItemStyle";
// import ToastBar from "../../../../components/ToastBar";

// function OrderedItem(props) {
// 	const { orderId, item, addItem } = props;

// 	const Toast = ToastBar();

// 	const [realTimeItemStatus, setRealTimeItemStatus] = useState("");

// 	useEffect(() => {
// 		// ItemStatus listener
// 		console.log("Current");
// 		firestore
// 			.collection("Orders")
// 			.doc(orderId)
// 			.collection("orderedItems")
// 			.doc(item.id)
// 			.onSnapshot((doc) => {
// 				console.log("Current Item statusdata: ", doc?.data());
// 				setRealTimeItemStatus(doc?.data()?.itemStatus);
// 			});
// 	}, []);

// 	return (
// 		<OrderedItemContainer
// 			style={{
// 				background:
// 					realTimeItemStatus === "new"
// 						? "#FF0000"
// 						: realTimeItemStatus === "acknowledged"
// 						? "#ff8000"
// 						: realTimeItemStatus === "beingPrepared"
// 						? "#bfff00"
// 						: realTimeItemStatus === "ready"
// 						? "#63FF00"
// 						: realTimeItemStatus === "served" ||
// 						  realTimeItemStatus === "pickup"
// 						? "grey"
// 						: null,
// 			}}
// 		>
// 			<p>{item.name}</p>
// 			<Row style={{ justifyContent: "flex-start" }}>
// 				{/* <EditRoundedIcon onClick={editOrderButton} />
// 				<DeleteRoundedIcon onClick={deleteItemButton} /> */}
// 				<AddIcon onClick={() => addItem(item)}></AddIcon>
// 			</Row>
// 		</OrderedItemContainer>
// 	);
// }

// export default OrderedItem;
