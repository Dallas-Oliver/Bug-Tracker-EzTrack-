import React, { useState } from "react";
import svg from "./walking.svg";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
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
          <input
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button disabled={!validateForm()} type="submit">
            Login
          </button>
          <p className="need-account">
            Need an Account?{" "}
            <span
              onClick={props.redirectToRegister}
              className="register-cta"
            >
              Register
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
