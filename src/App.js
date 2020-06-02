import React, { useState } from "react";
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
  const [users, setUserList] = React.useState([]);
  const [errorMessage, setErrorMessage] = useState();

  const getUserList = async () => {
    const response = await Auth.fetch("/users/all-users");
    if (!response) {
      console.log("no users");
    }
    const userList = await response.json();
    setUserList(userList);
  };

  React.useEffect(() => {
    if (users.length <= 0) {
      getUserList();
    }
  });

  const loginAndRedirect = async (email, password) => {
    try {
      const response = await Auth.login(email, password);
      if (response.status >= 400) {
        const repsonseMessage = await response.json();
        setErrorMessage(repsonseMessage);
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

    // const formData = {
    //   name: form.userName.value,
    //   email: form.email.value,
    //   companyName: form.companyName.value,
    //   password: form.password.value,
    // };

    const response = await Auth.register(user);
    if (!response) {
      console.log("no register response");
      return;
    }

    let json = await response.json();

    loginAndRedirect(json.email, json.password);
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
        <Route path="/home" render={() => <Home users={users} />} />
      </Switch>
    </div>
  );
}

export default App;
