import React, { useState, useEffect } from "react";
import "../src/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./models/main models/UserModel";
import { AuthService as Auth } from "./auth/AuthService";
import Home from "./views/home/Home";
import Register from "./views/register/Register";
import Login from "./views/login/Login";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";

function App() {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();

  const loginAndRedirect = async (email, password) => {
    try {
      const response = await Auth.login(email, password);
      if (response.status >= 400) {
        setErrorMessage(response);
        return;
      }

      history.replace("/home/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    const form = e.target;

    const user = new User(
      form.email.value,
      form.userName.value,
      form.companyName.value,
      form.password.value
    );

    const response = await Auth.register(user);
    if (!response) {
      console.log("no register response");
      return;
    }
    console.log(response);
    loginAndRedirect(response.email, user.password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.userEmail.value,
      password: e.target.password.value,
    };

    loginAndRedirect(formData.email, formData.password);
  };

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            Auth.loggedIn() ? (
              <Redirect to="/home/dashboard" />
            ) : (
              <Register
                errorMessage={errorMessage}
                handleSubmit={(e) => handleRegistration(e)}
              />
            )
          }
        />
        <Route
          path="/login"
          render={() => (
            <Login
              errorMessage={errorMessage}
              handleSubmit={(e) => handleLogin(e)}
            />
          )}
        />
        <Route path="/home" render={() => <Home />} />
      </Switch>
    </div>
  );
}

export default App;
