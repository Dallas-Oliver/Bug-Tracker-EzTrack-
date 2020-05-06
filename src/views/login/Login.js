import React, { useState } from "react";
import svg from "./walking.svg";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [userEmail, setUserEmail] = useState("dallas.oliver91@gmail.com");
  const [password, setPassword] = useState("pass");

  function validateForm() {
    return userEmail.length > 0 && password.length > 0;
  }

  return (
    <div className="Login">
      <section className="left-side">
        <div className="hero">
          <h1>Welcome Back!</h1>
        </div>

        <img
          className="svg-image"
          alt="slady walking outdoors"
          src={svg}
        />
      </section>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={props.handleSubmit} className="form">
          {props.errorMessage ? (
            <span>{props.errorMessage.message}</span>
          ) : null}
          <input
            type="text"
            name="userEmail"
            placeholder="Email..."
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <input
            type="text"
            name="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button disabled={!validateForm()} type="submit">
            Login
          </button>

          <p className="need-account">
            Need an Account?{" "}
            <span className="register-cta">
              <Link to="/">Register</Link>
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
