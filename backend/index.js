import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// __dirname ni ES module bilan ishlash uchun
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

// ✅ **Frontendni xizmat qilish**
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// 404 Route Handling
app.use((req, res, next) => {
    res.status(404).json({ message: "API route not found!" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// MongoDBga ulanib, serverni ishga tushirish
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to connect to MongoDB:', err);
        process.exit(1);
    });
