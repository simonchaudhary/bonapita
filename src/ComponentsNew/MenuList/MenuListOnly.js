import React, {useEffect, useState} from "react";
// Package
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import {Document, Page} from "react-pdf";
import {v4 as uuidv4} from "uuid";

// Icons
import {IconButton} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// Actions
import {
	fetchProvider,
	clearFoodAction,
	clearBeverageAction,
	addItemToCartAction,
} from "../../Redux/actions";

// Components
import {
	MenuListOnlyContainer,
	MenuHeader,
	MenuContainer,
	MenuTab,
	MenuTabItem,
	Menus,
	SimpleButton,
	FloatingCart,
	Row,
	Badge,
} from "./MenuListStyle";
import CardHorizontal from "../CardHorizontal/CardHorizontal";
import Food from "./Food/Food";
import Beverage from "./Beverage/Beverage";
import ToastBar from "../../components/ToastBar";

// Others
import {menuTabList} from "../../assets/menuTabList";

const MenuListOnly = React.memo(({providerId, addItemToOrder, isPaid}) => {
	console.log("MenuListOnly");

	// Initilize
	const history = useHistory();
	const dispatch = useDispatch();

	// UI
	const [showTabContent, setShowTabContent] = useState("food");

	const menuTab = (item) => {
		setShowTabContent(item);
	};

	const viewAllMenu = (item) => {
		history.push(`/menupdf/${providerId}/${item}`);
	};

	useEffect(() => {
		dispatch(fetchProvider(providerId));
	}, []);

	return (
		<MenuListOnlyContainer>
			<MenuContainer>
				<MenuTab>
					{menuTabList.map((item, i) => (
						<MenuTabItem
							key={i}
							style={{
								background:
									showTabContent === item.value ? "#f5f5f5" : null,
							}}
							key={i}
							onClick={() => menuTab(item.value)}
						>
							{item.label}
							<SimpleButton onClick={() => viewAllMenu(item.value)}>
								View all menu
							</SimpleButton>
						</MenuTabItem>
					))}
				</MenuTab>
				<div>
					{showTabContent === "food" ? (
						<Food
							providerId={providerId}
							showAddButton={!isPaid}
							onAdd={addItemToOrder}
						/>
					) : showTabContent === "beverage" ? (
						<Beverage
							providerId={providerId}
							showAddButton={!isPaid}
							onAdd={addItemToOrder}
						/>
					) : null}
				</div>
			</MenuContainer>
		</MenuListOnlyContainer>
	);
});

export default MenuListOnly;
