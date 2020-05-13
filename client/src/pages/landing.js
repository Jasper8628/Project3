import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { useCountContext } from "../utils/GlobalState";
import { Link } from "react-dom";
import { Redirect } from "react-router-dom";
import Register from "../components/register";
import mapBlue from "../assets/mapBlue";

function Landing() {
    const [formObject, setFormObject] = useState({});
    const [state, dispatch] = useCountContext();

    const [logState, setLogState] = useState({
        message: "",
        class: "failed"
    });
    const [signUpState, setSignUpState] = useState({
        signIn: "block",
        signUp: "none"
    });
    useEffect(() => {
        const root = document.documentElement;
        if (localStorage.getItem("iRequestDarkMode") === "dark") {
            console.log("is dark");
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
            root.style.setProperty('--neongreen', "hsla(212,100%,55%,1)");
            root.style.setProperty('--fontColor', "hsla(212,100%,35%,1)");
            root.style.setProperty('--fontColorLight', "hsla(212,100%,25%,1)");
            root.style.setProperty('--fontColorLightest', "hsla(212,100%,20%,1)");
            dispatch({ type: "dark", mapStyle: mapBlue, circleColor: "hsla(212,100%,30%,1)" });
        }

    }, [])


    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };



    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.email && formObject.password) {
            const user = {
                email: formObject.email,
                password: formObject.password
            }
            API.checkUser(user)
                .then(res => {
                    const token = res.data.token;
                    const id = res.data.user._id;
                    const name = res.data.user.name;
                    console.log(res);
                    localStorage.setItem("reactToken", token);
                    localStorage.setItem("userID", id);
                    localStorage.setItem("userName", name);
                    console.log(id);
                    setLogState({
                        message: `Login successful, welcome ${name}!`,
                        class: "sucess"
                    });
                    console.log(token, id, name);
                    dispatch({
                        type: "in",
                        userName: name,
                        userID: id,
                        userToken: token
                    });
                })
                .catch(err => {
                    setLogState({

                        message: "Invalid credentials",
                        class: "failed"
                    })
                    console.log(err)
                });
        }
    };
    function handleSignUp(event) {
        event.preventDefault();
        dispatch({ type: "signUp" })

    }
    switch (state.status) {
        case "out":
            return (
                <div >
                    <h1 className="logo">iRequest</h1>
                    <form className="landingContainer" style={{ "display": `${state.signIn}` }}>
                        <label className="signInLabel" >{logState.message}</label>
                        <label>User Email:</label>
                        <input
                            onChange={handleInputChange}
                            name="email"
                            placeholder="email (required)"
                        />

                        <label>Password:</label>
                        <input
                            onChange={handleInputChange}
                            name="password"
                            type="password"
                            placeholder="password (required)"
                        />

                        <button

                            onClick={handleFormSubmit}>
                            Sign In
                                        </button>


                        <br />
                        <label>Don't have an account yet?</label>
                        <button onClick={handleSignUp} >Sign Up</button>

                        <br />
                    </form>
                    <div className="landingContainer"
                        style={{ "display": `${state.signUp}` }}>
                        <Register />
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            )

        default:
            return <Redirect to="/home" />
    }

}

export default Landing
