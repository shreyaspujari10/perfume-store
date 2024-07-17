// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [String],
  sizes: [String]
});

const reviewSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  user: String,
  review: String,
  rating: Number
});

const Product = mongoose.model('Product', productSchema);
const Review = mongoose.model('Review', reviewSchema);

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

app.get('/reviews/:productId', async (req, res) => {
  const reviews = await Review.find({ productId: req.params.productId });
  res.json(reviews);
});

app.post('/reviews', async (req, res) => {
  const newReview = new Review(req.body);
  await newReview.save();
  res.json(newReview);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
