// import React from "react";

// const PreplineManagerItem = ({ item }) => {
// 	return <div>{item.id}</div>;
// };

// export default PreplineManagerItem;

import React, { memo } from "react";
import styled from "styled-components";

// Icons
import { IconButton } from "@material-ui/core";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

// Components
import { Title, Detail } from "../../../../components/texts/texts";

const PreplineManagerItem = ({
	item,
	memoizedEditPreplineManager,
	memoizedDeletePreplineManager,
}) => {
	console.log("PreplineManagerItem");

	return (
		<PreplineManagerItemContainer>
			<div style={{ width: "60%" }}>
				<Title>{item.firstName}</Title>
				<Detail>{item.lastName}</Detail>
			</div>

			<Buttons>
				<div onClick={() => memoizedEditPreplineManager(item)}>
					<IconButton>
						<EditRoundedIcon />
					</IconButton>
				</div>
				<div onClick={() => memoizedDeletePreplineManager(item)}>
					<IconButton>
						<DeleteRoundedIcon />
					</IconButton>
				</div>
			</Buttons>
		</PreplineManagerItemContainer>
	);
};

const PreplineManagerItemContainer = styled.div`
	/* padding: 0.875rem; */
	padding-left: 0.875rem;
	border-radius: 0.25rem;
	background: #f5f5f5;
	margin-bottom: 0.75rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Buttons = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
export default memo(PreplineManagerItem);
