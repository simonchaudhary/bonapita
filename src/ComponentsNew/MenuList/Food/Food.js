import React, {useState} from "react";
// Package
import {useSelector, useDispatch} from "react-redux";

// Componets
import {
	FoodListContainer,
	Row,
	MenuHeader,
	TagRow,
	SubMenuContainer,
	SubMenuTitle,
	SubMenuItemList,
	FoodBody,
	LoadingContainer,
} from "./FoodStyle";
import CardHorizontal from "../../CardHorizontal/CardHorizontal";
import TagFilter from "./TagFilter/TagFilter";

// Others
// import { tagFilterList } from "../../../Assets/tagFilterList";

const Food = React.memo(({providerId, showAddButton, onAdd}) => {
	console.log("Food", providerId);

	// Redux
	const menus = useSelector((state) => state.menus.food);
	const provider = useSelector((state) => state.menus.provider);

	// Hook
	const [showSubmenuOrTagmenu, setShowSubmenuOrTagmenu] = useState("submenu");
	// const [selectedTag, setSelectedTag] = useState({
	// 	value: "submenu",
	// 	label: "Sub Menu",
	// });
	const [selectedTag, setSelectedTag] = useState("submenu");
	const [menuTagList, setMenuTagList] = useState(null);

	// Function
	const onFilterSelect = (item) => {
		console.log("onFilterSelect", item);
		let selectedTag = item;
		setSelectedTag(item);
		if (item === "all") {
			setShowSubmenuOrTagmenu("submenu");
		} else {
			if (selectedTag === "Spicy") {
				setMenuTagList(menus?.data?.tags["Spicy"]);
			} else if (selectedTag === "Vegan") {
				setMenuTagList(menus?.data?.tags["Vegan"]);
			} else if (selectedTag === "Gluten free") {
				setMenuTagList(menus?.data?.tags["Gluten free"]);
			} else if (selectedTag === "Dairy free") {
				setMenuTagList(menus?.data?.tags["Dairy free"]);
			} else if (selectedTag === "Veg") {
				setMenuTagList(menus?.data?.tags["Veg"]);
			} else if (selectedTag === "Non-Veg") {
				setMenuTagList(menus?.data?.tags["Non-Veg"]);
			}
			setShowSubmenuOrTagmenu("tagmenu");
		}
	};

	return (
		<FoodListContainer>
			<Row>
				<MenuHeader style={{width: "auto"}}>Foods</MenuHeader>
				<TagRow>
					{provider?.data?.providerDetail?.tags?.map((item, i) => (
						<TagFilter
							key={i}
							selectedTag={selectedTag}
							onFilterSelect={onFilterSelect}
							item={item}
						/>
					))}
				</TagRow>
			</Row>
			<FoodBody>
				{menus.loading ? (
					<LoadingContainer>Loading...</LoadingContainer>
				) : (
					<>
						<h5
							style={{
								marginLeft: "0.75rem",
								textTransform: "capitalize",
							}}
						>
							{selectedTag}
						</h5>
						{showSubmenuOrTagmenu === "submenu" ? (
							<>
								{menus?.data?.submenu?.map((item, i) => (
									<SubMenuContainer key={i}>
										<SubMenuTitle>{item.subMenu}</SubMenuTitle>
										<SubMenuItemList>
											{item.items.map((menuItem, i) => (
												<CardHorizontal
													key={i}
													item={menuItem}
													showAddButton={showAddButton}
													onAdd={onAdd}
												/>
											))}
										</SubMenuItemList>
									</SubMenuContainer>
								))}
							</>
						) : showSubmenuOrTagmenu === "tagmenu" ? (
							<>
								{menuTagList?.map((item, i) => (
									<div key={i}>
										{item.items.length === 0 ? null : (
											<>
												<SubMenuContainer key={i}>
													<SubMenuTitle>
														{item.subMenu}
													</SubMenuTitle>
													<SubMenuItemList>
														{item.items.map((menuItem, i) => (
															<CardHorizontal
																key={i}
																item={menuItem}
																showAddButton={showAddButton}
																onAdd={onAdd}
															/>
														))}
													</SubMenuItemList>
												</SubMenuContainer>
											</>
										)}
									</div>
								))}
							</>
						) : null}
					</>
				)}
			</FoodBody>
		</FoodListContainer>
	);
});

export default Food;
