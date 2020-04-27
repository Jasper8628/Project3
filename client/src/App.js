import React from "react";
import Books from "./pages/Books";
import NoMatch from "./pages/NoMatch";
import Detail from "./pages/Detail";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/register";
import {CountProvider} from "./utils/GlobalState";
import Account from "./pages/account";




function App() {



  return (
    <CountProvider>
        <Router>
      <div>
        <Nav />
        {/* <Route exact path="/nomatch" component={Books} /> */}
        <Switch>
          {/* <Route exact path='/login' component={Logintbygoogle} ></Route> */}
          <Route exact path='/register'><Register /> </Route>
          <Route exact path='/account'><Account /> </Route>
          {/* <Route path='/dashboard' component={Dashboard} ></Route> */}
          <Route exact path="/"> <Books /></Route>
          <Route exact path="books/:id" ><Detail /></Route>
          <Route ><NoMatch /></Route>
        </Switch>
      </div>
    </Router>
    </CountProvider>
  
  );
}

export default App;