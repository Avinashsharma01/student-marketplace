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

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const HeroSection = ({ user }) => {
//     const [isVisible, setIsVisible] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         // Set visible after component mounts for animation
//         setIsVisible(true);
//     }, []);

//     const handleBrowseClick = (e) => {
//         e.preventDefault();
//         // Find the browse-products element and scroll to it
//         const browseSection = document.getElementById("browse-products");
//         if (browseSection) {
//             browseSection.scrollIntoView({ behavior: "smooth" });
//         }
//     };

//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         if (searchTerm.trim()) {
//             // Redirect to product browser with search term
//             window.location.href = `/products?search=${encodeURIComponent(
//                 searchTerm
//             )}`;
//         } else {
//             // If empty search, just scroll to browse section
//             handleBrowseClick(e);
//         }
//     };

//     return (
//         <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 relative overflow-hidden">
//             {/* Decorative elements */}
//             <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
//                 <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
//                 <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-blue-300 opacity-10"></div>
//                 <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-white opacity-5"></div>
//             </div>

//             <div className="container mx-auto px-4 relative z-10">
//                 <div className="flex flex-col lg:flex-row items-center">
//                     <div
//                         className={`lg:w-1/2 text-center lg:text-left transition-all duration-1000 transform ${
//                             isVisible
//                                 ? "translate-y-0 opacity-100"
//                                 : "translate-y-10 opacity-0"
//                         }`}
//                     >
//                         <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
//                             Buy & Sell on Your Campus
//                         </h1>
//                         <p className="text-xl mb-5 text-blue-100">
//                             The easiest way to buy and sell textbooks, gadgets,
//                             and more with other students
//                         </p>
//                         <p className="mb-8 text-blue-100 font-medium">
//                             <span className="bg-blue-500 px-2 py-1 rounded-md">
//                                 Join 500+ students
//                             </span>{" "}
//                             already saving money on campus!
//                         </p>

//                         {/* Search bar */}
//                         <form
//                             onSubmit={handleSearchSubmit}
//                             className="mb-8 max-w-lg mx-auto lg:mx-0"
//                         >
//                             <div className="flex rounded-lg overflow-hidden">
//                                 <input
//                                     type="text"
//                                     placeholder="What are you looking for?"
//                                     className="flex-grow px-4 py-3 text-gray-800 focus:outline-none"
//                                     value={searchTerm}
//                                     onChange={(e) =>
//                                         setSearchTerm(e.target.value)
//                                     }
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="bg-yellow-500 hover:bg-yellow-600 px-6 text-white font-medium transition duration-300"
//                                 >
//                                     Search
//                                 </button>
//                             </div>
//                         </form>

//                         <div
//                             className={`flex flex-col sm:flex-row gap-4 transition-all delay-300 duration-1000 transform ${
//                                 isVisible
//                                     ? "translate-y-0 opacity-100"
//                                     : "translate-y-10 opacity-0"
//                             }`}
//                         >
//                             {!user && (
//                                 <Link
//                                     to="/register"
//                                     className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-lg transition duration-300 shadow-lg hover:shadow-xl"
//                                 >
//                                     Join Now
//                                 </Link>
//                             )}
//                             {user ? (
//                                 <>
//                                     <Link
//                                         to="/dashboard"
//                                         className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-lg transition duration-300 shadow-lg hover:shadow-xl"
//                                     >
//                                         My Dashboard
//                                     </Link>
//                                     <Link
//                                         to="#browse-products"
//                                         className="bg-blue-500 hover:bg-blue-700 border border-white px-6 py-3 rounded-lg font-semibold text-lg transition duration-300"
//                                         onClick={handleBrowseClick}
//                                     >
//                                         Browse Products
//                                     </Link>
//                                 </>
//                             ) : (
//                                 <Link
//                                     to="#browse-products"
//                                     className="bg-blue-500 hover:bg-blue-700 border border-white px-6 py-3 rounded-lg font-semibold text-lg transition duration-300"
//                                     onClick={handleBrowseClick}
//                                 >
//                                     Browse Products
//                                 </Link>
//                             )}
//                         </div>
//                     </div>

//                     <div
//                         className={`lg:w-1/2 mt-10 lg:mt-0 transition-all delay-200 duration-1000 transform ${
//                             isVisible
//                                 ? "translate-y-0 opacity-100"
//                                 : "translate-y-10 opacity-0"
//                         }`}
//                     >
//                         <div className="relative mx-auto max-w-md">
//                             {/* Placeholder for hero image - replace with an actual image path */}
//                             <img src="" alt="" />
//                             <div className="bg-blue-400 bg-opacity-30 rounded-lg p-8 backdrop-filter backdrop-blur-sm border border-white border-opacity-20 shadow-2xl">
//                                 <div className="flex items-center justify-between mb-6">
//                                     <div className="flex items-center">
//                                         <div className="w-10 h-10 rounded-full bg-blue-100"></div>
//                                         <div className="ml-3">
//                                             <div className="h-4 w-24 bg-blue-100 rounded"></div>
//                                             <div className="h-3 w-16 bg-blue-200 mt-1 rounded"></div>
//                                         </div>
//                                     </div>
//                                     <div className="h-8 w-20 bg-yellow-400 rounded"></div>
//                                 </div>
//                                 <div className="h-48 bg-white bg-opacity-20 rounded mb-4"></div>
//                                 <div className="h-5 w-full bg-blue-100 rounded mb-2"></div>
//                                 <div className="h-5 w-3/4 bg-blue-100 rounded mb-6"></div>
//                                 <div className="flex justify-between items-center">
//                                     <div className="h-8 w-20 bg-green-400 rounded"></div>
//                                     <div className="h-8 w-24 bg-blue-100 rounded"></div>
//                                 </div>
//                             </div>
//                             <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
//                             <div className="absolute -top-4 -left-4 w-20 h-20 bg-pink-400 rounded-full opacity-20"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HeroSection;
