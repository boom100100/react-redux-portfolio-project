Official data gatherer
- enter a topic, receive information
https://academic.microsoft.com/v24

Preliminary data gatherer
- enter a question, receive information
https://rapidapi.com/pannous/api/jeannie

Random data gatherer
- explore random facts for research inspiration
https://apilist.fun/api/random-facts-api

Graph maker
- enter data, labels, receive chart
https://quickchart.io/?ref=apilist.fun

header writer
- enter data, receive related hash tag
- convert hash tag to phrase
https://ritekit.com/api-demo/hashtag-suggestions

# Building a client-side application with React-Redux

## Requirements (Adapted from Learn.co's final project readme file.)

[x] The code should be written in ES6 as much as possible
[x] Use the `create-react-app` generator to start your project.
[x] Follow the instructions on this repo to setup the generator: [create-react-app](https://github.com/facebookincubator/create-react-app)
[x] Your app should have one HTML page to render your react-redux application
frontend/public/index.html
[x] There should be 2 container components
frontend/src/containers/
  ProfileEditContainer
  LoginContainer
  NewRandomDataContainer

[x] There should be 5 stateless components
frontend/src/containers/
  EditProjectNewContainer
  EditProjectNewResearchContainer
  GraphXDataContainer
  Input
  LogoutContainer
  NewPreliminaryDataContainer
  NewProjectContainer
  NewResearchDataContainer

[x] There should be 3 routes
/login
/profile
/projects
/projects/:id/read
/projects/:id/edit
/projects/:id/delete

[x] The Application must make use of `react-router` and proper RESTful routing (should you choose to use react-router v3 please refer to the appropriate [docs](https://github.com/ReactTraining/react-router/tree/v3/docs); docs for v4 can be found [here](https://reacttraining.com/react-router/web/guides/quick-start))
[x] Use Redux middleware to respond to and modify state change
[x] Make use of async actions and `redux-thunk` middleware to send data to and receive data from a server
[x] Your Rails API should handle the data persistence with a database. You should be using `fetch()` within your actions to GET and POST data from your API - do not use
jQuery methods.
[x] Your client-side application should handle the display of data with minimal data manipulation
[ ] Your application should have some minimal styling: feel free to stick to a framework (like react-bootstrap), but if you want to write (additional) CSS yourself, go for it!
[ ] [Once your app is complete, fill out this checklist.](https://goo.gl/forms/ULtKsxuzWomvXuTk2)
