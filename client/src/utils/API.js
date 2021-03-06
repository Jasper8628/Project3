import axios from "axios";

export default {

 lookupUser:function (data){
   return axios.get("/api/user/lookup/" + data.id);
 },
 checkAvail:function (data){
   console.log(data);
   if(data.name) {
     console.log("checking name")
     return axios.get("/api/user/checkname/"+data.name);}
   if(data.email) {
     console.log("checing email");
     return axios.get("/api/user/checkemail/"+data.email);}
   
 },
 changePassword:function(data){
  const token = data.token;
   return axios.post("/api/user/"+data.id,data,{
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
 },




 lookupOrder:function(data){
   return axios.get("/api/order/"+data.id);
 },
 acceptOrder:function(data){
    return axios.post("/api/order/accept",data);
 },
 updateOrder:function(data){
    return axios.put("/api/order/"+data.id,data);
 },

//  updateOrder:function(data){
//   return axios.put(("/api/order"+data.id),data);
//  },
 saveRequest:function(data){
   return axios.post("/api/order/",data)
 },

 getUsers:function(){
   return axios.get("/api/user");
 },
 deleteUser:function(data){
   return axios.put("/api/user",data);
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
    return axios.post("/api/fire", data)
  },
  reply: function (data) {
    return axios.post("/api/fire/reply", data)
  },
  confirm:function(data){
    return axios.post("/api/fire/confirm",data)
  },
  cancel:function(data){
    return axios.post("/api/fire/cancel",data)
  }

};
