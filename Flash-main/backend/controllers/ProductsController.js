//const currency = require("iso-country-currency")

const Product = require('../models/ProductsModel')


//GET all products
const getProducts = async (req, res) => {

    try{
        const products= await Product.find().select()
        res.status(200).json(products)
    }
    catch(error)
    {
        res.status(400).json({ error: error.message })
    }
}

//GET a single product
const getProduct = async (req, res) => {
    try{
        var id = req.params.id;
        const product= await Product.findById({ "_id": id }).select()
        res.status(201).json(product)
    }
    catch(error)
    {
        res.status(400).json({ error: error.message })
    }
}

//GET a single product name
const getProductName = async (req, res) => {
    try{
        var id = req.params.id;
        const name= await Product.findById({ "_id": id }).select({ name: 1 })
        res.status(200).json(name)
    }
    catch(error)
    {
        res.status(400).json({ error: error.message })
    }
}

//GET a single product price
const getProductPrice = async (req, res) => {
    try{
        var id = req.params.id;
        const price= await Product.findById({ "_id": id }).select({ price: 1 })
        res.status(200).json(price)
    }
    catch(error)
    {
        res.status(400).json({ error: error.message })
    }
}

//GET a single product rating
const getProductRating = async (req, res) => {
    try {
        const id = req.params.id
        const rating = await Product.findById({ "_id": id }).select({ rating: 1 })
        res.status(200).json(rating)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//GET a isngle product description
const getProductDescription = async (req, res) => {
    try {
        const id = req.params.id
        const description = await Product.findById({ "_id": id }).select({ description: 1 })
        res.status(200).json(description)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//GET a single product description
const getProductImage = async (req, res) => {
    try {
        const id = req.params.id
        const image = await Product.findById({ "_id": id }).select({ image: 1 })
        res.status(200).json(image)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



//POST a new product
const addProduct = async (req, res) => {

    const { name, description, price, rating, image } = req.body

    try {
        const product = await Product.create({ name , description, price, rating, image})
         res.status(200).json(product)
    } 
    catch (error) 
    {
         res.status(400).json({ error: error.message })
    }
}



module.exports = {
    getProducts, getProduct, getProductName, getProductPrice, getProductRating, getProductDescription, getProductImage,addProduct}