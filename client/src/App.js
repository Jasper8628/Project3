import React from "react";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Detail from "./pages/Detail";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CountProvider } from "./utils/GlobalState";
import Account from "./pages/account";
import Footer from "./components/footer";
import Theme from "./components/theme";
import Register from "./pages/register";
import Landing from "./pages/landing";




function App() {



  return (
    <CountProvider>
      <Router>
        <div>
          <div className="container">
            {/* <Theme/> */}
            <Switch>
              <Route exact path='/account'><Account /> </Route>
              <Route exact path='/'><Landing /> </Route>

              <Route exact path="/home"> <Home /></Route> 
              <Route exact path="/register"> <Register /></Route> 
              <Route ><NoMatch /></Route>
            </Switch>

          </div>
        </div>
      </Router>
    </CountProvider>

  );
}

export default App;