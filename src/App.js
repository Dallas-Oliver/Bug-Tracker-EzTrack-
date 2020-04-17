import React from "react";
import "../src/main.css";
import { AuthService as Auth } from "./auth/AuthService";
import Home from "./views/home/Home";
import Register from "./views/register/Register";
import Login from "./views/login/Login";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";

function App() {
  const history = useHistory();

  async function loginAndRedirect(email, password) {
    try {
      const response = await Auth.login(email, password);
      if (response) {
        history.replace("/home/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRegistration(e) {
    e.preventDefault();

    const form = e.target;

    const formData = {
      name: form.userName.value,
      email: form.email.value,
      companyName: form.companyName.value,
      password: form.password.value,
    };

    const jsonResponse = await Auth.register(formData);
    if (jsonResponse) {
      loginAndRedirect(jsonResponse.email, formData.password);
    }
  }

  function handleLogin(e) {
    e.preventDefault();

    const formData = {
      email: e.target.userEmail.value,
      password: e.target.password.value,
    };

    loginAndRedirect(formData.email, formData.password);
  }

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            Auth.loggedIn() ? (
              <Redirect to="home/dashboard" />
            ) : (
              <Register handleSubmit={(e) => handleRegistration(e)} />
            )
          }
        />
        <Route
          path="/login"
          render={() => <Login handleSubmit={(e) => handleLogin(e)} />}
        />
        <Route path="/home" render={() => <Home />} />
      </Switch>
    </div>
  );
}

export default App;
