import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { softwareAPI } from "../../services/api";

const CreateSoftware = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [accessLevels, setAccessLevels] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleAccessLevelChange = (level) => {
        if (accessLevels.includes(level)) {
            setAccessLevels(accessLevels.filter(item => item !== level));
        } else {
            setAccessLevels([...accessLevels, level]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || accessLevels.length === 0) {
            return setError("Please fill in all fields and select at least one access level");
        }

        try {
            setError("");
            setLoading(true);

            await softwareAPI.create({ name, description, accessLevels });

            navigate("/software", { state: { message: "Software created successfully" } });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create software");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <Card>
                <Card.Header>
                    <h2>Create New Software</h2>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Software Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Access Levels</Form.Label>
                            <div>
                                <Form.Check
                                    type="checkbox"
                                    label="Employee"
                                    checked={accessLevels.includes("Employee")}
                                    onChange={() => handleAccessLevelChange("Employee")}
                                    className="mb-2"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Manager"
                                    checked={accessLevels.includes("Manager")}
                                    onChange={() => handleAccessLevelChange("Manager")}
                                    className="mb-2"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Admin"
                                    checked={accessLevels.includes("Admin")}
                                    onChange={() => handleAccessLevelChange("Admin")}
                                />
                            </div>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Software"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CreateSoftware; 