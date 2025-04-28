import React from "react";

const FeaturesSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Why Use Student Marketplace?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition duration-300">
                        <div className="text-blue-600 text-4xl mb-4">🔄</div>
                        <h3 className="text-xl font-semibold mb-2">
                            Easy Trading
                        </h3>
                        <p className="text-gray-600">
                            Buy and sell items with students on your campus - no
                            shipping required
                        </p>
                    </div>
                    <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition duration-300">
                        <div className="text-blue-600 text-4xl mb-4">💬</div>
                        <h3 className="text-xl font-semibold mb-2">
                            Direct Messaging
                        </h3>
                        <p className="text-gray-600">
                            Contact sellers directly and negotiate prices safely
                        </p>
                    </div>
                    <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition duration-300">
                        <div className="text-blue-600 text-4xl mb-4">💰</div>
                        <h3 className="text-xl font-semibold mb-2">
                            Save Money
                        </h3>
                        <p className="text-gray-600">
                            Find textbooks and gadgets at better prices than
                            retail
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
