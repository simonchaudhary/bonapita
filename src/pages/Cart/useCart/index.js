import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
// Package
import {useHistory, useParams} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
// API
import {
	createCustomerOrder,
	createDineInOrder,
	createQROrder,
} from "../../../apis/Orders";
// Components
import ToastBar from "../../../components/ToastBar";
// Functions
import {onStripePayment} from "../../../functions/Stripe";
// Custom Hooks
import {useProviderDetail} from "../../../Hooks/useProvider/useProvider";
// Actions
import {
	addItemToCartAction,
	addSpecialInstructionToItemAction,
	emptyCartAction,
	removeItemToCartAction,
} from "../../../Redux/actions";

const useCart = () => {
	// Initilization
	const {Toast} = ToastBar();
	const dispatch = useDispatch();
	const history = useHistory();

	// Params
	const {providerId, channel} = useParams();
	const {areaId, sectionId, tableId, guestId} = useParams();

	// Redux State
	const user = useSelector((state) => state.user.user);
	const cart = useSelector((state) => state.cart.cart);
	const QR = useSelector((state) => state.QR);

	// Hooks
	const [menuListByTag, setMenuListByTag] = useState(null);
	const [displayRankCart, setDisplayRankCart] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const [orderId, setOrderId] = useState(null);

	// Custome Hook
	const {providerDetail} = useProviderDetail(providerId);

	// Gratuity
	const [gratuity, setGratuity] = useState(15);
	const [gratuityError, setgratuityError] = useState("");
	const [isGratuityPositive, setIsGratuityPositive] = useState(true);
	const [totalPriceAfterGratuity, setTotalPriceAfterGratuity] = useState(0);
	const gratuityFocus = () => {
		setgratuityError("");
	};

	// Price
	const [totalPrice, setTotalPrice] = useState(0);
	const [subTotal, setSubTotal] = useState(0);

	// UI Hooks
	const [selectedTag, setSelectedTag] = useState("all");
	const [selectedMenuListByTag, setSelectedMenuListByTag] = useState(null);
	const [showSubmenuOrTagmenu, setShowSubmenuOrTagmenu] = useState("all");
	const [cartController, setCartController] = useState(false);
	const [stripePayLoading, setStripePayLoading] = useState(false);

	// Modal
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [whichModal, setWhichModal] = useState("specialInstructionModal");
	const [isLoading, setIsLoading] = useState(false);

	// useEffect
	useEffect(() => {
		displayByRank();
	}, [cartController]);

	useEffect(() => {
		let subTotal = 0;
		let totalTaxAmount = 0;
		cart?.map((item, i) => {
			subTotal = Number(item.price) + subTotal;
			let tax = 0;
			if (!item?.tax) {
				tax = 0;
			} else {
				tax = item?.tax?.replace("%", "");
			}
			let taxAmount = Number(item.price) * (Number(tax) / 100);
			totalTaxAmount = taxAmount + totalTaxAmount;
		});
		setSubTotal(subTotal);
		setTotalPrice(subTotal + totalTaxAmount);
	});

	// Gratuit
	useEffect(() => {
		let total = Number(totalPrice) + (Number(gratuity) / 100) * subTotal;
		setTotalPriceAfterGratuity(total);
	}, [gratuity]);

	// Functions
	const onFilterSelect = (item) => {
		console.log("onFilterSelect", item, menuListByTag);
		let selectedTag = item;
		setSelectedTag(item);
		if (item === "all") {
			setShowSubmenuOrTagmenu("all");
		} else {
			if (selectedTag === "Spicy") {
				setSelectedMenuListByTag(menuListByTag?.Spicy);
			} else if (selectedTag === "Vegan") {
				setSelectedMenuListByTag(menuListByTag?.Vegan);
			} else if (selectedTag === "Gluten free") {
				setSelectedMenuListByTag(menuListByTag?.["Gluten free"]);
			} else if (selectedTag === "Dairy free") {
				setSelectedMenuListByTag(menuListByTag?.["Dairy free"]);
			} else if (selectedTag === "Veg") {
				setSelectedMenuListByTag(menuListByTag?.Veg);
			} else if (selectedTag === "Non-Veg") {
				setSelectedMenuListByTag(menuListByTag?.["Non-Veg"]);
			}
			setShowSubmenuOrTagmenu("tagmenu");
		}
	};

	const displayByRank = () => {
		let cartList = cart;

		let vegAppetizers = [];
		let nonVegAppetizers = [];
		let soupAndSalad = [];
		let preFixedMealDineOnly = [];
		let vegetarianDelicacies = [];
		let chickenDelicacies = [];
		let lambDelicacies = [];
		let seaFoodDelicacies = [];
		let tandooriSizzlers = [];
		let riceVarieties = [];
		let naanVarieties = [];
		let desserts = [];
		let sides = [];
		let otherList = [];

		cartList.map((item, i) => {
			if (item.displayRank === 1) {
				vegAppetizers.push(item);
			} else if (item.displayRank === 2) {
				nonVegAppetizers.push(item);
			} else if (item.displayRank === 3) {
				soupAndSalad.push(item);
			} else if (item.displayRank === 4) {
				preFixedMealDineOnly.push(item);
			} else if (item.displayRank === 5) {
				vegetarianDelicacies.push(item);
			} else if (item.displayRank === 6) {
				chickenDelicacies.push(item);
			} else if (item.displayRank === 7) {
				lambDelicacies.push(item);
			} else if (item.displayRank === 8) {
				seaFoodDelicacies.push(item);
			} else if (item.displayRank === 9) {
				tandooriSizzlers.push(item);
			} else if (item.displayRank === 10) {
				riceVarieties.push(item);
			} else if (item.displayRank === 11) {
				naanVarieties.push(item);
			} else if (item.displayRank === 12) {
				desserts.push(item);
			} else if (item.displayRank === 13) {
				sides.push(item);
			} else {
				otherList.push(item);
			}
		});
		let data = [
			{
				subMenu: "Veg appetizers",
				items: vegAppetizers,
			},
			{
				subMenu: "Non-veg appetizers",
				items: nonVegAppetizers,
			},
			{
				subMenu: "Soup and salad",
				items: soupAndSalad,
			},
			{
				subMenu: "Pre-fixed meal (dine-in only)",
				items: preFixedMealDineOnly,
			},
			{
				subMenu: "Vegetarian delicacies",
				items: vegetarianDelicacies,
			},
			{
				subMenu: "Chicken delicacies",
				items: chickenDelicacies,
			},
			{
				subMenu: "Lamb delicacies",
				items: lambDelicacies,
			},
			{
				subMenu: "Seafood delicacies",
				items: seaFoodDelicacies,
			},
			{
				subMenu: "Tandoori sizzlers",
				items: tandooriSizzlers,
			},
			{
				subMenu: "Rice varieties",
				items: riceVarieties,
			},
			{
				subMenu: "Naan varieties",
				items: naanVarieties,
			},
			{
				subMenu: "Desserts",
				items: desserts,
			},
			{
				subMenu: "Sides",
				items: sides,
			},
			{
				subMenu: "Other",
				items: otherList,
			},
		];
		console.log("Data", data);
		setDisplayRankCart(data);
		filterByTag(cartList);
	};

	const filterByTag = (allItems) => {
		let tagItems = allItems.reduce((accumulator, currentValue) => {
			let tags = currentValue.tags;
			if (tags) {
				tags.forEach((tag) => {
					let subMenu = currentValue.sub_menu;
					if (accumulator.hasOwnProperty(tag)) {
						let list = accumulator[tag];
						let element = list.find((value) => value.subMenu === subMenu);
						if (element) {
							element.items.push(currentValue);
						} else {
							let json = {
								subMenu: subMenu,
								items: [currentValue],
							};
							list.push(json);
						}
					} else {
						let json = {
							subMenu: subMenu,
							items: [currentValue],
						};
						accumulator[tag] = [json];
					}
				});
			}
			return accumulator;
		}, {});
		console.log("ashish data new", tagItems);
		setMenuListByTag(tagItems);
	};

	// Item Function
	const addItem = (item) => {
		let data = {
			...item,
			uuid: uuidv4(),
		};
		console.log("Add item", data);
		dispatch(addItemToCartAction(data));
		setCartController((prevState) => !prevState);
		Toast(`${item.itemName ?? item.name} Added`, "success");
	};

	const deleteItem = (item) => {
		dispatch(removeItemToCartAction(item));
		setCartController((prevState) => !prevState);
		Toast(`${item.itemName ?? item.name} Added`, "success");
	};

	const editSpecial = (item) => {
		console.log("edit Special ", item);
		setWhichModal("specialInstructionModal");
		setSelectedItem(item);
		setIsOpenModal((prevState) => !prevState);
	};

	// Special Instruction
	const addSpecialInstruction = (specialInstruction) => {
		console.log("specialInstruction", selectedItem, specialInstruction);

		const data = {
			specialInstruction: specialInstruction,
			item: selectedItem,
		};
		dispatch(addSpecialInstructionToItemAction(data));
		setIsOpenModal((prevState) => !prevState);
		setCartController((prevState) => !prevState);
	};

	// Modal Function
	const closeModal = () => {
		setIsOpenModal((prevState) => !prevState);
	};

	const goToOrder = () => {
		// console.log("Go to Order", providerId, orderId);
		dispatch(emptyCartAction());
		if (channel === "Customer") {
			history.replace(`/searchorder/${providerId}/${orderId}/Customer`);
		} else if (channel === "QR code") {
			history.replace(`/searchorder/${providerId}/${orderId}/QR code`);
		} else if (channel === "Dine In") {
			history.replace(
				`/dineorderpage/${orderId}/${areaId}/${sectionId}/${tableId}/${guestId}/Dine In`
			);
		}
	};

	// Gratuity
	const addGratuity = () => {
		setWhichModal("gratuityModal");
		setGratuity(15);
		let total = Number(totalPrice) + (Number(gratuity) / 100) * subTotal;
		setTotalPriceAfterGratuity(total);
		setIsOpenModal((prevState) => !prevState);
	};

	const gratuityOnChange = (e) => {
		if (e.target.value <= -1) {
			setgratuityError("Enter positive number");
			setIsGratuityPositive(false);
			// setGratuity(e.target.value);
		} else if (e.target.value === "") {
			setgratuityError("Gratuity cant be empty");
			setIsGratuityPositive(true);
			// setGratuity(15);
		} else {
			setgratuityError("");
			setIsGratuityPositive(true);
			setGratuity(e.target.value);
		}
	};

	const handleToken = (token) => {
		console.log(
			"handleToken",
			token,
			Number(subTotal).toFixed(2),
			Number(totalPriceAfterGratuity).toFixed(2)
		);
		setIsOpenModal(false);
		setStripePayLoading(true);

		if (channel === "Customer") {
			createCustomerOrder(user, providerId, cart)
				.then((res) => {
					console.log("Response create customerorder", res);
					let orderId = res.data.data.id;
					setOrderId(orderId);
					// stripePayment(orderId, token);
					onStripePayment(
						token,
						totalPriceAfterGratuity,
						orderId,
						providerId,
						user,
						Toast,
						setIsOpenModal,
						setStripePayLoading,
						dispatch,
						setWhichModal
					);
				})
				.catch((err) => {
					console.log("Error create customerorder", err);
					setStripePayLoading(false);
				});
		} else if (channel === "QR code") {
			let props = {
				user,
				providerId,
				cart,
				areaId,
				sectionId,
				tableId,
				QR,
				providerDetail,
			};
			createQROrder(props)
				.then((res) => {
					console.log("Response create qrorder", res);
					let orderId = res.data.data.id;
					setOrderId(orderId);
					// stripePayment(orderId, token);
					onStripePayment(
						token,
						totalPriceAfterGratuity,
						orderId,
						providerId,
						user,
						Toast,
						setIsOpenModal,
						setStripePayLoading,
						dispatch,
						setWhichModal
					);
				})
				.catch((err) => {
					console.log("Error create qrorder", err);
					setStripePayLoading(false);
				});
		} else if (channel === "Dine In") {
			let props = {
				user,
				providerId,
				cart,
				areaId,
				sectionId,
				tableId,
				guestId,
				providerDetail,
			};
			createDineInOrder(props)
				.then((res) => {
					console.log("Response create dineorder", res);
					let orderId = res.data.data.id;
					setOrderId(orderId);
					// stripePayment(orderId, token);
					onStripePayment(
						token,
						totalPriceAfterGratuity,
						orderId,
						providerId,
						user,
						Toast,
						setIsOpenModal,
						setStripePayLoading,
						dispatch,
						setWhichModal
					);
				})
				.catch((err) => {
					console.log("Error create dineorder", err);
					setStripePayLoading(false);
				});
		}
	};

	// Create Order
	const createOrder = () => {
		setIsLoading(true);
		if (channel === "Customer") {
			createCustomerOrder(user, providerId, cart)
				.then((res) => {
					console.log("Response create customerorder", res);
					Toast("Customer Order Created", "success");
					setWhichModal("checkoutSummaryModal");
					setIsOpenModal(true);
					setIsLoading(false);
					setOrderId(res.data.data.id);
				})
				.catch((err) => {
					console.log("Error create customerorder", err);
					Toast(`${err?.response} ?? Failed to create order`, "error");
					setIsLoading(false);
				});
		} else if (channel === "QR code") {
			let props = {
				user,
				providerId,
				cart,
				areaId,
				sectionId,
				tableId,
				QR,
				providerDetail,
			};
			createQROrder(props)
				.then((res) => {
					console.log("Response create qrorder", res);
					Toast("QR Order Created", "success");
					setWhichModal("checkoutSummaryModal");
					setIsOpenModal(true);
					setIsLoading(false);
					setOrderId(res.data.data.id);
				})
				.catch((err) => {
					console.log("Error create qrorder", err);
					Toast(`${err?.response} ?? Failed to create order`, "error");
					setIsLoading(false);
				});
		} else if (channel === "Dine In") {
			let props = {
				user,
				providerId,
				cart,
				areaId,
				sectionId,
				tableId,
				guestId,
				providerDetail,
			};
			createDineInOrder(props)
				.then((res) => {
					console.log("Response create dineorder", res);
					Toast("Dine In Order Created", "success");
					setWhichModal("checkoutSummaryModal");
					setIsOpenModal(true);
					setIsLoading(false);
					setOrderId(res.data.data.id);
				})
				.catch((err) => {
					console.log("Error create dineorder", err);
					Toast(`${err?.response} ?? Failed to create order`, "error");
					setIsLoading(false);
				});
		}
	};

	return {
		onFilterSelect,
		selectedTag,
		showSubmenuOrTagmenu,
		displayRankCart,
		selectedMenuListByTag,
		addItem,
		deleteItem,
		editSpecial,
		// Modal
		isOpenModal,
		whichModal,
		closeModal,
		goToOrder,
		// Special
		isLoading,
		addSpecialInstruction,
		// Price
		totalPrice,
		subTotal,
		// Gratuity
		gratuity,
		totalPriceAfterGratuity,
		gratuityOnChange,
		gratuityError,
		isGratuityPositive,
		gratuityFocus,
		handleToken,
		addGratuity,

		// Create Order
		createOrder,
		providerDetail,
		stripePayLoading,
	};
};

export default useCart;
