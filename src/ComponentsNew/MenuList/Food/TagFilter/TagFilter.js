import { useState } from "react";
import { Tooltip } from "@varld/popover";
import styled, { css } from "styled-components";

function TagFilter({ item, selectedTag, onFilterSelect }) {
	return (
		<div onClick={() => onFilterSelect(item.name)}>
			{item.name === "all" ? (
				<TagFilterContainer
					style={{
						padding: "0.25rem",
						background: selectedTag === "all" ? "#212121" : "white",
						color: selectedTag === "all" ? "white" : "#212121",
					}}
				>
					All
				</TagFilterContainer>
			) : (
				<TagFilterContainer
					style={{
						background:
							selectedTag === item.name
								? selectedTag === "all"
									? "white"
									: selectedTag === "Spicy"
									? "red"
									: selectedTag === "Vegan"
									? "#22b483"
									: selectedTag === "Gluten free"
									? "yellow"
									: selectedTag === "Dairy free"
									? "grey"
									: selectedTag === "Veg"
									? "#1d7f29"
									: selectedTag === "Non-Veg"
									? "#8d272b"
									: null
								: "white",
					}}
				>
					<Tooltip content={item.name}>
						<img src={item.imageUrl} width="35px" />
					</Tooltip>
				</TagFilterContainer>
			)}
		</div>
	);
}

export const TagFilterContainer = styled.div`
	margin-right: 0.4rem;
	padding-bottom: 1px;
	border-radius: 0.2rem;
	font-size: 0.875rem;
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
	/* border: 0.5px solid #f1f1f1; */
	${(props) =>
		props.Spicy &&
		css`
			border: 1px solid red;
			color: red;
		`}

	${(props) =>
		props.Vegan &&
		css`
			border: 1px solid #22b483;
			color: #22b483;
		`}
	${(props) =>
		props.Gluten &&
		css`
			border: 1px solid blue;
			color: blue;
		`}
	${(props) =>
		props.Dairy &&
		css`
			border: 1px solid #286fde;
			color: #286fde;
		`}
	${(props) =>
		props.Veg &&
		css`
			border: 1px solid #1d7f29;
			color: #1d7f29;
		`}
	${(props) =>
		props.Nonveg &&
		css`
			border: 1px solid #8d272b;
			color: #8d272b;
		`}

		@media only screen and (max-width: 480px) {
		font-size: 0.625rem;
	}
`;

export default TagFilter;
