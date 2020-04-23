import React from 'react'
import { useCountContext } from "../utils/GlobalState";

function Logout() {
    const [state, dispatch] = useCountContext();
    function logOut(event){
        event.preventDefault();
        localStorage.setItem("reactToken", "loggedout");
        localStorage.setItem("userID","loggedout");
        dispatch({type:"out",userID:"empty",userToken:"empty"});

    }
    return (
        <div>
            <button onClick={logOut}>
               Log out
            </button>
            {/* <div>{state.status}</div>
            <div>{state.userID}</div>
            <div>{state.userToken}</div>
            <div>{state.payload}</div> */}

        </div>
    )
}

export default Logout
