import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import cookieParser from 'cookie-parser';
import cors from 'cors';

//import routes
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { configureJwtStrategy } from "./passport-config.js";

//loads .env file contents into process.env (environment variables)
dotenv.config();

const app = express();

app.use(cors({
    credentials:true, //Access-Control-Allow-Credentials true (we allow credentials to be sent)
    origin:true //Access-Control-Allow-Origin *
}));
//middleware to parse cookies and add those cookies to req.cookies
app.use(cookieParser());

configureJwtStrategy(passport);

//allows us to parse json information from http body to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connecting to the database
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
  )
  .then(() => {
    console.log("Database connected! 😃");
  })
  .catch((error) => {
    console.log(error.message);
    console.log("🤨");
  });

//registering routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

//listening for requests on port 3001
app.listen(3001, (req, res) => {
  console.log("Server is listening for HTTP requests on port 3001");
});
