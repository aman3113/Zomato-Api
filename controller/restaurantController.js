const mongoose = require("mongoose")

const Restaurant = mongoose.model("Restaurant")

async function createRestaurant(restaurantData) {
  try {
    const newRestaurant = new Restaurant(restaurantData);
    await newRestaurant.save();
    return newRestaurant;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create restaurant');
  }
}

async function readRestaurant(restaurantName) {
  try {
    const restaurant = await Restaurant.findOne({ name: restaurantName });
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    return restaurant;
  } catch (error) {
    console.error(error);
    throw new Error('Error reading restaurant');
  }
}

async function readAllRestaurants() {
  try {
    const restaurants = await Restaurant.find();
    return restaurants;
  } catch (error) {
    console.error(error);
    throw new Error('Error reading all restaurants');
  }
}

async function readRestaurantsByCuisine(cuisineType) {
  try {
    const restaurants = await Restaurant.find({ cuisine: cuisineType });
    return restaurants;
  } catch (error) {
    console.error(error);
    throw new Error('Error reading restaurants by cuisine');
  }
}

async function updateRestaurant(restaurantId, updatedData) {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedRestaurant) {
      throw new Error('Restaurant not found');
    }

    return updatedRestaurant;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating restaurant');
  }
}

async function deleteRestaurant(restaurantId) {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndRemove(restaurantId);

    if (!deletedRestaurant) {
      throw new Error('Restaurant not found');
    }

    return deletedRestaurant;
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting restaurant');
  }
}

async function searchRestaurantsByLocation(location) {
  try {
    const restaurants = await Restaurant.find({ city: location });
    return restaurants;
  } catch (error) {
    console.error(error);
    throw new Error('Error searching restaurants by location');
  }
}

async function filterRestaurantsByRating(minRating) {
  try {
    const restaurants = await Restaurant.find({ rating: { $gte: minRating } });
    return restaurants;
  } catch (error) {
    console.error(error);
    throw new Error('Error filtering restaurants by rating');
  }
}

async function addDishToMenu(restaurantId, newDish) {
  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    restaurant.menu.push(newDish);
    const updatedRestaurant = await restaurant.save();
    return updatedRestaurant;
  } catch (error) {
    console.error(error);
    throw new Error('Error adding dish to menu');
  }
}

async function removeDishFromMenu(restaurantId, dishName) {
  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const updatedMenu = restaurant.menu.filter((dish) => dish.name !== dishName);

    restaurant.menu = updatedMenu;
    const updatedRestaurant = await restaurant.save();
    return updatedRestaurant;
  } catch (error) {
    console.error(error);
    throw new Error('Error removing dish from menu');
  }
}

async function addRestaurantReviewAndRating(restaurantId, userId, reviewText, rating) {
  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      throw new Error('Restaurant or User not found');
    }

    const newReview = {
      userId,
      rating,
      reviewText,
    };

    restaurant.reviews.push(newReview);
    const updatedRestaurant = await restaurant.save();
    return updatedRestaurant;
  } catch (error) {
    console.error(error);
    throw new Error('Error adding restaurant review and rating');
  }
}

async function getUserReviewsForRestaurant(restaurantId) {
  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const userReviews = restaurant.reviews;
    return userReviews;
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving user reviews for restaurant');
  }
}

module.exports = { createRestaurant, readRestaurant, readAllRestaurants, readRestaurantsByCuisine, updateRestaurant, deleteRestaurant, searchRestaurantsByLocation, filterRestaurantsByRating, addDishToMenu, removeDishFromMenu, addRestaurantReviewAndRating, getUserReviewsForRestaurant }
