import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authContext.jsx";

const NavigationBar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    User Access Management
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {currentUser ? (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                {currentUser.role === "Admin" && (
                                    <>
                                        <Nav.Link as={Link} to="/software">
                                            Software
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/create-software">
                                            Add New Software
                                        </Nav.Link>
                                    </>
                                )}

                                {currentUser.role === "Employee" && (
                                    <>
                                        <Nav.Link as={Link} to="/request-access">
                                            Request Access
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/my-requests">
                                            My Requests
                                        </Nav.Link>
                                    </>
                                )}

                                {currentUser.role === "Manager" && (
                                    <Nav.Link as={Link} to="/pending-requests">
                                        Pending Requests
                                    </Nav.Link>
                                )}
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Sign Up
                                </Nav.Link>
                            </>
                        )}
                    </Nav>

                    {currentUser && (
                        <Nav>
                            <span className="navbar-text me-3">
                                Welcome, {currentUser.username} ({currentUser.role})
                            </span>
                            <Button variant="outline-light" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar; 