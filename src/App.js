import React, { useState, useEffect } from "react";
import "../src/main.css";
import Navigation from "./components/Navigation";
import Dashboard from "./views/Dashboard";
import Register from "./views/register/Register";
import Login from "./views/login/Login";
import ProjectManager from "./views/ProjectManager";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  const [redirect, updateRedirect] = useState("");
  const [userEmail, updateUserEmail] = useState("");

  async function handleRegistration(e) {
    e.preventDefault();

    const form = e.target;
    const formData = {
      email: form.email.value,
      companyName: form.companyName.value,
      password: form.password.value
    };

    const response = await fetch(
      "http://localhost:5000/users/save-user-info",
      {
        headers: { "content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(formData),
        method: "POST"
      }
    );

    const json = await response.json();
    const email = json.email;

    updateUserEmail(email);
    changeRedirectPath("dashboard");
  }

  function changeRedirectPath(destination) {
    updateRedirect(destination);
  }

  function handleRedirect() {
    if (redirect === "login") {
      return <Redirect to="/login" />;
    } else if (redirect === "register") {
      return <Redirect to="/register" />;
    } else if (redirect === "dashboard") {
      return <Redirect to="/dashboard" />;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(redirect);

    const userInfo = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    // let response = await fetch("http://localhost:5000/users/save-user", {
    //   headers: { "content-type": "application/json; charset=UTF-8" },
    //   body: JSON.stringify(userInfo),
    //   method: "POST"
    // });

    // let json = await response.json();
    // console.log(json);
  }

  return (
    <Router>
      {handleRedirect()}
      <div className="App">
        {/* <Navigation /> */}
        <Route
          exact
          path="/register"
          render={() => (
            <Register
              handleRegistration={e => handleRegistration(e)}
              redirectToLogin={() => changeRedirectPath("login")}
            />
          )}
        />
        <Route
          path="/login"
          render={() => (
            <Login
              handleSubmit={e => handleSubmit(e)}
              redirectToRegister={() => changeRedirectPath("register")}
            />
          )}
        />
        <Route
          path="/dashboard"
          render={() => <Dashboard userEmail={userEmail} />}
        />
        <Route path="/project-manager" component={ProjectManager}></Route>
      </div>
    </Router>
  );
}

export default App;
