import React from "react";

// Package
import {
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";

// Icons
import {IconButton} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRounded from "@material-ui/icons/DeleteRounded";

// Components
import CardVertical from "../../../../../components/CustomCards/CardVertical/CardVertical";

const MenuAccordionItem = ({
	item,
	openEditSubmenuModal,
	openDeleteSubmenuModal,
	menuDetail,
	deleteMenuItem,
}) => {
	// Modal
	// const [isOpen, setIsOpen] = useState(false);
	// const [whichModal, setWhichModal] = useState("");

	// // Functions
	// const close = () => {
	// 	setIsOpen((prevState) => !prevState);
	// };
	// const openDeleteSubmenuModal = (item) => {
	// 	console.log("openDeleteSubmenuModal", item);
	// 	setSelectedSubmenu(item);
	// 	setWhichModal("confirmDeleteSubmenu");
	// 	setIsOpen((prevState) => !prevState);
	// };
	// const deleteSubmenu = () => {
	// 	// Delete
	// 	console.log("deleteSubmenu", selectedSubmenu);
	// 	deleteSubmenu(user?.provider, selectedSubmenu.subMenuId)
	// 		.then((res) => {
	// 			console.log("Response dete item", res);
	// 			Toast("Submenu Delete Successfully", "success");
	// 			callBack();
	// 		})
	// 		.catch((err) => {
	// 			console.log("Error detele item ", err);
	// 		});
	// };
	return (
		<>
			{/* <Modals isOpen={isOpen} className="update__menu__modal">
				<div className="close__modal" onClick={close}>
					<IconButton>
						<CloseRoundedIcon />
					</IconButton>
				</div>
				{whichModal === "confirmDeleteSubmenu" ? (
					<ConfirmModal
						title="Are you sure want to delete?"
						deleteDone={deleteSubmenu}
						cancel={close}
					/>
				) : null}
			</Modals> */}
			<AccordionItem className="w-full  bg-gray-100">
				<div className="flex items-center justify-between">
					<AccordionItemHeading className="w-full">
						<AccordionItemButton
							style={{
								display: "flex",
								alignItems: "center",
								borderBottom: "1px solid #e1e1e1",
							}}
						>
							<h5>{item.subMenu}</h5>
						</AccordionItemButton>
					</AccordionItemHeading>

					<div className="flex items-center ">
						<div
							className="flex items-center justify-center w-10 md:w-20 h-16 bg-gray-100 border-b border-gray-200"
							onClick={() => openEditSubmenuModal(item)}
						>
							<IconButton>
								<EditRoundedIcon style={{height: "18px"}} />
							</IconButton>
						</div>
						<div
							className="flex items-center justify-center w-10 md:w-20 h-16 bg-gray-100 border-b border-gray-200"
							onClick={() => openDeleteSubmenuModal(item)}
						>
							<IconButton>
								<DeleteRounded style={{height: "18px"}} />
							</IconButton>
						</div>
					</div>
				</div>
				<AccordionItemPanel
					style={{
						padding: "0rem 0rem",
					}}
				>
					<div
						style={{
							display: "flex",
							background: "white",
							flexWrap: "wrap",
						}}
					>
						{item.items.map((item, i) => (
							<CardVertical
								key={i}
								item={item}
								type="provider"
								addItem={null}
								deleteItem={null}
								editSpecial={null}
								addToCart={null}
								menuDetail={menuDetail}
								orderNow={null}
								deleteMenuItem={deleteMenuItem}
							/>
						))}
					</div>
				</AccordionItemPanel>
			</AccordionItem>
		</>
	);
};

export default MenuAccordionItem;
