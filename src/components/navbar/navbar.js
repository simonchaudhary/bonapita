import {Avatar, IconButton} from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Select from "react-select";
import {auth} from "../../config/firebaseConfig";
import {
	emptyCartAction,
	removeUser,
	saveUser,
	selectedMyRecentOrderAction,
	selectSearchItemNDetailsAction,
} from "../../Redux/actions";
import {PrimaryButton, SecondaryButton} from "../buttons/buttons";
import {Horizontal, Vertical} from "../elements/elements";
import LoginForm from "../forms/login/LoginForm";
import SignupForm from "../forms/signup/SignupForm";
import GmailModal from "../modal/GmailModal";
import Modals from "../modal/Modals";
import {Detail, Title} from "../texts/texts";
import ToastBar from "../ToastBar";
import MyRecentOrders from "./MyRecentOrders";
import {
	Container,
	ContainerBox,
	Logo,
	MyRecentOrder,
	MyRecentOrderBody,
	MyRecentOrderHeader,
	NavProfile,
	NavProfileHeader,
	NavRight,
	OrderStatusText,
	RecentTitle,
	Row,
} from "./navbarstyle";

const Navbar = React.memo(() => {
	const history = useHistory();
	const dispatch = useDispatch();

	// redux state
	// const isLogged = useSelector((state) => state.isLogged);
	const user = useSelector((state) => state?.user.user);

	const {Toast} = ToastBar();
	// Modal
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [whichModal, setWhichModal] = useState("login");
	const close = () => {
		setIsOpenModal(!isOpenModal);
	};

	const {
		isMyRecentOpen,
		myRecentOrderList,
		isProfileOpen,
		logout,
		openProfile,
		closeMyRecentButton,
		recentOrderSelect,
		openRecentButton,
		selectedOrderByDate,
		setSelectedOrderByDate,
	} = NavBarLogic();

	const showLogin = () => {
		setWhichModal("login");
		setIsOpenModal(!isOpenModal);
	};

	const showSignup = () => {
		setWhichModal("signup");
		setIsOpenModal(!isOpenModal);
	};

	// const parentCallback = () => {
	// 	setIsOpenModal(!isOpenModal);
	// };
	const parentCallback = (message) => {
		// setIsOpenModal(!isOpenModal);
		setCallBackMessage(message);
		setWhichModal("gmailmodal");
	};

	const [callBackMessage, setCallBackMessage] = useState("");

	const handleOrderByDate = (selectedOrderByDate) => {
		setSelectedOrderByDate(selectedOrderByDate);
	};

	const sortObjectArray = ({arr, field, order = "desc"}) => {
		arr.sort(function (a, b) {
			const fieldA =
				typeof a[field] === "string" ? a[field].toLowerCase() : a[field];
			const fieldB =
				typeof b[field] === "string" ? b[field].toLowerCase() : b[field];

			let result;
			if (order === "desc") {
				result = fieldA > fieldB ? 1 : -1;
			} else {
				result = fieldA < fieldB ? 1 : -1;
			}
			return result;
		});
		return arr;
	};

	useEffect(() => {
		window.addEventListener("offline", function (e) {
			console.log("offline");
		});

		window.addEventListener("online", function (e) {
			console.log("online");
		});
	}, []);

	return (
		<>
			{/*  Modal */}
			<Modals
				isOpen={isOpenModal}
				className={
					whichModal === "login" ? "login__modal" : "signup__modal"
				}
			>
				<div className="close__modal">
					<IconButton>
						<CloseRoundedIcon onClick={close} />
					</IconButton>
				</div>
				{whichModal === "login" ? (
					<LoginForm parentCallback={parentCallback} review={null} />
				) : whichModal === "signup" ? (
					<SignupForm parentCallback={parentCallback} />
				) : whichModal === "gmailmodal" ? (
					<GmailModal title={callBackMessage} />
				) : null}
			</Modals>

			<Container>
				<Logo style={{color: "black"}}>
					aFoodie
					<span style={{color: "#d65a31", fontWeight: "800"}}>.</span>
				</Logo>
				{/* {window.navigator.onLine.toString()} */}
				{user ? (
					// <NavBarUser handleOrderByDate={handleOrderByDate} user={user} />
					<>
						{/* <button
							onClick={() => {
								Toast("info", "info");
							}}
						>
							dd
						</button> */}
						<NavRight>
							<Avatar onClick={openProfile} />
							<MyRecentOrder
								style={{
									// left: isMyRecentOpen ? "0px" : "-400px",
									// display:
									// 	user?.userType !== "Customer"
									// 		? "none"
									// 		: null,
									zIndex: isMyRecentOpen ? "5" : "-4",
									display: isMyRecentOpen ? "block" : "none",
									// display: isMyRecentOpen ? "block" : "none",
								}}
							>
								<MyRecentOrderHeader>
									<Title>My Recent</Title>
									<IconButton>
										<ArrowBackIosRoundedIcon
											onClick={closeMyRecentButton}
										/>
									</IconButton>
								</MyRecentOrderHeader>
								{/* <Horizontal /> */}
								<MyRecentOrderBody>
									<div style={{padding: "0.75rem"}}>
										<Select
											value={selectedOrderByDate}
											onChange={handleOrderByDate}
											options={orderByDate}
										/>
									</div>
									{myRecentOrderList === null ? (
										<p>Loading...</p>
									) : (
										<>
											{myRecentOrderList?.map((item, i) => (
												<div
													key={i}
													style={{
														display: "flex",
														alignItems: "center",
														justifyContent: "space-between",
														padding: "0.6rem 0.6rem",
														marginBottom: "0.6rem",
														borderBottom: "1px solid #f5f5f5",
													}}
													onClick={() => recentOrderSelect(item)}
												>
													<RecentTitle>{item.id}</RecentTitle>
													<MyRecentOrders orderId={item.id} />

													<OrderStatusText
														style={{
															background: "blue",
														}}
													>
														{item.orderStatus}
													</OrderStatusText>
													<Detail
														style={{
															fontWeight: "600",
															color: "#212121",
														}}
													>
														{item.channel}
													</Detail>
													<Detail>{item.date}</Detail>
													<Detail>{item.time}</Detail>
												</div>
											))}
										</>
									)}
								</MyRecentOrderBody>
							</MyRecentOrder>

							<NavProfile
								style={{
									display: isProfileOpen ? "flex" : "none",
									opacity: isProfileOpen ? 1 : 0,
									// transform: isProfileOpen
									// 	? "scale(1.0)"
									// 	: "scale(0.90)",
									// zIndex: isProfileOpen ? "10" : "-1",
								}}
							>
								<NavProfileHeader>
									<div>
										<Title>
											{user?.firstName} {user?.lastName}
										</Title>
										<Detail>{user?.email}</Detail>
									</div>
								</NavProfileHeader>

								<ContainerBox>
									<Title>User Type</Title>
									<Detail>{user?.userType}</Detail>
								</ContainerBox>
								{user?.userType === "Customer" ? (
									<ContainerBox
										style={{
											display: "flex",
											justifyContent: "space-between",
										}}
										onClick={openRecentButton}
									>
										<Title>My Recent Orders</Title>
										<ShoppingBasketRoundedIcon />
									</ContainerBox>
								) : (
									<Row>
										<ContainerBox>
											<Detail>Provider</Detail>
											<Horizontal />
											<Detail>{user?.provider}</Detail>
										</ContainerBox>

										{user?.userType === "PrepLineStaff" && (
											<Row>
												<Vertical />
												<ContainerBox>
													<Detail>Prep Line</Detail>
													<div className="title_2">
														{user?.prepLineName}
													</div>
												</ContainerBox>
											</Row>
										)}
									</Row>
								)}
								{/* <Horizontal /> */}
								<div>
									<PrimaryButton onClick={logout}>
										Logout
									</PrimaryButton>
								</div>
							</NavProfile>
						</NavRight>
					</>
				) : (
					<Row style={{width: "200px"}}>
						<PrimaryButton onClick={showLogin}>Login</PrimaryButton>
						<Vertical />
						<SecondaryButton onClick={showSignup}>
							Sign up
						</SecondaryButton>
					</Row>
				)}
			</Container>
		</>
	);
});

