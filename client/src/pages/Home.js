import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

const Home = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    if (!currentUser) {
        return (
            <Container className="py-5">
                <Card>
                    <Card.Body className="text-center">
                        <h1>Welcome to User Access Management System</h1>
                        <p className="lead">Please log in to access the system.</p>
                        <Button variant="primary" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    const getSystemFeatures = () => {
        return [
            {
                title: "Access Control",
                description: "Manage and control user access to different software and resources",
                icon: "🔒",
                color: "primary"
            },
            {
                title: "Role Management",
                description: "Assign and manage user roles with different permission levels",
                icon: "👥",
                color: "success"
            },
            {
                title: "Request Management",
                description: "Handle and process access requests efficiently",
                icon: "📝",
                color: "info"
            },
            {
                title: "Audit Trail",
                description: "Track and monitor all access-related activities",
                icon: "📊",
                color: "warning"
            }
        ];
    };

    const getQuickActions = () => {
        switch (currentUser.role) {
            case "Admin":
                return [
                    {
                        title: "Manage Software",
                        description: "Add, edit, and manage software in the system",
                        path: "/software",
                        variant: "primary"
                    },
                    {
                        title: "Add New Software",
                        description: "Create new software entries with access levels",
                        path: "/create-software",
                        variant: "success"
                    },
                    {
                        title: "System Overview",
                        description: "View system statistics and reports",
                        path: "/",
                        variant: "info"
                    }
                ];
            case "Manager":
                return [
                    {
                        title: "Pending Requests",
                        description: "Review and approve access requests",
                        path: "/pending-requests",
                        variant: "primary"
                    },
                    {
                        title: "Request History",
                        description: "View all processed requests",
                        path: "/",
                        variant: "info"
                    },
                    {
                        title: "User Management",
                        description: "Manage user accounts and permissions",
                        path: "/",
                        variant: "success"
                    }
                ];
            case "Employee":
                return [
                    {
                        title: "Request Access",
                        description: "Request access to software and resources",
                        path: "/request-access",
                        variant: "primary"
                    },
                    {
                        title: "My Access",
                        description: "View your current access permissions",
                        path: "/my-requests",
                        variant: "info"
                    },
                    {
                        title: "Request History",
                        description: "View your access request history",
                        path: "/my-requests",
                        variant: "success"
                    }
                ];
            default:
                return [];
        }
    };

    const systemFeatures = getSystemFeatures();
    const quickActions = getQuickActions();

    return (
        <Container className="py-4">
            {/* Welcome Section */}
            <Row className="mb-4">
                <Col>
                    <Card className="border-0 shadow-sm">
                        <Card.Body className="text-center">
                            <h1 className="display-4 mb-3">User Access Management System</h1>
                            <h3 className="text-muted">Welcome, {currentUser.username}</h3>
                            <p className="lead">Role: <strong>{currentUser.role}</strong></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* System Features Section */}
            <Row className="mb-4">
                <Col>
                    <h2 className="mb-4">System Features</h2>
                    <Row>
                        {systemFeatures.map((feature, index) => (
                            <Col key={index} md={6} lg={3} className="mb-3">
                                <Card className="h-100 border-0 shadow-sm">
                                    <Card.Body className="text-center">
                                        <div className="display-4 mb-3">{feature.icon}</div>
                                        <h5 className="card-title">{feature.title}</h5>
                                        <p className="card-text text-muted">{feature.description}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            {/* Quick Actions Section */}
            <Row>
                <Col>
                    <h2 className="mb-4">Quick Actions</h2>
                    <Row>
                        {quickActions.map((action, index) => (
                            <Col key={index} md={4} className="mb-3">
                                <Card className="h-100 border-0 shadow-sm">
                                    <Card.Body className="text-center">
                                        <h5 className="card-title">{action.title}</h5>
                                        <p className="card-text text-muted mb-3">{action.description}</p>
                                        <Button
                                            variant={action.variant}
                                            onClick={() => navigate(action.path)}
                                            className="w-100"
                                        >
                                            {action.title}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Home; 