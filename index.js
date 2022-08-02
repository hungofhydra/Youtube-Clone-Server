const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./db/connectDB');

const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express()

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