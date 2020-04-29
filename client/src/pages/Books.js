import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { messaging } from "../init-fcm";
import GoogleMaps from "../components/googleMaps";
import ShoppingList from "../components/shoppingList";
import Notice from "../components/notice";

import { useCountContext } from "../utils/GlobalState";

function Books() {
  const [users, setUsers] = useState({ list: [] });
  const [state, dispatch] = useCountContext();
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [firebaseToken, setFirebaseToken] = useState();
  const [notestate, setNotice] = useState({
    msg: '',
    replyTo: ""
  });
  const [userState, setUserState] = useState({
    lat: "",
    lng: "",
    name: "",
    shoppingList: [],
    address: ""
  });


  useEffect(() => {
    handleBinding();
    loadUser();
    navigator.serviceWorker.addEventListener("message", (message) => {
      const text = message.data['firebase-messaging-msg-data'].data.msg;
      const name = message.data['firebase-messaging-msg-data'].data.name;
      const request = message.data['firebase-messaging-msg-data'].data.request;
      if (request !== "none") {
        console.log(name);
        const user = {
          id: name
        }
        API.lookupUser(user)
          .then(res => {
            const lat = parseFloat(res.data.lat);
            const lng = parseFloat(res.data.lng);
            const name = res.data.name;
            const shoppingList = res.data.shoppingList;
            const address = res.data.address;
            const shoppingStr = shoppingList.join(",")
            const userReply = {
              lat: lat,
              lng: lng,
              name: name,
              address: address,
              shoppingList: shoppingStr
            }
            const newList = users.list;
            const names = [];
            for (var userObject of newList) {
              names.push(userObject.name);
            }
            if (names.indexOf(userReply.name) === -1) {
              newList.push(userReply);
              setUsers({
                list: newList
              })
            }
          })
        dispatch({ type: "reply" })
      } else {
        console.log(text);
        console.log(name);
        setNotice({
          msg: text
        });
        dispatch({ type: "notice", sender: name })
      }

    });
  }, []);

  const [sliderState, setSliderState] = useState({
    value: 0,
    color: ""
  });

  function customSlider(event) {

    const value = parseInt(event.target.value);
    console.log(value);
    let background = `linear-gradient( 90deg, var(--neongreen) ${value}%,
    hsla(var(--hue), var(--saturation), var(--baseLightness), 1) ${value}%)`
    setSliderState({
      value: value,
      color: background
    });
    if (value ===100) handleFire(event);
  }

  function handleFire(event) {
    const token = localStorage.getItem("fireToken");
    const name = localStorage.getItem("userName");
    console.log(state);
    console.log("book.js handleFire: ", name);
    API.sendFire({ token: token, name: name });

  }


  function handleBinding() {
    messaging.requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        console.log(token);
        setFirebaseToken(token);
        localStorage.setItem("fireToken", token);
        messaging.onMessage((payload) => {
          console.log()
        })
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
  }

  if (state.status === "in") {

  }
  function checkReply(event) {
    event.preventDefault()
    const newList = users.list;
    newList.push(userState);
    setUsers({
      list: newList
    })
    console.log(users.list);
  }


  function loadBooks() {
    API.getBooks()
      .then(res =>
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  function loadUser() {
    const id = localStorage.getItem("userID");
    const token = localStorage.getItem("reactToken");
    const user = {
      id: id,
      token: token
    }
    API.getUser(user)
      .then(res => {
        const lat = parseFloat(res.data.lat);
        const lng = parseFloat(res.data.lng);
        console.log("logging account: ", lat, lng);
        dispatch({ type: "in", lat: lat, lng: lng });
      })
      .catch(err => console.log(err));
  }

  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  return (
    <Container fluid>
      <div className="row justify-content-center">
        <div className="col-md-12 col-sm-12 justify-content-start" >
          <h2 className="sliderLable">Slide to let your neighbors know...</h2>
          <input
            className="col-sm-12"
            id="slider"
            type="range"
            name="slider"
            min="0"
            value={sliderState.value}
            max="100"
            placeholder="Slide to let them know"
            style={{ "background": `${sliderState.color}` }}
            onChange={customSlider}
          />
        </div>

        <div className="col-md-12 col-sm-12">
          <br/>
          <div className="mapContainer">
            <GoogleMaps userList={users.list} />
          </div>
  
          {/* <button className="btn btn-primary" onClick={handleBinding}>firebase button</button>
          <button className="btn btn-primary" onClick={handleFire}>admin</button> */}
          <Notice
            replyTo={notestate.replyTo}
            text={notestate.msg} />
          {/* <button onClick={loadUser}>user</button>
          <button onClick={checkReply} >check reply</button> */}
          <br />
          <br />
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Jumbotron>
                <h3>My Shopping List</h3>
              </Jumbotron>
              <ShoppingList />
            </div>
            <div className="col-md-6">
              <Jumbotron>
                <h3>Neighbor's Shopping List</h3>
              </Jumbotron>
              {state.requests.length ? (
                <List>
                  {state.requests.map(request => (
                    <ListItem key={request._id}>
                      {/* <Link to={"/books/" + book._id}> */}
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title">Name: {request.name} </div>
                          <div className="card-subtitle">Addess: {request.address}</div>
                          <div className="card-text">Request: {request.shoppingList} </div>
                        </div>
                      </div>
                      <button>Fulfilled</button>
                      {/* </Link> */}
                      {/* <DeleteBtn onClick={() => deleteBook(book._id)} /> */}
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <h3 className="myNoResult" >No Results to Display</h3>
                )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Books;
