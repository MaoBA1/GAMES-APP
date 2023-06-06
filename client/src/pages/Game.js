import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ScreenActivityIndicator from "../components/ScreenActivityIndicator";
import { Image } from "react-bootstrap";
const baseURL = "http://localhost:3001/api";

const Game = props => {
    const { gameId } = useParams();
    const [ game, setGame ] = useState(null);
    useEffect(() => {
        axios.get(baseURL + "/game/getGameById/" + gameId)
        .then(results => {
            console.log(results.data.game);
            setGame(results.data.game);
        })
        .catch(error => {
            console.error(error.message)
        })
    },[gameId])

    if(!game) {
        return <ScreenActivityIndicator/> 
    }
    
    return(
        <>
            <Header/>
            <div style={{
                marginTop:"50px",
                border:"1px solid red",
            }}>
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                    width:"80%",
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                    }}>
                        {
                            game?.gameImage?.map((item, index) => 
                                <Image
                                    key={item._id}
                                    src={item.downloadUrl}
                                    style={{ objectFit:"contain", maxWidth:"300px", maxHeight:"200px", margin:"5px" }}
                                />  
                            )
                        }
                    </div>
                    <div style={{
                        border:"1px solid grey",
                        width:"500px",
                        height:"500px"
                    }}>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Game;