import React, {useState, useEffect} from "react";

// Package
import {useSelector} from "react-redux";
import Select from "react-select";

// Api
import {
	getMenuBySubmenu,
	deleteMenuItem,
	deleteSubmenu,
} from "../../../apis/Provider";

// Values
import {orderByList} from "../../../apis/values";

// Icons
import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

// Components
import Modals from "../../../components/modal/Modals";
import AddSubmenuModal from "./AddSubmenuModal";
import {PrimaryButton, SecondaryButton} from "../../../ComponentsNew/Button";
import MenuAccordion from "./MenuAccordion";
import AddItemModal from "./AddItemModal";
import ConfirmModal from "../../../ComponentsNew/ConfirmModal";
import AlertModal from "../../../ComponentsNew/AlertModal";
import ToastBar from "../../../components/ToastBar";

function ManageMenu() {
	// Initilization
	const {Toast} = ToastBar();

	// Redux State
	const user = useSelector((state) => state.user.user);

	// Hooks
	const [menuList, setMenuList] = useState(null);
	const [selectedSubmenu, setSelectedSubmenu] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);

	// UI
	const [isLoading, setIsLoading] = useState(false);
	const [orderBy, setOrderBy] = useState({
		value: "asc",
		label: "Asc",
	});
	const [isUpdateSubmenu, setIsUpdateSubmenu] = useState(false);

	// Modal
	const [isOpen, setIsOpen] = useState(false);
	const [whichModal, setWhichModal] = useState("");

	// UseEffect
	useEffect(() => {
		getMenuBySubmenu(user?.provider, orderBy)
			.then((res) => {
				console.log("Response", res);
				setMenuList(res.data.data);
			})
			.catch((err) => {
				console.log("Error ", err);
			});
	}, [orderBy, isUpdateSubmenu]);

	// Component Functions
	const handleOrderChange = (orderBy) => {
		console.log(orderBy);
		setOrderBy(orderBy);
	};
	const close = () => {
		setIsOpen((prevState) => !prevState);
	};

	const openAddSubmenuModal = () => {
		setWhichModal("addSubmenu");
		setIsOpen((prevState) => !prevState);
	};
	const openAddItemModal = () => {
		setWhichModal("addItem");
		setIsOpen((prevState) => !prevState);
	};

	const openEditSubmenuModal = (item) => {
		console.log("openEditSubmenuModal", item);
		setSelectedSubmenu(item);
		setWhichModal("editSubmenu");
		setIsOpen((prevState) => !prevState);
	};

	const openDeleteMenuItemModal = (item) => {
		console.log("openDeleteMenuItemModal", item);
		setSelectedItem(item);
		setWhichModal("confirmDelete");
		setIsOpen((prevState) => !prevState);
	};

	// Functions
	const menuDetail = (item) => {
		console.log("Menu Detail", item);
		setSelectedItem(item);
		setWhichModal("editItem");
		setIsOpen((prevState) => !prevState);
	};

	const deleteItem = () => {
		// Delete
		setIsLoading(true);
		console.log("deleteItem", selectedItem);
		deleteMenuItem(user?.provider, selectedItem.itemId)
			.then((res) => {
				console.log("Response dete item", res);
				Toast("Item Delete Successfully", "success");
				setIsLoading(false);
				callBack();
			})
			.catch((err) => {
				console.log("Error detele item ", err);
			});
	};

	const openDeleteSubmenuModal = (item) => {
		console.log("openDeleteSubmenuModalssss", item);
		if (item?.items?.length === 0) {
			setSelectedSubmenu(item);
			setWhichModal("confirmDeleteSubmenu");
			setIsOpen((prevState) => !prevState);
		} else if (item?.items?.length > 0) {
			setSelectedSubmenu(item);
			setWhichModal("showAlert");
			setIsOpen((prevState) => !prevState);
		}
		// if (item?.items?.length > 0) {
		// 	setSelectedSubmenu(item);
		// 	setWhichModal("confirmDeleteSubmenu");
		// 	setIsOpen((prevState) => !prevState);
		// } else if (item?.items?.length === 0) {
		// 	// You cant delete subment show message insted
		// 	setWhichModal("showAlert");
		// 	setIsOpen((prevState) => !prevState);
		// }
	};

	const onDeleteSubmenu = () => {
		setIsLoading(true);
		// Delete
		console.log("deleteSubmenusssssss", selectedSubmenu);
		deleteSubmenu(user?.provider, selectedSubmenu.subMenuId)
			.then((res) => {
				console.log("Response dete item", res);
				Toast("Submenu Delete Successfully", "success");
				setIsLoading(false);
				callBack();
			})
			.catch((err) => {
				console.log("Error detele item ", err);
				setIsLoading(false);
			});
	};

	const callBack = () => {
		console.log("callBack");
		setIsOpen((prevState) => !prevState);
		setIsUpdateSubmenu((prevState) => !prevState);
	};

	return (
		<>
			{/* Modals */}
			<Modals isOpen={isOpen} className="update__menu__modal">
				<div className="close__modal" onClick={close}>
					<IconButton>
						<CloseRoundedIcon />
					</IconButton>
				</div>
				{whichModal === "addSubmenu" ? (
					<AddSubmenuModal
						header="Add Submenu"
						close={close}
						callBack={callBack}
					/>
				) : whichModal === "editSubmenu" ? (
					<AddSubmenuModal
						header="Edit Submenu"
						selectedSubmenu={selectedSubmenu}
						callBack={callBack}
					/>
				) : whichModal === "addItem" ? (
					<AddItemModal
						header="Add Item"
						close={close}
						callBack={callBack}
					/>
				) : whichModal === "editItem" ? (
					<AddItemModal
						header="Edit Item"
						selectedItem={selectedItem}
						callBack={callBack}
					/>
				) : whichModal === "confirmDelete" ? (
					<ConfirmModal
						title="Are you sure want to delete?"
						deleteDone={deleteItem}
						cancel={close}
						isLoading={isLoading}
					/>
				) : whichModal === "confirmDeleteSubmenu" ? (
					<ConfirmModal
						title={`Are you sure want to delete ${selectedSubmenu?.subMenu}?`}
						deleteDone={onDeleteSubmenu}
						cancel={close}
						isLoading={isLoading}
					/>
				) : whichModal === "showAlert" ? (
					<AlertModal
						title={`You cant delete this submenu there is item in  submenu.`}
						ok={close}
					/>
				) : null}
			</Modals>

			{/* Component */}
			<div>
				{/* Header */}
				<div className=" md:flex items-center justify-between p-3 bg-gray-100">
					<div className="flex items-center justify-between mb-1">
						<PrimaryButton
							onClick={openAddSubmenuModal}
							title="Add Submenu"
							className="mr-1"
						/>
						<SecondaryButton
							onClick={openAddItemModal}
							title="Add Item"
						/>
					</div>
					<div className="w-full md:w-24">
						<Select
							value={orderBy}
							onChange={handleOrderChange}
							options={orderByList}
						/>
					</div>
				</div>
				{/* Body */}
				<div>
					{!menuList ? (
						<p className="text-medium text-center text-xl mt-4">
							Loading
						</p>
					) : null}
					{menuList ? (
						<MenuAccordion
							menuList={menuList}
							openEditSubmenuModal={openEditSubmenuModal}
							menuDetail={menuDetail}
							deleteMenuItem={openDeleteMenuItemModal}
							openDeleteSubmenuModal={openDeleteSubmenuModal}
						/>
					) : null}
				</div>
			</div>
		</>
	);
}

export default ManageMenu;
