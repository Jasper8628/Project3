

function checkLength(name, value) {
    if (name === "password") {
        const length = value.length;
        if (length <= 5) {
            return { score: 40, msg: "Password too short; "+"\n" }
        } else if (5 < length && length <= 10) {
            return { score: 20, msg: "Password could be longer; "+"\n" }
        } else {
            return { score: 0, msg: "" }
        }
    }
}
function checkNum(name, value) {
    if (name === "password") {
        const matches = value.match(/[0-9]/g) || []
        if (matches.length === 0) {
            return { score: 15, msg: "No numbers; "+"\n" }
        } else if (matches.length <= 2) {
            return { score: 5, msg: "Could use more numbers; "+"\n" }
        } else { return { score: 0, msg: "" } }
    }
}
function checkLower(name, value) {
    if (name === "password") {
        const matches = value.match(/[a-z]/g) || []
        if (matches.length === 0) {
            return { score: 15, msg: "No lower case; "+"\n" }
        } else if (matches.length <= 2) {
            return { score: 5, msg: "Could use more lower cases; "+"\n" }
        } else { return { score: 0, msg: "" } }
    }
}
function checkUpper(name, value) {
    if (name === "password") {
        const matches = value.match(/[A-Z]/g) || []
        if (matches.length === 0) {
            return { score: 15, msg: "No upper case; "+"\n" }
        } else if (matches.length <= 2) {
            return { score: 5, msg: "Could use more upper cases; "+"\n" }
        } else { return { score: 0, msg: "" } }
    }
}
function checkSpecial(name, value) {
    if (name === "password") {
        const matches = value.match(/[^0-9a-zA-Z\s]/g) || []
        if (matches.length === 0) {
            return { score: 15, msg: "No special characters; "+"\n" }
        } else if (matches.length <= 2) {
            return { score: 5, msg: "Could use more special characters; "+"\n" }
        } else { return { score: 0, msg: "" } }
    }

}
function calScore(name, value) {
    const newScore = (100
        - checkLength(name, value).score
        - checkLower(name, value).score
        - checkNum(name, value).score
        - checkSpecial(name, value).score
        - checkUpper(name, value).score);
    const newMsg = (""
        + checkLength(name, value).msg
        + checkLower(name, value).msg
        + checkNum(name, value).msg
        + checkSpecial(name, value).msg
        + checkUpper(name, value).msg);
   return {score:newScore,msg:newMsg}
}
export { calScore }