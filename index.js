require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');


const connectDB = require('./db/connectDB');
const userRoute = require('./routes/users');
const videosRoute = require('./routes/videos');
const commentRoute = require('./routes/comments');
const authRoute = require('./routes/auths');
const errorHandler = require('./errors/errorHandler');
const verifyToken = require('./middlewares/verifyToken');
const PORT = process.env.PORT || 5000;

const app = express()

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users',  userRoute);
app.use('/api/v1/videos', videosRoute);
app.use('/api/v1/comments', commentRoute);
app.use(errorHandler);

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(PORT, () =>
        console.log(` Connected to DB and server is listening on port ${PORT}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();