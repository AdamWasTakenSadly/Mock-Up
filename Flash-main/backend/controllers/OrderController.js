const Order = require("../models/OrdersModel");
const nodemailer = require("nodemailer");
const User = require("../models/UsersModel");
const Product = require("../models/ProductsModel");

// Controller actions

/*const createOrder = async (req, res) => {
  const {
    orderFirstName,
    orderLastName,
    orderPhone,
    orderProducts,
    totalAmount,
    address,
    additionalInfo,
  } = req.body;

  try {
    const orderUser = req.user.id;

    const order = await Order.create({
      orderUser,
      orderFirstName,
      orderLastName,
      orderPhone,
      orderProducts,
      totalAmount,
      address,
      additionalInfo,
    });

    for (let i = 0; i < orderProducts.length; i++) {
      console.log(orderProducts[i].product);
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: orderProducts[i].product },
        { amountLeft: orderProducts[i].amountLeft },
        { new: true }
      );
    }

    res.status(200).json(order);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};*/

const createOrder = async (req, res) => {
  const {
    orderFirstName,
    orderLastName,
    orderPhone,
    orderProducts,
    totalAmount,
    address,
    additionalInfo,
  } = req.body;

  try {
    const orderUser = req.user.id;

    // Create an array to hold products with insufficient stock
    const outOfStockProducts = [];

    for (let i = 0; i < orderProducts.length; i++) {
      const productInfo = await Product.findById(orderProducts[i].product);
      if (!productInfo) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Check if the requested quantity exceeds available stock
      if (orderProducts[i].quantity > productInfo.amountLeft) {
        outOfStockProducts.push({
          productName: productInfo.name,
          requestedQuantity: orderProducts[i].quantity,
          availableStock: productInfo.amountLeft,
        });
      }
    }

    if (outOfStockProducts.length > 0) {
      // If any product is out of stock, return an error response
      return res.status(400).json({
        error: "Some products are out of stock",
        outOfStockProducts: outOfStockProducts,
      });
    }

    // All products have sufficient stock, proceed with order creation
    const order = await Order.create({
      orderUser,
      orderFirstName,
      orderLastName,
      orderPhone,
      orderProducts,
      totalAmount,
      address,
      additionalInfo,
    });

    for (let i = 0; i < orderProducts.length; i++) {
      // Update the stock for each product
      await Product.findOneAndUpdate(
        { _id: orderProducts[i].product },
        { $inc: { amountLeft: -orderProducts[i].quantity } }, // Deduct the ordered quantity from available stock
        { new: true }
      );
    }

    res.status(200).json(order);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};


// Get pending orders
  const  getOrdersPending = async (req, res) => {
    if(await req.user.role == "Admin")
    {
    try{
    const orders = await Order.find({orderStatus:"Pending"});
    res.status(200).json(orders);
}
 catch (error) {
  res.status(400).json({ error: error.message });
} 
}
else
{
  res.status(400).json({ error: "Access Restriced"});
}
};

// Get delivering orders
const  getOrdersDelivering = async (req, res) => {
  if(await req.user.role == "Admin")
  {
  try{
  const orders = await Order.find({orderStatus:"Delivering"});
  res.status(200).json(orders);
}
catch (error) {
res.status(400).json({ error: error.message });
} 
  }

  else
{
  res.status(400).json({ error: "Access Restriced"});
}
};

// Get Shipped orders
const  getOrdersShipped = async (req, res) => {
  if(await req.user.role == "Admin")
  {
  try{
  const orders = await Order.find({orderStatus:"Shipped"});
  res.status(200).json(orders);
}
catch (error) {
res.status(400).json({ error: error.message });
} 
}
else
{
  res.status(400).json({ error: "Access Restriced"});
}
};

// Get cenceled orders
const  getOrdersCanceled = async (req, res) => {
  if(await req.user.role == "Admin")
  {
  try{
  const orders = await Order.find({orderStatus:"Canceled"});
  res.status(200).json(orders);
}
catch (error) {
res.status(400).json({ error: error.message });
} 
  }
  else
{
  res.status(400).json({ error: "Access Restriced"});
}
};

// Update order status
const updateStatus = async (req, res) => {
  if(await req.user.role == "Admin")
  {
  try {
    const id = req.params.id;

    const order = await Order.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    res.status(200).json(order);
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

const getUserOrders = async(req,res)=>{

  const userID=req.user.id
  
  try{
    const result= await Order.find({"orderUser":userID})
    res.status(200).json(result);
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
  }
}




//send order details by mail
const sendOrderDetails = async (req, res) => {
  if (await User.findOne({ String: req.body.email })) {
    //const email = req.body.email;

    //const instructor = await Instructor.find({ _id: "63715373d953904400b6a4d5" });
    const {
      email,
      firstName,
      lastName,
      phone,
      products,
      totalAmount,
      address,
      additionalInfo,
    } = req.body;

    console.log("hi");
    console.log(req.body.email);
    /*if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such instructor" });
  }*/
    let productsInfo = "";

    for (let i = 0; i < products.length; i++) {
      productsInfo =
        productsInfo + "\n" + products[i].name + " " + products[i].price + ",";
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "No such user" });
    } else {
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "work2462000@gmail.com",
          pass: "ebaacfvxetdmcdxm",
        },
      });

      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
        }
        .card {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
        h2 {
            font-size: 24px;
            color: #333;
        }
        p {
            font-size: 16px;
            color: #666;
        }
        .contact-details {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>Order Details</h2>
        <div class="contact-details">
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Products:</strong> ${productsInfo}</p>
        <p><strong>Total Amount:</strong> $${totalAmount}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Additional Info:</strong> ${additionalInfo}</p>
      </div>
        </div>
    </div>
</body>
</html>
`;

      let details = {
        from: "work2462000@gmail.com",
        to: req.body.email,
        subject: "Order Details",
        html: htmlContent,
      };

      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log("error");
          console.log(err);
          console.log(req.body.email);
        } else {
          console.log("email sent");
        }
      });
    }

    res.status(200).json(user);
  } else {
    res.status(400).json({ error: "Access Restriced" });
  }
};

module.exports = {
  createOrder,

  sendOrderDetails,
  // Add other controller actions here

  getOrdersPending,
  getOrdersDelivering,
  getOrdersShipped,
  getOrdersCanceled,
  updateStatus,
  getUserOrders

};
