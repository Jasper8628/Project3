import React, { useState } from "react";
import Login from "../login";

function Nav() {
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
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <a className="navbar-brand" href="/">
        Project 3
      </a>
      {/* <a className="nav-link" style={{"display":`${logoutState}`}} href="#">
        <Logout/>
      </a> */}
      <a className="nav-link" style={{ "display": `${loginState}` }} href="#">
        <Login />
      </a>
      <a className="nav-link" href="/account">
        <button className="btn btn-success" >Account</button>
      </a>

    </nav>
  );
}

export default Nav;
