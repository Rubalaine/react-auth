import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const UpdateProfile = () => {
  const emailRef = useRef();
  const { updateEmail, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      setError("");
      setLoading(true);
      if (emailRef.current.value !== currentUser.email) {
        await updateEmail(emailRef.current.value);
        setLoading(false);
        history.push("/");
      } else {
        setLoading(false);
        setError("same email as before");
      }
    } catch (error) {
      setLoading(false);
      setError("failed to update account");
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Update Data
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        already have an account?
        <Link className="link" to="/login">
          Log In
        </Link>
      </div>
    </>
  );
};

export default UpdateProfile;
