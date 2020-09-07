import React, { useState, useRef } from "react";
import "./login.css";

function LoginPage() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const Email = emailRef.current.value.trim();
    const Password = passwordRef.current.value.trim();
    if (!Email || !Password || !/@/.exec(Email)) {
      setMessage("Missing Email/password Or Invalid Email");
    } else {
      setMessage("Submitted");
    }
  };
  return (
    <div className="authFormContainer">
      <form onSubmit={handleSubmit} className="authForm">
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            type="text"
            name="email"
            id="email"
            placeholder="Email"
          ></input>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          ></input>
        </div>
        <button type="submit">Submit</button>
        <button type="button">Switch to Singup</button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default LoginPage;
