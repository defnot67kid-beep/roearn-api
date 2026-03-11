const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check - this will work even without database
app.get('/', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'RoEarn API is running',
        timestamp: new Date()
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        uptime: process.uptime(),
        database: process.env.MONGODB_URI ? 'configured' : 'not configured'
    });
});

// Simple test endpoint
app.post('/user_balance', (req, res) => {
    const { userId } = req.body;
    
    // Special user gets 10k
    if (userId === "10651815227") {
        return res.json({ 
            status: 'ok', 
            balance: 10000 
        });
    }
    
    // Everyone else gets 0
    res.json({ 
        status: 'ok', 
        balance: 0 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
