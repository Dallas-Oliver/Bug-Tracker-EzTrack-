import React, { useState } from "react";
import "../src/main.css";

import Home from "./views/home/Home";
import Register from "./views/register/Register";
import Login from "./views/login/Login";
import { Route, Switch, useHistory } from "react-router-dom";

function App() {
  const [userName, setUserName] = useState("");
  const history = useHistory();

  async function handleRegistration(e) {
    e.preventDefault();

    const form = e.target;
    const userInfo = {
      name: form.userName.value,
      email: form.email.value,
      companyName: form.companyName.value,
      password: form.password.value
    };

    await await fetch("http://localhost:5000/users/save-user", {
      headers: { "content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(userInfo),
      method: "POST"
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        let username = json.name;

        return username;
      })
      .then(username => {
        setUserName(username);
        history.push(`/home`);
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

  async function handleLogin(e) {
    e.preventDefault();

    const userInfo = {
      userEmail: e.target.userEmail.value,
      password: e.target.password.value
    };
    console.log(userInfo.userEmail);

    await fetch(
      `http://localhost:5000/users/get-user/${userInfo.userEmail}`
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        let username = json.name;

        return username;
      })
      .then(username => {
        setUserName(username);
        history.push(`/home`);
      });
  }

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Register handleSubmit={e => handleRegistration(e)} />
          )}
        />
        <Route
          path="/login"
          render={() => <Login handleSubmit={e => handleLogin(e)} />}
        />
        <Route path="/home/" render={() => <Home userName={userName} />} />
      </Switch>
    </div>
  );
}

export default App;
