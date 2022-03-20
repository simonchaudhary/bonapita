import React, {useState} from "react";

// Package
import axios from "axios";
import {Tooltip} from "@varld/popover";
import {Switch, Route, useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {
	setAreaAction,
	setSectionAction,
	setTableAction,
} from "../../../Redux/actions";

// Icons
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import {IconButton} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

// Custom Hooks
import {
	useProviderPageInfo,
	useProviderDetail,
} from "../../../Hooks/useProvider/useProvider";

// Component
import {
	ManageDineInContainer,
	Header,
	Breadcrumbs,
	Column,
	ModalBody,
	ModalTitle,
	ModalContent,
	QRContainer,
	QRImage,
	Row,
	LogoImg,
} from "./ManageDineInStyle";
import {Title} from "../../../components/texts/texts";
import Modals from "../../../components/modal/Modals";
import Area from "./Area/Area";
import {Horizontal} from "../../../components/elements/elements";
import Section from "./Section/Section";
import Table from "./Table/Table";
import Guest from "./Guest/Guest";
import ButtonNLoading from "../../../components/buttons/ButtonNLoading";

function ManageDineIn() {
	// Redux state
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);

	// Custom Hook
	const {providerPageInfo} = useProviderPageInfo(user?.provider);
	const {providerDetail} = useProviderDetail(user?.provider);

	const manageDineBreadcrumbs = useSelector(
		(state) => state.manageDineBreadcrumbs
	);

	const history = useHistory();

	// Hooks
	const [qrCodeList, setQrCodeList] = useState(null);

	const [isLoadingPrintAllQRs, setIsLoadingPrintAllQRs] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);

	const allArea = () => {
		dispatch(setAreaAction(null));
		dispatch(setSectionAction(null));
		dispatch(setTableAction(null));
		history.replace("/managedinein");
	};
	const areaBreadcrumbs = () => {
		dispatch(setSectionAction(null));
		dispatch(setTableAction(null));
		history.replace(
			`/managedinein/section/${manageDineBreadcrumbs.area.areaId}`
		);
	};
	const sectionBreadcrumbs = () => {
		dispatch(setTableAction(null));
		history.replace(
			`/managedinein/table/${manageDineBreadcrumbs.area.areaId}/${manageDineBreadcrumbs.section.sectionId}`
		);
	};
	const tableBreadcrumbs = () => {
		history.replace(
			`/managedinein/guest/${manageDineBreadcrumbs.area.areaId}/${manageDineBreadcrumbs.section.sectionId}/${manageDineBreadcrumbs.table.tableId}`
		);
	};

	const printAllQr = () => {
		setIsLoadingPrintAllQRs(true);
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/barcode/barcodes?providerId=${user?.provider}`
			)
			.then((res) => {
				console.log("Response get all the barcodes of a provider", res);
				if (res.data.success) {
					setIsLoadingPrintAllQRs(false);
					setQrCodeList(res.data.data.barcodes);
					setIsOpenModal(true);
				}
			})
			.catch((error) => {
				console.log("Error get all the barcodes of a provider");
				setIsLoadingPrintAllQRs(false);
			});
	};

	const close = () => {
		setIsOpenModal(false);
		// setIsLoading(false);
	};

	return (
		<>
			<Modals isOpen={isOpenModal} className="all__qr__code__modal">
				<div className="close__modal">
					<IconButton>
						<CloseRoundedIcon onClick={close} />
					</IconButton>
				</div>
				<ModalBody>
					<ModalTitle>All QRs of Area</ModalTitle>
					<ModalContent>
						{qrCodeList?.map((item, i) => (
							<QRCodeContainer
								providerPageInfo={providerPageInfo}
								providerDetail={providerDetail}
								title={item.tablePath}
								src={item.barcodeUrl}
							/>
						))}
					</ModalContent>
				</ModalBody>
			</Modals>
			<ManageDineInContainer>
				<Header>
					<div style={{width: "150px", marginBottom: "0.75rem"}}>
						<ButtonNLoading
							onClick={printAllQr}
							title="Print All QRs"
							color="white"
							isLoading={isLoadingPrintAllQRs}
						></ButtonNLoading>
					</div>
					<Breadcrumbs>
						<Column onClick={allArea}>
							<Title>All Areas</Title>
							{/* <Title style={{ color: "white" }}>.</Title> */}
						</Column>
						{manageDineBreadcrumbs.area ? (
							<>
								<ChevronRightRoundedIcon />

								<Tooltip content="Area">
									<Column onClick={areaBreadcrumbs}>
										{/* <Title>Area</Title> */}
										<Title>
											{manageDineBreadcrumbs.area.areaName}
										</Title>
									</Column>
								</Tooltip>
							</>
						) : null}
						{manageDineBreadcrumbs.section ? (
							<>
								<ChevronRightRoundedIcon />
								<Tooltip content="Section">
									<Column onClick={sectionBreadcrumbs}>
										{/* <Title>Section</Title> */}
										<Title>
											{manageDineBreadcrumbs.section.sectionName}
										</Title>
									</Column>
								</Tooltip>
							</>
						) : null}
						{manageDineBreadcrumbs.table ? (
							<>
								<ChevronRightRoundedIcon />
								<Tooltip content="Table">
									<Column onClick={tableBreadcrumbs}>
										{/* <Title>Table</Title> */}

										<Title>
											{manageDineBreadcrumbs.table.tableName}
										</Title>
									</Column>
								</Tooltip>
							</>
						) : null}
					</Breadcrumbs>
				</Header>
				<Horizontal />
				<SwitchComponent />
			</ManageDineInContainer>
		</>
	);
}

const QRCodeContainer = ({providerPageInfo, providerDetail, title, src}) => {
	return (
		<QRContainer>
			<div style={{flex: "0.7"}}>
				<h4>{providerDetail?.name}</h4>
				<h5>{providerDetail?.location}</h5>
				<Row>
					<LogoImg src={providerPageInfo?.logoUrl} />
					<QRImage src={src}></QRImage>
				</Row>
			</div>
			<div
				style={{
					// width: "100%",
					margin: "0.5rem",
					border: "1px solid grey",
					flex: "0.3",
					// background: "red",
					display: "flex",
					alignItems: "center",
				}}
			>
				<Title
					style={{
						fontSize: "1.8rem",
						fontWeight: "600",
						marginBottom: "0.3rem",
						textAlign: "center",
						// paddingLeft: "0.6rem",
					}}
				>
					{title.replaceAll("/", "-")}
				</Title>
			</div>
		</QRContainer>
	);
};

const SwitchComponent = React.memo(() => {
	console.log("SwitchComponent");
	return (
		<Switch>
			<Route exact path="/managedinein" component={() => <Area />} />
			<Route
				path="/managedinein/section/:areaId"
				component={() => <Section />}
			/>
			<Route
				path="/managedinein/table/:areaId/:sectionId"
				component={() => <Table />}
			/>
			<Route
				path="/managedinein/guest/:areaId/:sectionId/:tableId"
				component={() => <Guest />}
			/>
			<Route component={() => <p>manager dine in page no found</p>} />
		</Switch>
	);
});

export default ManageDineIn;
