import React, { useState, useEffect } from "react";
import "./passwordStrength.css";

function PasswordStrength(props) {
    useEffect(() => {
        // checkWeakness();
        console.log(props.password);
    })
    const [weakness, setWeakness] = useState({
        msg:"",
        deduction:0
    });
    const [result, setResult] = useState({
        score: 100,
        msg: ""
    })
    function checkWeakness() {
        console.log(props.password);
        const weaknessArray = [];
        weaknessArray.push(weakness)
        let newScore = result.score;
        let newMsg = result.msg;
        for (var item of weaknessArray) {
            newScore = newScore - item.deduction;
            newMsg = newMsg + item.msg;
        }
        setResult({
            score: newScore,
            msg: newMsg
        })

    }
        if (props.password) {
            let length =props. password.length;
            if (length <= 5) {
               setWeakness({
                   msg:"Password too short",
                   deduction:40
               })
            } else if (5 < length <= 10) {
                setWeakness({
                    msg:"Password could be",
                    deduction:40
                })
            } else {
                setWeakness({
                    msg:"",
                    deduction:0
                })
            }
        }

    



    const width = 100 %
        function checkStrength() {
            console.log(width);
        }


    return (
        <div className="row align-items-center">
            <div title="password strength" className="passwordStrength">
                <div className="strengthMeter" style={{ "width": `${result.score}%` }}></div>
            </div>
            <span title={result.msg} className="far fa-question-circle"></span>
        </div>

    )
}

export default PasswordStrength
