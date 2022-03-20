import {useEffect, useState} from "react";
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
	checkUserProviderForCart,
} from "../../Redux/actions";

// Components
import {
	MenuListContainer,
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

function MenuListCustomer() {
	console.log("MenuList");

	// Initilize
	const history = useHistory();
	const dispatch = useDispatch();
	const {Toast} = ToastBar();

	// Redux
	const provider = useSelector((state) => state.menus.provider);
	const cart = useSelector((state) => state.cart.cart);
	const user = useSelector((state) => state?.user?.user);

	// Router Params
	const {providerId} = useParams();

	// Hooks
	const [providerIdS, setProviderIdS] = useState(
		providerId.substring(2, providerId.length)
	);

	// UI
	const [tableAvailable, setTableAvailable] = useState(false);
	const [showTabContent, setShowTabContent] = useState("food");

	useEffect(() => {
		console.log("MenuList", providerId);
	}, []);

	useEffect(() => {
		dispatch(fetchProvider(providerIdS));
		dispatch(checkUserProviderForCart(user?.uid, providerIdS));
		// if (!provider?.data) {
		// } else {
		// 	if (provider?.data?.providerDetail?.id != providerIdS) {
		// 		dispatch(fetchProvider(providerIdS));
		// 		dispatch(clearFoodAction());
		// 		dispatch(clearBeverageAction());
		// 	}
		// }
		// dispatch(checkUserProviderForCart(user?.uid, providerIdS));
	}, []);

	const menuTab = (item) => {
		setShowTabContent(item);
	};

	const viewAllMenu = (item) => {
		history.push(`/menupdf/${providerIdS}/${item}`);
	};

	const goCart = () => {
		let providerIds = providerId.substring(2, providerId.length);
		history.push(`/cart/${providerIds}/Customer`);
	};

	const addToCart = (item) => {
		console.log("add to cart");
		const data = {
			...item,
			uuid: uuidv4(),
			itemStatus: "new",
			itemName: item.name,
		};
		console.log("item", data);
		dispatch(addItemToCartAction(data));
		Toast(item.name + " Added", "success");
	};

	const goBack = () => {
		history.goBack();
	};

	return (
		<MenuListContainer>
			<FloatingCart onClick={goCart}>
				{/* <Row> */}
				<ShoppingCartIcon />
				<Badge>{cart.length}</Badge>
				{/* </Row> */}
			</FloatingCart>

			<MenuContainer>
				<MenuHeader>
					<div style={{display: "flex", alignItems: "center"}}>
						<div onClick={goBack}>
							<IconButton>
								<ArrowBackIosIcon />
							</IconButton>
						</div>
						{provider?.loading ? (
							<h5>Loading...</h5>
						) : (
							<h5>
								Welcome to
								{" " +
									provider?.data?.providerDetail?.name +
									", " +
									provider?.data?.providerDetail?.location}
							</h5>
						)}
					</div>

					<img
						height="60"
						width="60"
						src={provider?.data?.pageInfo?.footerUrl}
					/>
				</MenuHeader>
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
				<Menus>
					{showTabContent === "food" ? (
						<Food
							providerId={providerIdS}
							showAddButton={true}
							onAdd={addToCart}
						/>
					) : showTabContent === "beverage" ? (
						<Beverage
							providerId={providerIdS}
							showAddButton={true}
							onAdd={addToCart}
						/>
					) : null}
				</Menus>
			</MenuContainer>
		</MenuListContainer>
	);
}

export default MenuListCustomer;
