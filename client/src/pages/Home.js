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
import Theme from "../components/theme";
import { useCountContext } from "../utils/GlobalState";
import Sidebar from "../components/sideBar/index";

function Home() {
  const [users, setUsers] = useState({ list: [] });
  const [orderState, setOrderState] = useState({
    items: [],
    displayHome: "block",
    displayOrder: "none",
    address: "",
    id: ""
  });
  const [state, dispatch] = useCountContext();
  const [formObject, setFormObject] = useState({});
  const [btnState, setBtnState] = useState({});
  const [firebaseToken, setFirebaseToken] = useState();
  const [notestate, setNotice] = useState({
    msg: '',
    type: ''
  });
  const [userState, setUserState] = useState({
    lat: "",
    lng: "",
    name: "",
    shoppingList: [],
    address: ""
  });


  useEffect(() => {
    dispatch({ type: "sidebarOff" });
    handleBinding();
    loadUser();
    navigator.serviceWorker.addEventListener("message", (message) => {
      const text = message.data['firebase-messaging-msg-data'].data.msg;
      const name = message.data['firebase-messaging-msg-data'].data.name;
      const requestID = message.data['firebase-messaging-msg-data'].data.request;
      const { user, line1, line2, type } = message.data['firebase-messaging-msg-data'].data;
      const testLat = message.data['firebase-messaging-msg-data'].data.lat;
      const testLng = message.data['firebase-messaging-msg-data'].data.lng;
      console.log("logging fire reply type: ", type);
      if (type === "reply") {
        console.log(name);
        const request = {
          id: requestID
        }
        API.lookupOrder(request)
          .then(res => {
            const items = []
            items.push(res.data.item1, res.data.item2, res.data.item3, res.data.item4, res.data.item5);
            const requestedItems = items.filter(item => (item !== ""));
            const num = requestedItems.length;
            console.log("num items:", num);
            const lat = JSON.parse(testLat);
            const lng = JSON.parse(testLng);
            const userReply = {
              lat: lat,
              lng: lng,
              name: user,
              line1: line1,
              line2: line2,
              numItem: num,
              _id: requestID
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
        setNotice({
          msg: text,
          type: type
        });
      } else if (type === "confirm" || type === "cancel") {
        setNotice({
          msg: text,
          type: type
        });
        dispatch({ type: "reply" })
      }
      else {
        console.log(text);
        console.log(name);
        setNotice({
          msg: text,
          type: type
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
    hsla(var(--hue), var(--saturation), var(--fourShadeLighter), 1) ${value}%)`
    setSliderState({
      value: value,
      color: background
    });
    if (value === 100) handleFire(event);
  }

  function handleFire(event) {
    const data = {
      postcode: parseInt(state.postcode),
      lat: state.lat,
      lng: state.lng,
      name: localStorage.getItem("userName"),
      radius: state.radius,
      token: localStorage.getItem("fireToken")
    }
    console.log("logging from handfire:", state, data);
    const name = localStorage.getItem("userName");
    console.log("logging from handleFire: ", name);
    API.sendFire(data);

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

  function loadUser() {
    const id = localStorage.getItem("userID");
    const token = localStorage.getItem("reactToken");
    const user = {
      id: id,
      token: token
    }
    API.getUser(user)
      .then(res => {
        const acceptedList = res.data.acceptedList;
        const accepted = acceptedList.filter(item => (item.status === "active"));
        for (var item of accepted) {
          dispatch({ type: "add", request: item });
        }
        setUsers({
          list: accepted
        })
        const name = res.data.name;
        const line1 = res.data.addressLine1;
        const line2 = res.data.addressLine2;
        const lat = parseFloat(res.data.lat);
        const lng = parseFloat(res.data.lng);
        console.log("logging accepted: ", accepted);
        dispatch({
          type: "in",
          lat: lat,
          lng: lng,
          line1: line1,
          line2: line2,
          userName: name,
          userID: id
        });
      })
      .catch(err => console.log(err));
  }
  let unFocused = true;
  function handleSideBar(event) {
    if (unFocused) {
      if (state.sidebar === "none") {
        dispatch({ type: "sidebar" });
      } else {
        dispatch({ type: "sidebarOff" });
      }
    }
  }
  function handleBlur() {
    if (unFocused && state.sidebar === "block") dispatch({ type: "sidebarOff" });
  }
  function handleFocus() {
    unFocused = false
    console.log(unFocused, state.sidebar)
  }
  function handleUnFocus() {
    unFocused = true
    console.log(unFocused, state.sidebar)
  }

  function lookupRequest(event) {
    const ID = event.target.name;
    const data = {
      id: ID
    }
    // const list = state.requests;
    // let line1 = "";
    // let line2 = "";
    // let customerName = "";
    // for (var request of list) {
    //   if (request._id === ID) {
    //     line1 = request.line1;
    //     line2 = request.line2;
    //     customerName = request.name;
    //   }
    // }
    // const address = line1 + " " + line2;
    API.lookupOrder(data)
      .then(res => {
        console.log("looking lookup:", res);
        const items = []
        items.push(res.data.item1, res.data.item2, res.data.item3, res.data.item4, res.data.item5);
        const requestedItems = items.filter(item => (item !== ""));
        setOrderState({
          displayHome: "none",
          displayOrder: "block",
          name: res.data.name,
          address: res.data.addressLine1 + " " + res.data.addressLine2,
          items: requestedItems,
          id: ID
        })
      })
      .catch(err => console.log(err))
  }
  function homeListBtn() {
    setOrderState({
      ...orderState,
      displayHome: "block",
      displayOrder: "none"

    })
  }
  function updateOrder(event) {
    const name = state.userName;
    const id = event.target.value;
    const status = `${event.target.name} by ${name} `;
    const newList = state.requests.filter(item => (item._id !== id));
    const receipient = state.requests.find(item => item._id === id);
    dispatch({ type: "cancel", requests: newList });
    setUsers({
      list: newList
    })
    homeListBtn();
    const data = {
      id: id,
      status: status
    }
    const cancelInfo = {
      name: state.userName,
      to: receipient.name,
      status: event.target.name
    }
    API
      .cancel(cancelInfo)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    API
      .updateOrder(data)
      .then(res => console.log(res))
      .catch(err => console.log(err));

  }


  return (
    <React.Fragment >
      <button className="settings fas fa-user-circle" onClick={handleSideBar} onBlur={handleBlur} ></button>
      <div className="sideBar" onMouseOver={handleFocus} onMouseLeave={handleUnFocus} style={{ "display": `${state.sidebar}` }}>
        <Sidebar />
      </div>
      <div className="row justify-content-center">
        <div className="col-md-12 col-sm-12">
          <div className="mapContainer">
            <GoogleMaps userList={users.list} />
          </div>
          <br/>
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
          <span className="quest fas fa-exclamation"></span>
          <h5 className="sliderLable">Going to the shops? Slide me...</h5>

          {/* <button className="btn btn-primary" onClick={handleBinding}>firebase button</button>
          <button className="btn btn-primary" onClick={handleFire}>admin</button> */}
          <Notice
            replyTo={notestate.replyTo}
            text={notestate.msg} />
          {/* <button onClick={loadUser}>user</button>
          <button onClick={checkReply} >check reply</button> */}
          <div className="row ">
            <div className="col-md-12 col-sm-12 justify-content-start">
              <div>
                {state.requests.length ?
                  (
                    <div className="myContentRow row">
                      <button className="myContentBtn fas fa-store" onClick={homeListBtn}></button>
                      {state.requests.map(request => (

                        <button
                          key={request._id}
                          name={request._id}
                          onClick={lookupRequest}
                          className="myContentBtn fas fa-gifts"></button>
                      ))}

                    </div>
                  )
                  : (
                    <div className="myContentRow row">
                      <button className="myContentBtn fas fa-store" onClick={homeListBtn}></button>
                    </div>
                  )}
                <div className="myContent" style={{ "display": `${orderState.displayHome}` }}>
                  <ShoppingList />
                </div>
                <div className="myContent" style={{ "display": `${orderState.displayOrder}` }}>
                  <div className="requestHeader">
                    <p>{orderState.name} </p>
                    <p>{orderState.address}</p>

                  </div>
                  {orderState.items.length ? (
                    <ul>
                      {orderState.items.map((item, index) => (
                        <li key={index}>
                          <button
                            name={index}
                            onClick={(event) => {
                              const name = event.target.name;
                              if (btnState[name] !== "pressed") {
                                setBtnState({
                                  ...btnState,
                                  [name]: "pressed"
                                })
                              }
                            }}
                            className={btnState[index] === "pressed" ? ("shoppingListBtn unPressed") : ("unPressed")}
                          > {item} </button>
                        </li>
                      ))}
                    </ul>
                  ) : (<p> </p>)}
                  <div className="requestFooter">
                    <button name="cancelled" value={orderState.id} onClick={updateOrder}>Cancel</button>
                    <button name="completed" value={orderState.id} onClick={updateOrder}>Complete</button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
