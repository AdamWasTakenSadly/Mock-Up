
const User = require('../models/UsersModel')
//const currency = require("iso-country-currency")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


//create a token
const createToken = (username,id,type) => {

    const payload={id:id,username:username}
    return jwt.sign(payload, 'supersecret', {
        expiresIn: "24h"
    });
};

//login
const login=async(req, res) => {

    const username=req.body.username
    const password=req.body.password


    const user= await User.findOne({ username:username })

    if(user)
    {
        const passwordVerified=await bcrypt.compare(password, user.password)
        if(passwordVerified)
        {
            const token = createToken(user.username,user._id)
            res.cookie('jwt', token, { httpOnly: false, maxAge: 24*60*60*1000 });
           // res.cookie('role','corporateTrainee',{ httpOnly: false, maxAge: 24*60*60*1000 })
            return res.status(200).json({ id:user._id,msg:"Login success" })
        }
        else
        {
            return res.status(401).json({ msg: "Invalid credential" })
        }
    }
    else
    {
        return res.status(400).json({ msg: "User does not exist" })
    }
}

//signup
const signUp = async (req, res) => {
    const { username, email, password} = req.body;

    const userUsername= await User.findOne({ username:username })
    const userEmail= await User.findOne({ email:email })
   

    if(userUsername)
    {
        return res.status(401).json({ msg: "Username taken" })
    }
    else if(userEmail)
    {
        return res.status(401).json({ msg: "Email used before" })
    }
    else
    {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await User.create({ username: username, email: email, password: hashedPassword });
            const token = createToken(user.username,user._id);
            res.cookie('jwt', token, { httpOnly: false, maxAge: 24*60*60*1000 });
            //res.cookie('role','individualTrainee',{ httpOnly: false, maxAge: 24*60*60*1000 })
           return  res.status(200).json({id:user._id,msg:"Sign Up success"})
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    
}

//logout
const logOut=async(req,res)=>{

    res.clearCookie('jwt', { expires: new Date(0) });
    /*
    res.cookie('jwt', "", { httpOnly: false, maxAge:  1 });
    res.cookie('login', "", { httpOnly: true, maxAge:  1 });*/
    
    //res.cookie('role', "", { httpOnly: true, maxAge:  1 });
    res.status(200).json({msg:"You are logged out!"})
}


//get current userId
const getCurrentUserId=async(req,res)=>{
    res.status(200).json({id:req.user.id})
}

module.exports ={login,signUp,logOut,getCurrentUserId}