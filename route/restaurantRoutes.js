const express = require('express');
const restaurantRouter = express.Router();
const RestaurantControllers = require('../controller/restaurantController'); // Import the createRestaurant function
const { createRestaurant, readRestaurant, readAllRestaurants, readRestaurantsByCuisine, updateRestaurant, deleteRestaurant, searchRestaurantsByLocation, filterRestaurantsByRating, addDishToMenu, removeDishFromMenu, addRestaurantReviewAndRating, getUserReviewsForRestaurant } = RestaurantControllers

// Create a new restaurant
restaurantRouter.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const restaurantData = req.body;
    const newRestaurant = await createRestaurant(restaurantData);
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create restaurant' });
  }
});

// get restaurant by location
restaurantRouter.get('/search', async (req, res) => {
  try {
    const location = req.query.location;
    if (!location) {
      return res.status(400).json({ error: 'Location parameter is missing' });
    }

    const restaurants = await searchRestaurantsByLocation(location);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Error searching restaurants by location' });
  }
});

//get restaurant by name
restaurantRouter.get('/:name', async (req, res) => {
  try {
    const restaurantName = req.params.name;
    const restaurant = await readRestaurant(restaurantName);
    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Restaurant not found' });
  }
});

//get all restaurants
restaurantRouter.get('/', async (req, res) => {
  try {
    const restaurants = await readAllRestaurants();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error reading all restaurants' });
  }
});

//get restaurant by cuisine
restaurantRouter.get('/cuisine/:cuisine', async (req, res) => {
  try {
    const cuisineType = req.params.cuisine;
    const restaurants = await readRestaurantsByCuisine(cuisineType);
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error reading restaurants by cuisine' });
  }
});

//update a restaurant by id
restaurantRouter.post('/:restaurantId', async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const updatedData = req.body;
    const updatedRestaurant = await updateRestaurant(restaurantId, updatedData);

    res.json(updatedRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating restaurant' });
  }
});

// delete by id
restaurantRouter.delete('/:restaurantId', async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const deletedRestaurant = await deleteRestaurant(restaurantId);

    res.json(deletedRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting restaurant' });
  }
});

// filter by rating
restaurantRouter.get('/rating/:minRating', async (req, res) => {
  try {
    const minRating = parseFloat(req.params.minRating);
    if (isNaN(minRating)) {
      return res.status(400).json({ error: 'Invalid minRating parameter' });
    }

    const restaurants = await filterRestaurantsByRating(minRating);
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error filtering restaurants by rating' });
  }
});

// add dish 
restaurantRouter.post('/:restaurantId/menu', async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const newDish = req.body;
    const updatedRestaurant = await addDishToMenu(restaurantId, newDish);

    res.json(updatedRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding dish to menu' });
  }
});

// remove a dish
restaurantRouter.delete('/:restaurantId/menu/:dishName', async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const dishName = req.params.dishName;
    const updatedRestaurant = await removeDishFromMenu(restaurantId, dishName);

    res.json(updatedRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error removing dish from menu' });
  }
});

// add rating and reviews
restaurantRouter.post('/:restaurantId/reviews', async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const { userId, reviewText, rating } = req.body;
    if (!userId) {
      throw new Error("User Id is missing")
    }
    const updatedRestaurant = await addRestaurantReviewAndRating(restaurantId, userId, reviewText, rating);

    res.json(updatedRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding restaurant review and rating' });
  }
});

// get reviews of a restaurant
restaurantRouter.get('/:restaurantId/reviews', async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const userReviews = await getUserReviewsForRestaurant(restaurantId);

    res.json(userReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving user reviews for restaurant' });
  }
});


module.exports = restaurantRouter;
