// Package
import {useSelector} from "react-redux";

// Components
import RankDisplay from "../RankDisplay/RankDisplay";

const CartBody = ({
	showSubmenuOrTagmenu,
	displayRankCart,
	selectedMenuListByTag,
	addItem,
	deleteItem,
	editSpecial,
}) => {
	console.log("CartBody");

	// Redux State
	const cart = useSelector((state) => state.cart.cart);

	return (
		<div>
			{showSubmenuOrTagmenu === "all" ? (
				<>
					{cart?.length === 0 ? (
						<p>No Items</p>
					) : (
						displayRankCart?.map((item, i) => (
							<div key={i}>
								<RankDisplay
									title={item?.subMenu}
									items={item?.items}
									addItem={addItem}
									deleteItem={deleteItem}
									editSpecial={editSpecial}
								/>
							</div>
						))
					)}
				</>
			) : (
				<>
					{selectedMenuListByTag === undefined ? (
						<p>No Items</p>
					) : (
						<>
							{selectedMenuListByTag?.map((item, i) => (
								<div key={i}>
									<RankDisplay
										title={item?.subMenu}
										items={item?.items}
										addItem={addItem}
										deleteItem={deleteItem}
										editSpecial={editSpecial}
									/>
								</div>
							))}
						</>
					)}
				</>
			)}
		</div>
	);
};

export default CartBody;
