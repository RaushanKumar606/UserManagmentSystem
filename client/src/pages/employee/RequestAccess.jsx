import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { softwareAPI, requestAPI } from "../../services/api.jsx";

const RequestAccess = () => {
    const [software, setSoftware] = useState([]);
    const [selectedSoftware, setSelectedSoftware] = useState("");
    const [accessType, setAccessType] = useState("");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [availableAccessTypes, setAvailableAccessTypes] = useState([]);

    useEffect(() => {
        fetchSoftware();
    }, []);

    const fetchSoftware = async () => {
        try {
            setLoading(true);
            const response = await softwareAPI.getAll();
            setSoftware(response.data);
        } catch (err) {
            setError("Failed to fetch software list");
        } finally {
            setLoading(false);
        }
    };

    const handleSoftwareChange = (e) => {
        const softwareId = e.target.value;
        setSelectedSoftware(softwareId);
        setAccessType("");

        if (softwareId) {
            const selected = software.find(s => s._id === softwareId);
            if (selected) {
                setAvailableAccessTypes(selected.accessLevels);
            } else {
                setAvailableAccessTypes([]);
            }
        } else {
            setAvailableAccessTypes([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedSoftware || !accessType || !reason) {
            return setError("Please fill in all fields");
        }

        try {
            setError("");
            setSuccess("");
            setSubmitting(true);

            await requestAPI.create({
                softwareId: selectedSoftware,
                accessType,
                reason
            });

            setSuccess("Access request submitted successfully");

            // Reset form
            setSelectedSoftware("");
            setAccessType("");
            setReason("");
            setAvailableAccessTypes([]);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit request");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="py-5">
            <Card>
                <Card.Header>
                    <h2>Request Software Access</h2>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}
                    {success && <Alert variant="success" onClose={() => setSuccess("")} dismissible>{success}</Alert>}

                    {loading ? (
                        <p>Loading software...</p>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Select Software</Form.Label>
                                <Form.Select
                                    value={selectedSoftware}
                                    onChange={handleSoftwareChange}
                                    required
                                >
                                    <option value="">-- Select Software --</option>
                                    {software.map(item => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Access Type</Form.Label>
                                <Form.Select
                                    value={accessType}
                                    onChange={(e) => setAccessType(e.target.value)}
                                    disabled={!selectedSoftware}
                                    required
                                >
                                    <option value="">-- Select Access Type --</option>
                                    {availableAccessTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Reason for Request</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Please explain why you need access to this software"
                                    required
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={submitting}
                            >
                                {submitting ? "Submitting..." : "Submit Request"}
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default RequestAccess; 