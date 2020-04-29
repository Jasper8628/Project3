
import { Input } from "../components/Form";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Logout from "../components/logout";
import { useCountContext } from "../utils/GlobalState";
import Geocode from "react-geocode";
import GoogleMaps from "../components/googleMaps";
import Goshopping from "../components/goShopping";
function Account() {
    const [state, dispatch] = useCountContext();
    const [books, setBooks] = useState([]);
    const [userState, setUserState] = useState({
        name: "",
        email: "",
        phone: "",
        history: [],
        lat: "",
        lng: "",
        radius: ""
    });
    const [formObject, setFormObject] = useState({});
    useEffect(() => {
        loadUser();
        loadBooks();
    }, []);
    function loadBooks() {
        API.getBooks()
            .then(res =>
                setBooks(res.data)
            )
            .catch(err => console.log(err));
    };

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
                    const lat = res.data.lat;
                    const lng = res.data.lng;
                    const line1 = res.data.line1;
                    const line2 = res.data.line2;
                    setFormObject(res.data);
                    console.log("logging account: ", lat, lng);
                    dispatch({ type: "in", lat: lat, lng: lng, line1: line1, line2: line2 });
                })
                .catch(err => console.log(err));
        }
    }

    function handleRadiusChange(event) {
        const radius = parseInt(event.target.value);
        console.log(radius);
        if (radius !== "NaN") {
            dispatch({
                type: "radius",
                radius: radius
            });
        }
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
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
            addressLine1: formObject.line1,
            addressLine2: formObject.line2,
            phone: formObject.phone,
            postcode: state.postcode,
            lat: state.lat,
            lng: state.lng
        }
        API.updateUser(user)
            .then(res => console.log(res))
            .catch(err => console.log(err));

    };

    return (
        <div className="container">
            <br />
            <br />
            <div className="row justify-content-center">

                <form className=" col-md-6"
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
                    <label>Password:</label>
                    <input className="accountInput"
                        onChange={handleInputChange}
                        name="password"
                        type="password"
                    />
                    <label>Mobile Phone:</label>
                    <input className="accountInput"
                        onChange={handleInputChange}
                        name="phone"
                        value={formObject.phone}
                    />
                    <label>Address:</label>
                    <input className="accountInput"
                        onChange={handleInputChange}
                        name="line1"
                        placeholder="Line 1"
                        value={formObject.line1}
                    />
                    <input className="accountInput"
                        onChange={handleInputChange}
                        name="line2"
                        placeholder="Line 2"
                        value={formObject.line2}
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
                                onChange={handleRadiusChange}
                                name="postcode"
                                placeholder="Post Code"
                                value={state.postcode}
                            />
                        </div>

                        <div className="col-md-4">
                            <input className="accountInput"
                                onChange={handleInputChange}
                                name="radius"
                                placeholder="Radius: 50m"
                                value={state.radius}
                            />
                        </div>
              
                    </div>
                    <label>Drag pin to change your location:</label>
                    <div className="mapContainer">
                    <GoogleMaps />
                    </div>
                    <br />
                    <button 
                        className="saveBtn"
                        onClick={handleFormSubmit}>
                        Save changes
                    </button>
                </form>
                <div className="col-md-4"
                    style={(state.status === "in" ?
                        { "display": "block" } : { "display": "none" })}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Active Request</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Picked up by...</h6>
                            <p className="card-text">You have no current active request</p>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <h3>Recent Activities</h3>

                            </div>
                            {books.length ? (
                                <List>
                                    {books.map(book => (
                                        <div className="card" key={book._id}>
                                            <div className="card-body">
                                                <h5 className="card-title">{book.title}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">by {book.author}</h6>
                                                <p className="card-text">{book.synopsis}</p>
                                                <a href="#" className="card-link">Card link</a>
                                                <a href="#" className="card-link">Another link</a>
                                            </div>

                                        </div>



                                        // <ListItem key={book._id}>
                                        //     <Link to={"/books/" + book._id}>
                                        //         <strong>
                                        //             {book.title} by {book.author}
                                        //         </strong>
                                        //     </Link>
                                        // </ListItem>
                                    ))}
                                </List>
                            ) : (
                                    <h3>No Results to Display</h3>
                                )}
                        </div>
                    </div>
                </div>
                <div style={(state.status === "out" ? { "display": "block" } : { "display": "none" })}>
                    Whoa whoa! nothing to see here, sign in or sign up
            </div>
            </div>


        </div>
    )
}

export default Account
