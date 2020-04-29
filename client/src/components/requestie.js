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
    function reply(){
        const name=state.sender;
        const userName=state.userName;
        const id=localStorage.getItem("userID");
        // const userID=JSON.stringify(id);
        const token=localStorage.getItem("userToken");
        const data={
            name:"user name UD as in undefined",
            item1:formObject.item1,
            item2:formObject.item2,
            item3:formObject.item3,
            item4:formObject.item4,
            item5:formObject.item5,
            addressLine1:state.addressLine1,
            addressLine2:state.addressLine2,
            status:"active"
        }
        API.saveRequest(data)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>console.log(err));
        dispatch({ type: "closeNotice" })

        // API.saveRequest({request:formObject,status:"active",token:token});
        API.reply({name:name,id:id});
    }

    // function handleFormSubmit(event) {
    //     event.preventDefault();
    //         const request = {
    //             item1: formObject.item1,
    //             item2: formObject.item2,
    //             item3: formObject.item3,
    //             item4: formObject.item4,
    //             item5: formObject.item5,
    //         }
    //         API.checkUser(user)
    //             .then(res => {
    //                 const token = res.data.token;
    //                 const id = res.data.user._id;
    //                 const name = res.data.user.name;
    //                 console.log(res);
    //                 localStorage.setItem("reactToken", token);
    //                 localStorage.setItem("userID", id);
    //                 localStorage.setItem("userName", name);
    //                 console.log(id);
    //                 setLogState({
    //                     message: `Login successful, welcome ${name}!`,
    //                     color: "text-success"
    //                 })
    //                 console.log(token, id, name);
    //                 dispatch({
    //                     type: "in",
    //                     userName: name,
    //                     userID: id,
    //                     userToken: token
    //                 });
    //             })
    //             .catch(err => {
    //                 setLogState({
    //                     ...state,
    //                     message: "Invalid credentials",
    //                 })
    //                 console.log(err)
    //             });

    // }
    return (
        <div>
            {/* <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModalLong">
                Make A Request!
</button>

            <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">My Request</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body"> */}
            <form className="form-control " >
                <label>item</label>
                <Input
                    onChange={handleInputChange}
                    name="item1"
                    placeholder="item 1"
                />
                <label>item:</label>
                <Input
                    onChange={handleInputChange}
                    name="item2"
                    placeholder="item 2"
                />
                <label>item:</label>
                <Input
                    onChange={handleInputChange}
                    name="item3"
                    placeholder="item 3"
                />
                <label>item:</label>
                <Input
                    onChange={handleInputChange}
                    name="item4"
                    placeholder="item 4"
                />
                <label>item:</label>
                <Input
                    onChange={handleInputChange}
                    name="item5"
                    placeholder="item 5"
                />
            </form>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                <button type="button" className="btn btn-success" onClick={reply}>Request it!</button>
            </div>
            {/* </div>
                      
                    </div>
                </div>
            </div> */}
        </div>
    )
}


export default Requestie
