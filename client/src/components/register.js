import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCountContext } from "../utils/GlobalState";
import API from "../utils/API";
import { debounce } from "lodash";
import { Input } from "./Form";
import PasswordStrength from "./passwordStrength/passwordStrength";

function Register() {

    const [formObject, setFormObject] = useState({});
    const [state, dispatch] = useCountContext();
    const [msgState, setMsgState] = useState("none");
    const [time, setTime] = useState(3);
    const [btnState, setBtnState] = useState("disabled");
    const [errMsg, setErrMsg] = useState({
        displayNameErr: "none",
        displayEmailErr: "none",
        nameErrMsg: "",
        emailErrMsg: ""
    })
    var timeRemaining = 3;
    function handleOnChange(event) {
        const { name, value } = event.target;
        setFormObject({
            ...formObject,
            [name]: value
        })

    }

    const handleInputChange =
        (event) => {
            event.persist();
            debounceFn(event);
        }
    const debounceFn = debounce((event) => {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value });
        const data = {
            [name]: value
        }
        console.log("testing debounce", data);
        API.checkAvail(data)
            .then(res => {
                if (res.data.code === 200) {
                    setBtnState("active")
                } else { setBtnState("disabled") }
                if (res.data.type === "name") {
                    setErrMsg({
                        ...errMsg,
                        displayNameErr: "block",
                        nameErrMsg: res.data.msg
                    });
                } else {
                    setErrMsg({
                        ...errMsg,
                        displayEmailErr: "block",
                        emailErrMsg: res.data.msg
                    });
                }
            })
            .catch(err => console.log(err));
    }, 1000);

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
        <div className="row">

            <form className="col-md-12 col-sm-12">
                <span className="redirectMsg" style={{ "display": `${msgState}` }} >Sign up successful,redirecting to sign in page in {time} seconds...</span>
                <label>User name:</label>
                <span className="errMsg" style={{ "display": `${errMsg.displayNameErr}` }}>{errMsg.nameErrMsg} </span>
                <input
                    onChange={handleInputChange}
                    name="name"
                    placeholder="user name"
                />
                <label>User Email:</label>
                <span className="errMsg" style={{ "display": `${errMsg.displayEmailErr}` }}>{errMsg.emailErrMsg} </span>
                <input
                    onChange={handleInputChange}
                    name="email"
                    placeholder="email (required)"
                />
                <label>Password:</label>
                <PasswordStrength password={formObject.password} />
                <input
                    onChange={handleOnChange}
                    name="password"
                    type="password"
                    placeholder="password (required)"
                />
                <label>{(formObject.password === formObject.rePassword) || !(formObject.rePassword) ?
                    "Verify password:" : "Verify password: (passwords don't match)"}</label>
                <input
                    onChange={handleOnChange}
                    name="rePassword"
                    type="password"
                    placeholder="Verify password (required)"
                />
                <div >
                    <button
                        className={
                            btnState === "disabled" ||
                                !(formObject.password === formObject.rePassword) ||
                                !(formObject.password) ?
                                "btnDisable" : ""}
                        disabled={
                            btnState === "disabled" ||
                            !(formObject.password === formObject.rePassword) ||
                            !(formObject.password)}
                        onClick={handleFormSubmit}>
                        Submit
                    </button>
                    <button onClick={() => dispatch({ type: "signIn" })}>Cancel</button>


                </div>


            </form>

        </div>


    )
}

export default Register
