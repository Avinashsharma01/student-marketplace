# Student Marketplace Backend Technical Documentation

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Database Design](#database-design)
5. [Authentication System](#authentication-system)
6. [File Upload System](#file-upload-system)
7. [API Endpoints Reference](#api-endpoints-reference)
8. [Middleware](#middleware)
9. [Error Handling](#error-handling)
10. [Development Setup](#development-setup)
11. [Deployment](#deployment)
12. [Performance Considerations](#performance-considerations)
13. [Security Considerations](#security-considerations)
14. [Testing](#testing)
15. [Future Improvements](#future-improvements)

## System Architecture

The Student Marketplace backend is built using a RESTful API architecture following the MVC (Model-View-Controller) pattern:

-   **Models**: Define data schemas and handle database interactions
-   **Controllers**: Process requests, interact with models, and send responses
-   **Routes**: Define API endpoints and connect them to controllers
-   **Middleware**: Handle cross-cutting concerns like authentication and request validation

### Request Flow

1. Client sends HTTP request to an endpoint
2. Express router routes the request to the appropriate controller
3. Middleware processes the request (authentication, validation, etc.)
4. Controller interacts with the models to fetch/update data
5. Controller sends response back to the client

## Technology Stack

-   **Runtime Environment**: Node.js
-   **Web Framework**: Express.js
-   **Database**: MongoDB with Mongoose ODM
-   **Authentication**: JSON Web Tokens (JWT)
-   **File Upload**: Multer for local storage, Cloudinary for cloud storage
-   **Other Dependencies**:
    -   cors: For handling Cross-Origin Resource Sharing
    -   dotenv: For environment variable management
    -   bcryptjs: For password hashing
    -   express-async-handler: For simplified error handling in async functions

## Project Structure

```
backend/
│
├── config/                 # Configuration files
│   ├── db.js               # Database connection setup
│   └── cloudinary.js       # Cloudinary configuration for image uploads
│
├── controllers/            # Request controllers
│   ├── authController.js   # User authentication & profile management
│   ├── productController.js # Product management
│   ├── wishlistController.js # Wishlist functionality
│   └── messageController.js # User messaging system
│
├── middleware/             # Express middleware
│   ├── authMiddleware.js   # JWT authentication middleware
│   └── upload.js           # File upload middleware (Multer configuration)
│
├── models/                 # Mongoose models
│   ├── User.js             # User data model
│   ├── Product.js          # Product data model
│   ├── Wishlist.js         # Wishlist data model
│   └── Message.js          # Message data model
│
├── routes/                 # API route definitions
│   ├── authRoutes.js       # Authentication routes
│   ├── productRoutes.js    # Product management routes
│   ├── wishlistRoutes.js   # Wishlist routes
│   └── messageRoutes.js    # Messaging routes
│
├── uploads/                # Directory for uploaded files (product images)
│
├── utils/                  # Utility functions
│   └── generateToken.js    # JWT token generation helper
│
├── server.js               # Main application entry point
└── package.json            # Project dependencies and scripts
```

## Database Design

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model

```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required),
  category: String (required, enum: ['Books', 'Gadgets', 'Accessories', ...]),
  imageUrl: String,
  user: ObjectId (reference to User model),
  createdAt: Date,
  updatedAt: Date
}
```

### Wishlist Model

```javascript
{
  user: ObjectId (reference to User model, required),
  product: ObjectId (reference to Product model, required),
  createdAt: Date
}
```

### Message Model

```javascript
{
  sender: ObjectId (reference to User model, required),
  recipient: ObjectId (reference to User model, required),
  content: String (required),
  product: ObjectId (reference to Product model, optional),
  isRead: Boolean (default: false),
  createdAt: Date
}
```

## Authentication System

The authentication system uses JSON Web Tokens (JWT) for maintaining user sessions.

### JWT Implementation

-   When a user registers or logs in, a JWT token is generated with the user's ID embedded
-   The token is sent to the client and should be included in the Authorization header for protected routes
-   The authMiddleware verifies the token and attaches the user object to the request

### Password Security

-   User passwords are hashed using bcryptjs before being stored in the database
-   Password comparison is done against the hashed version during login

## File Upload System

The application supports two methods for handling file uploads:

### Local Storage with Multer

-   Configuration in `middleware/upload.js`
-   Files are stored in the `/uploads` directory
-   URL paths are generated and stored in the database for retrieval

### Cloud Storage with Cloudinary (Alternative)

-   Configuration in `config/cloudinary.js`
-   Images are uploaded to Cloudinary cloud storage
-   The returned Cloudinary URL is stored in the database

## API Endpoints Reference

### Authentication API

#### Register User

-   **Endpoint**: `POST /api/auth/register`
-   **Controller**: `authController.registerUser`
-   **Request Body**:
    ```json
    {
        "name": "User Name",
        "email": "user@example.com",
        "password": "password123"
    }
    ```
-   **Response**: User object with JWT token
-   **Status Codes**:
    -   201: Created
    -   400: Bad Request (validation errors)
    -   409: Conflict (email already exists)

#### Login User

-   **Endpoint**: `POST /api/auth/login`
-   **Controller**: `authController.loginUser`
-   **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
-   **Response**: User object with JWT token
-   **Status Codes**:
    -   200: Success
    -   400: Bad Request (validation errors)
    -   401: Unauthorized (invalid credentials)

#### Get User Profile

-   **Endpoint**: `GET /api/auth/profile`
-   **Controller**: `authController.getUserProfile`
-   **Auth Required**: Yes
-   **Response**: User profile object
-   **Status Codes**:
    -   200: Success
    -   401: Unauthorized (no/invalid token)

#### Update User Profile

-   **Endpoint**: `PUT /api/auth/profile`
-   **Controller**: `authController.updateUserProfile`
-   **Auth Required**: Yes
-   **Request Body**:
    ```json
    {
        "name": "Updated Name",
        "email": "updated@example.com",
        "password": "newpassword123" // Optional
    }
    ```
-   **Response**: Updated user object
-   **Status Codes**:
    -   200: Success
    -   400: Bad Request (validation errors)
    -   401: Unauthorized (no/invalid token)

### Products API

#### Create Product

-   **Endpoint**: `POST /api/products/post`
-   **Controller**: `productController.createProduct`
-   **Auth Required**: Yes
-   **Content-Type**: `multipart/form-data`
-   **Request Body**:
    ```
    title: "Product Title"
    description: "Product Description"
    price: 99.99
    category: "Books"
    image: [file upload]
    ```
-   **Response**: Created product object
-   **Status Codes**:
    -   201: Created
    -   400: Bad Request (validation errors)
    -   401: Unauthorized

#### Get All Products

-   **Endpoint**: `GET /api/products`
-   **Controller**: `productController.getProducts`
-   **Query Parameters**:
    -   `minPrice`: Filter by minimum price
    -   `maxPrice`: Filter by maximum price
-   **Response**: Array of product objects
-   **Status Codes**:
    -   200: Success

#### Search Products

-   **Endpoint**: `GET /api/products/search`
-   **Controller**: `productController.searchProducts`
-   **Query Parameters**:
    -   `keyword`: Search term for title or description
    -   `category`: Filter by category
    -   `minPrice`: Filter by minimum price
    -   `maxPrice`: Filter by maximum price
-   **Response**: Array of matching product objects
-   **Status Codes**:
    -   200: Success

#### Get User's Products

-   **Endpoint**: `GET /api/products/myproducts`
-   **Controller**: `productController.getUserProducts`
-   **Auth Required**: Yes
-   **Response**: Array of user's product objects
-   **Status Codes**:
    -   200: Success
    -   401: Unauthorized

#### Get Products by Category

-   **Endpoint**: `GET /api/products/category/:category`
-   **Controller**: `productController.getProductsByCategory`
-   **Path Parameters**:
    -   `category`: Product category
-   **Response**: Array of product objects in the specified category
-   **Status Codes**:
    -   200: Success
    -   404: Not Found (invalid category)

#### Get Product by ID

-   **Endpoint**: `GET /api/products/:id`
-   **Controller**: `productController.getProductById`
-   **Path Parameters**:
    -   `id`: Product ID
-   **Response**: Product object
-   **Status Codes**:
    -   200: Success
    -   404: Not Found

#### Update Product

-   **Endpoint**: `PUT /api/products/update/:id`
-   **Controller**: `productController.updateProduct`
-   **Auth Required**: Yes
-   **Path Parameters**:
    -   `id`: Product ID
-   **Request Body**: Product fields to update
-   **Response**: Updated product object
-   **Status Codes**:
    -   200: Success
    -   400: Bad Request (validation errors)
    -   401: Unauthorized
    -   403: Forbidden (not owner)
    -   404: Not Found

#### Delete Product

-   **Endpoint**: `DELETE /api/products/delete/:id`
-   **Controller**: `productController.deleteProduct`
-   **Auth Required**: Yes
-   **Path Parameters**:
    -   `id`: Product ID
-   **Response**: Success message
-   **Status Codes**:
    -   200: Success
    -   401: Unauthorized
    -   403: Forbidden (not owner)
    -   404: Not Found

### Wishlist API

#### Add to Wishlist

-   **Endpoint**: `POST /api/wishlist/add`
-   **Controller**: `wishlistController.addToWishlist`
-   **Auth Required**: Yes
-   **Request Body**:
    ```json
    {
        "productId": "product_id"
    }
    ```
-   **Response**: Created wishlist item
-   **Status Codes**:
    -   201: Created
    -   400: Bad Request (already in wishlist)
    -   401: Unauthorized
    -   404: Not Found (product not found)

#### Remove from Wishlist

-   **Endpoint**: `DELETE /api/wishlist/remove/:productId`
-   **Controller**: `wishlistController.removeFromWishlist`
-   **Auth Required**: Yes
-   **Path Parameters**:
    -   `productId`: Product ID to remove
-   **Response**: Success message
-   **Status Codes**:
    -   200: Success
    -   401: Unauthorized
    -   404: Not Found

#### Get User's Wishlist

-   **Endpoint**: `GET /api/wishlist`
-   **Controller**: `wishlistController.getWishlist`
-   **Auth Required**: Yes
-   **Response**: Array of wishlist items with product details
-   **Status Codes**:
    -   200: Success
    -   401: Unauthorized

### Messages API

#### Send Message

-   **Endpoint**: `POST /api/messages/send`
-   **Controller**: `messageController.sendMessage`
-   **Auth Required**: Yes
-   **Request Body**:
    ```json
    {
        "recipientId": "user_id",
        "content": "Message content",
        "productId": "product_id" // Optional
    }
    ```
-   **Response**: Created message object
-   **Status Codes**:
    -   201: Created
    -   400: Bad Request (validation errors)
    -   401: Unauthorized
    -   404: Not Found (recipient or product not found)

#### Get User's Messages

-   **Endpoint**: `GET /api/messages`
-   **Controller**: `messageController.getUserMessages`
-   **Auth Required**: Yes
-   **Response**: Array of message objects
-   **Status Codes**:
    -   200: Success
    -   401: Unauthorized

#### Mark Message as Read

-   **Endpoint**: `PUT /api/messages/:id/read`
-   **Controller**: `messageController.markAsRead`
-   **Auth Required**: Yes
-   **Path Parameters**:
    -   `id`: Message ID
-   **Response**: Updated message object
-   **Status Codes**:
    -   200: Success
    -   401: Unauthorized
    -   403: Forbidden (not recipient)
    -   404: Not Found

## Middleware

### Authentication Middleware (`middleware/authMiddleware.js`)

-   Extracts and verifies JWT token from the Authorization header
-   Attaches the authenticated user to the request object
-   Used to protect routes that require authentication

### Upload Middleware (`middleware/upload.js`)

-   Configures Multer for file uploads
-   Handles file storage and validation
-   Sets file size limits and accepted file types

## Error Handling

The application uses a combination of:

-   Express-async-handler to catch async errors
-   Custom error handling middleware for consistent error responses
-   HTTP status codes to indicate the type of error
-   Descriptive error messages to help diagnose issues

## Development Setup

### Prerequisites

-   Node.js (v14 or higher)
-   MongoDB (local instance or MongoDB Atlas)
-   npm or yarn package manager

### Installation Steps

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory with the following variables:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/student-marketplace
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```
4. Create the uploads directory:
    ```bash
    mkdir uploads
    ```
5. Start the development server:
    ```bash
    npm run dev
    ```

### Environment Variables

-   `PORT`: Server port (default: 5000)
-   `MONGO_URI`: MongoDB connection string
-   `JWT_SECRET`: Secret key for JWT token generation
-   `NODE_ENV`: Environment mode (development, production)
-   `CLOUDINARY_*`: Cloudinary configuration (if using cloud storage)

## Deployment

### Production Setup

1. Set environment variables for production
    ```
    NODE_ENV=production
    MONGO_URI=your_production_mongodb_uri
    JWT_SECRET=your_production_jwt_secret
    ```
2. Build the frontend (if applicable)
3. Start the server:
    ```bash
    npm start
    ```

### Deployment Options

-   **Heroku**:

    -   Create a Procfile with `web: node server.js`
    -   Set environment variables in Heroku dashboard
    -   Connect to GitHub repository for automatic deployment

-   **DigitalOcean/AWS/Azure**:
    -   Set up a Node.js environment
    -   Use PM2 for process management
    -   Set up Nginx as a reverse proxy
    -   Configure SSL with Let's Encrypt

## Performance Considerations

-   **Database Indexing**: The MongoDB models use indexes on frequently queried fields
-   **Pagination**: Product listings are paginated to limit data transfer
-   **Caching**: Consider implementing Redis caching for frequently accessed data
-   **Image Optimization**: Images are optimized before storage to reduce size

## Security Considerations

-   **Password Hashing**: User passwords are hashed using bcryptjs
-   **JWT Authentication**: Secures protected routes with token-based authentication
-   **Input Validation**: All user inputs are validated before processing
-   **CORS Configuration**: API access is restricted to allowed origins
-   **Rate Limiting**: Consider implementing rate limiting to prevent abuse
-   **File Upload Validation**: Validates file types and sizes for security

## Testing

### Manual Testing

-   Use Postman or similar tools to test API endpoints
-   Test all success and error cases for each endpoint
-   Verify authentication and authorization logic

### Automated Testing (Future Implementation)

-   Unit tests for models and utility functions
-   Integration tests for API endpoints
-   Authentication and authorization testing

## Future Improvements

-   Implement real-time messaging using WebSockets
-   Add product reviews and ratings
-   Implement payment processing integration
-   Add user profile pictures and additional profile information
-   Improve search with full-text search capabilities
-   Implement caching for better performance
-   Add comprehensive automated testing

---

This documentation is maintained by the Student Marketplace development team. Last updated: May 1, 2025.
