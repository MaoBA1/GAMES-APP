import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';

const baseURL = "http://localhost:3001/api";

const Game = props => {
    const { gameId } = useParams();

    useEffect(() => {
        axios.get(baseURL + "/game/getGameById/" + gameId)
        .then(results => {
            console.log(results.data);
        })
        .catch(error => {
            console.error(error.message)
        })
    },[])

    return(
        <p></p>
    )
}

export default Game;