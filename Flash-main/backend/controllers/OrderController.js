const Order = require('../models/OrdersModel');

// Controller actions

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
    res.status(200).json(order);
  } catch (error) {
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



module.exports = {
  createOrder,
  getOrdersPending,
  getOrdersDelivering,
  getOrdersShipped,
  getOrdersCanceled,
  updateStatus,
  getUserOrders
};
