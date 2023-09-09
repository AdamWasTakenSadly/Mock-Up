require("dotenv").config();
const { requireAuth } = require("./Middleware/authMiddleware");

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var session = require("express-session");
const multer = require("multer");
const path = require("path");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const guestRoutes = require("./routes/guest");
const workerRoutes = require("./routes/worker")
const logRoutes = require("./routes/log")
const ordersRoutes = require("./routes/orders")
const promocodeRoutes = require("./routes/promocode")


//functions for login routes
const {
  login,
  signUp,
  logOut,
  getCurrentUserId,
} = require("./controllers/loginController");

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/guest", guestRoutes);
app.use("/promocode",promocodeRoutes)
app.use("/orders",ordersRoutes)
app.use("/worker",workerRoutes)
app.use("/log",logRoutes)


//connect to db and accessing same one everytime
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
    console.log("can not connect to database");

  });

//homepage routes
app.get("/", function (req, res) {
  //home page just testing sessions and telling user visited how many times
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
});

//login routes
app.post("/login", login);

app.post("/signup", signUp);

app.get("/logout", logOut);

app.get("/currentUserId", requireAuth, getCurrentUserId);

//npm install express
//npm install nodemon -g
//npm install dotenv
//npm install mongoose
//npm run dev -> to run with nodemon
//npm i cookie-parser
//npm i express-session