// const NavBarUser = React.memo(({ handleOrderByDate, user }) => {
// 	const {
// 		isMyRecentOpen,
// 		myRecentOrderList,
// 		isProfileOpen,
// 		logout,
// 		openProfile,
// 		closeMyRecentButton,
// 		recentOrderSelect,
// 		openRecentButton,
// 		selectedOrderByDate,
// 		setSelectedOrderByDate,
// 	} = NavBarLogic();
// 	return (
// 		<NavRight>
// 			<Avatar onClick={openProfile} />
// 			<MyRecentOrder
// 				style={{
// 					// left: isMyRecentOpen ? "0px" : "-400px",
// 					// display:
// 					// 	user?.userType !== "Customer"
// 					// 		? "none"
// 					// 		: null,
// 					zIndex: isMyRecentOpen ? "5" : "-4",
// 					display: isMyRecentOpen ? "block" : "none",
// 					// display: isMyRecentOpen ? "block" : "none",
// 				}}
// 			>
// 				<MyRecentOrderHeader>
// 					<Title>My Recent</Title>
// 					<IconButton>
// 						<ArrowBackIosRoundedIcon onClick={closeMyRecentButton} />
// 					</IconButton>
// 				</MyRecentOrderHeader>
// 				{/* <Horizontal /> */}
// 				<MyRecentOrderBody>
// 					<div style={{ padding: "0.75rem" }}>
// 						<Select
// 							value={selectedOrderByDate}
// 							onChange={handleOrderByDate}
// 							options={orderByDate}
// 						/>
// 					</div>
// 					{myRecentOrderList === null ? (
// 						<p>Loading...</p>
// 					) : (
// 						<>
// 							{myRecentOrderList?.map((item, i) => (
// 								<div
// 									key={i}
// 									style={{
// 										display: "flex",
// 										alignItems: "center",
// 										justifyContent: "space-between",
// 										padding: "0.6rem 0.6rem",
// 										marginBottom: "0.6rem",
// 										borderBottom: "1px solid #f5f5f5",
// 									}}
// 									onClick={() => recentOrderSelect(item)}
// 								>
// 									<RecentTitle>{item.id}</RecentTitle>
// 									<OrderStatusText
// 										style={{
// 											background: "blue",
// 										}}
// 									>
// 										{item.orderStatus}
// 									</OrderStatusText>
// 									<Detail
// 										style={{
// 											fontWeight: "600",
// 											color: "#212121",
// 										}}
// 									>
// 										{item.channel}
// 									</Detail>
// 									<Detail>{item.date}</Detail>
// 									<Detail>{item.time}</Detail>
// 								</div>
// 							))}
// 						</>
// 					)}
// 				</MyRecentOrderBody>
// 			</MyRecentOrder>

