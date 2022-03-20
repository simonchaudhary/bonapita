// Package
import axios from "axios";

export const FETCH_FOOD_REQUEST = "FETCH_FOOD_REQUEST";
export const FETCH_FOOD_SUCCESS = "FETCH_FOOD_SUCCESS";
export const FETCH_FOOD_FAILURE = "FETCH_FOOD_FAILURE";
export const CLEAR_FOOD = "CLEAR_FOOD";

// Actions
const fetchFoodRequestAction = () => {
	return {
		type: FETCH_FOOD_REQUEST,
	};
};
const fetchFoodSuccessAction = (data) => {
	return {
		type: FETCH_FOOD_SUCCESS,
		payload: data,
	};
};
const fetchFoodFailureAction = (error) => {
	return {
		type: FETCH_FOOD_FAILURE,
		payload: error,
	};
};
// Empty Storage
export const clearFoodAction = () => {
	return {
		type: CLEAR_FOOD,
	};
};

export const fetchFood = (providerId) => {
	console.log("Fetch Food Action", providerId);
	return (dispatch, getState) => {
		console.log("Fetch Food state", getState().menus);

		let menus = getState().menus;

		if (!menus.food?.data) {
			fetchFoodAfterCheck(dispatch, providerId);
		} else {
			console.log("Food Already loaded to redux");
		}
	};
};

const fetchFoodAfterCheck = (dispatch, providerId) => {
	dispatch(fetchFoodRequestAction());
	axios
		.get(
			// `https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerId}/display-rank?sortType=asc&itemType=food`
			`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/v2/${providerId}/display-rank?sortType=asc&itemType=food`
		)
		.then((res) => {
			console.log("Response GetFoodList", res);
			filterListByTag(dispatch, res.data.data);
		})
		.catch((err) => {
			console.error("Error GetFoodList", err.response);
			dispatch(fetchFoodFailureAction(err?.response?.toString()));
		});
};

const filterListByTag = (dispatch, foodList) => {
	console.log("Filterlistbytag");

	let allItems = [];

	foodList.map((item, i) => {
		item?.items.map((menu, i) => {
			allItems.push(menu);
		});
	});

	console.log("All Item", allItems);
	// let tagItems = allItems.reduce((accumulator, currentValue) => {
	// 	let tags = currentValue.tags;
	// 	if (tags) {
	// 		tags.forEach((tag) => {
	// 			let element = accumulator.find((value) => value.tag === tag);
	// 			let subMenu = currentValue.sub_menu;
	// 			if (element) {
	// 				let items = element.items;
	// 				if (items.hasOwnProperty(subMenu)) {
	// 					items[subMenu].push(currentValue);
	// 				} else {
	// 					items[subMenu] = [currentValue];
	// 				}
	// 			} else {
	// 				let json = {
	// 					tag: tag,
	// 					items: {},
	// 				};
	// 				json.items[subMenu] = [currentValue];
	// 				accumulator.push(json);
	// 			}
	// 		});
	// 	}
	// 	return accumulator;
	// }, []);
	// console.log("ashish data", tagItems);

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

	let data = {
		submenu: foodList,
		tags: tagItems,
	};
	console.log(data);
	dispatch(fetchFoodSuccessAction(data));
};
