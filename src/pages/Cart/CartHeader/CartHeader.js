// Icons
import {IconButton} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {useProviderDetail} from "../../../Hooks/useProvider/useProvider";
// Component
import {TagFilterContainer, TagRow} from "./CartHeaderStyle";

const CartHeader = ({
	onFilterSelect,
	selectedTag,
	channel,
	providerId,
	qrProps,
}) => {
	console.log("CartHeader", qrProps);

	// Initilization
	const history = useHistory();

	// Redux State
	const provider = useSelector((state) => state.menus.provider);

	// Custom Hooks

	const {providerDetail} = useProviderDetail(providerId);

	// Functions
	const goBack = () => {
		history.goBack();
	};

	return (
		<div className="flex flex-col">
			<div className="flex items-center">
				<IconButton onClick={goBack}>
					<ArrowBackIosIcon style={{width: "20px", height: "20px"}} />
				</IconButton>

				<p className="text-xs  md:mr-1 font-semibold mr-2">
					{providerDetail?.name}
				</p>
				<p className="mr-1 text-xs font-normal py-1 px-2 bg-purple-500 rounded-2xl text-white">
					{channel}
				</p>
			</div>

			{channel === "QR code" || channel === "Dine In" ? (
				<div className="flex items-center justify-evenly md:justify-start px-2">
					<div className="mr-2">
						<p className="text-xs font-normal text-gray-800">Area</p>
						<p className="text-xs font-thin text-gray-400">
							{qrProps?.areaId}
						</p>
					</div>
					<div className="mr-2">
						<p className="text-xs font-normal text-gray-800">Section</p>
						<p className="text-xs font-thin text-gray-400">
							{qrProps?.sectionId}
						</p>
					</div>
					<div className="mr-2">
						<p className="text-xs font-normal text-gray-800">Table</p>
						<p className="text-xs font-thin text-gray-400">
							{qrProps?.tableId}
						</p>
					</div>
					<div className="mr-2">
						<p className="text-xs font-normal text-gray-800">Guest</p>
						<p className="text-xs font-thin text-gray-400">
							{qrProps?.guestId}
						</p>
					</div>
				</div>
			) : null}

			<div className="flex justify-center  md:justify-end mt-2">
				<TagRow>
					{provider?.data?.providerDetail?.tags?.map((item, i) => (
						<div key={i} onClick={() => onFilterSelect(item.name)}>
							{item.name === "all" ? (
								<TagFilterContainer
									style={{
										padding: "0.5rem",
										background:
											selectedTag === "all" ? "#212121" : null,
										color: selectedTag === "all" ? "white" : null,
									}}
								>
									All
								</TagFilterContainer>
							) : item.name === "Spicy" ? (
								<TagFilterContainer
									Spicy
									style={{
										paddingBottom: "0.3rem",
										background:
											selectedTag === "Spicy" ? "red" : null,
										color: selectedTag === "Spicy" ? "white" : null,
									}}
								>
									<img src={item.imageUrl} width="25" />
								</TagFilterContainer>
							) : item.name === "Vegan" ? (
								<TagFilterContainer
									Vegan
									style={{
										paddingBottom: "0.3rem",
										background:
											selectedTag === "Vegan" ? "#22b483" : null,
										color: selectedTag === "Vegan" ? "white" : null,
									}}
								>
									<img src={item.imageUrl} width="25" />
								</TagFilterContainer>
							) : item.name === "Gluten free" ? (
								<TagFilterContainer
									Gluten
									style={{
										paddingBottom: "0.3rem",
										background:
											selectedTag === "Gluten free"
												? "yellow"
												: null,
										color:
											selectedTag === "Gluten free" ? "white" : null,
									}}
								>
									<img src={item.imageUrl} width="25" />
								</TagFilterContainer>
							) : item.name === "Dairy free" ? (
								<TagFilterContainer
									Dairy
									style={{
										paddingBottom: "0.3rem",
										background:
											selectedTag === "Dairy free" ? "grey" : null,
										color:
											selectedTag === "Dairy free" ? "white" : null,
									}}
								>
									<img src={item.imageUrl} width="25" />
								</TagFilterContainer>
							) : item.name === "Veg" ? (
								<TagFilterContainer
									Veg
									style={{
										paddingBottom: "0.3rem",
										background:
											selectedTag === "Veg" ? "#1d7f29" : null,
										color: selectedTag === "Veg" ? "white" : null,
									}}
								>
									<img src={item.imageUrl} width="25" />
								</TagFilterContainer>
							) : item.name === "Non-Veg" ? (
								<TagFilterContainer
									Nonveg
									style={{
										paddingBottom: "0.3rem",
										background:
											selectedTag === "Non-Veg" ? "#8d272b" : null,
										color: selectedTag === "Non-Veg" ? "white" : null,
									}}
								>
									<img src={item.imageUrl} width="25" />
								</TagFilterContainer>
							) : null}
						</div>
					))}
				</TagRow>
			</div>
		</div>
	);
};

export default CartHeader;
