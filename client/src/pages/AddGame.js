import React, { useState } from 'react';
import Header from '../components/Header';
import './../AddGame.css';
import { Button, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { IoMdAddCircle } from 'react-icons/io';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AiFillCloseCircle } from 'react-icons/ai';



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
            <div style={{ position:"relative" }}>
            <Image 
                src={image}
                style={{ 
                    width: image === array[0] ? "320px" : "150px",
                    height: image === array[0] ? "320px" : "150px",
                    margin:"10px",
                    borderRadius:"20px"
                }}
            />
            <AiFillCloseCircle
                style={{ 
                    position:"absolute",
                    zIndex:1,
                    top:25,
                    right:20
                }}
                color='#FFFFFF'
                size={"25px"}
                onClick={() => setImage(array.filter(url => url !== image))}
            />
            </div>
        )
        :
        (
            
            <button 
                className='image-Placeholder'
                style={{
                    width,
                    height,
                    margin:"10px",
                    backgroundColor: "#F8F9FA"
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
                        }}>
                                <ImagePlaceHolder 
                                    setImage={setGameImages}
                                    image={gameImages[0]}
                                    index={0}
                                    array={gameImages}
                                />
                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                flexWrap:"wrap",
                                width:"600px",
                                
                            }}>
                            {
                                
                                gameImages.slice(1, gameImages.length).map((item, index) => 
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
                                gameImages.length < 7 &&
                                <ImagePlaceHolder
                                    width={"150px"}
                                    height={"150px"}
                                    setImage={setGameImages}
                                    array={gameImages}
                                    isEmpty={true}
                                />
                            }
                            </div>
                        </div>
                    )
                }
                
            </div>

            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
            }}>
                <Form noValidate>
                        <Row className="mb-3">
                            <Form.Group
                                md="4"
                                controlId="validationFormik101"
                                className="position-relative"
                            >
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                            />
                            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                md="4"
                                controlId="validationFormik102"
                                className="position-relative"
                            >
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                            />

                            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="validationFormikUsername2">
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                
                                </Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group
                                md="6"
                                controlId="validationFormik103"
                                className="position-relative"
                            >
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="City"
                            />

                            <Form.Control.Feedback type="invalid" tooltip>
                                
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                md="3"
                                controlId="validationFormik104"
                                className="position-relative"
                            >
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="State"
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                md="3"
                                className="position-relative"
                            >
                            <Form.Label>Zip</Form.Label>
                            <Form.Control
                                type="text"
                            />

                            <Form.Control.Feedback type="invalid" tooltip>
                                
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Form.Group className="position-relative mb-3">
                            <Form.Label>File</Form.Label>
                            <Form.Control
                                 type="file"
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                            
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="position-relative mb-3">
                            <Form.Check
                                required
                                feedbackTooltip
                            />
                        </Form.Group>
                    </Form>
            </div>
        </>
    );
}

export default AddGame;


