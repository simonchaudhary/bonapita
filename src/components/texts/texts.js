import styled from "styled-components";
import {black, big, white3} from "../../assets/values";

export const HeaderText = styled.p`
	width: 100%;
	font-size: ${big};
	color: ${black};
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const Title = styled.p`
	width: 100%;
	font-size: 0.75rem;
	color: ${black};
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const Detail = styled.p`
	font-size: 0.75rem;
	color: ${white3};
	width: 100%;
	font-weight: 400;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
