import React from 'react'
import "./passwordStrength.css";

function PasswordStrength(props) {
    const width = 100 %
        function checkStrength() {
            console.log(width);
        }


    return (
        <div className="row align-items-center">
            <div title="password strength" className="passwordStrength">
                <div className="strengthMeter" style={{ "width": `${width}` }}></div>
            </div>
            <span className="far fa-question-circle"></span>
        </div>

    )
}

export default PasswordStrength
