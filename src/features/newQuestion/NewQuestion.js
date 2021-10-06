import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, saveQuestion } from "../questions/questionsSlice";
import { useHistory } from "react-router-dom";
import { getUsers } from "../users/usersSlice";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: theme.spacing(4),
	},
	card: {
		margin: "auto",
	},
	question: {
		display: "flex",
		alignItems: "center",
	},
	avatar: {
		margin: "8px",
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
	options: {
		padding: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	option: {
		margin: theme.spacing(1),
		minWidth: "100%",
	},
	submitButton: {
		margin: theme.spacing(1),
		width: "170px",
	},
}));

export default function NewQuestion(props) {
	const users = useSelector((state) => state.users.users);
	const username = useSelector((state) => state.user.username);
	const user = users.find((user) => user.id === username);
	const [optionOneInput, setOptionOneInput] = useState("");
	const [optionTwoInput, setOptionTwoInput] = useState("");
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const handlePublishQuestion = () => {
		const question = {
			author: username,
			optionOneText: optionOneInput,
			optionTwoText: optionTwoInput,
		};
		dispatch(saveQuestion(question));
		dispatch(getQuestions());
		dispatch(getUsers());
		history.push("/");
	};

	return (
		<Container className={classes.root}>
			<Card className={classes.card} elevation={3}>
				<CardContent className={classes.question}>
					<Avatar
						alt={user.id}
						src={user.avatarURL}
						className={classes.avatar}
					/>
					<Typography variant='subtitle1'>
						Formulate your question: Would you rather ...
					</Typography>
				</CardContent>
				<Divider style={{ width: "100%" }} />
				<Container className={classes.options}>
					<TextField
						xs={12}
						variant='outlined'
						label='Option 1'
						value={optionOneInput}
						className={classes.option}
						onChange={(event) => setOptionOneInput(event.target.value)}
					/>
					<TextField
						xs={12}
						variant='outlined'
						label='Option 2'
						value={optionTwoInput}
						className={classes.option}
						onChange={(event) => setOptionTwoInput(event.target.value)}
					/>
					<Button
						variant='outlined'
						className={classes.submitButton}
						onClick={handlePublishQuestion}
					>
						Publish Question
					</Button>
				</Container>
			</Card>
		</Container>
	);
}
