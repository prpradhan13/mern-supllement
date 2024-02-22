import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

// config env
dotenv.config();

// Database configuration
connectDB();

// ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rest Object 
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './frontend/build')));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);

app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, './frontend/build/index.html'))
});

const PORT = process.env.PORT || 8080;

// Run Listen
app.listen(PORT, (req, res) => {
    console.log(`Connected to port ${PORT}`);
});
