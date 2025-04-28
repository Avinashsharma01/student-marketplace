# Student Marketplace API Documentation

This document provides comprehensive information about the Student Marketplace backend API to help frontend developers integrate with the backend services.

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Authentication](#authentication)
4. [Products](#products)
5. [Wishlist](#wishlist)
6. [Messages](#messages)
7. [API Endpoints](#api-endpoints)

## Overview

The Student Marketplace is a platform where students can buy and sell products within their campus community. This backend provides all necessary APIs for user authentication, product management, wishlist functionality, and user-to-user messaging.

## Getting Started

### Base URL

```
http://localhost:5000/api
```

### Prerequisites

-   Node.js
-   npm or yarn

### Environment Variables

The backend requires the following environment variables:

-   `PORT`: Server port (default: 5000)
-   `MONGO_URI`: MongoDB connection string
-   `JWT_SECRET`: Secret key for JWT token generation

## Authentication

Authentication is implemented using JSON Web Tokens (JWT). To access protected routes, include the JWT token in the request header:

```
Authorization: Bearer <your_token>
```

### Endpoints

#### Register a new user

-   **URL**: `/api/auth/register`
-   **Method**: `POST`
-   **Auth required**: No
-   **Body**:
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123"
    }
    ```
-   **Success Response**: `201 Created`
    ```json
    {
        "user": {
            "_id": "user_id",
            "name": "John Doe",
            "email": "john@example.com"
        },
        "token": "JWT_TOKEN"
    }
    ```

#### Login user

-   **URL**: `/api/auth/login`
-   **Method**: `POST`
-   **Auth required**: No
-   **Body**:
    ```json
    {
        "email": "john@example.com",
        "password": "password123"
    }
    ```
-   **Success Response**: `200 OK`
    ```json
    {
        "user": {
            "_id": "user_id",
            "name": "John Doe",
            "email": "john@example.com"
        },
        "token": "JWT_TOKEN"
    }
    ```

#### Get user profile

-   **URL**: `/api/auth/profile`
-   **Method**: `GET`
-   **Auth required**: Yes
-   **Success Response**: `200 OK`
    ```json
    {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
    }
    ```

#### Update user profile

-   **URL**: `/api/auth/profile`
-   **Method**: `PUT`
-   **Auth required**: Yes
-   **Body**:
    ```json
    {
        "name": "Johnny Doe",
        "email": "johnny@example.com",
        "password": "newpassword123" // Optional
    }
    ```
-   **Success Response**: `200 OK`
    ```json
    {
        "_id": "user_id",
        "name": "Johnny Doe",
        "email": "johnny@example.com"
    }
    ```

## Products

Products represent items that users can sell on the marketplace.

### Product Model

```json
{
    "title": "String (required)",
    "description": "String (required)",
    "price": "Number (required)",
    "category": "String (required, one of: 'Books', 'Gadgets', 'Accessories')",
    "imageUrl": "String",
    "user": "Reference to User model (required)"
}
```

### Endpoints

#### Create a new product

-   **URL**: `/api/products/post`
-   **Method**: `POST`
-   **Auth required**: Yes
-   **Content-Type**: `multipart/form-data`
-   **Body**:
    ```
    title: "Product Title"
    description: "Product Description"
    price: 99.99
    category: "Books"
    image: [file upload]
    ```
-   **Success Response**: `201 Created`

#### Get all products

-   **URL**: `/api/products`
-   **Method**: `GET`
-   **Auth required**: No
-   **Success Response**: `200 OK`
    ```json
    [
        {
            "_id": "product_id",
            "title": "Product Title",
            "description": "Product Description",
            "price": 99.99,
            "category": "Books",
            "imageUrl": "/uploads/image.jpg",
            "user": {
                "_id": "user_id",
                "name": "John Doe"
            }
        }
    ]
    ```

#### Search products

-   **URL**: `/api/products/search?q=keyword`
-   **Method**: `GET`
-   **Auth required**: No
-   **Success Response**: `200 OK`

#### Get user's products

-   **URL**: `/api/products/myproducts`
-   **Method**: `GET`
-   **Auth required**: Yes
-   **Success Response**: `200 OK`

#### Get products by category

-   **URL**: `/api/products/category/:category`
-   **Method**: `GET`
-   **Auth required**: No
-   **Success Response**: `200 OK`

#### Get a single product

-   **URL**: `/api/products/:id`
-   **Method**: `GET`
-   **Auth required**: No
-   **Success Response**: `200 OK`

#### Update a product

-   **URL**: `/api/products/update/:id`
-   **Method**: `PUT`
-   **Auth required**: Yes
-   **Body**: Product fields to update
-   **Success Response**: `200 OK`

#### Delete a product

-   **URL**: `/api/products/delete/:id`
-   **Method**: `DELETE`
-   **Auth required**: Yes
-   **Success Response**: `200 OK`

## Wishlist

Wishlist allows users to save products they're interested in.

### Endpoints

#### Add to wishlist

-   **URL**: `/api/wishlist/add`
-   **Method**: `POST`
-   **Auth required**: Yes
-   **Body**:
    ```json
    {
        "productId": "product_id"
    }
    ```
-   **Success Response**: `201 Created`

#### Remove from wishlist

-   **URL**: `/api/wishlist/remove/:productId`
-   **Method**: `DELETE`
-   **Auth required**: Yes
-   **Success Response**: `200 OK`

#### Get user's wishlist

-   **URL**: `/api/wishlist`
-   **Method**: `GET`
-   **Auth required**: Yes
-   **Success Response**: `200 OK`
    ```json
    [
        {
            "_id": "wishlist_id",
            "product": {
                "_id": "product_id",
                "title": "Product Title",
                "price": 99.99,
                "imageUrl": "/uploads/image.jpg"
            }
        }
    ]
    ```

## Messages

The messaging system allows users to communicate regarding products.

### Endpoints

#### Send a message

-   **URL**: `/api/messages/send`
-   **Method**: `POST`
-   **Auth required**: Yes
-   **Body**:
    ```json
    {
        "recipientId": "user_id",
        "content": "Message content",
        "productId": "product_id" // Optional, for product-related messages
    }
    ```
-   **Success Response**: `201 Created`

#### Get user's messages

-   **URL**: `/api/messages`
-   **Method**: `GET`
-   **Auth required**: Yes
-   **Success Response**: `200 OK`
    ```json
    [
        {
            "_id": "message_id",
            "sender": {
                "_id": "user_id",
                "name": "John Doe"
            },
            "recipient": {
                "_id": "user_id",
                "name": "Jane Smith"
            },
            "content": "Message content",
            "product": {
                "_id": "product_id",
                "title": "Product Title"
            },
            "isRead": false,
            "createdAt": "2025-04-27T12:00:00.000Z"
        }
    ]
    ```

#### Mark message as read

-   **URL**: `/api/messages/:id/read`
-   **Method**: `PUT`
-   **Auth required**: Yes
-   **Success Response**: `200 OK`

## API Endpoints Summary

### Authentication

-   `POST /api/auth/register` - Register a new user
-   `POST /api/auth/login` - Login user
-   `GET /api/auth/profile` - Get user profile (protected)
-   `PUT /api/auth/profile` - Update user profile (protected)

### Products

-   `POST /api/products/post` - Create a new product (protected)
-   `GET /api/products` - Get all products
-   `GET /api/products/search` - Search products
-   `GET /api/products/myproducts` - Get user's products (protected)
-   `GET /api/products/category/:category` - Get products by category
-   `GET /api/products/:id` - Get a single product
-   `PUT /api/products/update/:id` - Update a product (protected)
-   `DELETE /api/products/delete/:id` - Delete a product (protected)

### Wishlist

-   `POST /api/wishlist/add` - Add to wishlist (protected)
-   `DELETE /api/wishlist/remove/:productId` - Remove from wishlist (protected)
-   `GET /api/wishlist` - Get user's wishlist (protected)

### Messages

-   `POST /api/messages/send` - Send a message (protected)
-   `GET /api/messages` - Get user's messages (protected)
-   `PUT /api/messages/:id/read` - Mark message as read (protected)

## Frontend Integration Tips

1. **Authentication**: Store the JWT token in localStorage or sessionStorage and include it in the Authorization header for protected routes.

2. **Form Submissions**: Use multipart/form-data when uploading product images.

3. **Real-time Updates**: Consider implementing polling or WebSocket connections for real-time message updates.

4. **Error Handling**: The API returns appropriate HTTP status codes and error messages. Handle these appropriately in your frontend.

5. **Image URLs**: The product images are served from `/uploads/{filename}`. Prepend your base URL to these paths.

6. **Form Validation**: Implement frontend validation that matches the backend requirements (required fields, valid email formats, etc.).

## Example Frontend Technologies

The backend is compatible with any frontend technology stack, including:

-   React.js
-   Vue.js
-   Angular
-   Mobile applications (React Native, Flutter)

For styling, consider using:

-   CSS/SCSS
-   Bootstrap
-   Tailwind CSS
-   Material UI

## Getting Help

If you encounter any issues or have questions about the API, please contact the backend development team.
