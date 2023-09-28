const { findById } = require("../models/ProductsModel");
const { findOne } = require("../models/PromocodeModel");
const User = require("../models/UsersModel");

//GET all users
const getUsers = async (req, res) => {
  try {
    const products = await User.find().select();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET a single user
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET a single user username
const getUserUsername = async (req, res) => {
  try {
    const id = req.params.id;
    const username = await User.findById({ _id: id }).select({ username: 1 });
    res.status(200).json(username);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET a single user email
/*const getUserEmail = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findOne({ _id: id });
    const email = user.select(email);

    console.log("hi");
    res.status(200).json(email);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log("hellooo");
  }
};*/

// Define a function to get the user's email by user ID
/*const getUserEmail = async (req, res) => {
  try {
    // Get the user ID from req.user.id provided by Passport.js
    const userId = req.user.id;

    // Find the user by their user ID in the database
    const user = await User.findById(userId);
    console.log(user);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract and return the user's email
    const userEmail = user.email;
    console.log(userEmail);
    // Send the email as JSON response
    res.status(200).json({ userEmail });
  } catch (error) {
    console.error("Error fetching user email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};*/

// Example route usage:
// Attach this function to an authenticated route, e.g., app.get('/user/email', getUserEmail);

//GET a single user email
const getUserCart = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await User.findById({ _id: id }).select({ cart: 1 });
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserNumber = async (req, res) => {
  try {
    const id = req.user.id;

    const email = await User.findById({ _id: id }).select({ phoneNumber: 1 });
    res.status(200).json(email);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserAddress = async (req, res) => {
  try {
    const id = req.user.id;
    const email = await User.findById({ _id: id }).select({ location: 1 });
    res.status(200).json(email);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  getUserUsername,
  //getUserEmail,
  getUserCart,
  getUserNumber,
  getUserAddress,
};
