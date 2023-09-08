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
const getUserEmail = async (req, res) => {
  try {
    console.log(req.user.id);

    const userId = req.user.id;
    const email = await User.findById(userId).select("email");
    res.status(200).json(email);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

    const num = await User.findById({ _id: id }).select( {phoneNumber:1} );
    res.status(200).json(num);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserAddress = async (req, res) => {
  try {
    const id = req.user.id;
    const add = await User.findById({ _id: id }).select({ location: 1 });
    res.status(200).json(add);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




module.exports = {
  getUsers,
  getUser,
  getUserUsername,
  getUserEmail,
  getUserCart,
  getUserNumber,
  getUserAddress
};
