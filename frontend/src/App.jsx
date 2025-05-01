import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider
import { WishlistProvider } from "./context/WishlistContext"; // Import the WishlistProvider
import ProtectedRoute from "./components/auth/ProtectedRoute"; // Import the ProtectedRoute component
import Header from "./components/layout/Header"; // Import Header component
import Footer from "./components/layout/Footer"; // Import Footer component
import { useContext } from "react"; // Import useContext
import AuthContext from "./context/AuthContext"; // Import AuthContext

// Import your pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
// import MessageForm from "./components/MessageForm";

// Import Footer Pages
import About from "./pages/FooterPages/About";
import Terms from "./pages/FooterPages/Terms";
import Privacy from "./pages/FooterPages/Privacy";

// Create an inner component to access context
const AppContent = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Header user={user} />
            <div className="min-h-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    {/* <Route path="/message" element={<MessageForm />} /> */}

                    {/* Footer Pages */}
                    <Route path="/about" element={<About />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />

                    <Route path="*" element={<NotFound />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
            <Footer />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                draggable
            />
        </>
    );
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <WishlistProvider>
                    <AppContent />
                </WishlistProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
