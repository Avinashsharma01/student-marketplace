import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import path from "path";


const __dirname = path.resolve();


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    // origin: "https://student-marketplace-frontend.vercel.app",
    credentials: true
}));
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true
// }));

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/messages", messageRoutes);


// Root route
app.get("/", (req, res) => {
    res.send("Student Marketplace API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    // Connect DB
    connectDB();
    console.log(`Server running on port ${PORT}`)
});
