import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
