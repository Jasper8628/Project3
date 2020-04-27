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
  const [users, setUsers] = useState({
    list: []

  });

  const [state, dispatch] = useCountContext();
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [userState, setUserState] = useState({
    lat: "",
    lng: "",
    name: "",
    shoppingList: [],
    address: ""
  });
  const [firebaseToken, setFirebaseToken] = useState();
  const [notestate, setNotice] = useState({
    msg: '',
    replyTo: ""
  });

  useEffect(() => {
    handleBinding();
    loadUser();
    loadBooks();
  }, []);

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
    // if(firebaseToken){
    //   console.log(firebaseToken);
    // }
  }
  if (state.status === "in") {
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
            const lat = parseFloat(res.data.lat) ;
            const lng = parseFloat(res.data.lng) ;
            const name = res.data.name;
            const shoppingList = res.data.shoppingList;
            const address = res.data.address;
            console.log(res.data);
            const userReply={
              lat: lat,
              lng: lng,
              name: name,
              address: address,
              shoppingList: shoppingList
            }
            const newList=users.list;
            const names=[];
            for(var userObject of newList){
              names.push(userObject.name);
            }
            if(names.indexOf(userReply.name)===-1){
              newList.push(userReply);
              setUsers({
                list:newList
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
        // const name = res.data.name;
        // console.log(res.data);
        // console.log("name:", res.data.name);
        // console.log("order:", res.data.orders);
        // setUserState(res.data);
        console.log(userState);

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
        <Col size="md-6">

          <GoogleMaps userList={users.list}/>
          <br />
          <br />
          <br />
          <br />
          <br />
          <button className="btn btn-primary"
            onClick={handleBinding}>firebase button</button>
          <button className="btn btn-primary"
            onClick={handleFire}>admin</button>
          <Notice
            replyTo={notestate.replyTo}
            text={notestate.msg} />
          <button onClick={loadUser}>user</button>
          <button onClick={checkReply} >check reply</button>
          <br />
          <br />
          {/* <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <Input
              onChange={handleInputChange}
              name="author"
              placeholder="Author (required)"
            />
            <TextArea
              onChange={handleInputChange}
              name="synopsis"
              placeholder="Synopsis (Optional)"
            />
            <FormBtn
              disabled={!(formObject.author && formObject.title)}
              onClick={handleFormSubmit}
            >
              Submit Book
              </FormBtn>
          </form> */}
          <Jumbotron>
            <h1>My Shopping List</h1>
          </Jumbotron>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <ShoppingList />
            </div>
            <div className="col-md-6">
              {books.length ? (
                <List>
                  {books.map(book => (
                    <ListItem key={book._id}>
                      <Link to={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => deleteBook(book._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <h3>No Results to Display</h3>
                )}
            </div>
          </div>
        </Col>


        <div className="col-md-8 ">
        </div>
      </div>



    </Container>
  );
}


export default Books;
