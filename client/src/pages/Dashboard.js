import React, {useState,useEffect} from "react";
import { Button, Container, Row, Col, Form, Card, Table, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from '../components/Header';
import { FcPlus, FcEditImage } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';
import RowEdit from "../components/RowEdit";
import { NavLink } from 'react-router-dom';
import { VscChevronRight } from "react-icons/vsc";
import axios from 'axios';
import GameItem from "../components/GameItem";

const baseURL = "http://localhost:3001/api";

const Dashboard = props => {
   const [ allGames, setAllGames ] = useState([]);
   const [ generes, setGeners ] = useState([]);
   const [ categoryiFilter, setCategoryFilter ] = useState("Choose Category")
   const [ priceFilter, setPriceFilter ] = useState("Choose Price Range");

   const gamesByFilterChoise = () => {
        switch(categoryiFilter) {
            case "Choose Category":
                return allGames;

            default:
                return allGames.filter(game => game.gameGenre === categoryiFilter);
        }
   }

   

    useEffect(() => {
        axios.get(baseURL + "/game/getAllGames")
        .then((results) => {
            console.log(results.data);
            setAllGames(results.data.games);
        })
        .catch(error => {
            console.log(error.message);
        })

        axios.get(baseURL + "/game/getAllGeners")
        .then((results) => {
            console.log(results.data.geners);
            setGeners(results.data.geners)
            
        })
        .catch(error => {
            console.log(error.message);
        })
    },[])

    return (
        <>
            <Header 
                isItDashBoard={true}
                geners={generes}
                setCategoryFilter={setCategoryFilter} 
                setPriceFilter={setPriceFilter}
                priceFilter={priceFilter}
                categoryiFilter={categoryiFilter}
            />
            <div style={{
                display:"flex",
                flexDirection:"row",
                flexWrap:"wrap",
                justifyContent:"center",
                marginTop:"20px"
            }}>
                {
                    gamesByFilterChoise().map((item, index) => 
                        <div key={item._id}>
                            <GameItem game={item}/>
                        </div>    
                    )
                }
            </div>
        </>
    )
}

export default Dashboard;