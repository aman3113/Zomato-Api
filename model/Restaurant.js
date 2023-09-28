const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  isVeg: Boolean,
  averageRating: { type: Number, default: 0 }, // Default value is 0
});

const reviewSchema = new mongoose.Schema({
    userId: String,
    rating: Number,
    reviewText: String
  });

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  address: String,
  city: String,
  rating: { type: Number, default: 0 }, // Default value is 0
  menu: [menuSchema],
  reviews: [reviewSchema]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
