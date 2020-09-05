import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/auth" exact />
        <Route path="/auth" component={Login} />
        <Route path="/events" component={null} />
        <Route path="/bookings" component={null} />
      </Switch>
    </Router>
  );
}

export default App;
