import React from 'react'
import { useCountContext } from "../utils/GlobalState";
import { Link } from "react-router-dom";

function Logout() {
    const [state, dispatch] = useCountContext();
    function logOut(event) {
        event.preventDefault();
        localStorage.setItem("reactToken", "loggedout");
        localStorage.setItem("userID", "loggedout");
        dispatch({ type: "out", userID: "empty", userToken: "empty" });

    }
    return (
        <div>
                <button onClick={logOut}>
                    Log out
            </button>

        </div>
    )
}

export default Logout
