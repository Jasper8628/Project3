import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import "./shoppingList.css";

function ShoppingList() {
    const [shoppingList, setList] = useState({
        list: []
    });
    const [btnState, setBtnState] = useState({})
    const [formObject, setFormObject] = useState({});

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // function handleFormSubmit(event) {
    //     event.preventDefault();
    //         const book = {
    //             title: formObject.title,
    //             author: formObject.author,
    //             synopsis: formObject.synopsis
    //         }
    //         API.saveBook(book)
    //             .then(res => loadBooks())
    //             .catch(err => console.log(err));

    // };
    function handleAdd(event) {
        event.preventDefault();
        const item = {
            name: formObject.itemName,
            quantity: formObject.quantity
        }
        const newList = shoppingList.list;
        newList.push(item);
        setList({
            list: newList
        });
        console.log(shoppingList.list);
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
                        {shoppingList.list.map(item => (
                            <li key={shoppingList.list.indexOf(item)}>
                                <div className="row justify-content-start">
                                    {/* <input className="checkBox" type="checkbox" /> */}
                                    <button className="shoppingListBtn"
                                    > {item.name} x {item.quantity}</button>

                                </div>

                            </li>
                        ))}
                        <button>Save  </button>
                    </ul>

                ) : (
                        <h6 className="myNoResult"></h6>
                    )}

            </div>
        </div>



    )
}

export default ShoppingList
