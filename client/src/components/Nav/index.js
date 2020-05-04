import React, { useState } from "react";
import SignUp from "../signup/signUp";
import { useCountContext } from "../../utils/GlobalState";
import Requestie from "../requestie";
import Login from "../login";
import "./nav.css";

function Nav() {

  const [state, dispatch] = useCountContext();
  const [logoutState, setLogoutState] = useState("block");
  const [loginState, setLoginState] = useState("block");
  function handleButton(event) {
    if (logoutState === "none") {
      setLogoutState("block");
      setLoginState("none");
    } else {
      setLogoutState("none");
      setLoginState("block");
    }
  }
  function checkstate(event) {
    event.preventDefault();
    console.log(state);
  }

  return (
    <div className="navBackground">
      <div className="row navRow">
        <nav className="navbar col-md-12">
          <a className="navbar-brand" href="/">
            I-Request
      </a>
          <h4 id="sliderH2">GOING TO THE SHOPS?</h4>
          {/* <a className="nav-link" style={{"display":`${logoutState}`}} href="#">
        <Logout/>
      </a> */}
          <a className="nav-link" style={{ "display": `${loginState}` }} href="#">
            <SignUp>Testing</SignUp>
          </a>
          {/* <a className="nav-link" style={{ "display": `${loginState}` }} href="#">
        <Login />
      </a> */}
          {/* <a className="nav-link" style={{ "display": `${loginState}` }} href="#">
        <Requestie />
      </a> */}
          <a className="nav-link" href="/account">
            <button className="signinBtn" >Account</button>
          </a>
          {/* <button onClick={checkstate}>check state</button> */}

        </nav>

      </div>

    </div>

  );
}

export default Nav;
