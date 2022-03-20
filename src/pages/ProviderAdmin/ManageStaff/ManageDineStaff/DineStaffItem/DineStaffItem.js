import React, { memo } from "react";
import styled from "styled-components";

// Icons
import { IconButton } from "@material-ui/core";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

// Components
import { Title, Detail } from "../../../../../components/texts/texts";

const DineStaffItem = ({
	item,
	memoizedEditDineStaff,
	memoizedDeleteStaff,
}) => {
	console.log("DineStaffItem");

	return (
		<DineStaffItemContainer>
			<div style={{ width: "60%" }}>
				<Title>{item.firstName}</Title>
				<Detail>{item.lastName}</Detail>
			</div>

			<Buttons>
				<div onClick={() => memoizedEditDineStaff(item)}>
					<IconButton>
						<EditRoundedIcon />
					</IconButton>
				</div>
				<div onClick={() => memoizedDeleteStaff(item)}>
					<IconButton>
						<DeleteRoundedIcon />
					</IconButton>
				</div>
			</Buttons>
		</DineStaffItemContainer>
	);
};

const DineStaffItemContainer = styled.div`
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
export default memo(DineStaffItem);
