/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/app";
import AuthContext from "../context/AuthContext";
import MessageForm from "../components/MessageForm";

const ProductDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showMessageForm, setShowMessageForm] = useState(true); // Set to true by default

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
            console.log("Product data:", response.data);
            console.log("Current user:", user);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product details:", error);
            toast.error("Failed to load product details");
            setLoading(false);
            // Redirect to home if product not found
            if (error.response && error.response.status === 404) {
                navigate("/");
            }
        }
    };

    // Handle different image URL formats
    const getImageUrl = (url) => {
        if (!url) return "https://placehold.co/600x400?text=No+Image";
        // If it's already a Cloudinary URL (starts with https), use it directly
        if (url.startsWith("http")) return url;
        // Otherwise, it might be a local path, prepend the server URL
        return `http://localhost:5000${url}`;
    };

    const addToWishlist = async () => {
        if (!user) {
            toast.info("Please login to add items to your wishlist");
            navigate("/login");
            return;
        }

        try {
            await api.post("/wishlist/add", { productId: id });
            toast.success("Added to wishlist");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            if (
                error.response &&
                error.response.status === 400 &&
                error.response.data.message.includes("already")
            ) {
                toast.info("This product is already in your wishlist");
            } else {
                toast.error("Failed to add to wishlist");
            }
        }
    };

    const handleMessageSent = () => {
        setShowMessageForm(false);
        toast.success("Message sent to seller successfully");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
                <div className="text-xl mb-4">Product not found</div>
                <Link to="/" className="text-blue-600 hover:underline">
                    Go back to home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-4">
                <div className="mb-4">
                    <Link
                        to="/"
                        className="text-blue-600 hover:underline flex items-center"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            ></path>
                        </svg>
                        Back to all products
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <img
                                src={getImageUrl(product.imageUrl)}
                                alt={product.title}
                                className="w-full h-auto object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://placehold.co/600x400?text=No+Image";
                                }}
                            />
                        </div>
                        <div className="p-6 md:w-1/2">
                            <div className="mb-4 flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">
                                        {product.title}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        Category:{" "}
                                        <span className="font-medium">
                                            {product.category}
                                        </span>
                                    </p>
                                </div>
                                <div className="text-2xl font-bold text-blue-600">
                                    ${product.price.toFixed(2)}
                                </div>
                            </div>

                            <div className="border-t border-b py-4 my-4">
                                <h2 className="text-lg font-semibold mb-2">
                                    Description
                                </h2>
                                <p className="text-gray-700">
                                    {product.description}
                                </p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">
                                    Seller Information
                                </h2>
                                <p>
                                    <span className="font-medium">
                                        Sold by:
                                    </span>{" "}
                                    {product.user.name}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                {user && user._id !== product.user._id && (
                                    <>
                                        <button
                                            onClick={addToWishlist}
                                            className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 flex-1"
                                        >
                                            Add to Wishlist
                                        </button>
                                    </>
                                )}
                                {!user && (
                                    <Link
                                        to="/login"
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
                                    >
                                        Login to Contact Seller
                                    </Link>
                                )}
                            </div>

                            {/* Message form - Always visible for logged-in users */}
                            {user && product.user && (
                                <div className="mt-6 border-t pt-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Contact Seller
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-3">
                                        Send a message to {product.user.name}{" "}
                                        about this product
                                    </p>
                                    <MessageForm
                                        recipientId={product.user._id}
                                        productId={product._id}
                                        onMessageSent={handleMessageSent}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
