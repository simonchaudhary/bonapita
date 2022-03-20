import React, {useState, useEffect} from "react";

// Package
import {useSelector} from "react-redux";

// Custom Hooks
import useFormData from "../../../../Hooks/useFormData";

// API
import {
	addSubmenu,
	updateItemSubmenu,
	updateSubmenu,
} from "../../../../apis/Provider";

// Component
import Input from "../../../../ComponentsNew/Input";
import MenuTransfer from "../../../../ComponentsNew/MenuTransfer";
import ToastBar from "../../../../components/ToastBar";
import ButtonNLoading from "../../../../components/buttons/ButtonNLoading";

const AddSubmenuModal = ({header, selectedSubmenu, callBack}) => {
	// Initilization
	const {Toast} = ToastBar();

	// Redux State
	const user = useSelector((state) => state.user.user);

	// Hooks
	const [formData, setFormData] = useState({
		submenu: "",
	});
	const [formError, setFormError] = useState({
		submenu: "",
	});
	const [left, setLeft] = useState([]);
	const [right, setRight] = useState([]);

	// UI Hooks
	const [isLoading, setIsLoading] = useState(false);

	// useForm Hooks
	const {onChange, onFocus, setError} = useFormData(setFormData, setFormError);

	// useEffect
	useEffect(() => {
		// To update item submenu
		if (header === "Edit Submenu") {
			// console.log("right items", right, selectedSubmenu, user?.provider);
			//
			setFormData({submenu: selectedSubmenu?.subMenu});
			right.map((item) => {
				updateItemSubmenu(user?.provider, item, selectedSubmenu?.subMenuId)
					.then((res) => {
						console.log("Response", res);
					})
					.catch((err) => {
						console.log("Error", err);
					});
			});
		}
	}, [right]);

	// Functions
	const onAddSubmenu = () => {
		console.log("add");
		if (formData.submenu === "") {
			setError("submenu", "Field Required");
		} else {
			setIsLoading(true);
			console.log(formData);
			let data = {
				submenu: formData?.submenu,
			};
			addSubmenu(user?.provider, data)
				.then((res) => {
					console.log("Response", res);
					setIsLoading(false);
					callBack();
					Toast("Added", "success");
				})
				.catch((err) => {
					console.log("Error", err);
					setIsLoading(false);
				});
		}
	};

	const onUpdateSubmenu = () => {
		console.log("update");
		if (formData.submenu === "") {
			setError("submenu", "Field Required");
		} else {
			setIsLoading(true);
			console.log(formData);
			updateSubmenu(
				user?.provider,
				formData.submenu,
				selectedSubmenu?.subMenuId
			)
				.then((res) => {
					console.log("Response", res);
					setIsLoading(false);
					callBack();
					Toast("Updated", "success");
				})
				.catch((err) => {
					console.log("Error", err);
					setIsLoading(false);
				});
		}
	};

	return (
		<div className="h-90 overflow-y-auto overflow-x-hidden ">
			<header className="sticky top-0 z-50 bg-white font-medium text-lg border-b border-gray-300 pb-1">
				{header}
			</header>
			<div className="pt-2">
				<Input
					label="Submenu"
					error={formError.submenu}
					type="text"
					value={formData.submenu}
					onChange={(e) => onChange(e, "submenu")}
					onFocus={() => onFocus("submenu")}
				/>
				{header === "Edit Submenu" ? (
					<MenuTransfer
						left={left}
						setLeft={setLeft}
						right={right}
						setRight={setRight}
					/>
				) : null}

				<ButtonNLoading
					className="mt-4"
					color="white"
					title={header === "Add Submenu" ? "Add" : "Update"}
					isLoading={isLoading}
					onClick={
						header === "Add Submenu" ? onAddSubmenu : onUpdateSubmenu
					}
				/>
			</div>
		</div>
	);
};

export default AddSubmenuModal;
