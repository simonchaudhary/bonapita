import {useState, useEffect} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import Spinner from "react-spinkit";

// Icons
import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

// Components
import {
	SalesAnalysisContainer,
	FilterContainer,
	Column,
	CustomDatePicker,
	CustomButtton,
	SalesResultContainer,
	Table,
	Th,
	Td,
	Tr,
	ModalBody,
	PaymentContainer,
	Row,
} from "./SalesAnalysisStyle";
import {Horizontal} from "../../../components/elements/elements";
import {Title, Detail} from "../../../components/texts/texts";
import ToastBar from "../../../components/ToastBar";
import Modals from "../../../components/modal/Modals";

// data
const dayFilter = [
	{title: "Filter  by Range", value: "null"},
	{title: "Last 7 days", value: "last7Days"},
	{title: "Last 30 days", value: "last30Days"},
	{title: "Last Quater", value: "lastQuarter"},
	{title: "Last Year", value: "lastYear"},
];

function SalesAnalysis() {
	// Redux State
	const user = useSelector((state) => state.user.user);

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [paymentList, setPaymentList] = useState(null);

	// filter
	const [filterDay, setFilterDay] = useState("null");
	const [dataLoading, setDataLoading] = useState(false);

	// UI
	const {Toast} = ToastBar();
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [showViewButton, setShowViewButton] = useState(true);

	// Data store
	const [selectPaymenDetail, setSelectPaymenDetail] = useState(null);

	const close = () => {
		setIsOpenModal(false);
		// resetField();
	};

	useEffect(() => {
		getSalesByFilter();
		return () => {
			setPaymentList(null);
		};
	}, [filterDay]);

	const viewSales = () => {
		// console.log("Start dates", startDate.valueOf());
		// let date = new Date(startDate.valueOf());

		if (startDate === null) {
			Toast("Select Start Date", "error");
		} else if (endDate === null) {
			Toast("Select End Date", "error");
		} else {
			setFilterDay("null");
			getSalesByRange(startDate.valueOf(), endDate.valueOf());
		}
	};

	const getSalesByRange = (start, end) => {
		// console.log(start, end, user.provider);
		setDataLoading(true);
		axios
			.get(
				"https://us-central1-afoodie-6d649.cloudfunctions.net/salesAnalysis/range?providerId=" +
					user?.provider +
					"&start=" +
					start +
					"&end=" +
					end
			)
			.then((res) => {
				console.log("Response getSalesByRange", start, end, res);
				if (res.data.success) {
					setPaymentList(res.data.data.payments);
					setDataLoading(false);
				}
			})
			.catch((err) => {
				console.error("Error getSalesByRange", err);
				setDataLoading(false);
			});
	};

	const getSalesByFilter = () => {
		// console.log(filterDay, user.provider);
		if (filterDay !== "null") {
			setDataLoading(true);
			axios
				.get(
					"https://us-central1-afoodie-6d649.cloudfunctions.net/salesAnalysis/" +
						filterDay +
						"?providerId=" +
						user?.provider
				)
				.then((res) => {
					console.log(`Response  getSalesByFilter of`, filterDay, res);
					if (res.data.success) {
						// alert("true");
						setDataLoading(false);
						setPaymentList(res.data.data.payments);
					}
				})
				.catch((err) => {
					console.error("Error getSalesByFilter", err);
					setDataLoading(false);
				});
		}
	};

	const showPayments = (item) => {
		console.log("showpayments", item);
		setSelectPaymenDetail(item);
		setIsOpenModal(true);
	};
	const showLastYearPayments = (item) => {
		console.log("showLastYearPayments", item, user?.provider, item.date);
		setIsOpenModal(true);
		setSelectPaymenDetail(null);
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/salesAnalysis/day?providerId=${user?.provider}&date=${item.date}`
			)
			.then((res) => {
				console.log("Response To get sales of given date", res);
				setSelectPaymenDetail({
					date: item?.date,
					payments: res.data.data.payments,
				});
			})
			.catch((err) => {
				console.error("Error To get sales of given date", err?.response);
			});
	};

	const startDateFocus = () => {
		setShowViewButton(true);
	};

	const endDateFocus = () => {
		setShowViewButton(true);
	};
	return (
		<>
			<Modals isOpen={isOpenModal} className="sales_analysis__modal">
				<div className="close__modal">
					<IconButton>
						<CloseRoundedIcon onClick={close} />
					</IconButton>
				</div>
				<ModalBody>
					<Column>
						<Detail>Date</Detail>
						<Title>{selectPaymenDetail?.date}</Title>
					</Column>
					<Horizontal />
					<Column style={{width: "100%"}}>
						<Detail>Payments</Detail>
						{selectPaymenDetail === null ? <h6>Loading</h6> : null}
						{selectPaymenDetail?.payments.map((item, i) => (
							<PaymentContainer>
								<Row>
									<Column>
										<Detail>Customer</Detail>
										<Title>{item.customerId}</Title>
									</Column>
									<Column>
										<Detail>Amount</Detail>
										<Title>{item.amount}</Title>
									</Column>
									<Column>
										<Detail>Brand</Detail>
										<Title>{item.brand}</Title>
									</Column>
									<Column>
										<Detail>Service Provider</Detail>
										<Title>{item.serviceProvider}</Title>
									</Column>
									<Column>
										<Detail>Type</Detail>
										<Title>{item.type}</Title>
									</Column>
								</Row>
							</PaymentContainer>
						))}
					</Column>
				</ModalBody>
			</Modals>

			{/* Main */}
			<SalesAnalysisContainer>
				<FilterContainer>
					<Column>
						<h5>Filter Day</h5>
						<select
							style={{background: "#f5f5f5"}}
							onChange={(e) => {
								// setStartDate(null);
								// setEndDate(null);
								console.log(e.target.value);

								if (e.target.value === "null") {
									setShowViewButton(true);
								} else {
									setShowViewButton(false);
								}
								setFilterDay(e.target.value);
							}}
							value={filterDay}
							disabled={dataLoading}
						>
							{dataLoading ? (
								<option>Loading</option>
							) : (
								<>
									{dayFilter.map((item, i) => (
										<option key={i} value={item.value}>
											{item.title}
										</option>
									))}
								</>
							)}
						</select>
					</Column>

					{filterDay === "null" ? (
						<>
							<Column>
								<h5>Start Date</h5>
								<CustomDatePicker
									selected={startDate}
									onFocus={startDateFocus}
									onChange={(date) => {
										setStartDate(date);
									}}
									selectsStart
									startDate={startDate}
									endDate={endDate}
									dateFormat="yyyy-MM-dd"
								/>
							</Column>
							<Column>
								<h5>End Date</h5>
								<CustomDatePicker
									selected={endDate}
									onFocus={endDateFocus}
									onChange={(date) => {
										setEndDate(date);
									}}
									selectsEnd
									startDate={startDate}
									endDate={endDate}
									minDate={startDate}
									dateFormat="yyyy-MM-dd"
								/>
							</Column>
						</>
					) : null}

					<Column>
						{showViewButton ? (
							<CustomButtton
								style={{width: "120px"}}
								onClick={viewSales}
								disabled={dataLoading}
							>
								{dataLoading ? "Loading" : "View"}
							</CustomButtton>
						) : null}
					</Column>
				</FilterContainer>

				<SalesResultContainer>
					{dataLoading ? (
						<Spinner name="double-bounce" color="#d65a31" />
					) : (
						<>
							{paymentList && (
								<Table>
									<Tr>
										<Th>Date</Th>
										<Th>No of Payments</Th>
									</Tr>
									{paymentList?.map((item, i) => (
										<Tr key={i}>
											<Td>{item.date}</Td>
											{filterDay === "lastYear" ? (
												<Td
													onClick={() =>
														showLastYearPayments(item)
													}
												>
													{item?.noOfPayments}
												</Td>
											) : (
												<Td onClick={() => showPayments(item)}>
													{item?.payments?.length}
												</Td>
											)}
										</Tr>
									))}
								</Table>
							)}
						</>
					)}
				</SalesResultContainer>
			</SalesAnalysisContainer>
		</>
	);
}

export default SalesAnalysis;
