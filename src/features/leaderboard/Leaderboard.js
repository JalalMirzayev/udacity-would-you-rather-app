import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function Leaderboard() {
	const useStyle = makeStyles((theme) => ({
		root: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			width: 500,
			padding: theme.spacing(4),
		},
		item: {
			marginBottom: theme.spacing(2),
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
	}));

	const classes = useStyle();
	const users = useSelector((state) => state.users.users);

	return (
		<Container className={classes.root}>
			{[...users]
				.sort((a, b) => {
					const aScore = Object.keys(a.answers).length + a.questions.length;
					const bScore = Object.keys(b.answers).length + b.questions.length;
					return bScore - aScore;
				})
				.map((user) => {
					return (
						<Card className={classes.item} elevation={3} key={user.id}>
							<CardContent className={classes.question}>
								<Avatar
									alt={user.name}
									src={user.avatarURL}
									className={classes.avatar}
								/>
								<Container>
									<Typography variant='subtitle1'>{user.name}</Typography>
									<Typography variant='subtitle1'>
										Questions Published {user.questions.length}
									</Typography>
									<Typography variant='subtitle1'>
										Questions Answered {Object.keys(user.answers).length}
									</Typography>
								</Container>
							</CardContent>
						</Card>
					);
				})}
		</Container>
	);
}
