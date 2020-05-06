import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import "./shoppingList.css";

function ShoppingList() {
    useEffect(()=>{
        loadList();

    },[]);
    const [shoppingList, setList] = useState({
        list: []
    });
    const [btnState, setBtnState] = useState({});
    const [formObject, setFormObject] = useState({});


    function loadList(){
       if(localStorage.getItem("iRequestShoppingList")){
           const localList=localStorage.getItem("iRequestShoppingList");
           setList({
               list:JSON.parse(localList)
           })
       }
    }



    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };
    function handleAdd(event) {
        event.preventDefault();
        const item = {
            name: formObject.itemName,
            quantity: formObject.quantity
        }
        const newList = shoppingList.list;
        newList.push(item);
        localStorage.setItem("iRequestShoppingList",JSON.stringify(newList));
        setList({
            list: newList
        });
        console.log(shoppingList.list);
    }
    function handleClick(event){
        const name=event.target.name;
        console.log(name);
        if(btnState[name]!=="pressed"){
            setBtnState({
                ...btnState,
                [name]:"pressed"
            })
        }
    }
    function handleClear(event){
        event.preventDefault();
        localStorage.setItem("iRequestShoppingList","");
        setList({
            list:[]
        });
        setBtnState({});
    }


    return (
        <div>
            <form>
                {/* <label style={{ "display": "block" }}>My shopping List</label> */}
                <input
                    style={{ "display": "inline" }}
                    onChange={handleInputChange}
                    name="itemName"
                    placeholder="item name"
                />
                <input
                    style={{ "display": "inline" }}
                    onChange={handleInputChange}
                    name="quantity"
                    placeholder="amount/quantity"
                />
                <button onClick={handleAdd}>Add</button>
            </form>
            <div>
                {shoppingList.list.length ? (
                    <ul>
                        {shoppingList.list.map((item, index) => (
                            <li key={index}>
                                <div className="row justify-content-start">
                                    {/* <input className="checkBox" type="checkbox" /> */}
                                    <button 
                                    name={index}
                                    onClick={handleClick}
                                    className={btnState[index]==="pressed"?("shoppingListBtn"):("")}   
                                    > {item.name} x {item.quantity}</button>

                                </div>

                            </li>
                        ))}
                        <button onClick={handleClear}>Clear  </button>
                    </ul>

                ) : (
                        <h6 className="myNoResult"></h6>
                    )}

            </div>
        </div>



    )
}

export default ShoppingList
