import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { getQuestions, saveQuestionAnswer } from "../questions/questionsSlice";
import { generatePath, useHistory, useParams } from "react-router-dom";
import { getUsers } from "../users/usersSlice";
import Error from "../error/Error";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 600,
		maxWidth: 800,
		backgroundColor: "primary",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
	},
	question: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(1),
	},
	avatar: {
		margin: "8px",
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
}));

function getPercentages(question) {
	const votesOptionOne = question.optionOne.votes.length;
	const votesOptionTwo = question.optionTwo.votes.length;
	const total = votesOptionOne + votesOptionTwo;
	return [votesOptionOne, votesOptionTwo].map((count) =>
		Number((100 * count) / total).toFixed(2)
	);
}

export default function Question(props) {
	const history = useHistory();
	const { id } = useParams();
	const dispatch = useDispatch();
	const classes = useStyles();

	const questions = useSelector((state) => state.questions.entities);
	const users = useSelector((state) => state.users.users);
	const username = useSelector((state) => state.user.username);
	let question = questions.find((q) => q.id === id);
	if (question === undefined) {
		return <Error />;
	}
	let user = users.find((user) => user.id === question.author);
	let options = [question.optionOne.text, question.optionTwo.text];

	const setAnswered = () => {
		return question.optionOne.votes
			.concat(question.optionTwo.votes)
			.includes(username);
	};

	let answered = setAnswered();

	let optionsPercentages = getPercentages(question);

	const handleVote = (index) => {
		const questionUpdate = {
			authedUser: username,
			qid: question.id,
			answer: index === 0 ? "optionOne" : "optionTwo",
		};
		dispatch(saveQuestionAnswer(questionUpdate));
		dispatch(getQuestions());
		dispatch(getUsers());
		answered = setAnswered();
		history.push(generatePath("/questions/:id", { id: id }));
	};

	return (
		<>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='100vh'
			>
				<Card className={classes.root}>
					<CardContent className={classes.question}>
						<Avatar
							alt={user.name}
							src={user.avatarURL}
							className={classes.avatar}
						/>
						<Typography variant='subtitle1'>
							{user.name} asked: Would you rather ...
						</Typography>
					</CardContent>
					<Divider style={{ width: "100%" }} />
					<Container>
						<Grid container spacing={1}>
							{options.map((option, index) => {
								return (
									<Grid
										alignItems='center'
										container
										item
										xs={12}
										spacing={3}
										key={option}
									>
										<Grid item xs={6}>
											<Button
												disabled={answered}
												onClick={() => handleVote(index)}
											>
												{option}
											</Button>
										</Grid>
										{answered && (
											<Grid item xs={6}>
												<LinearProgressWithLabel
													value={Number(optionsPercentages[index])}
													checkIcon={question[
														index === 0 ? "optionOne" : "optionTwo"
													].votes.includes(username)}
												/>
											</Grid>
										)}
									</Grid>
								);
							})}
						</Grid>
					</Container>
				</Card>
			</Box>
		</>
	);
}

function LinearProgressWithLabel(props) {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress variant='determinate' {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant='body2'>{`${props.value}%`}</Typography>
			</Box>
			{props.checkIcon && <CheckIcon />}
			{!props.checkIcon && <ClearIcon />}
		</Box>
	);
}
