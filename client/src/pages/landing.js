import React, { useState } from "react";
import API from "../utils/API";
import { useCountContext } from "../utils/GlobalState";
import {Link} from "react-dom";
import { Redirect } from "react-router-dom";
import Register from "../components/register";

function Landing() {
    const [formObject, setFormObject] = useState({});
    const [state, dispatch] = useCountContext();

    const [logState, setLogState] = useState({
        message: "",
        class: "failed"
    });
    const [signUpState,setSignUpState]=useState({
        signIn:"block",
        signUp:"none"
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
    function handleSignUp(event){
        event.preventDefault();
        dispatch({type:"signUp"})
    
    }
            return (
            <div >
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <form className="landingContainer" style={{"display":`${state.signIn}`}}>
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
                style={{"display":`${state.signUp}`}}>
                    <Register/>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
export default Landing
