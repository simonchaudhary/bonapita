import React, {useState, useEffect} from "react";
// Package
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

// Actions
import {fetchBeverage} from "../../../Redux/actions";

// Componets
import {
	BeverageListContainer,
	Row,
	MenuHeader,
	TagRow,
	TagFilterContainer,
	SubMenuContainer,
	SubMenuTitle,
	SubMenuItemList,
	BeverageBody,
	LoadingContainer,
} from "./BeverageStyle";
import CardHorizontal from "../../CardHorizontal/CardHorizontal";
const Beverage = React.memo(({providerId, showAddButton, onAdd}) => {
	console.log("Beverage", providerId);

	// Initilization
	const dispatch = useDispatch();

	// Redux
	const menus = useSelector((state) => state.menus.beverage);

	return (
		<BeverageListContainer>
			<Row>
				<MenuHeader>Beverages</MenuHeader>
			</Row>
			<BeverageBody>
				{menus?.loading ? (
					<LoadingContainer>Loading...</LoadingContainer>
				) : (
					<>
						{menus?.data?.map((item, i) => (
							<SubMenuContainer key={i}>
								<SubMenuTitle>{item.subMenu}</SubMenuTitle>
								<SubMenuItemList>
									{item.items.map((menu, i) => (
										<CardHorizontal
											key={i}
											item={menu}
											showAddButton={showAddButton}
											onAdd={onAdd}
										/>
									))}
								</SubMenuItemList>
							</SubMenuContainer>
						))}
					</>
				)}
			</BeverageBody>
		</BeverageListContainer>
	);
});

export default Beverage;
