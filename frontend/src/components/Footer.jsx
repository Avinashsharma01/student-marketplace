import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold">
                            Student Marketplace
                        </h3>
                        <p className="text-gray-400 mt-1">
                            Buy and sell with students on your campus
                        </p>
                    </div>
                    <div className="flex space-x-6">
                        <Link to="/" className="hover:text-blue-400">
                            Home
                        </Link>
                        <Link to="/about" className="hover:text-blue-400">
                            About
                        </Link>
                        <Link to="/terms" className="hover:text-blue-400">
                            Terms
                        </Link>
                        <Link to="/privacy" className="hover:text-blue-400">
                            Privacy
                        </Link>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
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
