import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = ({ user }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set visible after component mounts for animation
        setIsVisible(true);
    }, []);

    const handleBrowseClick = (e) => {
        // Prevent default link behavior
        if (!user) {
            e.preventDefault();
            // Find the browse-products element and scroll to it
            const browseSection = document.getElementById("browse-products");
            if (browseSection) {
                browseSection.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            e.preventDefault();
            const browseSection = document.getElementById("browse-products");
            if (browseSection) {
                browseSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1
                        className={`text-4xl sm:text-5xl font-bold mb-6 transition-all duration-1000 transform ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                        }`}
                    >
                        Buy & Sell on Your Campus
                    </h1>
                    <p className="text-xl mb-8">
                        The easiest way to buy and sell textbooks, gadgets, and
                        more with other students
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        {!user && (
                            <Link
                                to="/register"
                                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-lg transition duration-300"
                            >
                                Join Now
                            </Link>
                        )}
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-lg transition duration-300"
                                >
                                    My Dashboard
                                </Link>
                                <Link
                                    to="#browse-products"
                                    className="bg-blue-500 hover:bg-blue-700 border border-white px-6 py-3 rounded-lg font-semibold text-lg transition duration-300"
                                    onClick={handleBrowseClick}
                                >
                                    Browse Products
                                </Link>
                            </>
                        ) : (
                            <Link
                                to="#browse-products"
                                className="bg-blue-500 hover:bg-blue-700 border border-white px-6 py-3 rounded-lg font-semibold text-lg transition duration-300"
                                onClick={handleBrowseClick}
                            >
                                Browse Products
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
