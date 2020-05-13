import React, { useState } from 'react'
import Logout from "../logout"
import { Link } from "react-router-dom";
import "./sidebar.css";
import { useCountContext } from "../../utils/GlobalState";
import mapDark from "../../assets/mapDark";
import mapDefault from "../../assets/mapStyle";
import mapBlue from "../../assets/mapBlue";
import mapGreen from "../../assets/mapGreen";

function SideBar() {
    const [state, dispatch] = useCountContext();
    const [themeState, setThemeState] = useState({
        mode: "light",
        text: "Dark Mode"
    });
    const root = document.documentElement;
    function handleTheme(event) {
        if (localStorage.getItem("iRequestDarkMode")==="light"||localStorage.getItem("iRequestDarkMode")===null) {
            root.style.setProperty('--baseLightness', "15%");
            root.style.setProperty('--oneShadeLighter', "20%");
            root.style.setProperty('--twoShadeLighter', "25%");
            root.style.setProperty('--threeShadeLighter', "30%");
            root.style.setProperty('--fourShadeLighter', "35%");
            root.style.setProperty('--oneShadeDarker', "16%");
            root.style.setProperty('--twoShadeDarker', "10%");
            root.style.setProperty('--threeShadeDarker', "6%");
            root.style.setProperty('--fourShadeDarker', "0%");
            root.style.setProperty('--saturation', "0%");
            root.style.setProperty('--neongreen', "hsla(119,100%,55%,1)");
            root.style.setProperty('--fontColor', "hsla(119,100%,30%,1)");
            root.style.setProperty('--fontColorLight', "hsla(119,100%,20%,1)");
            root.style.setProperty('--fontColorLightest', "hsla(119,100%,15%,1)");
            dispatch({ type: "dark", mapStyle: mapGreen, circleColor: "hsla(119,100%,55%,1)" });
            localStorage.setItem("iRequestDarkMode","dark")
            console.log(localStorage.getItem("iRequestDarkMode")  )
            setThemeState({
                mode: "dark",
                text: "Light Mode"
            })
        } else {
            root.style.setProperty('--baseLightness', "85%");
            root.style.setProperty('--oneShadeLighter', "90%");
            root.style.setProperty('--twoShadeLighter', "95%");
            root.style.setProperty('--threeShadeLighter', "100%");
            root.style.setProperty('--fourShadeLighter', "300%");
            root.style.setProperty('--oneShadeDarker', "75%");
            root.style.setProperty('--twoShadeDarker', "65%");
            root.style.setProperty('--threeShadeDarker', "55%");
            root.style.setProperty('--fourShadeDarker', "30%");
            root.style.setProperty('--saturation', "40%");
            root.style.setProperty('--neongreen', "hsla(22,100%,50%,1)");
            root.style.setProperty('--fontColor', "hsla(225,40%,30%,1)");
            root.style.setProperty('--fontColorLight', "hsla(225,40%,55%,1)");
            root.style.setProperty('--fontColorLightest', "hsla(225,40%,65%,1)");
            dispatch({ type: "dark", mapStyle: mapDefault, circleColor: "hsla(25,10%,80%,1)" });
            localStorage.setItem("iRequestDarkMode","light")
            
            console.log(localStorage.getItem("iRequestDarkMode")  )
            setThemeState({
                mode: "light",
                text: "Dark Mode"
            })
        }

    }





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
                        <li>
                            <button onClick={handleTheme}>{themeState.text}</button>
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
