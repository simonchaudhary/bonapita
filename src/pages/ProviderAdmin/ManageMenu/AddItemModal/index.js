import React, {useState, useEffect} from "react";

// Package
import {useSelector} from "react-redux";
import {ToggleSwitch} from "react-dragswitch";
import Select from "react-select";
import ImageUpload from "image-upload-react";

// Custom Hooks
import useFormData from "../../../../Hooks/useFormData";

// API
import {
	addItemToProvider,
	getAllSubmenuOfProvider,
	updateMenuItem,
} from "../../../../apis/Provider";

// Values
import {displayRankList, itemTypeList} from "../../../../apis/values";

// Helper
import {capitalizeFirstLetter} from "../../../../helper/capitalFirstLetter";

// Component
import Input from "../../../../ComponentsNew/Input";
import ToastBar from "../../../../components/ToastBar";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";

const AddItemModal = ({header, callBack, selectedItem}) => {
	console.log("AddItemModal", header);

	// Initilization
	const {Toast} = ToastBar();

	// Redux State
	const user = useSelector((state) => state.user.user);
	const providerDetail = useSelector(
		(state) => state.user.providerDetail?.data?.providerDetail
	);

	// Variables
	const tagList = providerDetail?.tags
		.map((item) => {
			return {value: item.name, label: item.name};
		})
		.filter((item, i) => i > 0);

	// Hooks
	const [formData, setFormData] = useState({
		name: "",
		prepLine: "",
		description: "Some Description",
		cuisine: "cuisine",
		price: "",
		tags: [tagList[0]],
		displayRank: {value: 1, label: 1},
		ingredients: "",
		itemType: {value: "food", label: "food"},
		tax: "9.5%",
		available: false,
		active: false,
		sub_menu: "",
	});
	const [itemImage, setItemImage] = useState(null);
	const [formError, setFormError] = useState({
		name: "",
		prepLine: "",
		description: "",
		cuisine: "",
		price: "",
		tags: "",
		displayRank: "",
		ingredients: "",
		tax: "",
		available: "",
		active: "",
		sub_menu: "",
	});

	// UI Hooks
	const [isLoading, setIsLoading] = useState(false);
	const [subMenuList, setSubMenuList] = useState(null);

	// useForm Hooks
	const {onChange, onFocus, setError} = useFormData(setFormData, setFormError);

	// Tags
	const onSelectChange = (key, selected) => {
		console.log("on Select  change", key, selected);
		setFormData((prevState) => {
			return {
				...prevState,
				[key]: selected,
			};
		});
	};

	// Component Functions
	const handleImageSelect = (e) => {
		let data = {
			url: URL.createObjectURL(e.target.files[0]),
			file: e.target.files[0],
		};
		setItemImage(data);
	};

	// useEffect
	useEffect(() => {
		// For Edit item
		if (selectedItem) {
			let tag = [];
			selectedItem.tags?.map((item) => {
				let data = {
					value: item,
					label: capitalizeFirstLetter(item),
				};
				tag.push(data);
			});
			console.log("tax", tag);
			setFormData({
				name: selectedItem?.name,
				prepLine: selectedItem?.prepLine,
				description: selectedItem?.description,
				cuisine: selectedItem?.cuisine,
				price: selectedItem?.price,
				promo: selectedItem?.promo,
				tags: tag,
				tax: selectedItem?.tax,
				available: selectedItem?.available,
				active: selectedItem?.active,
			});

			let data = {
				url: selectedItem.imageUrl,
				file: null,
			};
			setItemImage(data);
		}
	}, []);

	useEffect(() => {
		if (header === "Add Item") {
			getAllSubmenuOfProvider(user?.provider)
				.then((res) => {
					console.log("Response get all submenu of provider", res);
					let submenu = res.data.data.submenu.map((item) => {
						return {
							value: item.id,
							label: item.name,
						};
					});
					console.log("new", submenu);
					setSubMenuList(submenu);
					setFormData((prevState) => {
						return {
							...prevState,
							sub_menu: submenu[0],
						};
					});
				})
				.catch((err) => {
					console.log("Error get all submenu of provider", err);
				});
		}
	}, []);

	// Functions
	const onAddItem = () => {
		console.log("dd", tagList);
		let isValid = true;
		for (const [key, value] of Object.entries(formData)) {
			if (value === "") {
				setError(key, "Field Required");
				isValid = false;
			}
		}
		if (isValid) {
			setIsLoading(true);
			let flatTag = [];
			formData.tags.map((item) => {
				flatTag.push(item.value);
			});
			const data = {
				item: {
					imageUrl: "firebase storage url",
					prepLine: formData?.prepLine,
					promo: "No promo available",
					available: formData?.available,
					active: formData?.active,
					tax: formData?.tax,
					specialInstructions: "",
					prepTime: "",
					cuisine: formData?.cuisine,
					name: formData?.name,
					price: formData?.price,
					ingredients: formData?.ingredients,
					description: formData?.description,
					tags: flatTag,
					displayRank: formData?.displayRank.value,
					itemType: formData?.itemType.value,
					sub_menu: formData?.sub_menu.value,
					submenuId: "",
				},
			};

			console.log("Data", data, itemImage);

			// API
			addItemToProvider(user?.provider, data, itemImage)
				.then((res) => {
					console.log("Response add item", res);
					Toast(`${formData.name} added successfully`, "success");
					setIsLoading(false);
					callBack();
				})
				.catch((err) => {
					console.log("Error add item ", err);
				});
		}
	};

	const onUpdateItem = () => {
		console.log("onUpdateItem", selectedItem);

		let isValid = true;
		for (const [key, value] of Object.entries(formData)) {
			if (value === "") {
				setError(key, "Field Required");
				isValid = false;
			}
		}
		if (isValid) {
			setIsLoading(true);
			let flatTag = [];
			formData.tags.map((item) => {
				flatTag.push(item.value);
			});
			console.log("submenu", selectedItem.sub_menu);
			const data = {
				itemId: selectedItem.itemId,
				submenuId: selectedItem.submenuId,
				sub_menu: selectedItem.sub_menu,
				imageUrl: itemImage.url,
				prepLine: formData?.prepLine,
				promo: selectedItem.promo,
				available: formData?.available,
				active: formData?.active,
				tax: formData?.tax,
				specialInstructions: selectedItem.specialInstructions,
				prepTime: selectedItem.prepTime,
				cuisine: formData?.cuisine,
				name: formData?.name,
				price: formData?.price,
				ingredients: selectedItem.ingredients,
				description: formData?.description,
				tags: flatTag,
			};
			// Image
			const imageFormData = new FormData();
			// console.log("image", itemImage);
			imageFormData.append("image", itemImage?.file);
			imageFormData.append("name", "logo");
			console.log("data", data, imageFormData);

			updateMenuItem(
				user?.provider,
				data,
				selectedItem.itemId,
				imageFormData
			)
				.then((res) => {
					console.log("Response update item", res);
					Toast(`${formData.name} updated successfully`, "success");
					setIsLoading(false);
					callBack();
				})
				.catch((err) => {
					console.log("Error update item ", err);
				});
		}
	};

	return (
		<div className="overflow-y-auto overflow-x-hidden h-90">
			<header className="sticky top-0 z-50 bg-white font-medium text-lg border-b border-gray-300 pb-1">
				{header}
			</header>
			<div className="pt-2">
				<Input
					label="Name"
					error={formError.name}
					type="text"
					value={formData.name}
					onChange={(e) => onChange(e, "name")}
					onFocus={() => onFocus("name")}
				/>
				<Input
					label="PrepLine"
					error={formError.prepLine}
					type="text"
					value={formData.prepLine}
					onChange={(e) => onChange(e, "prepLine")}
					onFocus={() => onFocus("prepLine")}
				/>
				<Input
					label="Description"
					error={formError.description}
					type="text"
					value={formData.description}
					onChange={(e) => onChange(e, "description")}
					onFocus={() => onFocus("description")}
				/>
				<Input
					label="Cuisine"
					error={formError.cuisine}
					type="text"
					value={formData.cuisine}
					onChange={(e) => onChange(e, "cuisine")}
					onFocus={() => onFocus("cuisine")}
				/>

				<Input
					label="Price"
					error={formError.price}
					type="number"
					value={formData.price}
					onChange={(e) => onChange(e, "price")}
					onFocus={() => onFocus("price")}
				/>

				<Input
					label="Tax"
					error={formError.tax}
					type="text"
					value={formData.tax}
					onChange={(e) => onChange(e, "tax")}
					onFocus={() => onFocus("tax")}
				/>

				<div className="my-2 mb-4">
					<p className="text-sm font-normal mb-2">Tags</p>
					<Select
						value={formData?.tags}
						isMulti
						name="colors"
						options={tagList}
						className="basic-multi-select"
						classNamePrefix="select"
						onChange={(e) => onSelectChange("tags", e)}
					/>
				</div>
				{header === "Add Item" ? (
					<div className="my-2 mb-4">
						<p className="text-sm font-normal mb-2">Sub Menu</p>
						<Select
							value={formData?.sub_menu}
							name="colors"
							options={subMenuList}
							className="basic-multi-select"
							classNamePrefix="select"
							onChange={(e) => onSelectChange("sub_menu", e)}
						/>
					</div>
				) : null}
				<Input
					label="Ingredients"
					error={formError.ingredients}
					type="text"
					value={formData.ingredients}
					onChange={(e) => onChange(e, "ingredients")}
					onFocus={() => onFocus("ingredients")}
				/>
				{header === "Add Item" ? (
					<div className="my-2 mb-4">
						<p className="text-sm font-normal mb-2">Display Rank</p>
						<Select
							className="basic-single"
							classNamePrefix="select"
							value={formData?.displayRank}
							name="color"
							options={displayRankList}
							onChange={(e) => onSelectChange("displayRank", e)}
						/>
					</div>
				) : null}
				{header === "Add Item" ? (
					<div className="my-2 mb-4">
						<p className="text-sm font-normal mb-2">Item Type</p>
						<Select
							className="basic-single"
							classNamePrefix="select"
							value={formData?.itemType}
							name="color"
							options={itemTypeList}
							onChange={(e) => onSelectChange("itemType", e)}
						/>
					</div>
				) : null}
				<div className="flex items-center mt-2">
					<div className="w-28 p-4 bg-gray-100 mr-3 rounded-2xl">
						<p className="mb-2">Available</p>
						<ToggleSwitch
							checked={formData.available}
							onChange={(e) => {
								setFormData((prevState) => {
									return {
										...prevState,
										available: e,
									};
								});
							}}
						/>
					</div>
					<div className="w-28 p-4 bg-gray-100 rounded-2xl">
						<p className="mb-2">Active</p>
						<ToggleSwitch
							checked={formData.active}
							onChange={(e) => {
								setFormData((prevState) => {
									return {
										...prevState,
										active: e,
									};
								});
							}}
						/>
					</div>
				</div>

				<div className="my-2 relative z-0">
					<ImageUpload
						handleImageSelect={handleImageSelect}
						imageSrc={itemImage?.url}
						setImageSrc={setItemImage}
						style={{
							width: 280,
							height: 200,
							background: "gold",
							zIndex: "1",
						}}
					/>
				</div>
				<ButtonNLoading
					className="mt-4"
					color="white"
					title={header === "Add Item" ? "Add" : "Update"}
					isLoading={isLoading}
					onClick={header === "Add Item" ? onAddItem : onUpdateItem}
				/>
			</div>
		</div>
	);
};

export default AddItemModal;

// const tagList = [
// 	{value: "Spicy", label: "Spicy"},
// 	{value: "Vegan", label: "Vegan"},
// 	{value: "Gluten free", label: "Gluten free"},
// 	{value: "Dairy free", label: "Dairy free"},
// 	{value: "Veg", label: "Veg"},
// 	{value: "Non-Veg", label: "Non-Veg"},
// ];
