import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

const Header = ({onClick, buttonLabel}) => {
	const [colorChange, setColorchange] = useState(false);

	const history = useHistory();

	const changeNavbarColor = () => {
		// console.log(
		// 	"changeNavbarColor",
		// 	document.querySelector("#inner")?.offsetTop,
		// 	window?.scrollY
		// );
		if (document.querySelector("#inner")?.offsetTop) {
			if (document.querySelector("#inner")?.offsetTop >= 8) {
				console.log(">true");
				setColorchange(true);
			} else {
				console.log("false");
				setColorchange(false);
			}
		}
	};

	useEffect(() => {
		console.log("hello");
		window.addEventListener("scroll", changeNavbarColor, true);
	}, []);

	// Functions
	const onLogoClick = () => {
		history.push("/");
	};

	return (
		<header
			id="inner"
			className={`${
				colorChange ? "bg-white shadow" : ""
			} sticky top-0 z-50 py-4 px-4 md:px-14 flex justify-between items-center transition duration-500 ease-in-out`}
		>
			<p
				className="text-black font-bold cursor-pointer"
				onClick={onLogoClick}
			>
				aFoodie<span className="text-red-500 font-bold">.</span>
			</p>
			{buttonLabel && (
				<div className="flex items-center">
					{/* <p className="text-sm font-light mr-4">Dont have account?</p> */}
					<button
						onClick={onClick}
						className="text-sm border border-gray-200 p-2 px-3 font-normal rounded hover:bg-gray-100 transition duration-500 ease-in-out"
					>
						{buttonLabel}
					</button>
				</div>
			)}
		</header>
	);
};

export default Header;
