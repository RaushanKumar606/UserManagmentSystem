import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { softwareAPI } from "../../services/api.jsx";

const SoftwareList = () => {
    const [software, setSoftware] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchSoftware();

        // Check for success message from redirect
        if (location.state?.message) {
            setMessage(location.state.message);
            // Clear the message from location state
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const fetchSoftware = async () => {
        try {
            setLoading(true);
            const response = await softwareAPI.getAll();
            setSoftware(response.data);
        } catch (err) {
            setError("Failed to fetch software list");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this software?")) {
            try {
                await softwareAPI.delete(id);
                setMessage("Software deleted successfully");
                fetchSoftware();
            } catch (err) {
                setError(err.response?.data?.message || "Failed to delete software");
            }
        }
    };

    return (
        <Container className="py-5">
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h2>Software List</h2>
                    <Button
                        variant="primary"
                        onClick={() => navigate("/create-software")}
                    >
                        Add New Software
                    </Button>
                </Card.Header>
                <Card.Body>
                    {message && <Alert variant="success" onClose={() => setMessage("")} dismissible>{message}</Alert>}
                    {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}

                    {loading ? (
                        <p>Loading software...</p>
                    ) : software.length === 0 ? (
                        <p>No software available. Add your first software!</p>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Access Levels</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {software.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.accessLevels.join(", ")}</td>
                                        <td>
                                            <Button
                                                variant="info"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => navigate(`/edit-software/${item._id}`)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(item._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SoftwareList; 