import React from "react";

// Package
import {Accordion} from "react-accessible-accordion";

// Components
import MenuAccordionItem from "./MenuAccordionItem";

const MenuAccordion = ({
	menuList,
	openEditSubmenuModal,
	menuDetail,
	deleteMenuItem,
	openDeleteSubmenuModal,
}) => {
	return (
		<Accordion allowZeroExpanded>
			{menuList?.map((item, i) => (
				<MenuAccordionItem
					key={i}
					item={item}
					openEditSubmenuModal={openEditSubmenuModal}
					menuDetail={menuDetail}
					deleteMenuItem={deleteMenuItem}
					openDeleteSubmenuModal={openDeleteSubmenuModal}
				/>
			))}
		</Accordion>
	);
};

export default MenuAccordion;
