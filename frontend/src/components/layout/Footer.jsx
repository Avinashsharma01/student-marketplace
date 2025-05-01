import React, { useState } from "react";
import { Link } from "react-router-dom";
// Icons for social media
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Here you would typically handle the newsletter subscription
        alert(`Thanks for subscribing with ${email}!`);
        setEmail("");
    };

    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-2xl font-bold mb-4">
                            Student Marketplace
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Buy and sell with students on your campus. The
                            easiest way to find what you need or sell what you
                            don't!
                        </p>
                        {/* Social Media Links */}
                        <div className="flex space-x-4 mt-4">
                            <a
                                href="#"
                                className="text-white hover:text-blue-500 transition-colors duration-300"
                            >
                                <FaFacebook size={24} />
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-blue-400 transition-colors duration-300"
                            >
                                <FaTwitter size={24} />
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-pink-500 transition-colors duration-300"
                            >
                                <FaInstagram size={24} />
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-blue-600 transition-colors duration-300"
                            >
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms"
                                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy"
                                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
                            Categories
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="#"
                                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                                >
                                    Textbooks
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                                >
                                    Electronics
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                                >
                                    Furniture
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                                >
                                    Services
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
                            Stay Updated
                        </h4>
                        <p className="text-gray-400 mb-4">
                            Subscribe to our newsletter for the latest campus
                            deals and features.
                        </p>
                        <form
                            onSubmit={handleSubscribe}
                            className="flex flex-col space-y-2"
                        >
                            <div className="flex">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email"
                                    className="px-4 py-2 w-full rounded-l focus:outline-none text-gray-800"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r transition-colors duration-300 flex items-center"
                                >
                                    <FaEnvelope className="mr-2" />
                                    Join
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} Student Marketplace.
                        All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
