import React, { useState } from 'react';
import Header from '../components/Header';
import './../AddGame.css';
import { Image, Ratio } from 'react-bootstrap';
import { IoMdAddCircle } from 'react-icons/io';
import { toast } from 'react-toastify';
import axios from 'axios';



const ImagePlaceHolder = ({ isEmpty, width, height, setImage, image, array }) => {

    const onImageSelected = (e) => {
        if (e.target.files.length) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', "yva08bqk");
            axios.post(`https://api.cloudinary.com/v1_1/${"gameapps"}/image/upload`, formData)
            .then(async results => {
                let value = await results.data.secure_url;
                setImage([ ...array, value ])
                console.log(array);
                
            })
            .catch(error => {
                toast.error(error.message)
            })
        }
    }

    const handelImageSelection = () => {
        const selector = document.getElementById("upload-button");
        selector.click();
    }
    console.log(array);
    return(
        !isEmpty ? 
        (
            <Image 
                src={image}
                style={{ width:"200px", height:"200px", margin:"10px" }}
            />
        )
        :
        (
            
            <button 
                className='image-Placeholder'
                style={{
                    width,
                    height,
                    margin:"10px"
                }}
                onClick={handelImageSelection}
            >
                
                <div>
                    <IoMdAddCircle
                        style={{ marginRight:"5px" }}
                        size={"30px"}
                    />
                    <label>ADD PHOTO</label>
                </div>
                <input
                    type='file'
                    style={{ display: "none" }}
                    id="upload-button"
                    onChange={onImageSelected}
                />
            </button>
            
        )
    )
}


function AddGame({ }) {
    const [ gameImages, setGameImages ] = useState([]);
    
     
    return (  
        <>
            <Header/>
            <h1 style={{
                margin:"10px",
                
            }}>
                Upload New Game
            </h1>
            <div className='image-placeholder-background'>
                {
                    gameImages.length === 0 ?
                    (
                        <ImagePlaceHolder
                            width={"1000px"}
                            height={"300px"}
                            setImage={setGameImages}
                            array={gameImages}
                            isEmpty={gameImages.length === 0}
                        />
                    )
                    :
                    (
                        <div style={{
                            display:"flex",
                            flexDirection:"row",
                            flexWrap:"wrap"
                        }}>
                            {
                                gameImages.map((item, index) => 
                                    <div key={index}>
                                        <ImagePlaceHolder 
                                            setImage={setGameImages}
                                            image={item}
                                            index={index}
                                            array={gameImages}
                                        />
                                    </div>
                                )
                            }
                            {
                                gameImages.length < 6 &&
                                <ImagePlaceHolder
                                    width={"200px"}
                                    height={"200px"}
                                    setImage={setGameImages}
                                    array={gameImages}
                                    isEmpty={true}
                                />
                            }
                        </div>
                    )
                }
                
            </div>
        </>
    );
}

export default AddGame;


