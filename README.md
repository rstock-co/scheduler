# Interview Scheduler
 
The Interview Scheduler (view production version [here](https://63473f8c34a34f0dbb4ccedb--keen-tanuki-b4e906.netlify.app/)) is a Single Page App built with React.  It allows a user to view, add, edit, and cancel appointments by entering a student's name and choosing an interviewer.
 
There are 5 days which can be selected on the sidebar (Monday through Friday), with 5 timeslots for each day.
 
## Extra Features
All of the stretch goals have been implemented, including:
- **Web Sockets**:  for immediate updates across all clients when interviews are booked, edited, or cancelled.  Implements React's `useEffect`, `useReducer` and `useCallback` hooks to listen for the server's socket messages, and then dispatch the data to update state.
 NOTE: the web socket feature remains on a feature branch, and isn't merged with the master branch (see `feature/web-sockets`)
  ![Web_Sockets](/docs/web-sockets2.gif)
- **Client & Server Deployment**: the client has been deployed on `Netlify`, and the database/server to `Heroku`.  Continuous integration management is done by `CircleCI` , with every push to the `master` branch automatically tested in the pipeline before being pushed to the `production` branch.

- **Improved Test Coverage**: test coverage is close to 100% accross all components.

![Test_Coverage](/docs/test-coverage.png)

- **Reducers**: all of the `useState` hooks have been replaced with `useReducer` hooks inside the `useApplicationData` custom hook.

## Demo

**Overview**

![Overview](/docs/overview.gif)

**Edit Appointment**

![Edit](/docs/edit.gif)

**Errors**

![Error](docs/error-mode.gif)S
 
## Custom Hooks
- `useVisualMode`: manages transitions between render states for appointment components.
- `useApplicationData`: manages data and state for the application.

## Tech Stack
- **Front end**: React, SASS
- **Testing Frameworks**: Cypress, Jest, Storybook
- **Back end**: Express, Axios, PostgreSQL, NodeJS, Webpack, Babel
 
## Getting Started
 
The production version of the app is hosted on Netlify here, for easier viewing:
 
 [View App](https://63473f8c34a34f0dbb4ccedb--keen-tanuki-b4e906.netlify.app/)
 
To run the app server locally:
 
1. Clone this repository onto your local device.
2. Inside the repo root, install dependencies using the `npm install` command.
3. Start the web server using the `npm start` command. The app will be served at `http://localhost:8000/`.

To run the database server locally:
 
1. The data is served by a separate repo called `scheduler-api`, which must be cloned onto your local device. 
2. Inside the repo root, install dependencies using the `npm install` command.
3. Start the database server using the `npm start` command.  To view in error mode (view the error component) use the `npm run error` command.

 
## Running Tests
 
Navigate to the `scheduler` repo root folder.

### Jest
 
```
npm test
```
### Cypress

```
npm run cypress
```
**NOTE**: for Cypress to work properly, the database must be started in test mode, using the following command: `npm run test:server`

### Storybook
```
npm run storybook
```
 Storybook can be viewed in your web browser at `http://localhost:9009/`.
