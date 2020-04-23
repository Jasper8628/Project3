
import { Input } from "../components/Form";
import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Logout from "../components/logout";

function Account() {
    useEffect(() => {
        loadUser()
    }, []);
    const [state, setState] = useState({
        loggedInDisplay: "none",
        loggedOutDisplay: "block"
    });
    const [userState, setUserState] = useState({
        name: "",
        email: "",
        phone: "",
        coordinated: {}
    })
    const [formObject, setFormObject] = useState({})
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.name && formObject.password) {
            const user = {
                name: formObject.name,
                email: formObject.email,
                password: formObject.password
            }
            API.saveUser(user)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    };
    function loadUser() {
        const id = localStorage.getItem("userID");
        const token = localStorage.getItem("reactToken");
        if (id !== "loggedout") {
            const user = {
                id: id,
                token: token
            }
            console.log("logging user:", user);
            setState({
                loggedInDisplay: "block",
                loggedOutDisplay: "none"
            })
            API.getUser(user)
                .then(res => {
                    console.log(res.data);
                    setUserState(res.data);
                })
                .catch(err => console.log(err));
        }

    }
    return (
        <div className="container">
            <br />
            <br />
            <br />
            <br />
            <div className="row justify-content-center">

                <form className="form-control col-md-6" style={{ "display": `${state.loggedInDisplay}` }}>
                    <label>Name:</label>
                    <Input
                        onChange={handleInputChange}
                        name="name"
                        value={userState.name}
                    />
                    <label>Email:</label>
                    <Input
                        onChange={handleInputChange}
                        name="email"
                        value={userState.email}
                    />
                    <label>Password:</label>
                    <Input
                        onChange={handleInputChange}
                        name="password"
                        type="password"
                        value={userState.password}
                    />
                    <label>Mobile Phone:</label>
                    <Input
                        onChange={handleInputChange}
                        name="phone"
                        value={userState.password}
                    />
                    <button className="form-control btn btn-success"
                        onClick={handleFormSubmit}>
                        Save changes
                </button>
                    <Logout />


                </form>
                <div style={{ "display": `${state.loggedOutDisplay}` }}>
                    Log in to proceed
            </div>
            </div>


        </div>
    )
}

export default Account
