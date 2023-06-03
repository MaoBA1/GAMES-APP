import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Game from '../models/game';
import Genre from '../models/genre';

router.post("/createNewGame", async(req, res) => {
    const { 
        gameName,
        gamePrice,
        gameDescription,
        gameImage,
        gameGenre    
    } = req.body;
    
    Game.findOne({ gameName })
    .then(game => {
        if(game) {
            return res.status(200).json({
                status: false,
                message: `${gameName} is already exist`
            })
        } else {
            Genre.findOne({ genreName: gameGenre })
            .then((genre) => {
                let generId;
                if(!genre) {
                    const new_genre = new Genre({ _id: new mongoose.Types.ObjectId(), genreName: gameGenre })
                    new_genre.save();
                    generId = new_genre._id;
                } else {
                    generId = genre._id;
                }
            })
        }
    })
    
})
