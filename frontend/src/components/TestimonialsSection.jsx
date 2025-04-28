import React from "react";

const TestimonialsSection = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                    What Students Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl">
                                JD
                            </div>
                            <div className="ml-4">
                                <h4 className="font-semibold">John D.</h4>
                                <p className="text-gray-500 text-sm">
                                    Computer Science
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-600">
                            "I saved over $200 on textbooks this semester by
                            buying them from other students. This platform is a
                            game-changer!"
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl">
                                AS
                            </div>
                            <div className="ml-4">
                                <h4 className="font-semibold">Amy S.</h4>
                                <p className="text-gray-500 text-sm">
                                    Business Administration
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-600">
                            "I sold my old laptop and calculator in just two
                            days. The messaging system made it easy to
                            coordinate with buyers on campus."
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl">
                                MT
                            </div>
                            <div className="ml-4">
                                <h4 className="font-semibold">Mike T.</h4>
                                <p className="text-gray-500 text-sm">
                                    Engineering
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-600">
                            "Found a graphing calculator for half the price of a
                            new one. The seller even showed me how to use some
                            of the advanced features!"
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
