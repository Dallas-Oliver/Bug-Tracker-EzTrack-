import React, { useState } from "react";
import svg from "./bugfixing.svg";
import { Link } from "react-router-dom";

export default function Register(props) {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      passwordConfirm === password
    );
  }

  return (
    <div className="Register">
      <section className="left-side">
        <div className="hero">
          <h1>EzTrack</h1>
          <h3>Professional Issue Tracking.</h3>
        </div>

        <img
          className="svg-image"
          alt="small guy fixing computer with a full sized hammer"
          src={svg}
        />
      </section>
      <div className="form-container">
        <h1>Create an Account</h1>
        <form onSubmit={props.handleSubmit} className="form">
          <input
            type="text"
            placeholder="Full Name..."
            name="userName"
            onChange={e => setUsername(e.target.value)}
            value={userName}
          />
          <input
            type="text"
            placeholder="Email..."
            name="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="text"
            placeholder="Company Name..."
            name="companyName"
            onChange={e => setCompanyName(e.target.value)}
            value={companyName}
          />
          <input
            type="text"
            placeholder="Password..."
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Confirm Password..."
            name="confirmPassword"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />

          <button
            disabled={!validateForm()}
            type="submit"
            name="submitButton"
          >
            Get Started
          </button>
        </form>
        <p className="already-registered">
          Already registered?{" "}
          <span className="login-cta">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
