const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(bearerToken, process.env.SECRET, (err, authData) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }
      // If token is valid, attach the user data to the request
      req.user = authData;
      next();
    });
  } else {
    // Forbidden
    res.status(403).json({ error: "No token provided" });
  }
}
module.exports = verifyToken;
