import React from "react";
import "./login.css";
function loginPage() {
  return (
    <div className="authFormContainer">
      <form className="authForm">
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" placeholder="Email"></input>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="text" id="password" placeholder="Password"></input>
        </div>
        <button type="submit">Submit</button>
        <button type="button">Switch to Singup</button>
      </form>
    </div>
  );
}

export default loginPage;
