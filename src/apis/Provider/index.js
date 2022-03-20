import axios from "axios";

// Manage Menu
// Get menu by submenu
export const getMenuBySubmenu = (providerId, orderBy) => {
	return new Promise((resolve, reject) => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/v2/${providerId}/items/sub-menu?sortType=${orderBy.value}`
			)
			.then((response) => {
				console.log("Response getitembysubmenu");
				resolve(response);
			})
			.catch((err) => {
				console.error("Error getitembysubmenu");
				reject(err);
			});
	});
};

// Add submenu
export const addSubmenu = (providerId, data) => {
	console.log("addSubmenu", providerId, data);

	return new Promise((resolve, reject) => {
		axios
			.post(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerId}/sub-menu`,
				data
			)
			.then((response) => {
				console.log("Response addSubmenu");
				resolve(response);
			})
			.catch((err) => {
				console.error("Error addSubmenu");
				reject(err);
			});
	});
};
// Update submenu
export const updateSubmenu = (providerId, submenu, submenuId) => {
	console.log("updateSubmenu", providerId, submenu, submenuId);

	return new Promise((resolve, reject) => {
		axios
			.put(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerId}/sub-menu?submenu=${submenu}&submenuId=${submenuId}`
			)
			.then((response) => {
				console.log("Response updatesubmenuname");
				resolve(response);
			})
			.catch((err) => {
				console.error("Error updatesubmenuname");
				reject(err);
			});
	});
};

// Update submenu id of item
export const updateItemSubmenu = (providerId, itemId, submenuId) => {
	// Body
	let body = {
		itemId: itemId,
		sub_menu: submenuId,
	};

	console.log(providerId, body);

	return new Promise((resolve, reject) => {
		axios
			.put(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerId}/update-item`,
				body
			)
			.then((response) => {
				console.log("Response updateItemSubmenu");
				resolve(response);
			})
			.catch((err) => {
				console.error("Error updateItemSubmenu");
				reject(err);
			});
	});
};

// Add item to provider
export const addItemToProvider = (providerId, data, itemImage) => {
	console.log("addItemToProvider", providerId, data, itemImage);

	return new Promise((resolve, reject) => {
		axios
			.put(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerId}/add-item`,
				data
			)
			.then((res) => {
				console.log("Response additem providermenu", res);
				let itemId = res.data.data.itemId;
				if (itemImage) {
					addItemImageToProvider(providerId, itemId, itemImage)
						.then((response) => {
							console.log("Response addItemImageToProvider ");
							let error = {
								additem: res,
								addImage: response,
							};
							resolve(error);
						})
						.catch((err) => {
							console.error("Error addItemImageToProvider");
							reject(err);
						});
				} else {
					resolve(res);
				}
			})
			.catch((err) => {
				console.error("Error additem providermenu");
				reject(err);
			});
	});
};

// Add itemimage to provider
export const addItemImageToProvider = (providerId, itemId, itemImage) => {
	console.log("addItemImageToProvider", providerId, itemId, itemImage);

	const imageFormData = new FormData();
	imageFormData.append("image", itemImage?.file);
	imageFormData.append("name", "logo");
	console.log("image", imageFormData);

	return new Promise((resolve, reject) => {
		axios
			.post(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerId}/item-image?itemId=${itemId}`,
				imageFormData
			)
			.then((response) => {
				console.log("Response addItemImageToProvider ");
				resolve(response);
			})
			.catch((err) => {
				console.error("Error addItemImageToProvider");
				reject(err);
			});
	});
};

// Delete item from provider
export const deleteMenuItem = (providerId, itemId) => {
	console.log("deleteMenuItem", providerId, itemId);

	return new Promise((resolve, reject) => {
		axios
			.delete(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerId}/item/${itemId}`
			)
			.then((res) => {
				console.log("Response delete menuitem");
				resolve(res);
			})
			.catch((err) => {
				console.error("Error delete menuitem");
				reject(err);
			});
	});
};
// Update item from provider
export const updateMenuItem = (providerId, data, itemId, imageFormData) => {
	console.log("updateMenuItem", providerId, data, imageFormData);

	return new Promise((resolve, reject) => {
		axios
			.put(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/provider/" +
					providerId +
					"/update-item",
				data
			)
			.then((res) => {
				console.log("Response updateMenuItem");
				addItemImageToProvider(providerId, itemId, imageFormData)
					.then((response) => {
						console.log("Response addItemImageToProvider");
						let error = {
							additem: res,
							addImage: response,
						};
						resolve(error);
					})
					.catch((err) => {
						console.error("Error addItemImageToProvider");
						reject(err);
					});
			})
			.catch((err) => {
				console.error("Error updateMenuItem");
				reject(err);
			});
	});
};

// Delete Submenu from provider
export const deleteSubmenu = (providerId, submenuId) => {
	console.log("deleteSubmenu", providerId, submenuId);

	return new Promise((resolve, reject) => {
		axios
			.delete(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerId}/sub-menu?submenuId=${submenuId}`
			)
			.then((res) => {
				console.log("Response  deleteSubmenu");
				resolve(res);
			})
			.catch((err) => {
				console.error("Error  deleteSubmenu");
				reject(err);
			});
	});
};

// Get all Submenu of provider
export const getAllSubmenuOfProvider = (providerId) => {
	return new Promise((resolve, reject) => {
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerId}/sub-menu`
			)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
