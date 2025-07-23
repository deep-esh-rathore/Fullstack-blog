// controllers/authController.js
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Register new user
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User created successfully", user: {
                name: user.name,
                email: user.email,
                id: user._id
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Login user
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("Login attempt:", email);
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "user not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "incorrect password" });
        
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure:  false, // HTTPS in production,localhost in development 
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/',
        });
        console.log("Set-Cookie sent for token.");
        res.status(200).json({
            user: { id: user._id, name: user.name, email: user.email },
        });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const getUser = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not logged in" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "invalid token", error: error.message });
    }
}

// Logout user
export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
};
