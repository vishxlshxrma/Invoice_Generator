const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../modals/userModal");
const expressAsyncHandler = require("express-async-handler");

const auth = expressAsyncHandler(async (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    console.log("Header token not present");
    throw new Error("Not authorized");
  }

  const token = authorizationHeader.split(" ")[1];

  const data = jwt.verify(token, process.env.SECRET);

  if (!data) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const user = await User.findById(data.id).select("-password");

  if (!user) {
    throw new Error("user not found");
  }

  req.user = user;
  next();
});

module.exports = { auth };
