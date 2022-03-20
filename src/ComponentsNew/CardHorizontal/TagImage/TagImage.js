import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "@varld/popover";
import { MenuItem } from "@material-ui/core";

function TagImage({ item }) {
	// Redux State
	const provider = useSelector(
		(state) => state.menus?.provider?.data?.providerDetail?.tags
	);

	return (
		<TagImageContainer>
			<Tooltip content={item}>
				<img
					style={{ marginRight: "0.25rem" }}
					src={
						provider?.filter((menuItem) => menuItem.name === item)[0]
							.imageUrl
					}
					width="18px"
				/>
			</Tooltip>
		</TagImageContainer>
	);
}

const TagImageContainer = styled.div`
	width: 18px;
	height: 18px;
	display: flex;
	align-items: center;
	margin-right: 0.25rem;
`;

export default TagImage;
