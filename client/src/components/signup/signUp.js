import React, { useState } from "react";
import API from "../../utils/API";
import { Input } from "../Form";
import { useCountContext } from "../../utils/GlobalState";
import "./signUp.css";
import {Link} from "react-dom";

function SignUp() {
    const [formObject, setFormObject] = useState({});
    const [state, dispatch] = useCountContext();

    const [logState, setLogState] = useState({
        message: "",
        class: "failed"
    });


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
    function logOut(event) {
        event.preventDefault();
        localStorage.setItem("reactToken", "loggedout");
        localStorage.setItem("userID", "loggedout");

        dispatch({ type: "out" });

    }

    // switch (state.status) {
    //     case "out":
    //         setDisplay("login")
    //     case "in":
    //         setDisplay("logout")
    // }

    return (
        <div>
            <div className="signup-container">
                <button
                    className="signinBtn"
                    data-toggle="modal"
                    data-target="#exampleModal">
                    Sign In/Sign Up
                  </button>
                <div className="modal fade" tabIndex="-1" role="dialog" id="exampleModal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center">
                                <h5 className="modal-title">Sign Up or Log In </h5>
                                <button
                                    className="closeBtn"
                                    type="button"
                                    data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form >
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
                                    <button  >Sign Up</button>

                                    <br />
                                    {/* <button onClick={checkButton} className="form-control btn btn-success">Login with Google</button>
                        <br />
                        <button className="form-control btn btn-success">Login with Facebook</button> */}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <h5 className={`text-center ${logState.class}`}>{logState.message}</h5>
                                {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>


    )
}

export default SignUp
