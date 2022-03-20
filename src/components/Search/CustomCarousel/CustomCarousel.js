import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Title } from "../../texts/texts";
import { Horizontal } from "../../elements/elements";

import {
	Container,
	ItemContainer,
	Name,
	ProviderName,
} from "./CustomCarouselStyle";

function CustomCarousel({ items, provider, itemSelect }) {
	console.log(items);

	if (items.length === 0) {
		return null;
	} else {
		return (
			<Container>
				<Title>{provider ? "Providers" : "Items"}</Title>
				{/* <Horizontal /> */}
				<Carousel
					removeArrowOnDeviceType={["mobile"]}
					responsive={responsive}
				>
					{items.map((item, i) => (
						<ItemContainer
							key={i}
							onClick={() => itemSelect(item, provider)}
						>
							<Name>{item?.name} </Name>
							{provider ? (
								<ProviderName>{item?.location}</ProviderName>
							) : (
								<>
									<ProviderName style={{ fontWeight: "600" }}>
										{item?.provider?.name}
									</ProviderName>
									<ProviderName>
										{item?.provider?.location}
									</ProviderName>
								</>
							)}
						</ItemContainer>
					))}
				</Carousel>
			</Container>
		);
	}
}

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
		slidesToSlide: 3, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 3,
		slidesToSlide: 2, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 2,
		slidesToSlide: 1, // optional, default to 1.
	},
};

export default CustomCarousel;