// 			<NavProfile
// 				style={{
// 					display: isProfileOpen ? "flex" : "none",
// 					opacity: isProfileOpen ? 1 : 0,
// 					// transform: isProfileOpen
// 					// 	? "scale(1.0)"
// 					// 	: "scale(0.90)",
// 					// zIndex: isProfileOpen ? "10" : "-1",
// 				}}
// 			>
// 				<NavProfileHeader>
// 					<div>
// 						<Title>
// 							{user?.firstName} {user?.lastName}
// 						</Title>
// 						<Detail>{user?.email}</Detail>
// 					</div>
// 				</NavProfileHeader>

// 				<ContainerBox>
// 					<Title>User Type</Title>
// 					<Detail>{user?.userType}</Detail>
// 				</ContainerBox>
// 				{user?.userType === "Customer" ? (
// 					<ContainerBox
// 						style={{
// 							display: "flex",
// 							justifyContent: "space-between",
// 						}}
// 						onClick={openRecentButton}
// 					>
// 						<Title>My Recent Orders</Title>
// 						<ShoppingBasketRoundedIcon />
// 					</ContainerBox>
// 				) : (
// 					<Row>
// 						<ContainerBox>
// 							<Detail>Provider</Detail>
// 							<Horizontal />
// 							<Detail>{user?.provider}</Detail>
// 						</ContainerBox>

