const jwt = require("jsonwebtoken")

const varify = (req, res, next) => {
    let token = req.headers.authorization; // Corrected header name to "Authorization"
    

    jwt.verify(token, 'masai', function (err, decoded) {
        if (decoded) {
            req.body.user = decoded.name;
            next();
        } else {
            res.send("wrong token");
        }
    });
};


module.exports=varify