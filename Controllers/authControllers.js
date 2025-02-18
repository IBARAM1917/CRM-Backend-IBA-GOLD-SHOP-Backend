const User = require("../Models/userModel.js");
const { errorHandler } = require("../Utils/Error.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const RegisterUser = async (req, res, next) => {

  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All The Fields Are Required"));
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res
      .status(201)
      .json({ message: "User Registered Successfully", result: newUser });
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All the Fields Are Required"));
  }
  try {
    const userDetail = await User.findOne({ email });
    const userpassword = await bcrypt.compare(password, userDetail.password);
    if (!userDetail || !userpassword) {
      return next(errorHandler(400, "Invalid Credentials"));
    }
    const token = jwt.sign(
      { id: userDetail._id , isAdmin: userDetail.isAdmin},
          process.env.JWT_SECRET_KEY
    );
    const { password: passkey, ...rest } = userDetail._doc;
    res
      .status(200)
      .json({ message: "User LoggedIn Successfully", rest,token });
  } catch (error) {
    next (error);
  }
};

const google = async (req, res, next) => {
  const { email, name, profilePic } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id ,isAdmin: user.isAdmin},
         process.env.JWT_SECRET_KEY
        );

      const { password: passkey, ...rest } = user._doc;
      res
        .status(200)
        .json({ message: "User LoggedIn Successfully", rest,token });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatePassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: profilePic,
      });
      await newUser.save();
      const token = jwt.sign(
        { id:  newUser._id, isAdmin:newUser.isAdmin },
        process.env.JWT_SECRET_KEY
      );
      const { password: passkey, ...rest } = newUser._doc;
      res
        .status(200)
        .json({ message: "User LoggedIn Successfully", rest,token });
    }
  } catch (error) {
    next(error);
  }
  
};

module.exports = { RegisterUser, loginUser, google };
