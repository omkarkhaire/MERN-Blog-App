import React, { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/login";
import Postdata from "./pages/postdata";
import Register from "./pages/register";
import Settings from "./pages/settings";
import Topbar from "./Topbar";
import Write from "./write";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { context } from "./context/context";

function App() {
  const { user } = useContext(context);
  return (
    <Router>
      <Topbar />
      {/* nav bar */}
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Login />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Login />}</Route>
        <Route path="/post/:postId">
          <Postdata />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
