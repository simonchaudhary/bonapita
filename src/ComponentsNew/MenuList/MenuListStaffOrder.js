import {useEffect, useState} from "react";
// Package
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import {Document, Page} from "react-pdf";
import {v4 as uuidv4} from "uuid";

// Icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {IconButton} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

// Actions
import {
	fetchProvider,
	clearFoodAction,
	clearBeverageAction,
	addItemToCartAction,
} from "../../Redux/actions";

// Components
import {
	MenuListStaffOrderContainer,
	MenuHeader,
	MenuContainer,
	MenusStaffOrder,
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

// Others
import {menuTabList} from "../../assets/menuTabList";

function MenuListStaffOrder({providerId, addItem, isPaid}) {
	console.log("MenuListStaffOrder");

	// Initilize
	const history = useHistory();
	const dispatch = useDispatch();

	// Redux
	const provider = useSelector((state) => state.menus.provider);
	const cart = useSelector((state) => state.cart.cart);

	// Hooks

	// UI
	const [tableAvailable, setTableAvailable] = useState(false);
	const [showTabContent, setShowTabContent] = useState("food");

	useEffect(() => {
		console.log("MenuListStaffOrder useEffect");
		dispatch(fetchProvider(providerId));
		// if (!provider?.data) {
		// 	dispatch(fetchProvider(providerId));
		// } else {
		// 	if (provider?.data?.providerDetail?.id != providerId) {
		// 		dispatch(fetchProvider(providerId));
		// 		dispatch(clearFoodAction());
		// 		dispatch(clearBeverageAction());
		// 	}
		// }
	}, []);

	const menuTab = (item) => {
		setShowTabContent(item);
	};

	const viewAllMenu = (item) => {
		history.push(`/${providerId}/${item}`);
	};

	// const addToCart = (item) => {
	// 	console.log("add to cart", item);
	// 	// const data = {
	// 	// 	guest: guestId,
	// 	// 	itemName: item.name,
	// 	// 	itemId: item.itemId,
	// 	// 	itemStatus: "new",
	// 	// 	prepLine: item.prepLine,
	// 	// 	price: item.price,
	// 	// 	specialInstruction: "here are some instructions",
	// 	// 	tax: item.tax,
	// 	// 	displayRank: item.displayRank,
	// 	// };
	// 	console.log("data", data);
	// 	axios
	// 		.post(
	// 			"https://us-central1-afoodie-6d649.cloudfunctions.net/dineIn/orders/" +
	// 				orderId +
	// 				"/item",
	// 			data
	// 		)
	// 		.then((response) => {
	// 			console.log("Response Order Item added", response);
	// 			Toast(item.name + " Ordered", "success");
	// 		})
	// 		.catch((error) => {
	// 			console.log("Error Order Item added", error);
	// 		});
	// };

	return (
		<MenuListStaffOrderContainer>
			<MenuContainer>
				{/* <MenuHeader>
					{provider?.loading ? (
						<h5>Loading...</h5>
					) : (
						<h6>
							Welcome to
							{" " +
								provider?.data?.providerDetail?.name +
								", " +
								provider?.data?.providerDetail?.location}
						</h6>
					)}

					<img height="60px" src={provider?.data?.pageInfo?.footerUrl} />
				</MenuHeader> */}
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
				<MenusStaffOrder>
					{/* if isPaid is false then done show add button */}
					{showTabContent === "food" ? (
						<Food
							providerId={providerId}
							showAddButton={!isPaid}
							onAdd={addItem}
						/>
					) : showTabContent === "beverage" ? (
						<Beverage
							providerId={providerId}
							showAddButton={!isPaid}
							onAdd={addItem}
						/>
					) : null}
				</MenusStaffOrder>
			</MenuContainer>
		</MenuListStaffOrderContainer>
	);
}

export default MenuListStaffOrder;
