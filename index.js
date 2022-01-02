//PS
// D:\public\react\ecommerce-store\server
//
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const sequelize = require('./config/database');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const session = require('express-session');
// const sequelizeSessionStore = require('./config/sequelizeSessionStore');
require('./config/passport');

// initalize sequelize with session store
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

const port = process.env.PORT || 3001;

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database',error);
  }


  // configure express
  var app = express();
  // app.use(cors(
  //   {
  //     credentials:true,
  //     origin:"http://localhost:3000", 
  //     methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  //   }
  // ));

  app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS' );
    // res.setHeader('Access-Control-Allow-Methods', '*' );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("access-control-expose-headers", 'Set-Cookie');
    next();
  })
  
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.urlencoded({extended:true}));
  app.use(express.json());


// passport.js
require('./config/passport');
app.use(passport.initialize());
// app.use(passport.session());

//routers
const productRouter = require('./routers/product');
const userRouter = require('./routers/user');
const cartRouter = require('./routers/cart');

// use routers in middleware
app.use('/products', productRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);

app.get('/', (req,res, next) => {
    try {
      res.json('hello');
    } catch (err) {
        next(err);
    }
  });

  // Wildcard route - catch all
app.use('*',(req,res, next) => {
  const error = new Error('Resource not found');
  error.statusCode = 404;
  next(error); // pass error to error handler middleware below
});

// Error handling middleware route
app.use((error, req, res, next) => {
  console.log("Error Handling Middleware called");
  console.log(error)
  // if(error.statusCode !== 404) {
  //   error.statusCode = 500;
  //   error.message = 'Something went wrong';
  // }
  if (!error.statusCode) { 
    // console.log(error);
    return res.json({error: error.message});
  };
  return res.status(error.statusCode).json({error: error.message});

});
  
app.listen(port, async() => {
    console.log(`listening on port ${port}`);
    
});