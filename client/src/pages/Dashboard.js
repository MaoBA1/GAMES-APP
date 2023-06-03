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

const baseURL = "http://localhost:3001/api";

const Dashboard = props => {
   
    useEffect(() => {
        axios.get(baseURL + "/game")
    },[])
    return (
        <>
            <Header isItDashBoard={true}/>
        </>
    )
}

export default Dashboard;