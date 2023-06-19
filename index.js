// const express = require('express')
import mongoose from "mongoose";
import express from "express";
import * as dotenv from "dotenv";
import { Schema, model } from "mongoose";
// import User from "./schema.js";
dotenv.config();
const db = mongoose.connection;
// const {engine, create} = require('express-handlebars')
import { engine, create } from "express-handlebars";
import AuthRoutes from "./routes/auth.js";
import BooksRoutes from "./routes/books.js";
// import pkg from "express";
// const path = require('path')
import path from "path";
// const { express } = pkg;
const app = express();
const PORT = process.env.PORT;
// app.set('view engine', 'ejs')

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});
app.use(express.json());
app.engine("hbs", hbs.engine);
// mongoose
//   .connect("mongodb+srv://Faxriddin:aib3UWUsoqVB6teG@cluster15272.zflhwbr.mongodb.net/", {})
//   .then(() => {
//     console.log("Database is connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const conn = mongoose
  .connect("mongodb://127.0.0.1:27017/demo")
  .then((connection) => {
    console.log("Database connected");
    // console.log(db.collection);
  })
  .catch((err) => {
    console.log("Error");
  });
// console.log(db);
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.use(express.static("public"));

// console.log(db);
// db.users.insert( { item: "card", qty: 15 } )

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: Number, required: true },
});

// const User = model("users", UserSchema);

async function get() {
  const products = await User.find({})
  console.log(products);
}

// get();

// console.log(users);
// db.collection("users").insertOne(user1);

// console.log(process.env.MONGO_URI);
app.use(AuthRoutes);
app.use(BooksRoutes);
app.listen(2008, () => {
  console.log(`server started `);
});
