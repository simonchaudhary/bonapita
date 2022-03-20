import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

function ProtectedRoute({component: Component, ...rest}) {
	const user = useSelector((state) => state.user.user);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (user) {
					return <Component />;
				} else {
					return (
						<Redirect
							to={{
								pathname: "/",
								state: {from: props.location},
							}}
						/>
					);
				}
			}}
		></Route>
	);
}

export default ProtectedRoute;
