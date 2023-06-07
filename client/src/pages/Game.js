import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ScreenActivityIndicator from "../components/ScreenActivityIndicator";
import { Image } from "react-bootstrap";
import { BsCheck } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
const baseURL = "http://localhost:3001/api";

const Game = props => {
    const { gameId } = useParams();
    const [ game, setGame ] = useState(null);
    const [temporaryImageIndex, setTamporaryImageIndex] = useState(null);
    const [ constantImageIndex, setConstantImageIndex ] = useState(0);
    const isAvailable = game?.isAvailable;
    console.log(game);
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
                display:"grid",
            }}>
                <h1 style={{
                    margin:"0 auto",
                    color:"#EE621A",
                    marginTop:"20px",
                    marginBottom:"20px"
                }}>
                    {game?.gameName}
                </h1>
                <div style={{
                    marginTop:"20px",
                    margin:"0 auto",
                    display:"grid",
                    gridTemplateColumns:"260px 600px",
                    padding:"10px"
                }}>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        
                    }}>
                        {
                            game?.gameImage?.map((item, index) => 
                                <div style={{ 
                                    position:"relative",
                                    width:"250px",
                                    height:"140px",
                                    margin:"5px",
                                    borderRadius:"20px",
                                    border: constantImageIndex === index ? "3px solid #EE621A" : temporaryImageIndex === index ? "3px solid #41a4fa" : "3px solid grey"
                                }} key={item._id}>
                                    <div className='placholder' style={{ 
                                        zIndex:-1, 
                                        width:"100%",
                                        height:"100%",
                                        position:"absolute",
                                        borderRadius:"20px",
                                    }}/>
                                    <Image
                                        onMouseOver={() => setTamporaryImageIndex(index)}
                                        onMouseLeave={() => setTamporaryImageIndex(null)}
                                        onClick={() => setConstantImageIndex(index)}
                                        src={item.downloadUrl}
                                        style={{ 
                                            zIndex:1,
                                            objectFit:"fill",
                                            width:"100%",
                                            height:"100%",
                                            borderRadius:"15px",
                                        }}
                                        
                                    />  
                                </div>
                            )
                        }
                    </div>
                    <div style={{
                        border:"1px solid grey",
                        height:"100%",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        padding:"10px",
                        borderRadius:"20px",
                    }}>
                        {
                            !temporaryImageIndex ? 
                            (
                                <Image
                                    src={game?.gameImage[constantImageIndex].downloadUrl}
                                    style={{ objectFit:"contain", maxWidth:"100%", maxHeight:"100%", borderRadius:"20px" }}
                                />
                            )
                            :
                            (
                                <Image
                                src={game?.gameImage[temporaryImageIndex].downloadUrl}
                                style={{ objectFit:"contain", maxWidth:"100%", maxHeight:"100%", borderRadius:"20px", }}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
            <div style={{  border:"1px solid #bfbfbd", margin:"25px" }} />
            <div style={{ 
                position:"relative"
             }}>
                <div style={{ 
                    display:"flex",
                    flexDirection:"row",
                    backgroundColor: isAvailable ? "#02c22c" : "#f5281d",
                    justifyContent:"space-evenly",
                    alignItems:"center",
                    width:"140px",
                    padding:"10px",
                    borderRadius:"50px",
                    position:"absolute",
                    top:10,
                    right:20
                }}>
                    {
                        isAvailable ? 
                        (
                            <BsCheck
                                color="#FFFFFF"
                                size={"25px"}
                            />
                        )
                        :
                        (
                            <MdClose
                                color="#FFFFFF"
                                size={"25px"}
                            />
                        )
                    }
                    <label style={{
                        color:"#FFFFFF"
                    }}>
                        {isAvailable ? "Available" : "Unavailable"}
                    </label>
                </div>
            </div>
        </>
    )
}

export default Game;