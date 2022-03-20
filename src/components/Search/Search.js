import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import axios from "axios";
import React, {useEffect, useState} from "react";
import "react-edit-text/dist/index.css";
// import {ReactSearchAutocomplete} from "react-search-autocomplete";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, withRouter} from "react-router-dom";
import ham from "../../assets/ham.svg";
import ToastBar from "../../components/ToastBar";
import {auth, firestore} from "../../config/firebaseConfig";
// Hooks
import useDebounce from "../../Hooks/useDebounce/useDebounce";
import {
	emptyCartAction,
	isQRCameraOpenAction,
	saveQRDetailAction,
	saveUser,
	selectSearchItemEmptyAction,
	selectSearchItemNDetailsAction,
	setChannelAction,
	setProviderIdAction,
} from "../../Redux/actions";
import GmailModal from "../modal/GmailModal";
import Modals from "../modal/Modals";
import CustomCarousel from "./CustomCarousel/CustomCarousel";
import SearchLoginForm from "./login/SearchLoginForm";
// import loginStatus from "../../utils/loginStatus";
// import Modals from "../../components/Modals";
// components
import {
	Container,
	Image,
	SearchBackground,
	SearchBox,
	SearchInput,
	SearchResult,
	SearchResultLoading,
} from "./Searchstyle";

