import React from "react";

import {useDispatch} from "react-redux";
import styled from "styled-components";
import Spinner from "react-spinkit";

// Actions
import {removeEmailForSignInAction} from "../../Redux/actions";

function FullPageLoading() {
	const dispatch = useDispatch();

	const cancel = () => {
		dispatch(removeEmailForSignInAction());
	};
	return (
		<FullPageLoadingContainer>
			<div className="flex flex-col justify-between items-center bg-white rounded-2xl px-8 py-4 border border-gray-200 shadow-md">
				<div>
					<Spinner name="three-bounce" color="#d65a31" />
					<p className="font-bold text-sm mt-6 text-center">Wait</p>
				</div>
				<button
					className="text-xs p-2 mt-2 hover:bg-gray-100  font-thin border border-gray-100 rounded"
					onClick={cancel}
				>
					Cancel
				</button>
			</div>
		</FullPageLoadingContainer>
	);
}

const FullPageLoadingContainer = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0px;
	z-index: 100;
	background: rgba(0, 0, 0, 0.2);
	/* display:flex;
	align-items: center;
	justify-content: center; */
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default FullPageLoading;
