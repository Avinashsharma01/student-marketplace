import React from "react";
import { Link } from "react-router-dom";

const CtaSection = ({ user }) => {
    return (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">
                    Ready to Buy or Sell?
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Join the Student Marketplace community today and start
                    trading with other students on campus.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    {!user ? (
                        <>
                            <Link
                                to="/register"
                                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-lg transition duration-300"
                            >
                                Create Account
                            </Link>
                            <Link
                                to="/login"
                                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold text-lg transition duration-300"
                            >
                                Login
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/dashboard"
                            className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-lg transition duration-300"
                        >
                            Go to Dashboard
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
