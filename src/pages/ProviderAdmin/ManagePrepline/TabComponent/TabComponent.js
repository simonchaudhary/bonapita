import React, {useState} from "react";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Components
import PreplineData from "../PreplineData/PreplineData";
import PreplineUsers from "../PreplineUsers/PreplineUsers";

function TabComponent({callBack, selectedPrepline}) {
	console.log("TabComponent", selectedPrepline);
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};
	return (
		<div className={classes.root}>
			<AppBar
				position="static"
				color="default"
				style={{boxShadow: "0 0 0 0"}}
			>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					<Tab
						style={{fontSize: "0.875rem", textTransform: "capitalize"}}
						label="PrepLine Data"
						{...a11yProps(0)}
					/>
					<Tab
						style={{fontSize: "0.875rem", textTransform: "capitalize"}}
						label="PrepLine Users"
						{...a11yProps(1)}
					/>
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel
					style={{padding: "0px"}}
					value={value}
					index={0}
					dir={theme.direction}
				>
					<PreplineData
						callBack={callBack}
						selectedPrepline={selectedPrepline}
					/>
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<PreplineUsers selectedPrepline={selectedPrepline} />
				</TabPanel>
			</SwipeableViews>
		</div>
	);
}

function TabPanel(props) {
	const {children, value, index, ...other} = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <>{children}</>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: "100%",
	},
}));

export default TabComponent;
