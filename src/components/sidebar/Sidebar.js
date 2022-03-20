import React from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import {Tooltip} from "@varld/popover";
import {useDispatch} from "react-redux";

import provideradminmenu from "../../assets/provideradminmenu";
import {
	setAreaAction,
	setSectionAction,
	setTableAction,
	tabSelected,
} from "../../Redux/actions";

// import "./sidebar.css";

const Sidebar = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const select = (item) => {
		console.log("select", item);
		// // remore manage dine in local
		// localStorage.removeItem("area");
		// localStorage.removeItem("section");
		// localStorage.removeItem("table");
		dispatch(setAreaAction(null));
		dispatch(setSectionAction(null));
		dispatch(setTableAction(null));
		dispatch(tabSelected("archiveOrder"));
		history.push(`/${item.value}`);
	};

	return (
		<SidebarContainer>
			{provideradminmenu.map((item, index) => (
				<Menu key={index} onClick={() => select(item)}>
					<Tooltip content={item.name}>
						<Icon src={item.icon} width="30px" />
					</Tooltip>
				</Menu>
			))}
		</SidebarContainer>
	);
};

const SidebarContainer = styled.div`
	width: 60px;
	height: calc(100vh - 70px);
	overflow-y: auto;
	background: #f5f5f5;

	@media only screen and (max-width: 480px) and (min-width: 100px) {
		height: calc(100vh - 60px);
	}
`;

const Menu = styled.div`
	padding: 0.875rem;
	@media only screen and (max-width: 480px) and (min-width: 100px) {
		padding: 0.75rem;
	}
	:hover {
		background: #e5e5e5;
	}
`;

const Icon = styled.img``;

export default Sidebar;
