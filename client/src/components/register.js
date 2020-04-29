import React, { useState } from "react";
import API from "../utils/API";
import { Input } from "./Form";

function Register() {

    const [formObject, setFormObject] = useState({})
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        const token=localStorage.getItem("fireToken");
        if (formObject.name && formObject.password) {
            const user = {
                name: formObject.name,
                email: formObject.email,
                password: formObject.password,
                fireToken:token
            }
            API.saveUser(user)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    };
    return (
        <div className="container ">
            <br />
            <br />
            <br />
            <br />
            <div className="row justify-content-center">

                <form className="form-control col-md-4" >
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
                    <input
                        onChange={handleInputChange}
                        name="password"
                        type="password"
                        placeholder="password (required)"
                    />
                    <label>{(formObject.password === formObject.rePassword)||!(formObject.rePassword) ?
                        "Verify password:" : "Verify password: (passwords don't match)"}</label>
                    <input
                        onChange={handleInputChange}
                        name="rePassword"
                        type="password"
                        placeholder="Verify password (required)"
                    />
                    <button className="form-control btn btn-success"
                        disabled={!(formObject.password === formObject.rePassword) || !(formObject.password)}
                        onClick={handleFormSubmit}>
                        Submit
                    </button>


                </form>
            </div>

        </div>


    )
}

export default Register
