import axios from "axios";

export default {
  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },

 lookupUser:function (data){
   return axios.get("/api/user/lookup/" + data.id);
 },




 lookupOrder:function(data){
   return axios.get("/api/order/"+data.id);
 },

//  updateOrder:function(data){
//   return axios.put(("/api/order"+data.id),data);
//  },
 saveRequest:function(data){
   return axios.post("/api/order/",data)
 },


  getUser: function (data) {
    const token = data.token;
    console.log("axios getUser:", data);
    return axios.get(("/api/user/" + data.id), {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  },

  updateUser: function (data) {
    const token = data.token;
    console.log("axios update:", data);
    return axios.put(("/api/user/" + data.id),data, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  },

  saveUser: function (userData) {
    return axios.post("/api/user", userData);

  },
  checkUser: function (userData) {
    console.log(userData);
    return axios.post("/api/user/auth", userData);
  },

  saveList: function (data) {
    const token = data.token;
    return axios.post("/api/user", {
      item: data.item,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

  },

  sendFire: function (data) {
    const token = data.token;
    const name = data.name;
    return axios.post("/api/fire", {
      token: token,
      name: name
    })
  },
  reply: function (data) {
    return axios.post("/api/fire/reply", data)
  },
  confirm:function(data){
    return axios.post("/api/fire/confirm",data)
  }

};
