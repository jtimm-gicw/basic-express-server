'use strict';

// 3rd Party Dependencies (modules)
const express = require('express');

// Our own custom modules
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');

const app = express();

app.use(express.json());
// Some Routes (should be a review ... show how to send data from browser)
// Using GET and Query Params
app.get('/hello', (req, res) => {
  // Query String?
  // http://localhost:3000/hello?name=Fred
  // req.query.name will be "Fred"
  res.send(`Hi, ${req.query.name}`)
});

// Using GET with URL params
app.get('/hello/:person', (req, res) => {
  // URL Params can be pre-declared as variables
  // When they are present, express will match them
  // http://localhost/hello/Fred
  // req.params.person will be "Fred"
  res.send(`Hi there, ${req.params.person}`);
});

// Using POST
app.post('/hello', (req, res) => {
  // Now, we expect a JSON body
  // http://localhost:3000/hello
  // {"name":"Fred"} will be sent in with the request
  // req.body.name will be "Fred"
  console.log(req.body);
  res.send(`Howdy, ${req.body.name}`);
});

// Logger Validation
app.use(logger); // runs on every request, logs info
// helper function (middleware) that logs what kind of request is coming in — like whether it’s a GET or POST and which page it’s going to.
app.get('/person', validator, (req, res) => { // (req, res) actual response your app gives if the validator approves everything
// sets up a route, or a page, that the app will respond to — in this case, /person.  validator function checks if the visitor included the required information (like name) in the request
const person = {
 name: req.query.name,}
  res.status(200).json(person); // Sends a JSON object like { "name": "fred" }
  // request pulls the name from the address bar
});


// These 2 routes are here to show how errors can be handled
// Their both declared solely to show the mechanics

app.get('/error-using-throw', (req, res, next) => {
  // Anytime an error is "thrown" (which is every error you've ever seen), the error handler is triggered
  throw new Error('Server has something wrong with it');
});

app.get('/error-using-next', (req, res, next) => {
  // If you call the next() function with any value that automatically triggers an error!
  next('Whoops, something went wrong');
})

// Here are some routes that use middleware ...

// Our Error Handlers -- need to be the last things defined!
// These use the external modules we required above
app.use('*', notFoundHandler);
app.use(errorHandler);

// Export an object with the express app and separate method that can start the server
module.exports = {
  server: app,
  start: port => {  // starts the server
    if (!port) { throw new Error("Missing Port"); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
