# Would You Rather Project - Submission

The whole project was written from scratch. The only piece of the application which was supplied by Udacity is the `_data.js` file which is located inside of the folder `./src/services/_data.js`. The user interface of the application was created with components form Material-UI (version `4.12.3`). Redux was used as the state management library. In order to reduce boilerplate code the Redux-Toolkit was used.

## Installation

To get started developing right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`
- **Important**: See the following section `Login Page` for the appropriate user credentials.

## Login Page

The application starts with a login screen. The valid user password pairs are listed in the following table.

| username      | password |
| ------------- | -------- |
| johndoe       | jjj      |
| sarahedo      | sss      |
| tylermcginnis | ttt      |

The user will be notified by an additional text that the credential were not properly entered by the user.

Note: I added a `password` attribute to the nested `user` objects in the `users` variable.

## Navigation Bar

The navigation bar consists of four sections.

- Left: Title of the application
- Center-Left: Navigation elements to different screens of the application.
- Center-Right: Icon with username of the current user, which is logged into the application.
- Right: After the user is logged out the username will be set to `""`. Additionally, the filter condition for the questions is set to the default value "unanswered".

## Folder Structure

After running the previous command the following folder structure

```bash
├───node_modules
├───public
└───src
    ├───app
    ├───features
    │   ├───error
    │   ├───gridNinja
    │   ├───leaderboard
    │   ├───login
    │   ├───navigation
    │   ├───newQuestion
    │   ├───question
    │   ├───questions
    │   ├───user
    │   └───users
    └───services
```

will completed with the `node_modules` folder. This folder contains all the necessary node modules, which are necessary for the application.

The `public` folder contains the `index.html` which is the main entry point of the application. In this file the title (displayed in the tab inside the browser) of the html page can be modified.

The `src` folder has three base folders.

- `app` folder only has one file inside. The `store.js` configures the store by combining all reducers.
- `features` folder combines all pages and components as well as the according slices of the state.
- `services` folder contains the `_data.js` file for mimicking an api. It contains the variables `users` and `questions` and getter and setter methods. The appropriate async getter and setter methods are implemented as async thunks inside the corresponding slices.

Finally, we have the `App.js` which is the main application component