const Search = React.memo(() => {
	console.log("Search");

	// Initilization
	const {Toast} = ToastBar();
	const history = useHistory();
	const dispatch = useDispatch();

	// Redux State
	const user = useSelector((state) => state.user.user);

	// Hooks
	const [searchKey, setSearchKey] = useState("");
	const [searchResltList, setSearchResltList] = useState(null);
	const [showSearchResult, setShowSearchResult] = useState(false);
	const [whichModal, setWhichModal] = useState("login");
	const [callBackMessage, setCallBackMessage] = useState("");

	// UI
	const [isOpenModal, setIsOpenModal] = useState(false);

	const close = () => {
		setIsOpenModal(!isOpenModal);
	};

	const parentCallback = (message) => {
		// setIsOpenModal(!isOpenModal);
		setCallBackMessage(message);
		setWhichModal("gmailmodal");
	};

	// Login
	useEffect(() => {
		var email = window.localStorage.getItem("emailForSignIn");
		console.log("useeffect email", email);
		if (email != null) {
			signIn();
		}
	}, []);

	const signIn = () => {
		// Confirm the link is a sign-in with email link.
		console.log("signIn");
		if (auth.isSignInWithEmailLink(window.location.href)) {
			var email = window.localStorage.getItem("emailForSignIn");
			if (!email) {
				email = window.prompt("Please provide your email for confirmation");
			}
			// The client SDK will parse the code from the link for you.
			auth
				.signInWithEmailLink(email, window.location.href)
				.then((result) => {
					window.localStorage.removeItem("emailForSignIn");
					console.log("Result", result);
					Toast("Email is Verified", "success");

					let data = {
						email: result.user.email,
						emailVerified: result.user.emailVerified,
						uid: result.user.uid,
						createdDate: Date().toLocaleString(),
						firstName: "",
						lastName: "",
						userType: "Customer",
						provider: "",
						prepLineName: "",
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

							dispatch(saveUser(data));

							// dispatch(loggedStatus(true));
						})
						.catch((err) => {
							console.log("firestore errorss " + err);
						});
				})
				.catch((error) => {
					console.log("Error", error);
				});
		}
	};

	// QR Scanner
	const openQRScanner = () => {
		// alert("hello");
		dispatch(saveQRDetailAction(null));
		dispatch(emptyCartAction());
		dispatch(selectSearchItemEmptyAction());
		dispatch(setChannelAction("QR code"));
		dispatch(isQRCameraOpenAction(false));
		history.push("/qrpage");
	};

	// Function call delay hooks
	useDebounce(() => searchV3(searchKey), 1500, [searchKey]);

	const searchV3 = (keyword) => {
		console.log("function run", keyword);
		setShowSearchResult(true);
		setSearchResltList(null);
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/item/v3/search?keyword=" +
					keyword
			)
			.then((res) => {
				console.log("Response SearchV3", keyword, res);
				if (res.data.success) {
					let result = res.data.data.result;
					let providerList = [];
					let itemList = [];
					result.map((item) => {
						if (item.type === "provider") {
							providerList.push(item.provider);
						} else {
							itemList.push(item.item);
						}
					});

					console.log("p", providerList, "i", itemList);

					setSearchResltList({
						providerList: providerList,
						itemList: itemList,
					});
				}
			})
			.catch((err) => {
				console.error("Error SearchV3", err.response);
				// setShowSearchResult(false);
			});
	};

	const itemSelect = (item, provider) => {
		console.log("itemSelect");
		dispatch(emptyCartAction());
		dispatch(setChannelAction("Customer"));

		if (user) {
			console.log("already login");
			if (provider) {
				let data = {
					type: "Provider",
					provider: item,
				};
				dispatch(selectSearchItemNDetailsAction(data));
				dispatch(setProviderIdAction(item.id));
				console.log("Provider", item);
				let providerId = `p=${item.id}`;
				// history.push(`/orderpage/${item.id}/Customer`);
				history.push(`/menulistcustomer/${providerId}/Customer`);
			} else {
				let data = {
					type: "Item",
					item: item,
				};
				dispatch(selectSearchItemNDetailsAction(data));
				dispatch(setProviderIdAction(item.provider.id));
				console.log("Items", item);

				let providerId = `p=${item.provider.id}`;

				// history.push(
				// 	`/orderpage/${item.provider.id}/Customer`
				// );
				history.push(`/menulistcustomer/${providerId}/Customer`);
				// selectProviderButton(item);
			}
		} else {
			console.log("not login");
			if (provider) {
				let data = {
					type: "Provider",
					provider: item,
				};
				dispatch(selectSearchItemNDetailsAction(data));
				dispatch(setProviderIdAction(item.id));
			} else {
				let data = {
					type: "Item",
					item: item,
				};
				dispatch(selectSearchItemNDetailsAction(data));
				dispatch(setProviderIdAction(item.provider.id));
			}
			setIsOpenModal(!isOpenModal);
		}
	};

	return (
		<>
			<Modals isOpen={isOpenModal} className="login__modal">
				<div className="close__modal">
					<IconButton>
						<CloseRoundedIcon onClick={close} />
					</IconButton>
				</div>
				{/* <LoginForm parentCallback={parentCallback} /> */}
				{whichModal === "login" ? (
					<SearchLoginForm parentCallback={parentCallback} />
				) : whichModal === "gmailmodal" ? (
					<GmailModal title={callBackMessage} />
				) : null}
			</Modals>
			<Container>
				<SearchBackground />

				<SearchBox>
					<SearchInput
						placeholder="Search Menu and Providers"
						onChange={(e) => {
							setSearchKey(e.target.value);
						}}
						onFocus={() => {
							console.log("focus");
							// setShowSearchResult(false);
							// setSearchResltList(null);
						}}
					/>

					<div
						onClick={openQRScanner}
						style={{
							position: "absolute",
							top: "10px",
							// bottom: "20px",
							right: "20px",
							height: "10px",
							zIndex: "2",
						}}
					>
						{/* <QRIcon style={{width: "25px"}} />
						<p
							style={{
								marginTop: "0px",
								fontSize: "0.5rem",
								fontWeight: "600",
							}}
						>
							Dine-In
						</p> */}
					</div>
				</SearchBox>
				<Image src={ham}></Image>
				{/* <button onClick={check}>check</button> */}
				{showSearchResult ? (
					<SearchResult>
						{searchResltList === null ? (
							<SearchResultLoading>
								<p>Loading...</p>
							</SearchResultLoading>
						) : (
							<>
								<CustomCarousel
									items={searchResltList?.itemList}
									itemSelect={itemSelect}
								/>

								<CustomCarousel
									items={searchResltList?.providerList}
									provider
									itemSelect={itemSelect}
								/>
							</>
						)}
					</SearchResult>
				) : null}
			</Container>
		</>
	);
});

export default withRouter(Search);
