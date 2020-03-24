import React from "react";
import svg from "./bugfixing.svg";

export default function Register(props) {
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
        <form onSubmit={props.handleRegistration} className="form">
          <input type="text" placeholder="Email..." name="email" />
          <input
            type="text"
            placeholder="Company Name..."
            name="companyName"
          />
          <input type="text" placeholder="Password..." name="password" />
          <input
            type="text"
            placeholder="Confirm Password..."
            name="confirmPassword"
          />
          <button type="submit" name="submitButton">
            Get Started
          </button>
        </form>
        <p className="already-registered">
          Already registered?{" "}
          <span onClick={props.redirectToLogin} className="login-cta">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
