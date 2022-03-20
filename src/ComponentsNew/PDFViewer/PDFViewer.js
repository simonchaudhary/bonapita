import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import { usePDF, Document, Page } from "@react-pdf/renderer";
import { useParams, useHistory } from "react-router-dom";

// Icon
import { IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";

// Component
import {
	PDFViewerContainer,
	PDFViewerHeader,
	PDFViewerBody,
	Previous,
	Next,
	PDFViewerBodyFooter,
	ShowPageNo,
	CDocument,
	CPage,
} from "./PDFViewerStyle";

function PDFViewer() {
	// React Router
	const { providerId } = useParams();
	const { type } = useParams();

	// Initilization
	pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
	const history = useHistory();
	const urll = `https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${providerId}/menu-pdf?type=${type}`;

	// Hooks
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [url, seturl] = useState(urll);

	// UI
	const [showFooterNav, setShowFooterNav] = useState(true);

	useEffect(() => {
		seturl(urll);
	}, [providerId]);

	/*To Prevent right click on screen*/
	document.addEventListener("contextmenu", (event) => {
		event.preventDefault();
	});

	/*When document gets loaded successfully*/
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	function changePage(offset) {
		setPageNumber((prevPageNumber) => prevPageNumber + offset);
	}

	function previousPage() {
		changePage(-1);
	}

	function nextPage() {
		changePage(1);
	}

	const goBack = () => {
		history.goBack();
	};

	// useEffect
	useEffect(() => {
		console.log("First Show Footer");
		setTimeout(() => {
			setShowFooterNav(false);
		}, 3000);
	}, []);

	const showNavigation = () => {
		console.log("showe footer function ");
		setShowFooterNav((prevState) => {
			console.log(prevState);
			// if (prevState) {
			// 	setTimeout(() => {
			// 		return !prevState;
			// 	}, 2000);
			// } else {
			// }
			return !prevState;
		});

		// setTimeout(() => {
		// 	setShowFooterNav(false);
		// }, 3000);
	};

	const onMouseEnterFooter = () => {
		console.log("onMouseEnterFooter");
		setShowFooterNav(true);
	};
	const onMouseLeaveFooter = () => {
		console.log("onMouseLeaveFooter");
		setShowFooterNav(false);
	};

	return (
		<PDFViewerContainer>
			<PDFViewerHeader>
				<IconButton style={{ marginLeft: "0.875rem" }} onClick={goBack}>
					<ArrowBackIosIcon />
				</IconButton>
			</PDFViewerHeader>
			<PDFViewerBody onClick={showNavigation}>
				<CDocument file={url} onLoadSuccess={onDocumentLoadSuccess}>
					<CPage pageNumber={pageNumber} />
				</CDocument>
			</PDFViewerBody>

			<div>
				<Previous
					onMouseEnter={onMouseEnterFooter}
					onMouseLeave={onMouseLeaveFooter}
					type="button"
					disabled={pageNumber <= 1}
					onClick={previousPage}
					// style={{ opacity: pageNumber <= 1 ? "0" : "1" }}
					style={{
						opacity: !showFooterNav || pageNumber <= 1 ? "0" : "1",
					}}
				>
					<IconButton>
						<ArrowBackRoundedIcon />
					</IconButton>
				</Previous>
				<ShowPageNo
					style={{
						opacity: !showFooterNav ? "0" : "1",
					}}
				>
					{pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
				</ShowPageNo>
				<Next
					onMouseEnter={onMouseEnterFooter}
					onMouseLeave={onMouseLeaveFooter}
					type="button"
					disabled={pageNumber >= numPages}
					onClick={nextPage}
					// style={{
					// 	opacity: pageNumber >= numPages ? "0" : "1",
					// }}
					style={{
						opacity: !showFooterNav || pageNumber >= numPages ? "0" : "1",
					}}
				>
					<IconButton>
						<ArrowForwardRoundedIcon />
					</IconButton>
				</Next>
			</div>
		</PDFViewerContainer>
	);
}

export default PDFViewer;
