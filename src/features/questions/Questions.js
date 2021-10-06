import React from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { setFilterCondition } from "./questionsSlice";

const useStyles = makeStyles((theme) => ({
	rootContainer: {
		width: 1030,
		marginLeft: "auto",
		marginRight: "auto",
	},
	root: {
		width: 500,
		marginLeft: "auto",
		marginRight: "auto",
	},
	toggleButtonGroup: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		marginLeft: "auto",
		marginRight: "auto",
	},
	toggleButton: {
		width: 120,
	},
	question: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	avatar: {
		margin: "8px",
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
	questions: {
		padding: theme.spacing(2),
	},
	card: {
		marginLeft: "auto",
		marginRight: "auto",
	},
	styledLink: {
		textDecoration: "none",
		color: "rgb(0, 0, 0)",
	},
}));

export default function Questions() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const filterCondition = useSelector(
		(state) => state.questions.filterCondition
	);
	const users = useSelector((state) => state.users.users);
	const userId = useSelector((state) => state.user.username);
	const questions = useSelector((state) => state.questions.entities);

	const handleToggle = (value) => {
		dispatch(setFilterCondition(value));
	};
	const filterQuestions = (filter, questions) => {
		return filter === "answered"
			? questions.filter(
					(q) =>
						q.optionOne.votes.includes(userId) ||
						q.optionTwo.votes.includes(userId)
			  )
			: filter === "unanswered"
			? questions.filter(
					(q) =>
						!q.optionOne.votes.includes(userId) &&
						!q.optionTwo.votes.includes(userId)
			  )
			: questions;
	};

	const sortQuestions = (questions) =>
		[...questions].sort((a, b) => b.timestamp - a.timestamp);

	return (
		<>
			<Grid
				container
				direction='column'
				alignItems='center'
				justifyContent='center'
				className={classes.rootContainer}
			>
				<ToggleButtonGroup
					color='primary'
					value={filterCondition}
					exclusive
					onChange={(event, value) => handleToggle(value)}
					className={classes.toggleButtonGroup}
				>
					<ToggleButton value='all' className={classes.toggleButton}>
						All
					</ToggleButton>
					<ToggleButton value='answered' className={classes.toggleButton}>
						Answered
					</ToggleButton>
					<ToggleButton value='unanswered' className={classes.toggleButton}>
						Unanswered
					</ToggleButton>
				</ToggleButtonGroup>
				<Grid container item spacing={3}>
					{sortQuestions(filterQuestions(filterCondition, questions)).map(
						(question) => {
							const user = users.find((user) => user.id === question.author);
							return (
								<Grid item key={question.id} xs={12} md={6} lg={6}>
									<QuestionShort user={user} question={question} />
								</Grid>
							);
						}
					)}
				</Grid>
			</Grid>
		</>
	);
}

function QuestionShort(props) {
	const classes = useStyles();
	const url = props.user.avatarURL;
	const username = props.user.name;
	const question = props.question;
	return (
		<>
			<Card className={classes.root} elevation={3}>
				<CardContent className={classes.question}>
					<Avatar alt={username} src={url} className={classes.avatar} />
					<Typography variant='subtitle1'>
						{username} asked: Would you rather ...
					</Typography>
				</CardContent>
				<Divider style={{ width: "100%" }} />
				<Container>
					<Grid container spacing={1}>
						<Grid
							alignItems='center'
							container
							item
							xs={12}
							spacing={3}
							className={classes.card}
						>
							<Grid item xs={6}>
								<Button disabled={true}>{question.optionOne.text}</Button>
							</Grid>
							<Grid item xs={6} container justifyContent='center'>
								<Button>
									<Link
										to={generatePath("/questions/:id", { id: question.id })}
										className={classes.styledLink}
									>
										View Question
									</Link>
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</Card>
		</>
	);
}
