import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { useCountContext } from "../utils/GlobalState";
import Geocode from "react-geocode";
import GoogleMaps from "../components/googleMaps";
import { calScore } from "../utils/pwStrength";
function Account() {
    const [state, dispatch] = useCountContext();
    const [result, setResult] = useState({
        score: 0,
        msg: "",
        strength: ""
    })
    const [passwordState, setPasswordState] = useState({
        display: "none",
        msg: ""

    });
    const [tipState,setTipState]=useState("none");
    const [formObject, setFormObject] = useState({});
    const [newPassword, setNewPassword] = useState({});
    useEffect(() => {
        loadUser();
    }, []);
    const [changePW, setChangePW] = useState({
        display: "none"
    })
    function handleOnChange(event) {
        const { name, value } = event.target;
        if (name === "password") {
            const { score, msg } = calScore(name, value);
            if (score === 0) {
                setResult({
                    msg: msg,
                    score: score,
                    strength: ""
                })
            } else if (score <= 40) {
                setResult({
                    msg: msg,
                    score: score,
                    strength: "(Weak)"
                })
            } else if (score <= 80) {
                setResult({
                    msg: msg,
                    score: score,
                    strength: "(Medium)"
                })
            } else {
                setResult({
                    msg: msg,
                    score: score,
                    strength: "(Strong)"
                })
            }
        }

        setNewPassword({
            ...newPassword,
            [name]: value
        })
    }
    function pwBtn(event) {
        event.preventDefault();
        const name = event.target.name;
        setChangePW({ display: name })

    }


    function loadUser() {
        let lat = '';
        let lng = '';
        const id = localStorage.getItem("userID");
        const token = localStorage.getItem("reactToken");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                console.log("lat: ", lat);
                console.log("lng: ", lng);
            });
        } else {
            console.log("Geolocation privilege denied");
        }
        if (id !== "loggedout") {
            const user = {
                id: id,
                token: token
            }
            API.getUser(user)
                .then(res => {
                    console.log("logging POPULATED :", res);
                    const lat = res.data.lat;
                    const lng = res.data.lng;
                    const line1 = res.data.addressLine1;
                    const line2 = res.data.addressLine2;
                    const postcode = res.data.postcode;
                    setFormObject(res.data);
                    console.log("logging account: ", lat, lng);
                    dispatch({ type: "in", lat: lat, lng: lng, line1: line1, line2: line2, postcode: postcode });
                })
                .catch(err => console.log(err));
        }
    }

    function handleRadiusChange(event) {
        const value = event.target.value;
        if (value === "NaN") {
            dispatch({ type: "radius", radius: 0 })
            console.log(value);
        } else {
            const radius = parseInt(value);

            dispatch({ type: "radius", radius: radius })

        }
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
        if (name === "name") {
            localStorage.setItem("userName", name);
        }
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        const fireToken = localStorage.getItem("fireToken");
        const user = {
            id: localStorage.getItem("userID"),
            token: localStorage.getItem("reactToken"),
            name: formObject.name,
            email: formObject.email,
            fireToken: fireToken,
            //password: formObject.password,
            addressLine1: formObject.addressLine1,
            addressLine2: formObject.addressLine2,
            phone: formObject.phone,
            postcode: state.postcode,
            lat: state.lat,
            lng: state.lng,
            stateTerritory: formObject.stateTerritory
        }
        API.updateUser(user)
            .then(res => {
                 console.log(res);
                 setTipState("block");
                 setTimeout(() => {
                     setTipState("none");
                 }, 2000);
            })
            .catch(err => console.log(err));
    };
    function closeTip(event){
        setTipState("none");
    }
    function changePassword(event) {
        event.preventDefault();
        const token = localStorage.getItem("reactToken");
        const id = localStorage.getItem("userID");
        const data = {
            token: token,
            id: id,
            password: newPassword.oldPW,
            newPassword: newPassword.password
        }
        API.changePassword(data)
            .then(res => {
                if (res.data.code === 401) {
                    setPasswordState({
                        display: "block",
                        msg: res.data.msg
                    })
                } else {
                    setPasswordState({
                        display: "block",
                        msg: "New Password Saved!"
                    })
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Link to="/home">
                <button className="settings fas fa-share"></button>
            </Link>
            <div className="row justify-content-center accountContainer">

                <form className=" col-md-10 col-sm-10"
                    style={(state.status === "in" ?
                        { "display": "block" } : { "display": "none" })}>
                    <label>Name:</label>
                    <input className="accountInput"
                        onChange={handleInputChange}
                        name="name"
                        value={formObject.name}
                    />
                    <label>Email:</label>
                    <input className="accountInput"
                        onChange={handleInputChange}
                        name="email"
                        value={formObject.email}
                    />
                    <label>Change Password:</label>
                    <button
                        name="block"
                        onClick={pwBtn}
                    >Change Password</button>
                    <div className="pwChangeContainer" style={{ "display": `${changePW.display}` }}>
                        <span style={{ "display": `${passwordState.display}` }} className="redirectMsg"> {passwordState.msg}</span>
                        <label>Please enter your old password:</label>
                        <input className="accountInput"
                            onChange={handleOnChange}
                            name="oldPW"
                            type="password"
                        />
                        <label>Please enter a new password:</label>
                        <div className="row align-items-center">
                            <div title="password strength" className="passwordStrength">
                                <div className="strengthMeter" style={{ "width": `${result.score}%` }}></div>
                            </div>
                            <span title={result.msg ? result.msg : "password strength"} className="far fa-question-circle"></span>
                        </div>
                        <input className="accountInput"
                            onChange={handleOnChange}
                            name="password"
                            type="password"
                        />
                        <label>{(newPassword.password === newPassword.reNewPW) || !(newPassword.reNewPW) ?
                            "Verify password:" : "Verify password: (passwords don't match)"}</label>
                        <input className="accountInput"
                            onChange={handleOnChange}
                            name="reNewPW"
                            type="password"
                        />
                        <button
                            className={
                                !(newPassword.password === newPassword.reNewPW) ||
                                    !(newPassword.password) ?
                                    "btnDisable" : ""}
                            disabled={
                                !(newPassword.password === newPassword.reNewPW) ||
                                !(newPassword.password)}
                            onClick={changePassword} >Save</button>
                        <button
                            name="none"
                            onClick={pwBtn}
                        >Close</button>
                    </div>
                    <label>Mobile Phone:</label>
                    <input className="accountInput"
                        onChange={handleInputChange}
                        name="phone"
                        value={formObject.phone}
                    />
                    <label>Address:</label>
                    <input className="accountInput"
                        onChange={handleInputChange}
                        name="addressLine1"
                        placeholder="Line 1"
                        value={formObject.addressLine1}
                    />
                    <input className="accountInput"
                        onChange={handleInputChange}
                        name="addressLine2"
                        placeholder="Line 2"
                        value={formObject.addressLine2}
                    />
                    <div className="row">
                        <div className="col-md-4">
                            <input className="accountInput"
                                onChange={handleInputChange}
                                name="stateTerritory"
                                placeholder="State/Territory"
                                value={formObject.stateTerritory}
                            />
                        </div>
                        <div className="col-md-4">
                            <input className="accountInput"
                                onChange={handleInputChange}
                                name="postcode"
                                placeholder="Post Code"
                                value={state.postcode}
                            />
                        </div>

                        <div className="col-md-4">
                            <input className="accountInput"
                                onChange={handleRadiusChange}
                                name="radius"
                                type="number"
                                placeholder="Radius: 50m"
                                value={state.radius}
                            />
                        </div>

                    </div>
                    <label>Drag pin to change your postcode:</label>
                    <div className="mapContainer">
                        <GoogleMaps />
                    </div>
                    <br />
                    <div className="accountTipContainer" >
                        <div className="tip" style={{"display":`${tipState}`}}>
                            <button className="closeBtn" onClick={closeTip} >x</button>
                            <p>Changes Saved!</p>
                        </div>
                        <button
                            className="saveBtn"
                            onClick={handleFormSubmit}>
                            Save changes
                        </button>
                    </div>





                </form>
                <div style={(state.status === "out" ? { "display": "block" } : { "display": "none" })}>
                    Whoa whoa! nothing to see here, sign in or sign up
                    <Link to="/" style={{ "textDecoration": "none" }}><button >Sign in/Sign up</button></Link>

                </div>
            </div>


        </div>
    )
}

export default Account
