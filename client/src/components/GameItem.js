import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { MdArrowForwardIos } from 'react-icons/md';


function GameItem({ game }) {
    const {
        gameName,
        gamePrice,
        gameDescription,
        gameGenre,
        gameImage
    } = game;
    
    return (  
        <div style={{
            width:"400px",
            height:"500px",
            backgroundColor:"#FFFFFFFF",
            margin:"25px",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            padding:"10px",
            paddingTop:"20px",
            borderRadius:"20px"
        }}>
            <div style={{
                 display:"flex",
                 flexDirection:"column",
                 alignItems:"center",
                 height:"80%"
            }}>
                <Image
                    src={gameImage[0].downloadUrl}
                    style={{ width:"80%", height:"50%" }}
                />

                <h3 style={{
                    textAlign:"center",
                    margin:"10px"
                }}>
                    {gameName}
                </h3>

                <h5 style={{
                    textAlign:"center",
                    margin:"10px"
                }}>
                    {gameGenre}
                </h5>
                <h4 style={{
                    textAlign:"center",
                    margin:"10px",
                    color:"#E3631C"
                }}>
                    {"$ " + gamePrice}
                </h4>
            </div>

            <div style={{
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
            </div>
        </div>
    );
}

export default GameItem;