import React from "react";
import CardHorizontal from "../../../components/CustomCards/CardHorizontal/CardHorizontal";
import {Title} from "../../../components/texts/texts";
// Components
import {ListContainer, RankDisplayContainer} from "./RankDisplayStyle";

function RankDisplay(props) {
	const {title, items, addItem, deleteItem, editSpecial} = props;

	return (
		<>
			{items?.length === 0 ? null : (
				<RankDisplayContainer>
					<Title className="text-center border-b pb-2">{title}</Title>

					<ListContainer>
						{items?.map((item, i) => (
							<>
								<CardHorizontal
									key={i}
									item={item}
									type="cart"
									addItem={addItem}
									deleteItem={deleteItem}
									editSpecial={editSpecial}
									addToCart={null}
									menuDetail={null}
									orderNow={null}
									deleteMenuItem={null}
								/>
							</>
						))}
					</ListContainer>
				</RankDisplayContainer>
			)}
		</>
	);
}

export default RankDisplay;
