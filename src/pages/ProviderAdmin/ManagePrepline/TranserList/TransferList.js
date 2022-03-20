import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// Transfer List
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
	root: {
		// margin: "auto",
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		// background: "blue",

		"@media only screen and (max-width: 480px)": {
			justifyContent: "center",
		},
	},
	cardHeader: {
		padding: theme.spacing(1, 2),
	},
	list: {
		width: 300,
		height: 330,
		backgroundColor: theme.palette.background.paper,
		overflow: "auto",
	},
	button: {
		margin: theme.spacing(0.5, 0),
	},
}));

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

const TransferList = React.memo(({ left, setLeft, right, setRight }) => {
	console.log("Transefer list", right);
	// Redux State
	const user = useSelector((state) => state.user?.user);

	// Hooks

	// Transer List
	const classes = useStyles();
	const [checked, setChecked] = useState([]);

	// UseEffect
	useEffect(() => {
		console.log("UseEffect Transefer list");
		axios
			.get(
				`https://us-central1-afoodie-6d649.cloudfunctions.net/provider/${user?.provider}/menu`
			)
			.then((res) => {
				console.log("Response get provider menu", res);
				if (res.data.success) {
					let newMenuList = res.data.data.items?.map((item) => item.name);
					if (right.length > 0) {
						// Get element that is not in right box
						let myArray = newMenuList.filter((el) => !right.includes(el));
						setLeft(myArray);
					} else {
						setLeft(newMenuList);
					}
				}
			})
			.catch((err) => {
				console.error("Error get provider menu", err.response);
			});
	}, []);

	// Functions
	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
	};

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items?.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	const customList = (title, items) => (
		<Card>
			<CardHeader
				className={classes.cardHeader}
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={
							numberOfChecked(items) === items?.length &&
							items?.length !== 0
						}
						indeterminate={
							numberOfChecked(items) !== items?.length &&
							numberOfChecked(items) !== 0
						}
						disabled={items?.length === 0}
						inputProps={{ "aria-label": "all items selected" }}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items?.length} selected`}
			/>
			<Divider />
			<List className={classes.list} dense component="div" role="list">
				{items === null ? (
					<>
						{title === "Choices" ? (
							<p style={{ textAlign: "center", marginTop: "0.875rem" }}>
								Loading...
							</p>
						) : null}
					</>
				) : items?.length === 0 ? (
					<p style={{ textAlign: "center" }}>No Items</p>
				) : (
					<>
						{items?.map((value, i) => {
							const labelId = `transfer-list-all-item-${i}-label`;

							return (
								<ListItem
									key={i}
									role="listitem"
									button
									onClick={handleToggle(value)}
								>
									<ListItemIcon>
										<Checkbox
											checked={checked.indexOf(value) !== -1}
											tabIndex={-1}
											disableRipple
											inputProps={{
												"aria-labelledby": labelId,
											}}
										/>
									</ListItemIcon>
									<ListItemText id={labelId} primary={value} />
								</ListItem>
							);
						})}
					</>
				)}
				<ListItem />
			</List>
		</Card>
	);

	return (
		// <div style={{ background: "red" }}>
		<div>
			<p
				style={{
					fontSize: "0.75rem",
					fontWeight: "600",
					color: "#393e46",
					marginBottom: "10px",
					marginTop: "10px",
				}}
			>
				Menu Items
			</p>
			<Grid
				container
				spacing={2}
				justifyContent="center"
				alignItems="center"
				className={classes.root}
			>
				<Grid item>{customList("Choices", left)}</Grid>
				<Grid item>
					<Grid container direction="column" alignItems="center">
						<Button
							variant="outlined"
							size="small"
							className={classes.button}
							onClick={handleCheckedRight}
							disabled={leftChecked.length === 0}
							aria-label="move selected right"
						>
							&gt;
						</Button>
						<Button
							variant="outlined"
							size="small"
							className={classes.button}
							onClick={handleCheckedLeft}
							disabled={rightChecked.length === 0}
							aria-label="move selected left"
						>
							&lt;
						</Button>
					</Grid>
				</Grid>
				<Grid item>{customList("Chosen", right)}</Grid>
			</Grid>
		</div>
	);
});

export default TransferList;
