import React ,{useState} from 'react'
import Logout from "../logout"
import { Link } from "react-router-dom";
import "./sidebar.css";
import { useCountContext } from "../../utils/GlobalState";
import mapDark from "../../assets/mapDark";
import mapDefault from "../../assets/mapStyle";
import mapBlue from "../../assets/mapBlue";

function SideBar() {
    const [state, dispatch] = useCountContext();
    const [themeState, setThemeState] = useState("light");
    const root = document.documentElement;
    function handleTheme(event) {
        if(themeState==="light"){
        root.style.setProperty('--baseLightness', "10%");
        root.style.setProperty('--oneShadeLighter', "15%");
        root.style.setProperty('--twoShadeLighter', "20%");
        root.style.setProperty('--threeShadeLighter', "25%");
        root.style.setProperty('--fourShadeLighter', "30%");
        root.style.setProperty('--oneShadeDarker', "6%");
        root.style.setProperty('--twoShadeDarker', "4%");
        root.style.setProperty('--threeShadeDarker', "2%");
        root.style.setProperty('--fourShadeDarker', "0%");
        root.style.setProperty('--saturation', "0%");
        root.style.setProperty('--neongreen', "hsla(212,100%,55%,1)");
        root.style.setProperty('--fontColor', "hsla(212,100%,35%,1)");
        root.style.setProperty('--fontColorLight', "hsla(212,100%,25%,1)");
        root.style.setProperty('--fontColorLightest', "hsla(212,100%,20%,1)");
        dispatch({type:"dark",mapStyle:mapBlue,circleColor:"hsla(212,100%,30%,1)"});
        setThemeState("dark")
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
        dispatch({type:"dark",mapStyle:mapDefault,circleColor:"hsla(25,10%,80%,1)"});
        setThemeState("light")
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
                            <button onClick={handleTheme}>Dark Mode</button>
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
