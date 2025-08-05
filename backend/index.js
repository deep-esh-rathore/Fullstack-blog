import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config()
const app = express()

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))

app.use(express.json()); // ✅ required for JSON body parsing
app.use(express.urlencoded({ extended: true })); // ✅ required for form-data body parsing
app.use(cookieParser()); // Middleware to parse cookies

// Routes
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)



// Disable conditional GETs and caching
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT}`)
        })
    })
    .catch((err) => console.error('MongoDB connection error:', err))
