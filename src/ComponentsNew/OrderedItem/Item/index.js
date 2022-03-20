import React from "react";

// Icons
import {IconButton} from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const Item = ({item}) => {
	return (
		<div
			style={{
				background:
					item?.itemStatus === "new"
						? "#FF0000"
						: item?.itemStatus === "acknowledged"
						? "#ff8000"
						: item?.itemStatus === "beingPrepared"
						? "#bfff00"
						: item?.itemStatus === "ready"
						? "#63FF00"
						: item?.itemStatus === "served" ||
						  item?.itemStatus === "picked up"
						? "grey"
						: "white",
			}}
			className=" w-full md:w-1/4 p-2 rounded-md mr-2 mb-2"
		>
			<p className="text-xs font-medium">{item.itemName}</p>
			<div className="flex justify-end items-center">
				<div>
					<IconButton>
						<EditRoundedIcon />
					</IconButton>
				</div>
				<div>
					<IconButton>
						<AddRoundedIcon />
					</IconButton>
				</div>
				<div>
					<IconButton>
						<DeleteRoundedIcon />
					</IconButton>
				</div>
			</div>
		</div>
	);
};

export default Item;
