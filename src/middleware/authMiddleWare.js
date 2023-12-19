import Jwt from "jsonwebtoken";
// import envconfig from "../config/envConfig.js";

const authMiddleWare = (req, res, next) => {
    const token = req.header("Authorization")?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Authorization token is missing" });

    }
    try {
        Jwt.verify(token, 'a1a2s3d4f5g6hj7k8l9', { expiresIn: "1h" },
            (error, user) => {
                if (error) {
                    return res.status(403).json({ message: "Invalid token" });
                }
                req.user = user
                next();

            });
    } catch (error) {
        console.error("Invalid token:", error.message);
        return res.status(401).json({ message: 'invalid token' });
    }
};

export { authMiddleWare };
