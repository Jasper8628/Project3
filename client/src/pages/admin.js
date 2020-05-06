
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Logout from "../components/logout";
import { useCountContext } from "../utils/GlobalState";

function Admin() {
    useEffect(()=>{
        getUsers();
    },[]);
    const [users,setUsers]=useState([]);

    function getUsers(){
        API.getUsers()
        .then(res=>{
           console.log(res);
           setUsers(res.data);

        })
        .catch(err=>console.log(err));
    }
    function deleteUser(event){
        const data={
            name:event.target.name
        }
        console.log(data);
        API.deleteUser(data)
        .then(res=>{
            console.log("logging after delete:",res);
            getUsers();
        })
        .catch(err=>console.log(err));
    }
    return (
        <div>
            {users.length?(
                <div>
                {users.map(user=>(
                    <div key={user._id}>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <button 
                    name={user.name}
                    onClick={deleteUser}>Delete</button>

                    </div>
                ))}

                </div>
            ):(
                <div>No users in the database</div>
            )}

        </div>
    )
}

export default Admin
