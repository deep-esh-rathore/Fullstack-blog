import jwt from 'jsonwebtoken';
import User from '../models/Users.js'; // Ensure you have the User model imported

const authMiddleware = async(req, res, next) => {
  const token = req.cookies.token ;
  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    req.user = user;
    next(); // Move to the next middleware/route
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default authMiddleware;
