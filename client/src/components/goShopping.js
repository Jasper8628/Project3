
import API from "../utils/API";
import React, { useState, useEffect } from "react";

function GoShopping() {
    function handleFire(event) {
        const token = localStorage.getItem("fireToken");
        const name = localStorage.getItem("userName");
        console.log("account.js handleFire: ", name);
        API.sendFire({ token: token, name: name });
    
      }
    return (
        <div>
             <button className="btn btn-primary"
            onClick={handleFire}>admin</button>
        </div>
        
    )
}

export default GoShopping
