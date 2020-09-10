import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions";
import { NavLink } from "react-router-dom";
import "./style.css";
function MainNavigation() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.tokenReducer);
  const email = useSelector((state) => state.emailReducer);
  return (
    <header className="mainNavigation">
      <div className="mainNavigationLogo">
        <h1>GoEvents({email})</h1>
      </div>
      <nav className="MainNavigationItems">
        <ul>
          {token && (
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="/bookings">Booking</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="/" onClick={() => dispatch(logout())}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
