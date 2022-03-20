import { useState, useEffect } from "react";
import Axios from "./API";

function GetProviderMenu({ user }) {
	const [menuList, setMenuList] = useState([]);

	useEffect(() => {
		console.log("getprovidermenu user", user);

		Axios.get("/provider/" + user?.provider + "/sub-menu").then(
			(response) => {
				console.log("Response getprovidersubmenu", response);
				setMenuList(response.data.data);
			}
		);
	}, []);

	return { menuList };
}

export default GetProviderMenu;
