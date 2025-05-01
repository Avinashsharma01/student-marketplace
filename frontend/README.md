# Student Marketplace Frontend

## Introduction

This is the frontend application for the Student Marketplace, a platform where students can buy, sell, and trade items within an academic community. The application is built with React and uses modern frontend technologies to provide a responsive and intuitive user experience.

## Tech Stack

-   **React 19**: For building the user interface
-   **Vite**: As the build tool and development server
-   **React Router DOM 7**: For handling application routing
-   **Axios**: For making HTTP requests to the backend API
-   **TailwindCSS 4**: For utility-first styling
-   **React Toastify**: For showing notifications
-   **Material UI Icons**: For UI icons

## Application Architecture

### Directory Structure

The application follows a feature-based directory structure:

```
src/
├── assets/          # Static resources like images
├── components/      # Reusable UI components
│   ├── auth/        # Authentication-related components
│   ├── dashboard/   # Dashboard components
│   ├── layout/      # Layout components (Header, Footer)
│   ├── messaging/   # Messaging-related components
│   ├── products/    # Product-related components
│   ├── sections/    # Home page sections
│   ├── utils/       # Utility components
│   └── wishlist/    # Wishlist-related components
├── context/         # React Context providers
├── pages/           # Page components
│   └── FooterPages/ # Informational pages linked from footer
├── services/        # API services
├── App.jsx          # Main application component
├── App.css          # Application-specific styles
├── index.css        # Global styles
└── main.jsx         # Application entry point
```

### State Management

The application uses React Context API for global state management:

-   **AuthContext**: Manages user authentication state, login/logout functionality
-   **WishlistContext**: Manages user's wishlist items

For component-level state, we use React's built-in `useState` and `useEffect` hooks.

### Routing

The application uses React Router DOM for navigation:

-   **Public Routes**: Home, Login, Register, ProductDetail, About, Terms, Privacy
-   **Protected Routes**: Dashboard, Profile (requires authentication)

## Key Features

### Authentication

-   User registration and login
-   Persistent authentication using localStorage
-   Protected routes for authenticated users
-   Automatic handling of token expiration

### Product Management

-   Browse products by category
-   Search for products
-   Create and edit product listings
-   Upload product images
-   Mark products as sold

### User Dashboard

-   Tab-based interface for managing:
    -   User's product listings
    -   Messages with other users
    -   Wishlist items

### Messaging

-   Direct messaging between users
-   Message notifications
-   Conversation history

### Wishlist

-   Add/remove products to wishlist
-   View all wishlist items in user dashboard

## API Integration

The application communicates with the backend through a centralized API service:

-   **Base API Configuration**: Pre-configured Axios instance with interceptors
-   **Authentication**: Token-based authentication headers
-   **Error Handling**: Global error handling for API responses

## Developing

### Prerequisites

-   Node.js 18.x or higher
-   npm 9.x or higher

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The development server will start at http://localhost:5173 by default.

### Building for Production

```bash
# Build the application
npm run build
```

### Preview Production Build

```bash
# Preview the production build
npm run preview
```

## Code Conventions

### Component Structure

-   Use functional components with hooks
-   Follow the single responsibility principle
-   Use PascalCase for component file names
-   Export components as default when appropriate

### Styling

-   Use TailwindCSS utility classes for styling
-   Keep custom CSS to a minimum
-   Use consistent spacing and layout

### JavaScript/JSX

-   Use ES6+ features
-   Use destructuring for props and state
-   Use async/await for asynchronous operations
-   Follow ESLint rules

## Common Development Tasks

### Adding a New Route

1. Create a new page component in `src/pages/`
2. Add the route to `App.jsx` using `<Route>` component
3. For protected routes, wrap the component with `<ProtectedRoute>` component

### Creating a New API Service

1. Define the API endpoint in `src/services/app.js` or create a new service file
2. Use the pre-configured Axios instance for making requests
3. Implement proper error handling

### Adding a New Feature

1. Create necessary components in appropriate directories
2. Create/update context providers if needed
3. Update routes and navigation as required
4. Add tests for the new feature

## Troubleshooting

### Common Issues

-   **API Connection Issues**: Ensure the backend server is running and the `baseURL` in `services/app.js` is correct
-   **Authentication Issues**: Check browser localStorage for token validity
-   **Build Issues**: Ensure all dependencies are installed correctly

### Development Tools

-   Use browser DevTools for debugging
-   Use React DevTools for inspecting component state and props
-   Check browser console for errors and warnings
