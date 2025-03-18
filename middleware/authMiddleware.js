import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // Attach decoded admin info to request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
};

export default authMiddleware;
