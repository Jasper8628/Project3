import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import Logout from "../components/logout";
import { useCountContext } from "../utils/GlobalState";
import Geocode from "react-geocode";
import GoogleMaps from "../components/googleMaps";
import Goshopping from "../components/goShopping";
import "./history.css";

function History() {
    const [list, setList] = useState({
        active: [],
        completed: []
    });
    useEffect(() => {
        loadUser();

    }, [])
    function loadUser() {

        const id = localStorage.getItem("userID");
        const token = localStorage.getItem("reactToken");
        const user = {
            id: id,
            token: token
        }
        API.getUser(user)
            .then(res => {
                const shoppingList = res.data.shoppingList;
                const completedList = shoppingList.filter(item => (item.status !== "active"));
                const activeList = shoppingList.filter(item => (item.status === "active"));
                setList({
                    active: activeList,
                    completed: completedList
                });
            })
    }
    function updateOrder(event){
        const data={
            id:event.target.value,
            status:"completed"
        }
        API.updateOrder(data)
        .then(res=>loadUser());

    }
    return (
        <div className="row">
        <Link to="/home">
            <button className="settings fas fa-share"></button>
        </Link>
            <div className="col-md-6 col-sm-12">
                <h3 className="historyH3">Active Requests: </h3> 
                {list.active.length ? (
                    <ul>
                        {list.active.map(item => (
                            <li
                            className="historyList" 
                            key={item._id}>
                                <p><h5>Requested at: </h5>{item.createdAt}</p>
                                <p>{item.item1}</p>
                                <p>{item.item2}</p>
                                <p>{item.item3}</p>
                                <p>{item.item4}</p>
                                <p>{item.item5}</p>
                                <p>Status:  {item.status} </p>
                                <button 
                                 value={item._id}
                                 title="Mark as completed" 
                                 className="fas fa-check"
                                 onClick={updateOrder}
                                 ></button>
                            </li>

                        ))}
                    </ul>
                ) : (<p>No Active Requests Currently</p>)}
            </div>
            <div className="col-md-6 col-sm-12">
                <h3 className="historyH3">Recent Requests: </h3> 
                {list.completed.length ? (
                    <ul>
                        {list.completed.map(item => (
                            <li
                            className="historyList" 
                            key={item._id}>
                                <p><h5>Requested at: </h5>{item.createdAt}</p>
                                <p>{item.item1}</p>
                                <p>{item.item2}</p>
                                <p>{item.item3}</p>
                                <p>{item.item4}</p>
                                <p>{item.item5}</p>
                                <p>Status:  {item.status} </p>
                            </li>

                        ))}
                    </ul>
                ) : (<p>You haven't requested anything from your neighbours yet...</p>)}
            </div>

        </div>
    )
}

export default History
