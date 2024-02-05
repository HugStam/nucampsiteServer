//the module will contain the routes for partner and camsitesId

const express = require("express");
const partnerRouter = express.Router(); // object name partnerRouter to use with express routing methods

partnerRouter
  .route("/")

  // routing method default
  .all((req, res, next) => {
    res.statusCode = 200;
    //this indicate that it will return plain text
    res.setHeader("Content-Type", "test/plain");
    next(); // this passes controle to the next routing method
  })

  //set up an end point for the get request

  .get((req, res) => {
    res.end("Will send all the partner to you"); //msg sent to the client
  })

  .post((req, res) => {
    //this will be json data
    res.end(
      `Will add the partner:${req.body.name} with description:${req.body.description}`
    );
  })

  .put((req, res) => {
    res.statusCode = 403;
    res.end("Put operation not supported on /partners");
  })

  .delete((req, res) => {
    res.end("Deleting all partner");
  });

partnerRouter
  .route("/:partnerId")

  // routing method default
  .all((req, res, next) => {
    res.statusCode = 200;
    //this indicate that it will return plain text
    res.setHeader("Content-Type", "test/plain");
    next(); // this passes controle to the next routing method
  })

  //add support for 4 more end points using a route parameter to the end of path:/partnerId

  .get((req, res) => {
    res.end(
      `Will send the details of the partner: ${req.params.partnerId} to you`
    );
  })

  .post((req, res) => {
    res.end(
      `Will add the partner: ${req.body.name} with description: ${req.body.description}`
    );
  })

  .put((req, res) => {
    res.statusCode = 403;
    res.end("Put operation not supported on /partnerId");
  })

  .delete((req, res) => {
    res.end(`Deleing partner: ${req.params.partnerId}`);
  });
module.exports = partnerRouter;
