//importing packages and modules
const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  editUser,
} = require("./userController");
const { check } = require("express-validator"); //validation
const router = express.Router(); //help in directing requests

//regitration route
router.post(
  "/register",
  [
    check("fullname", "Name is required").not().isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be 6 characters or more.").isLength({
      min: 6,
    }),
  ],
  registerUser
);

//login route
router.post("/login", loginUser);

//get user
router.get("/individual", getUser);

//edit user
router.put(
  "/individual/edit",
  [
    check("fullname", "Name is required").not().isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be 6 characters or more.").isLength({
      min: 6,
    }),
  ],
  editUser
);

//logout
router.get("/logout", logoutUser);

module.exports = router;
