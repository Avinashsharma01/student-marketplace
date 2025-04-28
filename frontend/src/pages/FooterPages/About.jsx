import React from "react";

const About = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">
                About Student Marketplace
            </h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                    Student Marketplace was created with a simple mission: to
                    help college students buy and sell items within their campus
                    community safely, conveniently, and affordably.
                </p>
                <p className="text-gray-700 mb-4">
                    We understand that college life comes with financial
                    constraints, and we believe in promoting sustainability by
                    giving pre-loved items a second life.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
                <p className="text-gray-700 mb-4">
                    Our platform connects students who want to sell items they
                    no longer need with those looking for affordable
                    alternatives to buying new. From textbooks and electronics
                    to furniture and clothing, Student Marketplace makes it easy
                    to browse, list, and connect with fellow students.
                </p>
                <p className="text-gray-700 mb-4">
                    All transactions take place within your campus community,
                    eliminating shipping costs and reducing the environmental
                    impact of your purchases.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
                <p className="text-gray-700 mb-4">
                    Student Marketplace was founded by a group of college
                    students who experienced firsthand the challenges of buying
                    and selling items on campus. What started as a school
                    project has grown into a platform serving students across
                    multiple campuses.
                </p>
                <p className="text-gray-700">
                    Our team remains committed to improving the platform based
                    on user feedback and expanding to new campuses to help more
                    students save money and reduce waste.
                </p>
            </section>
        </div>
    );
};

export default About;
