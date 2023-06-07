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
    const [temporaryImageIndex, setTamporaryImageIndex] = useState(null);
    const [ constantImageIndex, setConstantImageIndex ] = useState(0);
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
                marginTop:"10px",
                display:"grid"
            }}>
                <h1 style={{
                    margin:"0 auto",
                    color:"#EE621A"
                }}>
                    {game?.gameName}
                </h1>
                <div style={{
                    marginTop:"20px",
                    margin:"0 auto",
                    display:"grid",
                    gridTemplateColumns:"250px 400px",
                }}>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                    }}>
                        {
                            game?.gameImage?.map((item, index) => 
                                <Image
                                    onMouseOver={() => setTamporaryImageIndex(index)}
                                    onMouseLeave={() => setTamporaryImageIndex(null)}
                                    onClick={() => setConstantImageIndex(index)}
                                    key={item._id}
                                    src={item.downloadUrl}
                                    style={{ 
                                        objectFit:"contain",
                                        maxWidth:"250px",
                                        maxHeight:"150px",
                                        margin:"5px",
                                        border:constantImageIndex === index ? "3px solid #EE621A" : temporaryImageIndex === index ? "2px solid rgb(112, 158, 249)" : "1px solid grey"
                                    }}
                                />  
                            )
                        }
                    </div>
                    <div style={{
                        border:"1px solid grey",
                        height:"100%",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        padding:"10px"
                    }}>
                        {
                            !temporaryImageIndex ? 
                            (
                                <Image
                                    src={game?.gameImage[constantImageIndex].downloadUrl}
                                    style={{ objectFit:"contain", maxWidth:"100%", maxHeight:"100%" }}
                                />
                            )
                            :
                            (
                                <Image
                                src={game?.gameImage[temporaryImageIndex].downloadUrl}
                                style={{ objectFit:"contain", maxWidth:"100%", maxHeight:"100%" }}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Game;