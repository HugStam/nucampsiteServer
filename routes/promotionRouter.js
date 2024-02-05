//the module will contain the routes for promotions and camsitesId

const express = require("express");
const promotionRouter = express.Router(); // object name promotionRouter to use with express routing methods

promotionRouter
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
    res.end("Will send all the promotions to you"); //msg sent to the client
  })

  .post((req, res) => {
    //this will be json data
    res.end(
      `Will add the promotions:${req.body.name} with description:${req.body.description}`
    );
  })

  .put((req, res) => {
    res.statusCode = 403;
    res.end("Put operation not supported on /promotions");
  })

  .delete((req, res) => {
    res.end("Deleting all promotions");
  });

promotionRouter
  .route("/:promotionId")

  // routing method default
  .all((req, res, next) => {
    res.statusCode = 200;
    //this indicate that it will return plain text
    res.setHeader("Content-Type", "test/plain");
    next(); // this passes controle to the next routing method
  })

  //add support for 4 more end points using a route parameter to the end of path:/promotionId

  .get((req, res) => {
    res.end(
      `Will send the details of the promotions: ${req.params.promotionId} to you`
    );
  })

  .post((req, res) => {
    res.end(
      `Will add the partner: ${req.body.name} with description: ${req.body.description}`
    );
  })

  .put((req, res) => {
    res.statusCode = 403;
    res.end("Put operation not supported on /promotionsId");
  })

  .delete((req, res) => {
    res.end(`Deleing promotion: ${req.params.promotionId}`);
  });
module.exports = promotionRouter;
