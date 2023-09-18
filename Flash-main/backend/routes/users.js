const express =require('express')
const {getUsers, 
    getUser, 
    getUserUsername, 
    getUserEmail, 
    getUserCart,
    getUserNumber,
    getUserAddress,
    editUserUsername,
    editUserEmail,
    editUserPassword,
    editUserPhoneNo,
    editUserAddress
} = require ('../controllers/UsersController')
const router=express.Router()
const { requireAuth } = require('../Middleware/authMiddleware');

//for testing purposes, so no need to protect them using requireAuth
//GET all users
router.get('/',getUsers)

//GET a single user
router.get('/getUser',requireAuth,getUser)

//GET a single user username
router.get('/getUsername',requireAuth,getUserUsername)

//GET a single user email
router.get("/getEmail",requireAuth,getUserEmail)

//GET a single user cart
router.get('/:id/cart',getUserCart)

router.get('/number',requireAuth,getUserNumber)


router.get('/address',getUserAddress)

router.patch('/editUsername',requireAuth,editUserUsername)

router.patch('/editEmail',requireAuth,editUserEmail)

router.patch('/editPassword',requireAuth,editUserPassword)

router.patch('/editPhoneNo',requireAuth,editUserPhoneNo)

router.patch('/editAddress',requireAuth,editUserAddress)


module.exports = router
