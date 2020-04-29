import React from "react";
import Books from "./pages/Books";
import NoMatch from "./pages/NoMatch";
import Detail from "./pages/Detail";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {CountProvider} from "./utils/GlobalState";
import Account from "./pages/account";




function App() {



  return (
    <CountProvider>
        <Router>
      <div>
        <Nav />
        <div className="container">    
           <Switch>
          <Route exact path='/account'><Account /> </Route>
          <Route exact path="/"> <Books /></Route>
          <Route exact path="books/:id" ><Detail /></Route>
          <Route ><NoMatch /></Route>
        </Switch>

        </div>
   
      </div>
    </Router>
    </CountProvider>
  
  );
}

export default App;