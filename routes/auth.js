const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const User = require("../models/User");

//Sign In
router.post("/auth/signin", async (req, res) => {
  const checkEmail = await User.findOne({ email: req.body.email });
  if (!checkEmail)
    return res.status(400).json({ msg: "Incorrect Email or Password" });
  const checkPass = await bcrypt.compare(
    req.body.password,
    checkEmail.password
  );
  if (!checkPass)
    return res.status(400).json({ msg: "Incorrect Email or Password" });

  const token = jwt.sign({ _id: checkEmail._id }, process.env.TOKEN_SECRET, {
    expiresIn: "3d",
  });
  return res.header("token", token).json({
    token: token,
    firstname: checkEmail.first_name,
    lastname: checkEmail.last_name,
    id: checkEmail._id,
  });
});

//Sign Up
router.post("/auth/signup", async (req, res) => {
  const checkEmail = await User.findOne({ email: req.body.email });

  if (checkEmail) return res.status(400).json({ msg: "Email already exists" });
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    password: hashPass,
    date_created: Date.now(),
  });

  try {
    const saveUser = await newUser.save();
    return res.status(200).json({ msg: "Successfully registered." });
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

module.exports = router;
