const User = require("../modals/userModal");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const register = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("Please Enter All the feilds");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User Already Exists");
    }

    //password hashing is done in UserModal.js
    const user = await User.create({ name, email, password });

    if (user) {
      const token = generateToken(user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      res.status("400");
      throw new Error("Failed to create user");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please enter all the feilds");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    if (await user.matchPassword(password)) {
      const token = generateToken(user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

const getuser = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      throw new error("Unauthorized");
    }

    res.send(req.user);
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = { register, login, getuser };
