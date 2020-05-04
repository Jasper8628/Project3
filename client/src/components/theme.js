import React, { useState, useEffect } from "react";

function Theme() {
    const [themeState, setThemeState] = useState({
        hue: 200,
        hueYellow:60
    });
    const root = document.documentElement;
    function handleTheme(event) {
        const value = event.target.value;
        const name=event.target.name;
        const hueValue = parseInt(value);
        setThemeState({
            ...themeState,
            [name]: hueValue
        })
        root.style.setProperty('--hue', themeState.hue);
        root.style.setProperty('--hueYellow', themeState.hueYellow);
    }



    return (
        <div>
            <input name="hue" type="range" min="0" max="360" onChange={handleTheme} />
            
            <input name="hueYellow" type="range" min="0" max="360" onChange={handleTheme} />
        </div>
    )
}

export default Theme
