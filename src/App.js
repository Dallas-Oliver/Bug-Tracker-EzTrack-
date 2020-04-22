import React from "react";
import "../src/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthService as Auth } from "./auth/AuthService";
import Home from "./views/home/Home";
import Register from "./views/register/Register";
import Login from "./views/login/Login";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";

function App() {
  const history = useHistory();
  const [users, setUserList] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState();

  async function getUserList() {
    const userList = await Auth.fetch("/users/all-users");
    if (userList) {
      setUserList(userList);
    }
  }

  async function getCurrentUser() {
    const user = await Auth.getUserData();
    if (user) {
      setCurrentUser(user);
    }
  }

  React.useEffect(() => {
    if (users.length <= 0) {
      getUserList();
    }
  });

  React.useEffect(() => {
    if (!currentUser) {
      getCurrentUser();
    }
  });

  async function loginAndRedirect(email, password) {
    try {
      const response = await Auth.login(email, password);
      if (response.status >= 400) {
        console.log(response);
      } else {
        history.replace("/home");
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
              <Redirect to="/home" />
            ) : (
              <Register handleSubmit={(e) => handleRegistration(e)} />
            )
          }
        />
        <Route
          path="/login"
          render={() => <Login handleSubmit={(e) => handleLogin(e)} />}
        />
        <Route
          path="/home"
          render={() => <Home currentUser={currentUser} users={users} />}
        />
      </Switch>
    </div>
  );
}

export default App;
