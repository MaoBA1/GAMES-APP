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
                let genreId;
                if(!genre) {
                    const new_genre = new Genre({ _id: new mongoose.Types.ObjectId(), genreName: gameGenre })
                    new_genre.save();
                    genreId = new_genre._id;
                } else {
                    genreId = genre._id;
                }
                const new_game = new Game({
                    _id: new mongoose.Types.ObjectId(),
                    genreId,
                    gameName,
                    gamePrice,
                    gameDescription,
                    gameImage
                })

                return new_game.save()
                .then(() => {
                    return res.status(200).json({
                        status: true,
                        message: "Success"
                    })
                })
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            status: false,
            message: error.message
        })
    })
    
})

router.get("/getAllGames", async(req, res) => {
    Game.find({ })
    .then(games => {
        return res.status(200).json({
            games
        })
    })
})


export default router;