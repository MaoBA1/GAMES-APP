import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { MdArrowForwardIos } from 'react-icons/md';
import '../index.css'
import { useNavigate } from 'react-router-dom';

function GameItem({ game }) {
    const {
        _id,
        gameName,
        gamePrice,
        gameDescription,
        gameGenre,
        gameImage
    } = game;
    const navigate = useNavigate();
    return (  
        <div style={{
            margin:"14px",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            padding:"10px",
            paddingTop:"20px",
            borderRadius:"20px",
            height:"350px",
            justifyContent:"center"
        }} className='game-item-container' onClick={() => navigate("/review-details/" + _id)}>
            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",                 
            }}>
                <div style={{ position:"relative", width:"450px", height:"210px" }}>
                    <div className='placholder' style={{ 
                        zIndex:-1, 
                        top:'0',
                        width:"450px",
                        height:"210px",
                        position:"absolute"
                    }}/>
                    <Image
                        src={gameImage[0].downloadUrl}
                        style={{ width:"450px", objectFit:"contain", zIndex:1 }}
                    />
                </div>

                <div style={{ 
                    width:"180px",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center"
                }}>
                    <label style={{
                        textAlign:"center",
                        fontSize:"18px",
                        fontWeight:"bold"
                    }}>
                        {gameName}
                    </label>

                    <label style={{
                        textAlign:"center",
                        fontSize:"14px",
                        fontWeight:"bold"
                    }}>
                        {gameGenre}
                    </label>
                    <label style={{
                        textAlign:"center",
                        color:"grey",
                        fontSize:"14px",
                        fontWeight:"bold"
                    }}>
                        {"$ " + gamePrice}
                    </label>
                </div>
            </div>

            {/* <div style={{
                position:"relative",
                width:"100%",
                height:"20%"
            }}>
                <Button 
                    variant='dark'
                    style={{ 
                        borderRadius:"50px",
                        height:"40px",
                        width:"40px",
                        position:"absolute",
                        right:10,
                        top:5
                    }}
                >
                    <MdArrowForwardIos/>
                </Button>
            </div> */}
        </div>
    );
}

export default GameItem;