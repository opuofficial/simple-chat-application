const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const error = new Error("Authorization header not found");
    error.status = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decodedToken.userId };

    console.log(req.user);
    next();
  } catch (error) {
    const err = new Error("Invalid token");
    err.status = 401;
    next(err);
  }
};

module.exports = verifyToken;
