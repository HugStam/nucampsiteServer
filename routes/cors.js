const cors = require("cors");

const whitelist = ["http://localhost:3000", "https://localhost:3443"];
//this the allowed domains
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  console.log(req.header("Origin")); // this will pull the domain of the req so as to compair
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors();
// this will call the mW fun of acc cont origin with a wild card as an option
exports.corsWithOptions = cors(corsOptionsDelegate);
// this will call the cores that were created before and then check to see if the header is part of the white listed  above
