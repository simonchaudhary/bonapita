// Comoponents
import {
	CardHorizontalContainer,
	TextContainer,
	Row,
	Column,
	Title,
	Detail,
	PriceTag,
	AddToCart,
} from "./CardHorizontalStyle";
import TagImage from "./TagImage/TagImage";

function CardHorizontal(props) {
	const {item, showAddButton, onAdd} = props;

	return (
		<CardHorizontalContainer>
			<Column>
				<Row style={{justifyContent: "space-between"}}>
					<TextContainer>
						<Row>
							<Title style={{marginRight: "0.4rem"}}>{item?.name}</Title>
							{item?.tags?.map((item, i) => (
								<div key={i}>
									<TagImage item={item} />
								</div>
							))}
						</Row>
						<Detail style={{color: "orange"}}>{item?.prepLine}</Detail>
						<div style={{justifyContent: "space-between"}}>
							<Detail>{item?.description}</Detail>
						</div>
					</TextContainer>
					<PriceTag>
						{"$ "} {Number(item?.price).toFixed(2)}
					</PriceTag>
				</Row>
				<div>
					{showAddButton ? (
						<AddToCart onClick={() => onAdd(item)}>Add</AddToCart>
					) : null}
				</div>
			</Column>
		</CardHorizontalContainer>
	);
}

export default CardHorizontal;
