import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider, useAuth } from "./utils/authContext";

// Components
import NavigationBar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Admin Pages
import SoftwareList from "./pages/admin/SoftwareList";
import CreateSoftware from "./pages/admin/CreateSoftware";

// Employee Pages
import RequestAccess from "./pages/employee/RequestAccess";
import MyRequests from "./pages/employee/MyRequests";

// Manager Pages
import PendingRequests from "./pages/manager/PendingRequests";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavigationBar />
                <Container className="mt-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* Admin Routes */}
                        <Route
                            path="/software"
                            element={
                                <ProtectedRoute allowedRoles={["Admin"]}>
                                    <SoftwareList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/create-software"
                            element={
                                <ProtectedRoute allowedRoles={["Admin"]}>
                                    <CreateSoftware />
                                </ProtectedRoute>
                            }
                        />

                        {/* Employee Routes */}
                        <Route
                            path="/request-access"
                            element={
                                <ProtectedRoute allowedRoles={["Employee"]}>
                                    <RequestAccess />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/my-requests"
                            element={
                                <ProtectedRoute allowedRoles={["Employee"]}>
                                    <MyRequests />
                                </ProtectedRoute>
                            }
                        />

                        {/* Manager Routes */}
                        <Route
                            path="/pending-requests"
                            element={
                                <ProtectedRoute allowedRoles={["Manager"]}>
                                    <PendingRequests />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App; 