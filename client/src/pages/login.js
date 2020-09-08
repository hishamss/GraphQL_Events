import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { setToken } from "../actions";
import { useDispatch } from "react-redux";
import { createUser } from "../API";
import "./login.css";

function LoginPage() {
  const history = useHistory();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const handleSwitch = () => {
    setIsLogin((prevState) => !prevState);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const Email = emailRef.current.value.trim();
    const Password = passwordRef.current.value.trim();
    if (!Email || !Password || !/@/.exec(Email)) {
      setMessage("Missing Email/password Or Invalid Email");
      return;
    }
    let requestBody = {
      query: `
      query {
        login(email: "${Email}", password: "${Password}"){
        userId
        token
        tokenExpiration
        }
      }
      `,
    };
    if (!isLogin) {
      requestBody = {
        query: `
      mutation {
        createUser(userInput: {email: "${Email}", password: "${Password}"}){
          _id
          email
        }
      }
      `,
      };
    }
    createUser(requestBody)
      .then((response) => {
        console.log("status", response);
        if (response.status !== 200 && response.status !== 201) {
          setMessage("Smth Went Wrong!!");
          throw new Error("smth went wrong!!");
        }
        return response.json();
      })
      .then((result) => {
        if ("errors" in result) {
          let errorMessage = result["errors"]["0"]["message"];
          if (errorMessage.includes("Already Exists"))
            setMessage("User Already Exists");
          else if (
            errorMessage.includes("User doesn't exists!!") ||
            errorMessage.includes("Password is incorrect!!")
          )
            setMessage("Incorrect Email/Password");
        } else {
          setMessage("Submitted");
          if (isLogin) {
            dispatch(setToken(result["data"]["login"]["userId"]));
            history.push("/events");
          }
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
        <button type="button" onClick={handleSwitch}>
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default LoginPage;
