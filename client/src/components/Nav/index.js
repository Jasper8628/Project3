import React, { useState } from "react";
import SignUp from "../signUp";
import { useCountContext } from "../../utils/GlobalState";
import Requestie from "../requestie";
import Login from "../login";

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
  function checkstate(event){
    event.preventDefault();
    console.log(state);

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <a className="navbar-brand" href="/">
        i-Request
      </a>
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
        <button className="btn btn-success" >Account</button>
      </a>
      <button onClick={checkstate}>check state</button>

    </nav>
  );
}

export default Nav;
