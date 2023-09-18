const express = require("express");
const {
  getProducts,
  getProduct,
  getProductAdmin,
  getProductName,
  getProductPrice,
  getProductRating,
  getProductDescription,
  getProductImage,
  addProduct,
  editProduct,
  editProductAmount,
  buyProduct,
  removeProduct,
  getCartProducts,
  searchProduct,
  deleteUserCart,
  filterProducts,
  addRatingAndOrReview,
  getCurrUserRatingAndOrReview,
  getUserEmail,
  getUserNumber,
  getUserAddress,
  deductStock
} = require("../controllers/ProductsController");
const router = express.Router();
const { requireAuth,requireAuth2 } = require("../Middleware/authMiddleware");


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

router.get("/A/:id", requireAuth2, getProductAdmin);

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
router.post("/", requireAuth2, addProduct);

//Edit an existing product
router.patch("/:id", requireAuth2, editProduct);

router.patch("/amount/:id", requireAuth2, editProductAmount);

//Buy product
router.post("/buyProduct", requireAuth, buyProduct);

router.post("/removeProduct", requireAuth, removeProduct);

router.delete('/deleteCart',requireAuth,deleteUserCart)

router.post('/filterProducts',filterProducts)

router.patch('/:id/editOrAddRatingReview',requireAuth,addRatingAndOrReview)

router.get('/:id/getCurrUserRatingReview',requireAuth,getCurrUserRatingAndOrReview)



module.exports = router;
