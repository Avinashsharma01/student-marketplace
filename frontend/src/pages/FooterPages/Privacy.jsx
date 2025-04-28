import React from "react";

const Privacy = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    1. Information We Collect
                </h2>
                <p className="text-gray-700 mb-4">
                    When you register for an account, we collect your name,
                    email address, school affiliation, and any other information
                    you provide voluntarily.
                </p>
                <p className="text-gray-700 mb-4">
                    When you use our platform, we may collect information about
                    how you interact with our services, including browsing
                    history, product listings viewed, and messages exchanged
                    with other users.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    2. How We Use Your Information
                </h2>
                <p className="text-gray-700 mb-4">
                    We use your information to:
                </p>
                <ul className="list-disc pl-10 text-gray-700 mb-4">
                    <li className="mb-2">
                        Provide, maintain, and improve our services
                    </li>
                    <li className="mb-2">
                        Process transactions between buyers and sellers
                    </li>
                    <li className="mb-2">
                        Send you notifications about your account or
                        transactions
                    </li>
                    <li className="mb-2">
                        Respond to your comments, questions, and customer
                        service requests
                    </li>
                    <li className="mb-2">
                        Monitor and analyze trends, usage, and activities in
                        connection with our services
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    3. Information Sharing and Disclosure
                </h2>
                <p className="text-gray-700 mb-4">
                    We do not sell or rent your personal information to third
                    parties. We may share your information with:
                </p>
                <ul className="list-disc pl-10 text-gray-700 mb-4">
                    <li className="mb-2">
                        Other users as necessary to facilitate transactions
                    </li>
                    <li className="mb-2">
                        Service providers who perform services on our behalf
                    </li>
                    <li className="mb-2">
                        Law enforcement or other parties when required by law or
                        necessary to protect our rights
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Your Choices</h2>
                <p className="text-gray-700 mb-4">
                    You can update, correct, or delete your account information
                    at any time through your account settings. You may also
                    contact us to request access to, correction of, or deletion
                    of personal information that you have provided to us.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    5. Data Security
                </h2>
                <p className="text-gray-700 mb-4">
                    We implement reasonable security measures to protect your
                    personal information from unauthorized access, alteration,
                    disclosure, or destruction. However, no method of
                    transmission over the Internet or method of electronic
                    storage is 100% secure, and we cannot guarantee absolute
                    security.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    6. Changes to This Policy
                </h2>
                <p className="text-gray-700 mb-4">
                    We may update this privacy policy from time to time. We will
                    notify you of any changes by posting the new privacy policy
                    on this page and updating the "Last updated" date below.
                </p>
            </section>

            <p className="text-gray-700 mt-10 italic">
                Last updated: April 28, 2025
            </p>
        </div>
    );
};

export default Privacy;
