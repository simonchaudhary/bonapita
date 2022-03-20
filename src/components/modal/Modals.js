import "./modalStyle.css";

import Modal from "react-modal";
Modal.setAppElement("#root");

function Modals(props) {
	return (
		<Modal
			isOpen={props.isOpen}
			onRequestClose={props.onRequestClose}
			contentLabel="My dialog"
			className={props.className}
			overlayClassName="myoverlay"
			closeTimeoutMS={1}
		>
			{props.children}
		</Modal>
	);
}

export default Modals;
