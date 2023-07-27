//const currency = require("iso-country-currency")

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
  const { name, description, price, rating, image } = req.body;

  try {
    const product = await Product.create({
      name,
      description,
      price,
      rating,
      image,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
      const product = products.find((p) => p._id.equals(cartItem.product));
      if (product) {
        return {
          productName: product.name,
          productID: product._id,
          productImage: product.image,
          productPrice: product.price,
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
    const prefix = req.body.prefix || ''; // Get the search prefix from the query parameter
    const query = { name: { $regex: `${prefix}`, $options: 'i' } };
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
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
  searchProduct
};
