import { Router } from "express";
import mongoose, { Schema, model } from "mongoose";

const router = Router();
const BookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

const Book = model("books", BookSchema);

router.get("/", async (req, res) => {
  res.render("index", {
    title: "Book Shop | Main",
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    title: "Book Shop | About",
  });
});

router.get("/products", async (req, res) => {
  const books = await Book.find({}).lean();
  // mongoose.connection.collection("books").updateOne( { title: "Hech nima" }, { $set: { price: 100 } } )

  // console.log(books);
  res.render("products", {
    title: "Book Shop | Products",
    isProducts: true,
    books: books,
  });
});

router.get("/details/:id", async (req, res) => {
  const product = await Book.findOne({ _id: req.params.id }).lean();
  res.render("details", {
    title: "Book Shop | Details",
    product: product,
  });
});

// router.post('/details/:id', async (req, res) => {

//   const product = await Book.findOne({_id: req.params.id}).lean()
//   res.render('details', {
//     title: "Book Shop | Details",
//     product: product,
//   })
// })

router.get("/edit/:id", async (req, res) => {
  const product = await Book.findOne({ _id: req.params.id }).lean();
  // console.log(product);
  res.render("edit-product", {
    product: product,
    // isEdit: true,
    title: "Book Shop | Edit book",
  });
});

router.post("/edit-product/:id", async (req, res) => {
  // console.log(req.body);
  // console.log(`ObjectId('${req.params.id}')`);
  const product = await Book.findOne({ _id: req.params.id }).lean();
  // console.log(product._id);
  await mongoose.connection
    .collection("books")
    .updateOne(
      { _id: product._id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          image: req.body.image,
          price: req.body.price,
        },
      }
    );
  res.redirect("/products");
});

router.get("/add", (req, res) => {
  res.render("add", {
    title: "Book Shop | Add",
    isAdd: true,
  });
});

router.post("/delete/:id", async (req, res) => {
  await Book.findByIdAndRemove(req.params.id);
  res.redirect("/products");
});

router.post("/add", (req, res) => {
  // console.log(req.body);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function oyniolish(i) {
    return months[i + 1];
  }
  const date = `${new Date().getDate()} ${oyniolish(
    new Date().getMonth()
  )}, ${new Date().getFullYear()}`;
  const user1 = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
    time: new Date().getTime(),
    createdAt: date,
  };
  mongoose.connection.collection("books").insertOne(user1);
  res.redirect("/");
});

export default router;
