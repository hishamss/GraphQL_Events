import React from "react";
import { NavLink } from "react-router-dom";

function mainNavigation() {
  return (
    <header>
      <div className="mainNavigationLogo">
        <h1>GoEvents</h1>
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

export default mainNavigation;
