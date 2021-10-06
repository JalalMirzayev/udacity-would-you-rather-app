import React from "react";
import Navigation from "./features/navigation/Navigation";
import Login from "./features/login/Login";
import Question from "./features/question/Question";
import Questions from "./features/questions/Questions";
import Error from "./features/error/Error";
import Leaderboard from "./features/leaderboard/Leaderboard";
import { Switch, Route } from "react-router-dom";
import NewQuestion from "./features/newQuestion/NewQuestion";
import { useSelector } from "react-redux";

function App() {
	const username = useSelector((state) => state.user.username);

	if (username === "") {
		return <Login />;
	}

	return (
		<>
			<Navigation />
			<Switch>
				<Route exact path='/'>
					<Questions />
				</Route>
				<Route path='/add'>
					<NewQuestion />
				</Route>
				<Route path='/question'>
					<Question />
				</Route>
				<Route path='/leaderboard'>
					<Leaderboard />
				</Route>
				<Route path={`/questions/:id`}>
					<Question />
				</Route>
				<Route path='*'>
					<Error />
				</Route>
			</Switch>
		</>
	);
}

export default App;
