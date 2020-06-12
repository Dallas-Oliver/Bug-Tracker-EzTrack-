import React from "react";
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

  const loginAndRedirect = async (email: string, password: string) => {
    try {
      const response = await Auth.login(email, password);

      if (response.status >= 400) {
        return;
      }

      history.replace("/home/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegistration = async (
    email: string,
    name: string,
    companyName: string,
    password: string
  ) => {
    const user = new User(email, name, companyName, password);

    const response = await Auth.register(user);
    if (!response) {
      console.log("no register response");
      return;
    }

    loginAndRedirect(response.email, user.password);
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
                handleSubmit={(email, name, companyName, password) =>
                  handleRegistration(email, name, companyName, password)
                }
              />
            )
          }
        />
        <Route
          path="/login"
          render={() => (
            <Login
              handleSubmit={(userEmail, password) =>
                loginAndRedirect(userEmail, password)
              }
            />
          )}
        />
        <Route path="/home" render={() => <Home />} />
      </Switch>
    </div>
  );
}

export default App;
