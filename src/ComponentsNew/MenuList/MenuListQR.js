import {useEffect, useState} from "react";
// Package
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import {Document, Page} from "react-pdf";
import {v4 as uuidv4} from "uuid";

// Functions
import {auth, firestore} from "../../config/firebaseConfig";

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
	saveUser,
	removeEmailForSignInAction,
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

function MenuListQR() {
	console.log("MenuList");

	// Initilize
	const history = useHistory();
	const dispatch = useDispatch();
	const {Toast} = ToastBar();

	// Redux
	const provider = useSelector((state) => state.menus.provider);
	const cart = useSelector((state) => state.cart.cart);
	const user = useSelector((state) => state?.user?.user);
	const other = useSelector((state) => state.other);

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
		// alert("hello");
		let providerIds = providerId.substring(2, providerId.length);
		// alert(providerIds + areaIdS + sectionIdS + tableIdS + guestIdS);
		history.push(
			`/cartqr/${providerIds}/${areaIdS}/${sectionIdS}/${tableIdS}/${guestIdS}/QR code`
		);
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

	useEffect(() => {
		console.log("useeffect email", other.emailForSignIn);
		if (other.emailForSignIn) {
			signIn();
		}
	}, []);

	const signIn = () => {
		// Confirm the link is a sign-in with email link.
		console.log("signIn", other.emailForSignIn);
		if (auth.isSignInWithEmailLink(window.location.href)) {
			// var email = window.localStorage.getItem("emailForSignIn");
			var email = "";

			if (!other?.emailForSignIn) {
				email = window.prompt("Please provide your email for confirmation");
			}
			// The client SDK will parse the code from the link for you.
			auth
				.signInWithEmailLink(other?.emailForSignIn, window.location.href)
				.then((result) => {
					// window.localStorage.removeItem("emailForSignIn");

					// setEmailForSignIn(null);
					console.log("Result", result);

					if (result.additionalUserInfo.isNewUser) {
						let data = {
							email: result.user.email,
							emailVerified: result.user.emailVerified,
							uid: result.user.uid,
							createdDate: Date().toLocaleString(),
							firstName: "",
							lastName: "",
							userType: "Customer",
						};

						// save to firestore
						firestore
							.collection("users")
							.doc(result.user.uid)
							.set(data)
							.then((cred) => {
								console.log("save to firebase");
								// Toast("User save to Firestore", "success");
								window.localStorage.removeItem("emailForSignIn");
								dispatch(removeEmailForSignInAction());

								// dispatch(loggedStatus(true));
								// let providerId = QR.qrDetail.providerId;
								// openOrderpage(data);
								dispatch(saveUser(data));
								Toast("Email is Verified", "success");
							})
							.catch((err) => {
								console.log("firestore errorss " + err);
							});
					} else {
						// Customer
						firestore
							.collection("users")
							.doc(result.user.uid)
							.get()
							.then((res) => {
								// console.log("Response data exists", res);
								if (res.exists) {
									console.log("Customer Data");
									// openOrderpage(res.data());
									dispatch(saveUser(res.data()));
									dispatch(removeEmailForSignInAction());
									Toast("Email is Verified", "success");
								}
							})
							.catch((err) => {
								console.log("Error", err);
							});
					}
				})
				.catch((error) => {
					console.log("Error signInWithEmailLink", error);
				});
		}
	};

	return (
		<>
			{other?.emailForSignIn ? (
				<div className="w-screen h-screen bg-white flex items-center justify-center">
					<h4 style={{color: "white"}}>Please wait authenticating</h4>
				</div>
			) : null}

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
		</>
	);
}

export default MenuListQR;
