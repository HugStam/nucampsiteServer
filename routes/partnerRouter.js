//the module will contain the routes for partner and camsitesId
//the module will contain the routes for partners and camsitesId

const express = require("express");
const partner = require("../models/partner");
const Partner = require("../models/partner");
const authenticate = require("../authenticate");

const partnerRouter = express.Router(); // object name partnerRouter to use with express routing methods

partnerRouter
  .route("/")

  //set up an end point for the get request

  .get((req, res, next) => {
    Partner.find()
      .then((partners) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => err);
  })

  .post(authenticate.verifyUser, (req, res, next) => {
    partner
      .create(req.body)
      .then((partner) => {
        console.log("Partner Created ", partner);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
    //this will be json data
  })

  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("Put operation not supported on /partners");
  })

  .delete(authenticate.verifyUser, (req, res, next) => {
    Partner.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

partnerRouter
  .route("/:partnerId")
  .get((req, res, next) => {
    Partner.findById(req.params.partnerId)
      .then((partner) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /campsites/${req.params.partnerId}`
    );
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Partner.findByIdAndUpdate(
      req.params.partnerId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((partner) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Partner.findByIdAndDelete(req.params.partnerId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });
module.exports = partnerRouter;
