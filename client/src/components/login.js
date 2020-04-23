import React, { useState } from "react";
import API from "../utils/API";
import { Input} from "../components/Form";
import {useCountContext} from "../utils/GlobalState";

function Login(props) {
    const [formObject, setFormObject] = useState({});
    const [state,dispatch] = useCountContext();
    const [logState,setLogState] = useState({
        message:"",
        color:"text-primary"
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
                    const id=res.data.user._id;
                    const name=res.data.user.name;
                    console.log(res);
                    localStorage.setItem("reactToken", token);
                    localStorage.setItem("userID",id);
                    console.log(id);
                    setLogState({
                        message:`Login successful, welcome ${name}!`,
                        color:"text-success"
                    })
                    dispatch({type:"in",userID:id,userToken:token});
                })
                .catch(err => {
                    setLogState({
                        ...state,
                        message:"Invalid credentials",
                    })
                    console.log(err)});
        }
    };
    
    return (
        <div>
            <button className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
                login
             </button>
            <div className="modal fade" tabIndex="-1" role="dialog" id="exampleModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center">
                            <h5 className="modal-title text-success">Sign Up or Log In </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="form-control " >
                                <label>User Email:</label>
                                <Input
                                    onChange={handleInputChange}
                                    name="email"
                                    placeholder="email (required)"
                                />
                                <label>Password:</label>
                                <Input
                                    onChange={handleInputChange}
                                    name="password"
                                    type="password"
                                    placeholder="password (required)"
                                />
                                <button className="form-control btn btn-success"
                                    // disabled={!(formObject.password) || !(formObject.email)}
                                    onClick={handleFormSubmit}>
                                    Login
                                 </button>
                                <br />
                                {/* <button onClick={checkButton} className="form-control btn btn-success">Login with Google</button>
                                <br />
                                <button className="form-control btn btn-success">Login with Facebook</button> */}
                            </form>
                        </div>
                        <div >
                            <h5 className={`text-center ${logState.color}`}>{logState.message}</h5>
                            {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
