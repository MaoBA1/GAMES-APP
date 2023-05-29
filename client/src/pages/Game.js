import React from "react";
import {useLocation} from 'react-router-dom';

const Game = props => {

    const location = useLocation();

    const {reviewState} = location.state;

    return(
        <p>{reviewState.tid}</p>
    )
}

export default Game;