// 						{user?.userType === "PrepLineStaff" && (
// 							<Row>
// 								<Vertical />
// 								<ContainerBox>
// 									<Detail>Prep Line</Detail>
// 									<div className="title_2">{user?.prepLineName}</div>
// 								</ContainerBox>
// 							</Row>
// 						)}
// 					</Row>
// 				)}
// 				{/* <Horizontal /> */}
// 				<div>
// 					<PrimaryButton onClick={logout}>Logout</PrimaryButton>
// 				</div>
// 			</NavProfile>
// 		</NavRight>
// 	);
// });

const NavBarLogic = () => {
	console.log("Nav Bar Logic");

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);

	useEffect(() => {
		console.log("Nav Bar Logic use effect");
	}, []);

	// router
	const history = useHistory();
	// ToastBar
	const {Toast} = ToastBar();

	const [isMyRecentOpen, setIsMyRecentOpen] = useState(false);
	const [myRecentOrderList, setMyRecentOrderList] = useState([]);
	const [selectedOrderByDate, setSelectedOrderByDate] = useState({
		value: "newToOld",
		label: "Latest",
	});

	const [isProfileOpen, setIsProfileOpen] = useState(false);

	function logout() {
		auth
			.signOut()
			.then((cred) => {
				auth.signOut();
				// dispatch(loggedStatus(false));
				dispatch(saveUser(null));
				dispatch(removeUser(null));
				dispatch(selectSearchItemNDetailsAction(null));
				dispatch(emptyCartAction());
				history.replace("/");
				Toast("User Signout Successfully", "success");
			})
			.catch((error) => {
				console.log("error logout " + error);
			});
	}

	const openProfile = () => {
		setIsProfileOpen(!isProfileOpen);
	};

	const openRecentButton = () => {
		setIsProfileOpen(!isProfileOpen);
		if (!isMyRecentOpen) {
			getRecentOrder();
		}
		setIsMyRecentOpen(!isMyRecentOpen);
	};

	const recentOrderSelect = (item) => {
		console.log(item);
		dispatch(selectedMyRecentOrderAction(item));
		history.push(
			`/searchorder/${item.providerId}/${item.id}/${item.channel}`
		);
		console.log("select recent order", item);
		setIsMyRecentOpen(false);
	};

	const closeMyRecentButton = () => {
		setIsMyRecentOpen(!isMyRecentOpen);
		setIsProfileOpen(false);
	};

	useEffect(() => {
		if (user) {
			getRecentOrder();
		}
	}, [selectedOrderByDate]);

	const getRecentOrder = () => {
		setMyRecentOrderList(null);
		axios
			.get(
				// "https://us-central1-afoodie-6d649.cloudfunctions.net/customer/" +
				// 	user.uid +
				// 	"/recent-orders"

				"https://us-central1-afoodie-6d649.cloudfunctions.net/customer/" +
					user?.uid +
					"/recent-orders?orderType=" +
					selectedOrderByDate?.value
			)
			.then((response) => {
				console.log("Response recentorders", response.data.data.orders);
				setMyRecentOrderList(response.data.data.orders);
			})
			.catch((error) => {
				console.log("Error recentorders");
			});
	};

	return {
		isMyRecentOpen,
		myRecentOrderList,
		isProfileOpen,
		logout,
		openProfile,
		closeMyRecentButton,
		openRecentButton,
		recentOrderSelect,
		selectedOrderByDate,
		setSelectedOrderByDate,
	};
};

const orderByDate = [
	{value: "newToOld", label: "Latest"},
	{value: "oldToNew", label: "Oldest"},
];

export default Navbar;
