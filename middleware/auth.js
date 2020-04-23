const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    console.log("Verifying user authorization...");
    const bearer = req.header("Authorization");
    if (typeof (bearer) !== "undefined") {
        const token = bearer.split(" ")[1];
     //   console.log(token);
        if (!token){
            res.status(401).json({ msg: "authorization denied" });
            console.log("authorization denied");
        } 
        try {
            const decoded = jwt.verify(token, config.get("jwtSecret"));
            req.user = decoded;
            next();
        } catch (e) {
            res.status(400).json({ msg: "Invalid token" });
            console.log("Invalid token");
        }
    } else {
        res.sendStatus(403);
        console.log("forbidden");
    }

}

module.exports = auth;
