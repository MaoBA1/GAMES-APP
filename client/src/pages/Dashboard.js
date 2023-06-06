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
   const [ search, setSearch ] = useState("");

   const gamesByFilterChoise = () => {
        let gamesFilterdByPriceRange = priceFilter === "Choose Price Range" ? 
        allGames 
        :
        priceFilter === "Low to High" ?
        allGames.sort((a,b) => (a.gamePrice - b.gamePrice))
        :
        allGames.sort((a,b) => (b.gamePrice - a.gamePrice));
        switch(categoryiFilter) {
            case "Choose Category":
                return gamesFilterdByPriceRange;

            default:
                return gamesFilterdByPriceRange.filter(game => game.gameGenre === categoryiFilter);
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
        <div style={{
            display:"grid",
        }}>
            <Header 
                isItDashBoard={true}
                geners={generes}
                setCategoryFilter={setCategoryFilter} 
                setPriceFilter={setPriceFilter}
                priceFilter={priceFilter}
                categoryiFilter={categoryiFilter}
                search={search}
                setSearch={setSearch}
        />  
            
                <div style={{
                    display:"grid",
                    gridTemplateColumns:`${100/3}% ${100/3}% ${100/3}%`,
                    marginTop:"20px",
                }}>
                    {
                        search.length === 0 ?

                        gamesByFilterChoise().map((item, index) => 
                            <div key={item._id}>
                                <GameItem game={item}/>
                            </div>    
                        )
                        :
                        allGames.filter(game => {
                            return game.gameName.toLowerCase().includes(search.toLowerCase());
                        })
                        .map((item, index) => 
                            <div key={item._id}>
                                <GameItem game={item}/>
                            </div>    
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Dashboard;