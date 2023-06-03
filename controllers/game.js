import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Game from '../models/account.js';


router.post("/createNewGame", async(req, res) => {
    const { 
        gameName,
        gamePrice,
        gameDescription,
        gameImage    
    } = req.body;
    
    
})
