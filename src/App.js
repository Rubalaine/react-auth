import React from "react";
import { Container } from "react-bootstrap";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
const App = () => {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute
                exact
                path="/update-profile"
                component={UpdateProfile}
              />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  );
};

export default App;
