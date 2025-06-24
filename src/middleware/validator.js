'use strict';

/* Just like logger.js, we’ll write a function that gets 3 things from the app:
req → the request from the user
res → the response that you’ll send back
next → a built-in function that says “go to the next thing” */
const validator = (req, res, next) => {
  let name = req.query.name;
  if (!name) { next("Name Required"); }
  else { next(); }
}

module.exports = validator;