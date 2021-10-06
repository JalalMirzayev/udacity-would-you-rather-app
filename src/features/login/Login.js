import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { setUsername } from "../user/userSlice";
import { getUsers } from "../users/usersSlice";
import { getQuestions } from "../questions/questionsSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",

		justifyContent: "center",
		alignItems: "center",
		paddingTop: theme.spacing(4),
	},
	login: {
		width: 300,
		height: 250,
		justifyContent: "center",
		backgroundColor: "primary",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
	},
	inputFieldIcon: {
		padding: "8px",
	},
}));

const Login = (props) => {
	const classes = useStyles();
	const [username, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [invalidInput, setInvalidInput] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getQuestions());
	}, [dispatch]);

	const users = useSelector((state) => state.users.users);

	const history = useHistory();

	const validateUser = () => {
		const usernames = users.map((user) => user.id);
		if (usernames.includes(username)) {
			const user = users.find((user) => user.id === username);
			if (user.password === password) {
				dispatch(setUsername(username));
				history.push(
					window.location.href.slice("http://localhost:3000".length)
				);
			} else {
				setInvalidInput(true);
			}
		} else {
			setInvalidInput(true);
		}
	};

	return (
		<Container className={classes.root}>
			<Card className={classes.login} elevation={3}>
				<CardContent>
					<TextField
						placeholder='Username'
						InputProps={{
							startAdornment: (
								<AccountCircle className={classes.inputFieldIcon} />
							),
						}}
						value={username}
						onChange={(event) => setUser(event.target.value)}
					/>
				</CardContent>
				<CardContent>
					<TextField
						placeholder='Password'
						type='password'
						InputProps={{
							startAdornment: <VpnKeyIcon className={classes.inputFieldIcon} />,
						}}
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</CardContent>
				{invalidInput && (
					<CardContent>
						<Typography>Wrong credentials!</Typography>
					</CardContent>
				)}
				<CardActions>
					<Button color='primary' variant='outlined' onClick={validateUser}>
						Login
					</Button>
				</CardActions>
			</Card>
		</Container>
	);
};

export default Login;
