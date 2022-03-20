import {useEffect, useState} from "react";
// Package
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import {Document, Page} from "react-pdf";
import {v4 as uuidv4} from "uuid";

// Icons
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

// Others
import {menuTabList} from "../../assets/menuTabList";

function MenuList() {
	console.log("MenuList");

	// Initilize
	const history = useHistory();
	const dispatch = useDispatch();

	// Redux
	const provider = useSelector((state) => state.menus.provider);
	const cart = useSelector((state) => state.cart.cart);

	// Router Params
	const {providerId} = useParams();
	const {areaId} = useParams();
	const {sectionId} = useParams();
	const {tableId} = useParams();
	const {guestId} = useParams();

	// Hooks
	const [providerIdS, setProviderIdS] = useState(
		providerId.substring(2, providerId.length)
	);
	const [areaIdS, setAreaIdS] = useState(areaId.substring(2, areaId.length));
	const [sectionIdS, setSectionIdS] = useState(
		sectionId.substring(2, sectionId.length)
	);
	const [tableIdS, setTableIdS] = useState(
		tableId.substring(2, tableId.length)
	);
	const [guestIdS, setGuestIdS] = useState(
		guestId.substring(2, guestId.length)
	);

	const [providerDetail, setProviderDetail] = useState(null);
	const [providerInfo, setProviderInfo] = useState(null);
	const [providerTags, setProviderTags] = useState(null);

	// UI
	const [tableAvailable, setTableAvailable] = useState(false);
	const [showTabContent, setShowTabContent] = useState("food");

	useEffect(() => {
		console.log("MenuList", providerId, areaId, sectionId, tableId, guestId);
	}, []);

	useEffect(() => {
		dispatch(fetchProvider(providerIdS));
		// if (!provider?.data) {
		// } else {
		// 	if (provider?.data?.providerDetail?.id != providerIdS) {
		// 		dispatch(fetchProvider(providerIdS));
		// 		dispatch(clearFoodAction());
		// 		dispatch(clearBeverageAction());
		// 	}
		// }
	}, []);

	useEffect(() => {
		checkTableAvailable();
	}, []);

	// Functions
	const checkTableAvailable = () => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/dining/tables/" +
					tableIdS +
					"/available?providerId=" +
					providerIdS +
					"&areaId=" +
					areaIdS +
					"&sectionId=" +
					sectionIdS
			)
			.then((response) => {
				console.log("Response CheckTableAvailable", response);
				if (response.data.success) {
					if (response.data.data.tableAvailable) {
						setTableAvailable(true);
					} else if (!response.data.data.tableAvailable) {
						setTableAvailable(false);
					}
				}
			})
			.catch((error) => {
				console.log(
					"Error CheckTableAvailable",
					error?.response?.data?.data
				);
				alert(error?.response?.data?.data);
			});
	};

	const menuTab = (item) => {
		setShowTabContent(item);
	};

	const viewAllMenu = (item) => {
		history.push(`/${providerIdS}/${item}`);
	};

	const goCart = () => {
		let providerIds = providerId.substring(2, providerId.length);
		history.push(`/cart/${providerIds}/QR code`);
	};

	const onAdd = (item) => {
		console.log("add to cart");
		const data = {
			...item,
			uuid: uuidv4(),
			itemStatus: "new",
			itemName: item.name,
		};
		console.log("item", data);
		dispatch(addItemToCartAction(data));
	};

	return (
		<MenuListContainer>
			{/* {tableAvailable ? (
				<FloatingCart onClick={goCart}>
					<Row>
						<ShoppingCartIcon />
						<Badge>{cart.length}</Badge>
					</Row>
				</FloatingCart>
			) : null} */}

			<MenuContainer>
				<MenuHeader>
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
							showAddButton={false}
							onAdd={onAdd}
						/>
					) : showTabContent === "beverage" ? (
						<Beverage
							providerId={providerIdS}
							showAddButton={false}
							onAdd={onAdd}
						/>
					) : null}
				</Menus>
			</MenuContainer>
		</MenuListContainer>
	);
}

export default MenuList;
