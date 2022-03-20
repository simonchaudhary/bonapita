// Icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
// Others
import {menuTabList} from "../../assets/menuTabList";
import ToastBar from "../../components/ToastBar";
// Actions
import {
	addItemToCartAction,
	checkUserProviderForCart,
	fetchProvider,
} from "../../Redux/actions";
import Beverage from "./Beverage/Beverage";
import Food from "./Food/Food";
// Components
import {
	Badge,
	FloatingCart,
	MenuContainer,
	MenuListContainer,
	Menus,
	MenuTab,
	MenuTabItem,
	SimpleButton,
} from "./MenuListStyle";

const MenuList2 = ({
	providerId,
	areaId,
	sectionId,
	tableId,
	guestId,
	channel,
}) => {
	// Initilize
	const history = useHistory();
	const dispatch = useDispatch();
	const {Toast} = ToastBar();

	// Redux State
	const cart = useSelector((state) => state.cart.cart);
	const user = useSelector((state) => state?.user?.user);

	// UI
	const [tableAvailable, setTableAvailable] = useState(false);
	const [showTabContent, setShowTabContent] = useState("food");

	useEffect(() => {
		dispatch(fetchProvider(providerId));
		dispatch(checkUserProviderForCart(user?.uid, providerId));
	}, []);

	// UI Functions
	const menuTab = (item) => {
		setShowTabContent(item);
	};

	const viewAllMenu = (item) => {
		history.push(`/menupdf/${providerId}/${item}`);
	};

	// Functions
	const goCart = () => {
		if (channel === "Customer") {
			history.push(`/cart/${providerId}/${channel}`);
		} else if (channel === "QR code") {
			history.push(
				`/cartqr/${providerId}/${areaId}/${sectionId}/${tableId}/${guestId}/${channel}`
			);
		} else if (channel === "Dine In") {
			history.push(
				`/cart/${providerId}/${areaId}/${sectionId}/${tableId}/${guestId}/${channel}`
			);
		}
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

	return (
		<MenuListContainer>
			<FloatingCart onClick={goCart}>
				<ShoppingCartIcon />
				<Badge>{cart.length}</Badge>
			</FloatingCart>

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
				<Menus>
					{showTabContent === "food" ? (
						<Food
							providerId={providerId}
							showAddButton={true}
							onAdd={addToCart}
						/>
					) : showTabContent === "beverage" ? (
						<Beverage
							providerId={providerId}
							showAddButton={true}
							onAdd={addToCart}
						/>
					) : null}
				</Menus>
			</MenuContainer>
		</MenuListContainer>
	);
};

export default MenuList2;
