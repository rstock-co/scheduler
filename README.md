# Interview Scheduler
 
[View App](https://63473f8c34a34f0dbb4ccedb--keen-tanuki-b4e906.netlify.app/)
 
The Interview Scheduler is a single page app built with React.  It allows a user to view, add, edit, and cancel appointments by entering a student's name and choosing an interviewer.
 
There are 5 days which can be selected on the sidebar (Monday through Friday), with 5 timeslots for each day.
 
## Tech Stack
- **Front end**: React, SASS
- **Testing Frameworks**: Cypress, Jest, Storybook
- **Back end**: Express, Axios, PostgreSQL, NodeJS, Webpack, Babel
 
## Extra Features
All of the stretch goals have been implemented, including:
- **Web Sockets**:  for immediate updates across all clients when interviews are booked, edited, or cancelled.  Implements React's `useEffect`, `useReducer` and `useCallback` hooks to listen for the server's socket messages, and then dispatch the data to update state.
 NOTE: the web socket feature remains on a feature branch, and isn't merged with the master branch (see `feature/web-sockets`)
  ![Web_Sockets](https://github.com/rstock-co/scheduler/blob/master/docs/web-sockets2.gif)
- **Client & Server Deployment**: the client has been deployed on `Netlify`, and the database/server to `Heroku`.  Continuous integration management is done by `CircleCI` , with every push to the `master` branch automatically tested in the pipeline before being pushed to the `production` branch.
- **Reducers**: all of the `useState` hooks have been replaced with `useReducer` hooks inside the `useApplicationData` custom hook.
 
## Custom Hooks
- `useVisualMode`: manages transitions between render states for appointment components.
- `useApplicationData`: manages data and state for the application.
 
## Getting Started
 
The production version of the app is hosted on Netlify here, for easier viewing:
 
 [View App](https://63473f8c34a34f0dbb4ccedb--keen-tanuki-b4e906.netlify.app/)
 
To run the app server locally:
 
1. Clone this repository onto your local device.
2. Inside the repo root, install dependencies using the `npm install` command.
3. Start the web server using the `npm start` command. The app will be served at `http://localhost:8000/`.
 To start the database server locally:
 
1. The data is served by a separate repo called `scheduler-api`, which must be cloned onto your local device. 
2. Inside the repo root, install dependencies using the `npm install` command.
3. Start the database server using the `npm start` command.
4. Start the database test server using the `npm run test:server` command.
5. Start the database in error mode using the `npm run error` command.
 
## Running Tests
 
To run the testing frameworks:
1. Navigate to the `scheduler` repo root folder.
2. To run the Jest tests, use the `npm test` command.
3. To run the Cypress tests, use the `npm run cypress` command.
4. To view UI components in Storybook, use the `npm run storybook` command. Storybook can be viewed in your web browser at `http://localhost:9009/`.