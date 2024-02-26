const express = require("express");
const favoriteRouter = express.Router();
//import the model
const Favorite = require("../models/favorite");
const authenticate = require("../authenticate");
const cors = require("./cors");

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Favorite.find()

      .then((favorites) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorites);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Favorite.create(req.body)
        .then((favorite) => {
          console.log("Favorite Created", favorite);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favorite);
        })
        .catch((err) => next(err));
    }
  )
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favorites");
  })
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      Favorite.deleteMany()
        .then((response) => {
          (res.statusCode = 200),
            res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

favoriteRouter
  .route("/:campsiteId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Favorite.findById(req.params.campsiteId)
      .then((favorite) => {
        (res.statusCode = 200),
          res.setHeader("Content-Type", "application/json");
        res.json(favorite);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /favorites/${req.params.campsiteId}`
    );
  })
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Favorite.findByIdAndUpdate(
        req.params.campsiteId,
        {
          $set: req.body,
        },
        { new: true }
      )
        .then((favorite) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favorite);
        })
        .catch((err) => next(err));
    }
  );
//   .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     Favorite.findOne({ user: req.user._id })
//       .then((favorite) => {
//         if (favorite) {
//           const index = favorite.campsites.indexOf(req.params.campsiteId);
//           if (index !== -1) {
//             favorite.campsites.splice(index, 1);
//             favorite
//               .save()
//               .then((favorite) => {
//                 res.statusCode = 200;
//                 res.setHeader("Content-Type", "application/json");
//                 res.json(favorite);
//               })
//               .catch((err) => next(err));
//           } else {
//             res.statusCode = 404;
//             res.end("Campsite not in your favorites");
//           }
//         } else {
//           res.statusCode = 404;
//           res.end("You do not have any favorites to delete");
//         }
//       })
//       .catch((err) => next(err));
//   });

module.exports = favoriteRouter;
