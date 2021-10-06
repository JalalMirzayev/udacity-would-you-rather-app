import React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUsername } from "../user/userSlice";
import { setFilterCondition } from "../questions/questionsSlice";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		display: "flex",
		textTransform: "uppercase",
		flex: 1,
	},
	buttons: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	person: {
		display: "flex",
		flexDirection: "row-reversed",
		flex: 1,
		alignItems: "center",
		marginLeft: "auto",
	},
	personIcon: {
		padding: "8px",
	},
	styledLink: {
		textDecoration: "none",
		color: "rgb(255, 255, 255)",
	},
}));

export default function Navigation() {
	const classes = useStyles();
	const user = useSelector((state) => state.user.username);
	const dispatch = useDispatch();

	const handleLogOut = () => {
		dispatch(setUsername(""));
		dispatch(setFilterCondition("unanswered"));
	};

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						Would You Rather?
					</Typography>
					<div className={classes.buttons}>
						<Button color='inherit'>
							<Link to='/' className={classes.styledLink}>
								Home
							</Link>
						</Button>
						<Button color='inherit'>
							<Link to='/add' className={classes.styledLink}>
								Publish New Question
							</Link>
						</Button>
						<Button color='inherit'>
							<Link to='/leaderboard' className={classes.styledLink}>
								Leaderboard
							</Link>
						</Button>
					</div>
					<span className={classes.person}>
						<AccountCircle className={classes.personIcon} />
						<Typography variant='subtitle1'>{user}</Typography>
					</span>
					<span>
						<ExitToAppIcon onClick={handleLogOut} />
					</span>
				</Toolbar>
			</AppBar>
		</div>
	);
}
