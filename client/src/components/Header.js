import React, { useState } from "react";
import { Navbar,Container,NavDropdown, Nav, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


const Header = ({ isItDashBoard }) => {

    const [ dropDownCategoryTitle, setDropDwonCategoryTitle ] = useState("Choose Category");
    const [ dropdownPriceRange, setDropDwonPriceRange ] = useState("Choos Price Range");
    return(
        <>
        <Navbar variant="dark" bg="light" expand="lg">
            <Container fluid>
                <Navbar.Collapse id="navbar-dark-example">
                    <Navbar.Brand href="/dashboard">
                        <img src="../../logo.png" style={{width:140}} />
                    </Navbar.Brand>
                        {
                            !isItDashBoard &&
                            <Link style={{ textDecoration:"none", color: "#EE621A", }}  to="/dashboard" relative="path">
                                Home
                            </Link>
                        }
                        <div style={{ width:"10px" }} />
                        <Link style={{ textDecoration:"none", color:"#EE621A" }}  to="/addProduct" relative="path">
                            Add New Product
                        </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
        {
            isItDashBoard && 
            <Navbar variant="light" bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Collapse id="navbar-dark-example">
                    <Nav style={{
                        width:"100%",
                        justifyContent:"space-evenly"

                    }}>
                        <Form.Control 
                            type="text"
                            placeholder="Search..."
                            style={{
                                width:"70%"
                            }}
                        />
                        <div style={{
                            display:"flex",
                            flexDirection:"row",
                            width:"20%",
                            justifyContent:"space-evenly"
                        }}>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={dropDownCategoryTitle}
                                menuVariant="dark"
                                style={{ border: "1px solid grey" }}
                            >
                                {/* We need to add some categories */}
                            
                            </NavDropdown>

                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={dropdownPriceRange}
                                menuVariant="dark"
                                style={{ border: "1px solid grey" }}
                            >
                                {/* We need to add some categories */}
                            
                            </NavDropdown>
                        </div>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        }
        </>
    )
}

export default Header;