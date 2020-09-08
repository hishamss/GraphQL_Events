import React from "react";
import { useSelector } from "react-redux";
import { getToken } from "../../actions";
import { NavLink } from "react-router-dom";
import "./style.css";
function MainNavigation() {
  const token = useSelector((state) => state.tokenReducer);
  return (
    <header className="mainNavigation">
      <div className="mainNavigationLogo">
        <h1>GoEvents({token})</h1>
      </div>
      <nav className="MainNavigationItems">
        <ul>
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/bookings">Booking</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
