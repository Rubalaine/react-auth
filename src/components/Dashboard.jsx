import React, { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      setError("failed to logout");
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>email: </strong>
          {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            update data
          </Link>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          <Button onClick={handleLogout} variant="link">
            Log out
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Dashboard;
