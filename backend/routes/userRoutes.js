const express = require("express");
const { register, login, getuser } = require("../controllers/userController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.route("/").post(register).get(auth, getuser);
router.route("/login").post(login);

module.exports = router;
