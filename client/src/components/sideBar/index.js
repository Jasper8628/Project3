import React from 'react'
import Logout from "../logout"
import { Link } from "react-router-dom";
import "./sidebar.css";
import { useCountContext } from "../../utils/GlobalState";

function SideBar() {
    const [state, dispatch] = useCountContext();
    switch (state.status) {
        case "in":
            return (
                <div className="sidebar">
                    <ul>
                        <li>
                            <Link to="/history" style={{ "textDecoration": "none" }}>
                                <button>History</button>
                            </Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/account" style={{ "textDecoration": "none" }}>
                                <button>Account</button>
                            </Link>
                        </li>
                        <li>
                            <Logout />
                        </li>
                        <br />
                        <li>
                            <Link to="/about" style={{ "textDecoration": "none" }}>
                                <button>About iRequest</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            )
        case "out":

            return (
                <div className="sidebar">
                    <br />
                    <br />
                    <ul>
                        <li>
                            <Link to="/" style={{ "textDecoration": "none" }}>
                                <button>Sign in/Sign up</button>
                            </Link>

                        </li>
                        <li> 
                            <Link to="/about" style={{ "textDecoration": "none" }}>
                                <button>About iRequest</button>
                            </Link>
                        </li>
                    </ul>
                </div>

            )
    }
}

export default SideBar
