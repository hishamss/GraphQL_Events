import React, { useState, useRef } from "react";
import { createUser } from "../API";
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
      return;
    }
    const requestBody = {
      query: `
      mutation {
        createUser(userInput: {email: "${Email}", password: "${Password}"}){
          _id
          email
        }
      }
      `,
    };
    createUser(requestBody)
      .then((response) => {
        console.log("status", response.status, typeof response.status);
        if (response.status !== 200 && response.status !== 201) {
          setMessage("Smth Went Wrong!!");
          throw new Error("smth went wrong!!");
        }
        return response.json();
      })
      .then((result) => {
        if ("errors" in result) {
          if (result["errors"]["0"]["message"].includes("Already Exists"))
            setMessage("User Already Exists");
        } else {
          setMessage("Submitted");
        }
      })
      .catch((err) => {
        setMessage("Smth Went Wrong!!");
        console.log(err);
      });
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
