const jwt = require("jsonwebtoken");
const { redis } = require("../router/user.router");


const varify = (req, res, next) => {
    redis.get("_access_token",(err,result)=>{
        if(err){
            res.send("Login First")
            console.log(err)
        }else{
            jwt.verify(result, 'masai', function (err, decoded) {
                if (decoded) {
                    req.body.user = decoded.name;
                    next();
                } else {
                    res.send("wrong token Login first");
                }
            });
        }
    })

};


module.exports=varify