import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCountContext } from "../utils/GlobalState";
import API from "../utils/API";
import { Input } from "./Form";
import PasswordStrength from "./passwordStrength/passwordStrength";

function Register() {

    const [formObject, setFormObject] = useState({});
    const [state, dispatch] = useCountContext();
    const [msgState, setMsgState] = useState("none");
    const [time, setTime] = useState(3);
    var timeRemaining = 3;
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        const token = localStorage.getItem("fireToken");
        if (formObject.name && formObject.password) {
            const user = {
                name: formObject.name,
                email: formObject.email,
                password: formObject.password,
                fireToken: token
            }
            API.saveUser(user)
                .then(res => {
                    if (res.status === 200) {
                        setMsgState("block");
                        const myInterval = setInterval(() => {
                            if (timeRemaining > 0) {
                                timeRemaining = timeRemaining - 1;
                                setTime(timeRemaining);
                            } else {
                                clearInterval(myInterval);
                                setMsgState("none");
                                dispatch({ type: "signIn" });
                            }
                        }, 1000);
                    }
                    console.log(res)
                })
                .catch(err => console.log(err));
        }
    };
    return (
        <React.Fragment>

            <form  >
                <span className="redirectMsg" style={{ "display": `${msgState}` }} >Sign up successful,redirecting to sign in page in {time} seconds...</span>
                <label>User name:</label>
                <input
                    onChange={handleInputChange}
                    name="name"
                    placeholder="user name"
                />
                <label>User Email:</label>
                <input
                    onChange={handleInputChange}
                    name="email"
                    placeholder="email (required)"
                />
                <label>Password:</label>
                <PasswordStrength password={formObject.password} />
                <input
                    onChange={handleInputChange}
                    name="password"
                    type="password"
                    placeholder="password (required)"
                />
                <label>{(formObject.password === formObject.rePassword) || !(formObject.rePassword) ?
                    "Verify password:" : "Verify password: (passwords don't match)"}</label>
                <input
                    onChange={handleInputChange}
                    name="rePassword"
                    type="password"
                    placeholder="Verify password (required)"
                />
                <div >
                    <button
                        disabled={!(formObject.password === formObject.rePassword) || !(formObject.password)}
                        onClick={handleFormSubmit}>
                        Submit
                    </button>
                    <button onClick={() => dispatch({ type: "signIn" })}>Cancel</button>


                </div>


            </form>

        </React.Fragment>


    )
}

export default Register
