import React from "react";
import { useSelector } from "react-redux";
import "./app.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPage from "./pages/login";
import EventsPage from "./pages/events";
import BookingPage from "./pages/booking";
import MainNavigation from "./components/Navigation/MainNavigation";
function App() {
  const token = useSelector((state) => state.tokenReducer);
  return (
    <Router>
      <MainNavigation />
      <main className="mainContainer">
        <Switch>
          {token ? (
            <Redirect from="/" to="/events" exact />
          ) : (
            <Redirect from="/" to="/auth" exact />
          )}
          {!token && <Route exact path="/auth" component={LoginPage} />}
          {token && <Route exact path="/events" component={EventsPage} />}

          {token && <Route exact path="/bookings" component={BookingPage} />}
          {token ? (
            <Route path="/" component={EventsPage} />
          ) : (
            <Route path="/" component={LoginPage} />
          )}
        </Switch>
      </main>
    </Router>
  );
}

export default App;
