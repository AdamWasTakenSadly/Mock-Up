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
  filterProducts,
  getUserEmail,
  getUserNumber,
  getUserAddress,
  deductStock
} = require("../controllers/ProductsController");
const router = express.Router();
const { requireAuth } = require("../Middleware/authMiddleware");


router.get("/getCartProducts", requireAuth, getCartProducts);

router.get("/userEmail", requireAuth, getUserEmail);

router.get("/userNum", requireAuth, getUserNumber);

router.get("/userAdd", requireAuth, getUserAddress);



router.post('/search', searchProduct);

router.post('/deduct', deductStock);


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

router.delete('/deleteCart',requireAuth,deleteUserCart)

router.post('/filterProducts',filterProducts)


module.exports = router;
