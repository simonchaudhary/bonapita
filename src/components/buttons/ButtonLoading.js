import React from "react";
import Spinner from "react-spinkit";
import {PrimaryButton} from "./buttons";

function ButtonLoading({is}) {
	return (
		<PrimaryButton
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Spinner name="double-bounce" color="#ffffff" />
		</PrimaryButton>
	);
}

export default ButtonLoading;
