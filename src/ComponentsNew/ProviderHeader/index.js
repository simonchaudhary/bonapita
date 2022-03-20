import React from "react";

// Package
import {useHistory} from "react-router-dom";

// Icons
import {IconButton} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

// Custom Hooks
import {
	useProviderPageInfo,
	useProviderDetail,
} from "../../Hooks/useProvider/useProvider";

const ProviderHeader = ({providerId, channel, qrProps}) => {
	// Initilization
	const history = useHistory();

	// Custom Hooks
	const {providerPageInfo} = useProviderPageInfo(providerId);
	const {providerDetail} = useProviderDetail(providerId);

	const goBack = () => {
		history.goBack();
	};

	return (
		<div className="flex items-center flex-col md:flex-row justify-between  py-1">
			<div className="flex items-center w-full">
				<div onClick={goBack}>
					<IconButton>
						<ArrowBackIosIcon />
					</IconButton>
				</div>
				{providerDetail && (
					<div>
						<p className="text-sm font-medium">
							{providerDetail?.name}
							<span className="mx-1 text-xs font-normal py-1 px-1 bg-purple-500 rounded-2xl text-white">
								{channel}
							</span>
						</p>

						<p className="text-sm font-light text-gray-400">
							{providerDetail?.location}
						</p>
					</div>
				)}
			</div>
			<div className="flex  items-center justify-between">
				<div>
					{channel === "QR code" || channel === "Dine In" ? (
						<div className="flex items-center justify-evenly md:justify-start px-2">
							<div className="mr-2">
								<p className="text-xs font-normal text-gray-800">
									Area
								</p>
								<p className="text-xs font-thin text-gray-400">
									{qrProps?.areaId?.substring(
										2,
										qrProps?.areaId.length
									)}
								</p>
							</div>
							<div className="mr-2">
								<p className="text-xs font-normal text-gray-800">
									Section
								</p>
								<p className="text-xs font-thin text-gray-400">
									{qrProps?.sectionId?.substring(
										2,
										qrProps?.sectionId.length
									)}
								</p>
							</div>
							<div className="mr-2">
								<p className="text-xs font-normal text-gray-800">
									Table
								</p>
								<p className="text-xs font-thin text-gray-400">
									{qrProps?.tableId?.substring(
										2,
										qrProps?.tableId.length
									)}
								</p>
							</div>
							<div className="mr-2">
								<p className="text-xs font-normal text-gray-800">
									Guest
								</p>
								<p className="text-xs font-thin text-gray-400">
									{qrProps?.guestId?.substring(
										2,
										qrProps?.guestId.length
									)}
								</p>
							</div>
						</div>
					) : null}
				</div>
				<div>
					<img
						width="80px"
						heigth="80px"
						src={providerPageInfo?.footerUrl}
					></img>
				</div>
			</div>
		</div>
	);
};

export default ProviderHeader;
