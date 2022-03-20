import React, {useState, useEffect} from "react";
import BounceLoader from "react-spinners/BounceLoader";

export const PrimaryButton = React.memo(({title, className, onClick}) => {
	return (
		<div
			onClick={onClick}
			className={`text-sm text-center font-normal  min-w-20 bg-primary px-3 py-3 text-white rounded ${className}`}
		>
			{title}
		</div>
	);
});
export const SecondaryButton = React.memo(({title, className, onClick}) => {
	return (
		<div
			onClick={onClick}
			className={`text-sm text-center font-normal  min-w-20 bg-white  border border-bg-primary px-3 py-2 text-primary rounded ${className}`}
		>
			{title}
		</div>
	);
});

export const ButtonLoading = ({
	color,
	title,
	onClick,
	isLoading,
	className,
}) => {
	let [loading, setLoading] = useState(false);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [isLoading]);

	return (
		<button
			disabled={loading}
			onClick={onClick}
			className={`flex items-center justify-center w-full text-sm bg-green-500 hover:bg-green-600 text-white p-2 font-medium rounded transition duration-500 ease-in-out ${className}`}
		>
			<BounceLoader color={color} loading={loading} size={20} />
			<div className="mr-2"></div>
			{loading ? "Loading" : title}
		</button>
	);
};

export const SecondaryButtonLoading = ({
	color,
	title,
	onClick,
	isLoading,
	className,
}) => {
	let [loading, setLoading] = useState(false);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [isLoading]);

	return (
		<button
			disabled={loading}
			onClick={onClick}
			className={`flex items-center justify-center w-full text-sm border border-green-500 text-green-500 hover:text-white hover:bg-green-600  p-2 font-medium rounded transition duration-500 ease-in-out ${className}`}
		>
			<BounceLoader color={color} loading={loading} size={20} />
			<div className="mr-2"></div>
			{loading ? "Loading" : title}
		</button>
	);
};
