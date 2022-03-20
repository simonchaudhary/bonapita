import {useState, useEffect} from "react";
import styled from "styled-components";

import BounceLoader from "react-spinners/BounceLoader";

import {Vertical} from "../elements/elements";

function ButtonNLoading({color, title, onClick, isLoading, className}) {
	let [loading, setLoading] = useState(false);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [isLoading]);

	return (
		<ButtonNLoadingContainer
			disabled={loading}
			onClick={onClick}
			className={className}
		>
			<BounceLoader color={color} loading={loading} size={30} />
			<Vertical />
			{loading ? "Loading" : title}
		</ButtonNLoadingContainer>
	);
}

// Styled
const ButtonNLoadingContainer = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	/* min-width: 100%; */
	height: 40px;
	border: none;
	font-size: 0.75rem;
	outline: none;
	padding: 0rem 0.25rem;
	border-radius: 0.4rem;
	background: #d65a31;
	color: white;
	transition: filter 300ms;

	@media only screen and (max-width: 480px) {
		/* width: 80px; */
		height: 40px;
		padding: 0.4rem;
		border-radius: 0.3rem;
	}
`;

export default ButtonNLoading;
