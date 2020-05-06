import React, { useState } from "react";
import API from "../utils/API";
import { Input } from "../components/Form";
import { useCountContext } from "../utils/GlobalState";



function Requestie() {
    const [formObject, setFormObject] = useState({});
    const [state, dispatch] = useCountContext();
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };
    function handleAcountChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: " x "+value })
    };
    function handleClose(event) {
        event.preventDefault();
        dispatch({ type: "closeNotice" })
    }
    // function rreply() {
    //     const token = localStorage.getItem("reactToken")
    //     const user = {
    //         name: state.sender,
    //         token: token
    //     }
    //     API.lookupUser(user)
    //         .then(res => {
    //             console.log("user lookup: ", res);
    //             const fireToken=res.fireToken;
    //             const requestList=formObject;
    //             API.requestList({ token: fireToken, requestList });
    //         }

    //         )
    //         .catch(err => console.log(err));
    // }
    function reply() {
        const name = state.sender;
        const userName = state.userName;
        const id = localStorage.getItem("userID");
        // const userID=JSON.stringify(id);
        const token = localStorage.getItem("userToken");
        const data = {
            userID: id,
            name:name,
            item1: formObject.item1?(formObject.item1+formObject.amount1):("") ,
            item2: formObject.item2?(formObject.item2+formObject.amount2):("") ,
            item3: formObject.item3?(formObject.item3+formObject.amount3):("") ,
            item4: formObject.item4?(formObject.item4+formObject.amount4):("") ,
            item5: formObject.item5?(formObject.item5+formObject.amount5):("") ,
            addressLine1: state.line1,
            addressLine2: state.line2,
            lat:state.lat,
            lng:state.lng,
            status: "active"
        }
        API.saveRequest(data)
            .then(res => {
                const requestArray = res.data.shoppingList;
                const length = requestArray.length - 1;
                const latestRequest = requestArray[length]
                console.log("reply to request:", latestRequest);
                const position = {
                  
                }
                const positionStr = JSON.stringify(position);
                API.reply({
                    sender: name,
                    user: userName,
                    id: id,
                    request: latestRequest,  
                    addressLine1: state.line1,
                    addressLine2: state.line2,
                    lat: state.lat,
                    lng: state.lng
                });
            })
            .catch(err => console.log(err));
        dispatch({ type: "closeNotice" })

        // API.saveRequest({request:formObject,status:"active",token:token});

    }
    return (
        <div style={{"display":`${state.displayRequest}`}}>
            <form >
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <label>Items</label>
                        <input
                            onChange={handleInputChange}
                            name="item1"
                            placeholder="item 1"
                        />
                        <input
                            onChange={handleInputChange}
                            name="item2"
                            placeholder="item 2"
                        />
                        <input
                            onChange={handleInputChange}
                            name="item3"
                            placeholder="item 3"
                        />
                        <input
                            onChange={handleInputChange}
                            name="item4"
                            placeholder="item 4"
                        />
                        <input
                            onChange={handleInputChange}
                            name="item5"
                            placeholder="item 5"
                        />

                    </div>

                    <div className="col-md-6 col-sm-6">
                        <label>Quantity</label>
                        <input
                            onChange={handleAcountChange}
                            name="amount1"
                            placeholder="amount for item 1"
                        />
                        <input
                            onChange={handleAcountChange}
                            name="amount2"
                            placeholder="amount for item 2"
                        />
                        <input
                            onChange={handleAcountChange}
                            name="amount3"
                            placeholder="amount for item 3"
                        />
                        <input
                            onChange={handleAcountChange}
                            name="amount4"
                            placeholder="amount for item 4"
                        />
                        <input
                            onChange={handleAcountChange}
                            name="amount5"
                            placeholder="amount for item 5"
                        />

                    </div>

                </div>
            </form>
            <div className="modal-footer">
                <button type="button" onClick={handleClose}>Close</button>
                <button type="button" onClick={reply}>Request it!</button>
            </div>
            {/* </div>
                      
                    </div>
                </div>
            </div> */}
        </div>
    )
}


export default Requestie
