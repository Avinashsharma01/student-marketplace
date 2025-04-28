import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // 👈 Change this if your backend URL is different
    withCredentials: true, // to send cookies (important for auth if needed)
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
    (config) => {
        // Get the token from localStorage
        const userData = localStorage.getItem("user");

        if (userData) {
            try {
                const { token } = JSON.parse(userData);

                // If token exists, add it to the Authorization header
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                // If there's an error parsing, remove the corrupted data
                localStorage.removeItem("user");
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized errors globally
        if (error.response && error.response.status === 401) {
            // Clear local storage if token is invalid or expired
            localStorage.removeItem("user");

            // Redirect to login page if not already there
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

// Create a function to fetch images from the Cloudinary folder
export const fetchImagesFromFolder = async (folderName = null, limit = 100) => {
    try {
        let endpoint = '/api/products/images/folder';
        if (folderName) {
            endpoint = `/api/products/images/folder/${folderName}`;
        }
        if (limit) {
            endpoint += `?limit=${limit}`;
        }

        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};

export default api;
