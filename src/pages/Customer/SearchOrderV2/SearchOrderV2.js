import React, {useEffect} from "react";
// Package
import {useSelector, useDispatch} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

// Actions
import {fetchProvider} from "../../../Redux/actions";

// Icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {IconButton} from "@material-ui/core";

// Components
import {
	SearchOrderContainer,
	Header,
	HeaderTop,
	HeaderBottom,
} from "./SearchOrderV2Style";
import MenuListOnly from "../../../ComponentsNew/MenuList/MenuListOnly";
import ToastBar from "../../../components/ToastBar";
import OrderedItemV2 from "./OrderedItemV2/OrderedItemV2";
import {useOrderDetail} from "../../../Hooks/useOrderDetail/useOrderDetail";

const SearchOrderV2 = () => {
	console.log("Searc");

	// Initilization
	const dispatch = useDispatch();
	const history = useHistory();
	const {Toast} = ToastBar();

	const {providerId} = useParams();
	const {orderId} = useParams();
	const {channel} = useParams();

	// Redux State
	const provider = useSelector((state) => state.menus.provider);

	// Hooks
	const {orderDetail} = useOrderDetail(orderId);

	// UseEffects
	useEffect(() => {
		dispatch(fetchProvider(providerId));
	}, []);

	// Functions
	const goBack = () => {
		history.replace("/");
	};

	const addItemToOrder = (item) => {
		console.log("addItemToOrder", item);
		console.log("order id", orderId);
		const data = {
			imageUrl: item.imageUrl,
			itemName: item.name ?? item.itemName,
			itemId: item.itemId,
			price: item.price,
			itemStatus: "new",
			prepLine: item.prepLine,
			specialInstruction: "here are some instructions",
			tax: item.tax,
			displayRank: item.displayRank,
		};
		console.log("order now", data);
		axios
			.post(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/order/" +
					orderId +
					"/add-item",
				data
			)
			.then((response) => {
				if (response.data.success) {
					console.log("Response additeminorder", response);
					Toast(item.name + " Ordered Successfully", "success");
					// setIsOrderedItemUpdate(!isOrderedItemUpdate);
				}
			})
			.catch((error) => {
				console.log("Error additeminorder", error);
			});
	};

	return (
		<SearchOrderContainer>
			<Header>
				<HeaderTop>
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

					<img
						height="60px"
						width="60px"
						src={provider?.data?.pageInfo?.footerUrl}
					/>
				</HeaderTop>
			</Header>

			{/* Ordered Item Container */}
			<OrderedItemV2
				orderId={orderId}
				providerId={providerId}
				channel={channel}
			/>

			{/* Provider Menu */}
			<MenuListOnly
				providerId={providerId}
				addItemToOrder={addItemToOrder}
				isPaid={orderDetail?.isPaid}
			/>
		</SearchOrderContainer>
	);
};

export default SearchOrderV2;

// <HeaderBottom>
{
	/* <div>
	<Detail>Order Status</Detail>
	<Title
		style={{
			textTransform: "capitalize",
			color:
				realTimeOrderStatus === "new" || "submit"
					? "#FF0000"
					: realTimeOrderStatus === "accepted"
					? "#ff8000"
					: realTimeOrderStatus === "ready"
					? "#bfff00"
					: realTimeOrderStatus === "closed"
					? "#63FF00"
					: null,
		}}
	>
		{"Order is "}
		{realTimeOrderStatus}
	</Title>
</div> */
}

// {realTimeOrderStatus === "draft" ||
// realTimeOrderStatus === "customer review" ? (
// 	<Row style={{ width: "220px", marginRight: "0.75rem" }}>
// 		{/* <SecondaryButton
// 			onClick={saveForLaterButton}
// 			// onClick={check}
// 		>
// 			Save For Later
// 		</SecondaryButton>
// 		<Vertical /> */}
// 		{orderedItems?.items?.length === 0 ||
// 		orderedItems === null ? null : (
// 			<ButtonNLoading
// 				onClick={addGratuity}
// 				title="Pay"
// 				isLoading={isLoading}
// 			/>
// 		)}
// 	</Row>
// ) : (
// 	<p></p>
// )}
// </HeaderBottom>
