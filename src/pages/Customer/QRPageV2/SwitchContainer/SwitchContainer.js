import React from "react";

// Package
import styled from "styled-components";
import { useSelector } from "react-redux";

// Icons
import { IconButton } from "@material-ui/core";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";

// Components
import { Container, Body, Bottom, NavButton } from "./SwitchContainerStyle";

const SwitchContainer = ({
	children,
	previous,
	next,
	pageIndex,
	guestList,
}) => {
	// Redux State
	const QR = useSelector((state) => state.QR);

	return (
		<Container>
			<Body>{children}</Body>

			<Bottom>
				{pageIndex > 1 &&
				pageIndex < 6 &&
				guestList?.length > 1 &&
				QR?.guestNo === 1 ? (
					<NavButton onClick={previous}>
						<IconButton>
							<ArrowBackRoundedIcon />
						</IconButton>
					</NavButton>
				) : (
					<IconButton style={{ opacity: "0" }}>
						<ArrowForwardRoundedIcon />
					</IconButton>
				)}
				{pageIndex < 5 ? (
					<NavButton onClick={next}>
						<IconButton>
							<ArrowForwardRoundedIcon />
						</IconButton>
					</NavButton>
				) : (
					<IconButton style={{ opacity: "0" }}>
						<ArrowForwardRoundedIcon />
					</IconButton>
				)}
			</Bottom>
		</Container>
	);
};

export default SwitchContainer;
