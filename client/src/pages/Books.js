import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { messaging } from "../init-fcm";

function Books() {
  // async function componentDidMount() {
  //   messaging.requestPermission()
  //     .then(async function () {
  //       const token = await messaging.getToken();
  //     })
  //     .catch(function (err) {
  //       console.log("Unable to get permission to notify.", err);
  //     });
  //   navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
  // }






  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [userState, setUserState] = useState({});
  const [firebaseToken, setFirebaseToken]=useState();
  const [notice,setNotice]=useState();

  useEffect(() => {
    loadBooks()
  }, []);

  function handleFire(event){
    const token=localStorage.getItem("fireToken");
    API.sendFire({token:token})

  }


  function handleBinding(event) {
    messaging.requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        console.log(token);
        setFirebaseToken(token);
        localStorage.setItem("fireToken",token);
        messaging.onMessage((payload)=>{
          console.log()
        })
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
      // if(firebaseToken){
      //   console.log(firebaseToken);
      // }
    navigator.serviceWorker.addEventListener("message", (message) => {
      const text=message.data['firebase-messaging-msg-data'].data.msg;
      console.log(text);
      setNotice(text);
    });
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
    console.log("logging user:", user);
    API.getUser(user)
      .then(res => {
        console.log(res.data);
        console.log("name:", res.data.name);
        console.log("order:", res.data.orders);
        setUserState(res.data);
      })
      .catch(err => console.log(err));
  }

  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      const book = {
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      }
      API.saveBook(book)
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
  };

  return (
    <Container fluid>
      <div className="row justify-content-center">
        <Col size="md-8">
          <Jumbotron>
            <h1>Project 3</h1>
            <button className="btn btn-primary"
            onClick={handleBinding}>firebase button</button>
              <button className="btn btn-primary"
            onClick={handleFire}>admin</button>
          </Jumbotron>
          <button onClick={loadUser}>user</button>
          <form>
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
          </form>
        </Col>
        <div className="col-md-8 ">
          <Jumbotron>
            <h1>Books On My List</h1>
          </Jumbotron>
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



    </Container>
  );
}


export default Books;
