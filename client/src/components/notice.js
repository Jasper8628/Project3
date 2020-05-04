import React, { useState,useEffect } from "react";
import API from "../utils/API";
import { Input } from "../components/Form";
import { useCountContext } from "../utils/GlobalState";
import Requestie from "./requestie";

function Notice(props) {

    const [state, dispatch] = useCountContext();
    useEffect(()=>{
        loadNotice()
    },[]);
    const [showForm, setShowForm] = useState({
        requestForm:"none",
        noticeButton:"block",
        confirmButton:"none"
    });
    function handleRequest(event) {
        event.preventDefault();
        setShowForm({
            requestForm:"block",
            noticeButton:"none",
            confirmButton:"none"
        });
    }
    function handleNotice(event){
        event.preventDefault();
        dispatch({type:"closeNotice"})
    }
    function loadNotice(){
        switch(props.type){
            case "reply":
                setShowForm({
                    requestForm:"none",
                    noticeButton:"none",
                    confirmButton:"block"
                })
            case "confirm":
                setShowForm({
                    requestForm:"none",
                    noticeButton:"none",
                    confirmButton:"block"
                })
            default:  
              setShowForm({
                requestForm:"none",
                noticeButton:"block",
                confirmButton:"none"
            })

        }
    }

    return (
        <div>
            <div className="modal" tabIndex="-1" role="dialog" style={{ 'display': `${state.displayNotice}` }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Message:</h5>
                            <button type="button" className="closeBtn" data-dismiss="modal" aria-label="Close" onClick={handleNotice}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{props.text}</p>
                            <div style={{ "display": `${showForm.requestForm}` }}>
                                <Requestie />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div style={{"display":`${showForm.noticeButton}`}}>
                                <button type="button"  onClick={handleRequest}>Yes Actually...</button>
                                <button type="button"  data-dismiss="modal" onClick={handleNotice}>No Thanks</button>
                            </div>
                            <div style={{"display":`${showForm.confirmButton}`}} onClick={handleNotice} ><button>OK</button> </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Notice
