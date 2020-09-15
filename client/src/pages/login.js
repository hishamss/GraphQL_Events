import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { setToken, setEmail } from "../actions";
import { useDispatch } from "react-redux";
import { loginAuth0, userProfileAuth0 } from "../API";
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
    // let requestBody = {
    //   query: `
    //   query {
    //     login(email: "${Email}", password: "${Password}"){
    //     userId
    //     email
    //     token
    //     tokenExpiration
    //     }
    //   }
    //   `,
    // };
    // if (!isLogin) {
    //   requestBody = {
    //     query: `
    //   mutation {
    //     createUser(userInput: {email: "${Email}", password: "${Password}"}){
    //       _id
    //       email
    //     }
    //   }
    //   `,
    //   };
    // }

    let requestBody = {
      grant_type: "password",
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      username: Email,
      password: Password,
    };
    loginAuth0(process.env.REACT_APP_AUTH0_DOMAIN, requestBody)
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
            console.log("login successfully", result["access_token"]);
            if (result["access_token"]) {
              dispatch(setToken(result["access_token"]));
              userProfileAuth0(
                process.env.REACT_APP_AUTH0_DOMAIN,
                result["access_token"]
              )
                .then((response) => {
                  return response.json();
                })
                .then((result) => {
                  dispatch(setEmail(result["name"]));
                  history.push("/events");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
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
      <h1>{isLogin ? "Login" : "Signup"}</h1>
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
