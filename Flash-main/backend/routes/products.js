const express = require("express");
const {
  getProducts,
  getProduct,
  getProductName,
  getProductPrice,
  getProductRating,
  getProductDescription,
  getProductImage,
  addProduct,
  buyProduct,
  removeProduct,
  getCartProducts,
  searchProduct,
  deleteUserCart,
  getUserEmail,
  checkProductStock,
} = require("../controllers/ProductsController");
const router = express.Router();
const { requireAuth } = require("../Middleware/authMiddleware");

router.get("/getCartProducts", requireAuth, getCartProducts);

router.get("/checkProductStock", requireAuth, checkProductStock);

router.get("/getUserEmail", requireAuth, getUserEmail);
router.post("/search", searchProduct);

//for a logged in user and the same are created for a guest
//GET all products
router.get("/", requireAuth, getProducts);

//GET a single product
router.get("/:id", requireAuth, getProduct);

//for testing purposes, so no need to protect them using requireAuth
//GET a single product name
router.get("/:id/name", getProductName);

//GET a single product price
router.get("/:id/price", getProductPrice);

//GET a single product rating
router.get("/:id/rating", getProductRating);

//GET a single product description
router.get("/:id/description", getProductDescription);

//GET a single product image
router.get("/:id/image", getProductImage);

//POST a new product
router.post("/", addProduct);

//Buy product
router.post("/buyProduct", requireAuth, buyProduct);

router.post("/removeProduct", requireAuth, removeProduct);

router.delete("/deleteCart", requireAuth, deleteUserCart);

module.exports = router;
