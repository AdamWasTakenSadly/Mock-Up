const { findById } = require("../models/ProductsModel");
const { findOne } = require("../models/PromocodeModel");
const User = require("../models/UsersModel");

const bcrypt = require('bcrypt')

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
    const id = req.user.id;
    const user = await User.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET a single user username
const getUserUsername = async (req, res) => {
  try {
    const id = req.user.id;
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


const editUserUsername = async(req,res)=>{

  const userID=req.user.id
  const newUsername=req.body.newUsername

  try{

    const usernameAlreadyExists=await User.find({username:newUsername})
    if(usernameAlreadyExists.length!==0)
    {
      res.status(409).json({ error: "Username already exists!" })
    }
    else
    {
      const result= await User.updateOne({"_id":userID},{$set: { "username" : newUsername}})
      res.status(200).json({message:"Username updated succesfully!"});
    }
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
  }
}

const editUserEmail = async(req,res)=>{

  const userID=req.user.id
  const newEmail=req.body.newEmail

  try{

    const emailAlreadyExists=await User.find({email:newEmail})
    if(emailAlreadyExists.length!==0)
    {
      res.status(409).json({error:"Email already exists!"})
    }
    else
    {
      const result= await User.updateOne({"_id":userID},{$set: { "email" : newEmail}})
      res.status(200).json({message:"Email updated successfully!"});
    }
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
  }
}

const editUserPassword = async(req,res)=>{

  const userID=req.user.id
  const oldPassword=req.body.oldPassword

  const salt = await bcrypt.genSalt();
  const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);

  try{

        const user= await User.findById({ _id:userID})
        const passwordVerified=await bcrypt.compare(oldPassword, user.password);
        if(passwordVerified)
        {
           const result=await User.updateOne({"_id":userID},{"password":hashedNewPassword})
            res.status(200).json({message:"Password changed successfully"})
        }
        else
        {
          res.status(401).json({error:"Incorrect old password"})
        }
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
  }
}

const editUserPhoneNo = async(req,res)=>{

  const userID=req.user.id
  const newPhoneNo=req.body.newPhoneNo

  try{

    const phoneNoAlreadyExists=await User.find({phoneNumber:newPhoneNo})
    if(phoneNoAlreadyExists.length!==0)
    {
      res.status(409).json({error:"Phone number already exists!"})
    }
    else
    {
      const result= await User.updateOne({"_id":userID},{$set: { "phoneNumber" : newPhoneNo}})
      res.status(200).json({message:"Phone Number updated successfully!"});
    }
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
  }
}

const editUserAddress = async(req,res)=>{

  const userID=req.user.id
  const {newStreet,newCity,newRegion,newBuildingNo,newFloor,newFlatNo}=req.body ||{}
  var newAddress={"street":newStreet,"city":newCity,"region":newRegion,"buildingNo":newBuildingNo,"floor":newFloor,"flatNo":newFlatNo}

  try{
    const oldAddress=await User.find({"_id":userID}).select({_id:0,location:1})
    const oldAddressPretty=oldAddress.at(0).location
    if(!newStreet || newStreet==="")
    {
      console.log("here")
      console.log(newAddress)
      newAddress.street=oldAddressPretty.street
      console.log(newAddress)
    }
    if(!newCity || newCity==="")
    {
      newAddress.city=oldAddressPretty.city
    }
    if(!newRegion || newRegion==="")
    {
      newAddress.region=oldAddressPretty.region
    }
    if(!newBuildingNo || newBuildingNo==="" || newBuildingNo===0)
    {
      newAddress.buildingNo=oldAddressPretty.buildingNo
    }
    if(!newFloor || newFloor==="")
    {
      newAddress.floor=oldAddressPretty.floor
    }
    if(!newFlatNo || newFlatNo==="" || newFlatNo==0)
    {
      newAddress.flatNo=oldAddressPretty.flatNo
    }

    const result= await User.updateOne({"_id":userID},{$set: { "location" : newAddress}})
    res.status(200).json({message:"Location updated successfully!"});
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
  }
}



module.exports = {
  getUsers,
  getUser,
  getUserUsername,
  //getUserEmail,
  getUserCart,
  getUserNumber,
  getUserAddress,

  editUserUsername,
  editUserEmail,
  editUserPassword,
  editUserPhoneNo,
  editUserAddress

};
