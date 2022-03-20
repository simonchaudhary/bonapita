import React, {useContext, useState, useEffect} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

import axios from "axios";

const onDragEnd = (result, columns, setColumns, orderId, callBack) => {
	if (!result.destination) return;

	console.log("onDragEnd");

	const {source, destination} = result;

	if (source.droppableId !== destination.droppableId) {
		const sourceColumn = columns[source.droppableId];
		const destColumn = columns[destination.droppableId];
		const sourceItems = [...sourceColumn.items];
		const destItems = [...destColumn.items];
		const [removed] = sourceItems.splice(source.index, 1);
		destItems.splice(destination.index, 0, removed);

		let newColumn = {
			...columns,
			[source.droppableId]: {
				...sourceColumn,
				items: sourceItems,
			},
			[destination.droppableId]: {
				...destColumn,
				items: destItems,
			},
		};
		// console.log("newcolumn", newColumn);
		console.log("Drag Item", result.draggableId);
		console.log(
			"Drag ItemStatus New",
			typeof Number(destination.droppableId)
		);
		let itemStatus = "";
		if (Number(destination.droppableId) === 0) {
			itemStatus = "new";
		} else if (Number(destination.droppableId) === 1) {
			itemStatus = "acknowledged";
		} else if (Number(destination.droppableId) === 2) {
			itemStatus = "beingPrepared";
		} else if (Number(destination.droppableId) === 3) {
			itemStatus = "ready";
		} else {
			console.log("no itemstatus");
		}
		updateItemStatus(itemStatus, result.draggableId, orderId, callBack);
		setColumns(newColumn);
	} else {
		const column = columns[source.droppableId];
		const copiedItems = [...column.items];
		const [removed] = copiedItems.splice(source.index, 1);
		copiedItems.splice(destination.index, 0, removed);
		let oldColumn = {
			...columns,
			[source.droppableId]: {
				...column,
				items: copiedItems,
			},
		};
		console.log("nochange column");
		setColumns(oldColumn);
	}
};

const updateStatus = async (newColumn, orderId, callBack) => {
	console.log("updateStatus", newColumn, orderId);

	for (let i = 0; i < 4; i++) {
		// console.log("itemstatus", newColumn[i].id);
		newColumn[i].items.map((item, j) => {
			// console.log(item.id);
			updateItemStatus(newColumn[i].id, item, orderId, callBack);
		});
	}
};

const updateItemStatus = (itemStatus, itemId, orderId, callBack) => {
	// console.log("updateitemstatus", itemStatus, item.id);

	const data = {
		itemStatus: itemStatus,
		id: itemId,
	};
	console.log("datadata", data, "order id", orderId);
	axios
		.put(
			"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
				orderId +
				"/update-item-status",
			data
		)
		.then((response) => {
			console.log("Update result", itemId, response.data.data.itemStatus);
			callBack();
		});
};

function BeautifulDND({columnsFromBackend, showHeader, orderId, callBack}) {
	const [columns, setColumns] = useState(columnsFromBackend);

	return (
		<div className="drag__row">
			<DragDropContext
				onDragEnd={(result) =>
					onDragEnd(result, columns, setColumns, orderId, callBack)
				}
			>
				{Object.entries(columns).map(([columnId, column], index) => {
					return (
						<div className="drag__container" key={columnId}>
							<div style={{padding: "0rem"}}>
								<Droppable droppableId={columnId} key={columnId}>
									{(provided, snapshot) => {
										return (
											<div
												{...provided.droppableProps}
												ref={provided.innerRef}
												className="drag__con"
												// className="drag__container"
												// style={{
												// 	borderRadius: "0.6rem",
												// 	transition: "500ms",
												// 	boxShadow:
												// 		snapshot.isDraggingOver
												// 			? "0px 0px 20px 5px rgba(214, 90, 49,0.3)"
												// 			: "none",
												// 	background: "red",
												// 	minWidth: "300px",
												// 	padding: "0.6rem",
												// 	overflowX: "hidden",
												// 	minHeight: "300px",
												// 	overflowY: "auto",
												// }}
											>
												{column.items.map((item, index) => {
													return (
														<Draggable
															key={item.id}
															draggableId={item.id}
															index={index}
														>
															{(provided, snapshot) => {
																return (
																	<div
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		className="drag__item"
																		style={{
																			userSelect: "none",
																			// padding: 16,
																			// margin: "0 0 0.6rem 0",
																			// borderRadius:
																			// 	"0.6rem",
																			// minHeight:
																			// 	"50px",
																			// boxShadow:
																			// 	snapshot.isDragging
																			// 		? "2px 2px 22px -4px rgba(0,0,0,0.38)"
																			// 		: "none",
																			// fontWeight:
																			// 	"400",
																			transition: "600ms",
																			backgroundColor:
																				column.name ===
																				"new"
																					? "#FF0000"
																					: column.name ===
																					  "acknowledged"
																					? "#ff8000"
																					: column.name ===
																					  "beingPrepared"
																					? "#bfff00"
																					: column.name ===
																					  "ready"
																					? "#63FF00"
																					: null,
																			color: "white",
																			...provided
																				.draggableProps
																				.style,
																			// fontSize: "0.75rem",
																		}}
																	>
																		{item.id
																			.split("___")[0]
																			.replaceAll("_", " ")}
																	</div>
																);
															}}
														</Draggable>
													);
												})}
												{provided.placeholder}
											</div>
										);
									}}
								</Droppable>
							</div>
						</div>
					);
				})}
			</DragDropContext>
		</div>
	);
}

export default BeautifulDND;
