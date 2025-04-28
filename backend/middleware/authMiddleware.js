import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    let token;

    // Check if token is in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Bearer <token>

            if (!token) {
                return res.status(401).json({ message: "Not authorized, invalid token format" });
            }

            // Decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token verified, user ID:", decoded.userId);

            // Attach user info to request object
            req.user = decoded;

            next();
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

export default protect;
