const jwt = require("jsonwebtoken");



const verify = async (req, res, next) => {


const token = req.headers.Authorization;
console.log(token)

if (!token) return res.sendStatus(401);

jwt.verify(token, 'masai', function (err, decoded) {
    if (decoded) {
        req.body.user = decoded.name;
        next();
    } else {
        res.send("wrong token Login first");
    }
});

};


module.exports = verify;