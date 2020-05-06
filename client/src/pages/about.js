
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Logout from "../components/logout";
import { useCountContext } from "../utils/GlobalState";

function About() {
    return (
        <div>
            <Link to="/home">
                <button className="settings fas fa-share"></button>
            </Link>
            <h3>About iRequest</h3>
            <p>iRequest is inspire by the current lockdown imposed by the global pandemic, as well as by the increasing physical isolation we had experienced post social media and pre COVID.
This is an app designed to encourage personal interations in real life and to strengthen the sense of community some may have thought was long gone.
<br/>
<br/>
Every time when one of my family members goes out shopping, one question will always be asked :"Any requests?" Hence the name. I thought to myself :"Under the current circumstances, wouldn't it be nice to extend that sense of family unit to my neighbourbood? And maybe beyond?"
<br/>
<br/>
Fewer and fewer of us these days know our neighbours by their names, however, ever since the outbreak of this pandemic, more and more gestures of kindness,reliance on the community have been sprouting out everywhere.
<br/>
<br/>
I hope this app can be part of this new trend where instead of becoming colder and lazier with new techknologies, we use technology to create more ways to get out of our houses, talk to our neighbours and find fulfillment in each other's presence.
            </p>
            <div className="row">
                <a className="fab fa-facebook-f" ></a>
                <a className="fab fa-github" ></a>
                <a className="fas fab fa-envelope" ></a>

            </div>

        </div>
    )
}

export default About
