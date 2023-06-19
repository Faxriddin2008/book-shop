import { Router } from "express";
import mongoose, { Schema, model } from "mongoose";

const router = Router();
const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = model("products", ProductSchema);

router.get("/", async (req, res) => {
  const products = await Product.find({}).lean();
  // console.log(products);
  res.render("index", {
    title: "Book Shop | Main",
    products: products,
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    title: "Book Shop | About",
  });
});

router.get("/products", (req, res) => {
  res.render("products", {
    title: "Book Shop | Products",
    isProducts: true,
  });
});

router.get("/add", (req, res) => {
  res.render("add", {
    title: "Book Shop | Add",
    isAdd: true,
  });
});

router.post("/add", (req, res) => {
  console.log(req.body);
  const user1 = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
  };
  mongoose.connection.collection("books").insertOne(user1);
  res.redirect("/");
});

export default router;
