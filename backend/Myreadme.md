# Student Marketplace Backend API

This is the backend for a Student Marketplace application built with Node.js, Express, and MongoDB. It provides a RESTful API for managing users, products, wishlists, and messages.

## Features

-   User authentication (register, login, profile management)
-   Product management (create, read, update, delete)
-   Product filtering by category and price
-   Product search functionality
-   Wishlist functionality
-   Messaging system between users
-   Image uploads for products

## Prerequisites

-   Node.js (v14 or higher)
-   MongoDB (local or Atlas)
-   NPM or Yarn

## Getting Started

1. Clone the repository
2. Install dependencies:
    ```
    npm install
    ```
3. Create a `.env` file in the root directory with the following variables:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/student-marketplace
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    ```
4. Start the server:
    ```
    npm start
    ```

## API Endpoints

### Authentication

-   `POST /api/auth/register` - Register a new user
-   `POST /api/auth/login` - Login a user
-   `GET /api/auth/profile` - Get user profile (protected)
-   `PUT /api/auth/profile` - Update user profile (protected)

### Products

-   `POST /api/products/post` - Create a new product (protected)
-   `GET /api/products` - Get all products
-   `GET /api/products/search` - Search products
-   `GET /api/products/myproducts` - Get user's products (protected)
-   `GET /api/products/category/:category` - Get products by category
-   `GET /api/products/:id` - Get a product by ID
-   `PUT /api/products/update/:id` - Update a product (protected)
-   `DELETE /api/products/delete/:id` - Delete a product (protected)

### Wishlist

-   `POST /api/wishlist/add` - Add a product to wishlist (protected)
-   `DELETE /api/wishlist/remove/:productId` - Remove a product from wishlist (protected)
-   `GET /api/wishlist` - Get user's wishlist (protected)

### Messages

-   `POST /api/messages/send` - Send a message (protected)
-   `GET /api/messages` - Get user's messages (protected)
-   `PUT /api/messages/:id/read` - Mark a message as read (protected)

## Query Parameters for Filtering Products

The following query parameters can be used with product endpoints:

-   `minPrice`: Filter products with price greater than or equal to this value
-   `maxPrice`: Filter products with price less than or equal to this value
-   `keyword`: Search products by title or description (for /search endpoint)
-   `category`: Filter products by category (for /search endpoint)
