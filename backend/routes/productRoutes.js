const express = require("express");
const router = express.Router();

const {
  saveProduct,
  getAllInvocies,
  generateInvoice,
} = require("../controllers/productController");
const { auth } = require("../middlewares/auth");

router.route("/").post(auth, saveProduct).get(auth, getAllInvocies);
router.route("/invoice/:id").post(auth, generateInvoice);

module.exports = router;
