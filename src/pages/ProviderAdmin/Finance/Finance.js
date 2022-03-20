import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Chart from "react-apexcharts";
import axios from "axios";

function Finance() {
	// console.log("Finance", user);

	// Redux State
	const user = useSelector((state) => state.user.user);

	// daily
	const [seriesDaily, setSeriesDaily] = useState([]);
	const [optionDaily, setOptionDaily] = useState(new Map());
	// weekly
	const [seriesWeekly, setSeriesWeekly] = useState([]);
	const [optionWeekly, setOptionWeekly] = useState(new Map());
	// monthly
	const [seriesMonthly, setSeriesMonthly] = useState([]);
	const [optionMonthly, setOptionMonthly] = useState(new Map());

	useEffect(() => {
		const response = [
			{
				date: "3-1",
				dailySales: 130,
			},
			{
				date: "3-2",
				dailySales: 110,
			},
			{
				date: "3-3",
				dailySales: 30,
			},
			{
				date: "3-4",
				dailySales: 10,
			},
			{
				date: "3-5",
				dailySales: 150,
			},
			{
				date: "3-6",
				dailySales: 100,
			},
			{
				date: "3-7",
				dailySales: 40,
			},
		];

		let yaxis = [];
		let xaxis = [];

		response.map((item, i) => {
			xaxis.push(item.date);
			yaxis.push(item.dailySales);
		});

		// setSeriesWeekly(configSeries("Weekly Sales", yaxis));
		// setOptionWeekly(configOption("Weekly Sales Chart", xaxis));

		// setSeriesMonthly(configSeries("Monthly Sales", yaxis));
		// setOptionMonthly(configOption("Monthly Sales Chart", xaxis));

		getDailySales();
		getWeeklySales();
		getMonthlySales();
	}, []);

	const configSeries = (title, yaxis) => {
		const series = [
			{
				name: title,
				data: yaxis,
			},
		];
		return series;
	};

	const configOption = (title, xaxis) => {
		const option = {
			chart: {
				height: 100,
				type: "line",
				// zoom: {
				// 	enabled: true,
				// },
				animations: {
					enabled: true,
					easing: "easeinout",
					speed: 1000,
					animateGradually: {
						enabled: true,
						delay: 150,
					},
					dynamicAnimation: {
						enabled: true,
						speed: 350,
					},
				},
				dropShadow: {
					enabled: true,
					color: "#000",
					top: 12,
					left: 6,
					blur: 4,
					opacity: 0.2,
				},
			},
			plotOptions: {
				bar: {
					borderRadius: 4,
					horizontal: false,
				},
			},
			markers: {
				size: [4, 7],
			},
			stroke: {
				// width: 10,
				curve: "smooth",
			},
			fill: {
				colors: ["#d65a31"],
			},
			// fill: {
			// 	type: "gradient",
			// 	gradient: {
			// 		shade: "dark",
			// 		type: "horizontal",
			// 		shadeIntensity: 0.5,
			// 		gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
			// 		inverseColors: true,
			// 		opacityFrom: 1,
			// 		opacityTo: 1,
			// 		stops: [0, 50, 100],
			// 		colorStops: [],
			// 	},
			// },
			title: {
				text: title,
				align: "center",
			},
			grid: {
				row: {
					colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
					opacity: 0.8,
				},
			},
			xaxis: {
				categories: xaxis,
			},
		};
		return option;
	};

	const getDailySales = async () => {
		const response = await axios.get(
			"https://us-central1-afoodie-6d649.cloudfunctions.net/finReport/daily-sales?providerId=" +
				user?.provider
		);
		console.log("Response Get daily", response.data.data);
		let yaxis = [];
		let xaxis = [];

		response.data.data.map((item, i) => {
			xaxis.push(item.date);
			yaxis.push(Number(item.dailySales).toFixed(2));
		});

		setSeriesDaily(configSeries("Daily Sales", yaxis));
		setOptionDaily(configOption("Daily Sales Chart", xaxis));
	};

	const getWeeklySales = async () => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/finReport/weekly-sales?providerId=" +
					user?.provider
			)
			.then((res) => {
				console.log("Response Get weekly", res.data.data);
				let mainData = res.data.data;
				let data = Object.keys(res.data.data);

				let yaxis = [];
				let xaxis = [];
				data.map((item, i) => {
					// console.log("item", item);
					let itemString = item.toString();
					// console.log("xaixos", mainData[itemString].weeklySales);
					xaxis.push(item);
					yaxis.push(Number(mainData[itemString].weeklySales).toFixed(2));
				});

				setSeriesWeekly(configSeries("Weekly Sales", yaxis));
				setOptionWeekly(configOption("Weekly Sales Chart", xaxis));
			});
	};

	const getMonthlySales = async () => {
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/finReport/monthly-sales?providerId=" +
					user?.provider
			)
			.then((res) => {
				console.log("Resonse Get monthly", res.data.data);
				let mainData = res.data.data;
				let data = Object.keys(res.data.data);

				let yaxis = [];
				let xaxis = [];
				data.map((item, i) => {
					console.log("item", item);
					let itemString = item.toString();
					console.log("xaixos", mainData[itemString].monthlySales);
					xaxis.push(item);
					yaxis.push(Number(mainData[itemString].monthlySales).toFixed(2));
				});

				setSeriesMonthly(configSeries("Monthly Sales", yaxis));
				setOptionMonthly(configOption("Monthly Sales Chart", xaxis));
			});
	};

	return (
		<div className="finance">
			<div className="daily__sales">
				<div className="container">
					<Chart
						options={optionDaily}
						series={seriesDaily}
						type="bar"
						height="400"
					/>
				</div>

				<div className="container">
					<Chart
						options={optionWeekly}
						series={seriesWeekly}
						type="bar"
						height="400"
					/>
				</div>

				<div className="container">
					<Chart
						options={optionMonthly}
						series={seriesMonthly}
						type="line"
						height="400"
					/>
				</div>
			</div>
		</div>
	);
}

export default Finance;
