const express =require('express')
const {getUsers, getUser, getUserUsername, getUserEmail, getUserCart} = require ('../controllers/UsersController')
const router=express.Router()
//const { requireAuth } = require('../Middleware/authMiddleware');

//for testing purposes, so no need to protect them using requireAuth
//GET all users
router.get('/',getUsers)

//GET a single user
router.get('/:id',getUser)

//GET a single user username
router.get('/:id/username',getUserUsername)

//GET a single user email
router.get('/:id/email',getUserEmail)

//GET a single user cart
router.get('/:id/cart',getUserCart)

module.exports = router
