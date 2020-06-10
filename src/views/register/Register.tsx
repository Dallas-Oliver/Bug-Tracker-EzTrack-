import React, { useState } from "react";
import svg from "./bugfixing.svg";
import { Link } from "react-router-dom";

interface IRegisterProps {
  handleSubmit: (
    email: string,
    name: string,
    companyName: string,
    password: string
  ) => void;
}

export default function Register(props: IRegisterProps) {
  const [name, setname] = useState("Dallas Oliver");
  const [email, setEmail] = useState("dallas.oliver91@gmail.com");
  const [companyName, setCompanyName] = useState("company");
  const [password, setPassword] = useState("pass");
  const [passwordConfirm, setPasswordConfirm] = useState("pass");

  function validateForm() {
    return email.length > 0 && password.length > 0 && passwordConfirm === password;
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.handleSubmit(email, name, companyName, password);
          }}
          className="form">
          <input
            type="text"
            placeholder="Full Name..."
            name="userName"
            onChange={(e) => setname(e.target.value)}
            value={name}
          />
          <input
            type="text"
            placeholder="Email..."
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="text"
            placeholder="Company Name..."
            name="companyName"
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyName}
          />
          <input
            type="text"
            placeholder="Password..."
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Confirm Password..."
            name="confirmPassword"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />

          <button disabled={!validateForm()} type="submit" name="submitButton">
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
