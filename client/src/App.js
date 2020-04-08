import React from "react";
import Books from "./pages/Books";
import NoMatch from "./pages/NoMatch";
import Detail from "./pages/Detail";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>

      <div>
        <Nav />
        <Route exact path="/nomatch" component={Books} />


        <Switch>
          <Route exact path="/">

            <Books />
          </Route>
          <Route path="/:id" >

            <Detail />
          </Route>
          <Route >

            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;