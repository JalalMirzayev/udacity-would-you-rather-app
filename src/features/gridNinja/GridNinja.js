import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

export default function GridNinja() {
	const todos = [
		"Johns birthday bash",
		"Complete my ninja training",
		"Order a pizza!",
		"Mario's Birthday Present",
	];

	return (
		<Container>
			<Grid container>
				{todos.map((todo) => (
					<Grid item xs={12} sm={6} md={4} key={todo}>
						<Paper>{todo}</Paper>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
