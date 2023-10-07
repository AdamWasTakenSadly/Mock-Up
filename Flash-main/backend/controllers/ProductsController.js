//const currency = require("iso-country-currency")
const { BSON, EJSON, ObjectId } = require('bson');

const Product = require("../models/ProductsModel");

const User = require("../models/UsersModel");

//GET all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().select();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET a single product
const getProduct = async (req, res) => {
  try {
    var id = req.params.id;
    const product = await Product.findById({ _id: id }).select();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductAdmin = async (req, res) => {
  try {
    var id = req.params.id;
    const product = await Product.findById({ _id: id }).select();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET a single product name
const getProductName = async (req, res) => {
  try {
    var id = req.params.id;
    const name = await Product.findById({ _id: id }).select({ name: 1 });
    res.status(200).json(name);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET a single product price
const getProductPrice = async (req, res) => {
  try {
    var id = req.params.id;
    const price = await Product.findById({ _id: id }).select({ price: 1 });
    res.status(200).json(price);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET a single product rating
const getProductRating = async (req, res) => {
  try {
    const id = req.params.id;
    const rating = await Product.findById({ _id: id }).select({ rating: 1 });
    res.status(200).json(rating);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET a isngle product description
const getProductDescription = async (req, res) => {
  try {
    const id = req.params.id;
    const description = await Product.findById({ _id: id }).select({
      description: 1,
    });
    res.status(200).json(description);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET a single product description
const getProductImage = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Product.findById({ _id: id }).select({ image: 1 });
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//POST a new product
const addProduct = async (req, res) => {

  if(await req.user.role == "Admin")
  {

  const { name, description, price, image, howToUse, amountLeft, discount, category } = req.body;


  try {
    const product = await Product.create({
      name,
      description,
      price,
      image,
      howToUse,
      amountLeft,
      discount,
      category,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
else
{
  res.status(400).json({ error: "Access Restriced"});
}
};

const editProduct = async (req, res) => {
  if(await req.user.role == "Admin")
  {
  try {
    const id = req.params.id;

    const product = await Product.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    res.status(200).json(product);
  } 
  catch{
    res.status(400).json({ error: error.message});
  }
}

else
{
  res.status(400).json({ error: "Access Restriced"});
}

};

const editProductAmount = async (req, res) => {

  if(await req.user.role == "WM")
  {
  try {
    const id = req.params.id;
    const newAmountLeft = req.body.amountLeft;

    const product = await Product.findOneAndUpdate(
      { _id: id },
      {
        amountLeft: newAmountLeft,
      }
    );

    res.status(200).json(product);
  } 
  catch{
    res.status(400).json({ error: error.message});
  }

}
else
{
  res.status(400).json({ error: "Access Restriced"});
}
};
/*const buyProduct = async (req, res) => {
  if (await User.findById(req.user._id)) {
    const id = req.query.id;
    const product = req.query.cart;
    const user = req.user._id;

    let cartTemp = [Object];
    cartTemp = user.cart;
    let found = false;

    console.log(cartTemp);
    //cartTemp.push({ productName: product, userId: user });
    cartTemp.push({ productName: product, productID: id });
    console.log(cartTemp);
    let len = cartTemp.length;
    console.log(len);

    const updatedCart = await User.findOneAndUpdate(
      { _id: id },
      { cart: cartTemp },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } else {
    res.status(400).json({ error: "Access Restriced" });
  }
};*/

const buyProduct = async (req, res) => {
  try {
    console.log(req.user.id);
    const userId = req.user.id;
    const productID = req.body.id;
    console.log(productID);
    // const productName = req.body.cart;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    /*const productsSchemaName = Product.collection.name;

    console.log(productsSchemaName);*/

    let cartTemp = user.cart;
    console.log("logged in");
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    // Check if the product already exists in the cart by its ID
    const existingProduct = cartTemp.find(
      (item) => item.product._id.toString() === productID
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartTemp.push({ product, quantity: 1 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { cart: cartTemp },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const removeProduct = async (req, res) => {
  try {
    //console.log(req.user.id);
    const userId = req.user.id;
    const productID = req.body.id;
    //const productName = req.body.cart;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    let cartTemp = user.cart;
    console.log("logged in");

    const indexOfProduct = cartTemp.findIndex(
      (item) => item.product._id.toString() === productID
    );

    console.log(indexOfProduct);
    console.log(cartTemp[indexOfProduct].quantity);

    if (indexOfProduct !== -1) {
      if (cartTemp[indexOfProduct].quantity > 1) {
        // Decrement the quantity if it's greater than 1
        cartTemp[indexOfProduct].quantity--;
        console.log("hiiii");
      } else {
        // Filter out the product from the cart if its quantity is 1 or less
        cartTemp = cartTemp.filter(
          (item) => item.product._id.toString() !== productID
        );
        console.log("hiiii");
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { cart: cartTemp },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getCartProducts = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user by ID and select the 'cart' field
    const user = await User.findById(userId).select('cart');

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Extract product IDs from the user's cart
    const productIDs = user.cart.map((product) => product.product);

    // Fetch the products from the database based on the product IDs
    const products = await Product.find({ _id: { $in: productIDs } });

    // Map the product details (name, image, price) to the cart items
    const cartWithProducts = user.cart.map((cartItem) => {
      const product = products.find((p) => p._id.equals(cartItem.product._id));
      if (product) {
        return {
          productName: product.name,
          productID: product._id,
          productImage: product.image,
          productPrice: product.price,
          quantity: cartItem.quantity,

        };
      }
      return null;
    });

    // Remove any null entries (products not found)
    const filteredCart = cartWithProducts.filter(Boolean);

    res.status(200).json(filteredCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const searchProduct = async (req, res) => {
  try {
    const prefix = req.body.input || ''; // Get the search prefix from the query parameter
    const query = { name: { $regex: `${prefix}`, $options: 'i' } };
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteUserCart = async (req, res) => {
  try {
    const id = req.user.id;

    // Find the user by ID
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Clear the user's cart
    user.cart = [];

    // Save the changes
    await user.save();

    res.status(200).json({ message: 'User cart has been cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const filterProducts = async(req,res)=>{

  const {price,rating,inStock,category}=req.body

  console.log(!price)

  try{

      if((price || price===0) && (rating || rating===0) && inStock && category) //filter by price and rating and in stock and category
      {
        const products = await Product.find({ "price": { $lte: price }, "rating": { $gte: rating }, "amountLeft": { $gte: 1 }, "category": category })
        console.log("enetered 1")
        return res.status(200).json(products)
      }
      else if ((price || price===0) && (rating || rating===0) && inStock && (!category || category==="")) //filter by price and rating and in stock 
      {
        const products = await Product.find({ "price": { $lte: price }, "rating": { $gte: rating }, "amountLeft": { $gte: 1 } })
        console.log("enetered 2")
        return res.status(200).json(products)
      }
      else if((price || price===0) && (rating || rating===0) && !inStock && category) //filter by price and rating and category
      {
        const products = await Product.find({ "price": { $lte: price }, "rating": { $gte: rating }, "category": category })
        console.log("enetered 3")
        return res.status(200).json(products)
      }
      else if((price || price===0) && ((!rating || rating==="") && rating!==0) && inStock && category) //filter by price and in stock and category
      {
        const products = await Product.find({ "price": { $lte: price }, "amountLeft": { $gte: 1 }, "category": category })
        console.log("enetered 4")
        return res.status(200).json(products)
      }
      else if(((!price || price==="") && price!==0) && (rating || rating===0) && inStock && category) //filter by rating and in stock and category
      {
        const products = await Product.find({ "rating": { $gte: rating }, "amountLeft": { $gte: 1 }, "category": category })
        console.log("enetered 5")
        return res.status(200).json(products)
      }
      else if((price || price===0) && (rating || rating===0) && !inStock && (!category || category==="")) //filter by price and rating 
      {
        const products = await Product.find({ "price": { $lte: price }, "rating": { $gte: rating } })
        console.log("enetered 6")
        return res.status(200).json(products)
      }
      else if((price || price===0) && ((!rating || rating==="") && rating!==0) && inStock && (!category || category==="")) //filter by price and in stock
      {
        const products = await Product.find({ "price": { $lte: price }, "amountLeft": { $gte: 1 }})
        console.log("enetered 7")
        return res.status(200).json(products)
      }
      else if((price || price===0) && ((!rating || rating==="") && rating!==0) && !inStock && category) //filter by price and category
      {
        const products = await Product.find({ "price": { $lte: price }, "category": category })
        console.log("enetered 8")
        return res.status(200).json(products)
      }
      else if(((!price || price==="") && price!==0) && (rating || rating===0) && inStock && (!category || category==="")) //filter by rating and in stock 
      {
        const products = await Product.find({  "rating": { $gte: rating }, "amountLeft": { $gte: 1 } })
        console.log("enetered 9")
        return res.status(200).json(products)
      }
      else if(((!price || price==="") && price!==0) && (rating || rating===0) && !inStock && category) //filter by rating and category
      {
        const products = await Product.find({  "rating": { $gte: rating }, "category": category })
        console.log("enetered 10")
        return res.status(200).json(products)
      }
      else if(((!price || price==="") && price!==0) && ((!rating || rating==="") && rating!==0) && inStock && category) //filter by in stock and category
      {
        const products = await Product.find({"amountLeft": { $gte: 1 }, "category": category })
        console.log("enetered 11")
        return res.status(200).json(products)
      }
      else if((price || price===0) && ((!rating || rating==="") && rating!==0) && !inStock && (!category || category==="")) //filter by price 
      {
        const products = await Product.find({ "price": { $lte: price }})
        console.log("enetered 12")
        return res.status(200).json(products)
      }
      else if(((!price || price==="") && price!==0) && (rating || rating===0) && !inStock && (!category || category==="")) //filter by rating 
      {
        const products = await Product.find({  "rating": { $gte: rating }})
        console.log("enetered 13")
        return res.status(200).json(products)
      }
      else if(((!price || price==="") && price!==0) && ((!rating || rating==="") && rating!==0) && inStock && (!category || category==="")) //filter by in stock 
      {
        const products = await Product.find({ "amountLeft": { $gte: 1 }})
        console.log("enetered 14")
        return res.status(200).json(products)
      }
      else if(((!price || price==="") && price!==0) && ((!rating || rating==="") && rating!==0) && !inStock && category) //filter by category 
      {
        const products = await Product.find({ "category": category})
        console.log("enetered 15")
        return res.status(200).json(products)
      }
      else if(((!price || price==="") && price!==0) && ((!rating || rating==="") && rating!==0) && !inStock && (!category || category==="")) //filter by nothing 
      {
        const products = await Product.find({})
        console.log("enetered 16")
        return res.status(200).json(products)
      }

  }catch(error)
  {
    res.status(400).json({ error: error.message })
  }
}


const addRatingAndOrReview = async (req,res) => {

  const userID=req.user.id
  const productID=req.params.id
  const {rating,review}=req.body

  const userIDasObj=new BSON.ObjectId(userID)

  try{

    //get info to update the avergae rating later
    const currAvgRating=(await Product.find({"_id":productID}).select({_id:0,rating:1})).at(0).rating
    const currNoOfRatings=await (await Product.find({"_id":productID}).select({_id:0,ratingsAndReviews:1})).at(0).ratingsAndReviews.length

    //did the user rate before
    const ratedBefore=await Product.find({"_id":productID, "ratingsAndReviews.user":userID}).select({_id:0,ratingsAndReviews:1})

   
    if (ratedBefore.length!==0)
    {
      console.log("entered rated before")

      //if the user rated before, get his old rating so you can update teh average
      const tmp=ratedBefore.at(0).ratingsAndReviews
      const currUserRating=tmp.find(element => {
        return  element.user .equals( userIDasObj)
      });
      

      if((rating || rating===0) && review)
      {
        const result=await Product.updateOne({"_id":productID,"ratingsAndReviews.user":userID},{$set: { "ratingsAndReviews.$.rating" : rating, "ratingsAndReviews.$.review" : review}})
        const newAvg=(((currAvgRating*currNoOfRatings)-(currUserRating.rating)+rating)/currNoOfRatings).toPrecision(4)
        const updateAvg=await Product.updateOne({"_id":productID},{$set: { "rating" : newAvg}})
        return res.status(200).json(result)
      }
      else if(rating || rating===0)
      {
        const result=await Product.updateOne({"_id":productID,"ratingsAndReviews.user":userID},{$set: { "ratingsAndReviews.$.rating" : rating}})
        const newAvg=(((currAvgRating*currNoOfRatings)-(currUserRating.rating)+rating)/currNoOfRatings).toPrecision(4)
        const updateAvg=await Product.updateOne({"_id":productID},{$set: { "rating" : newAvg}})
        return res.status(200).json(result)
      }
      else if (review)
      {
        const result=await Product.updateOne({"_id":productID,"ratingsAndReviews.user":userID},{$set: { "ratingsAndReviews.$.review" : review}})
        return res.status(200).json(result)
      }
    }
    else
    {
      console.log("entered else")
      const result=await Product.updateOne({"_id":productID},{$push: { "ratingsAndReviews":{user:userID,rating:rating,review:review}}})
      const newAvg=(((currAvgRating*currNoOfRatings)+rating)/(currNoOfRatings+1)).toPrecision(4)
        const updateAvg=await Product.updateOne({"_id":productID},{$set: { "rating" : newAvg}})
        return res.status(200).json(result)
    }

  }catch(error)
  {
    res.status(400).json({ error: error.message })
  }
}

const getCurrUserRatingAndOrReview=async(req,res)=>{

  const userID=req.user.id
  const productID=req.params.id

  const userIDasObj=new BSON.ObjectId(userID)

  try{

    const ratedBefore=await Product.find({"_id":productID, "ratingsAndReviews.user":userID}).select({_id:0,ratingsAndReviews:1})
    if(ratedBefore.length!==0)
    {
      const tmp=ratedBefore.at(0).ratingsAndReviews
      const currUserRating=tmp.find(element => {
        return  element.user .equals( userIDasObj)
      });

      return res.status(200).json(currUserRating)
    }
    else
    {
      return res.status(201).json({error:"current user didn't rate or review before"})
    }

  }catch(error)
  {
    res.status(400).json({ error: error.message })
  }
}

const getUserEmail = async (req, res) => {
  try {
    console.log(req.user.id);

    const userId = req.user.id;
    const email = await User.findById(userId).select({ email: 1 });
    res.status(200).json(email);
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

const deductStock = async (req, res) => {
  const orderDetails = req.body; // An array of { productId, quantity } objects

  try {
    // Loop through orderDetails and update product quantities
    for (const { productId, quantity } of orderDetails) {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Subtract the ordered quantity from the product's stock
      product.amountLeft -= quantity;

      if (product.quantity < 0) {
        return res.status(400).json({ error: 'Insufficient stock' });
      }

      // Save the updated product in the database
      await product.save();
    }

    // Respond with a success message
    res.status(200).json({ message: 'Product quantities updated successfully' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};

const getAllCategories=async(req,res)=>{

  try {
    const result=await Product.aggregate([ { $group: { _id: "$category" } },{ $project : { _id: 0, category:"$_id"}}])
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = {
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
  deductStock,
  getAllCategories
};
