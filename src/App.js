import React, { useState, useEffect } from "react";
import "../src/main.css";
import AuthService from "./auth/AuthService";
import Home from "./views/home/Home";
import Register from "./views/register/Register";
import Login from "./views/login/Login";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";

function App() {
  const history = useHistory();
  const Auth = new AuthService();

  async function handleRegistration(e) {
    e.preventDefault();

    const form = e.target;
    const formData = {
      name: form.userName.value,
      email: form.email.value,
      companyName: form.companyName.value,
      password: form.password.value
    };

    await fetch("http://localhost:5000/users/register", {
      headers: { "content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(formData),
      method: "POST"
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);

        Auth.login(json.email, formData.password)
          .then(res => {
            history.replace(`/home/dashboard`);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

  async function handleLogin(e) {
    e.preventDefault();

    const formData = {
      email: e.target.userEmail.value,
      password: e.target.password.value
    };

    Auth.login(formData.email, formData.password)
      .then(res => {
        history.replace(`/home/dashboard`);
      })
      .catch(err => {
        console.log(err);
      });
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
              <Register handleSubmit={e => handleRegistration(e)} />
            )
          }
        />
        <Route
          path="/login"
          render={() => <Login handleSubmit={e => handleLogin(e)} />}
        />
        <Route path="/home" render={() => <Home />} />
      </Switch>
    </div>
  );
}

export default App;
