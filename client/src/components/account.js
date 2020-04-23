import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";

function Account(props) {
    const [formObject, setFormObject] = useState({});
    const [tokenState, setTokenState] = useState({
        token: "empty"
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
                    console.log(res);
                    setTokenState({
                        token: token
                    });
                    localStorage.setItem("reactToken", token);
                    localStorage.setItem("useID",id);
                    console.log(id);

                })
                .catch(err => console.log(err));
        }
    };
    function checkButton(event) {
        event.preventDefault();
        const token = localStorage.getItem("reactToken");
        console.log(`checking token: ${token}`);
    }
    return (
        <div>
            <button className="btn" data-toggle="modal" data-target="#exampleModal">
                Account
             </button>
            <div className="modal fade" tabIndex="-1" role="dialog" id="exampleModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
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
                                <button onClick={checkButton} className="form-control btn btn-success">Login with Google</button>
                                <br />
                                <button className="form-control btn btn-success">Login with Facebook</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Account
