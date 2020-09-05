import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPage from "./pages/login";
import EventsPage from "./pages/events";
import BookingPage from "./pages/booking";
function App() {
  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/auth" exact />
        <Route exact path="/auth" component={LoginPage} />
        <Route exact path="/events" component={EventsPage} />
        <Route exact path="/booking" component={BookingPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
