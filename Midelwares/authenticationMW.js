const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
    let token = req.headers.authorization.split(" ")[1];
    let decode_token = jwt.verify(token,process.env.SECRETKEY);
        req.token = decode_token;
        console.log(decode_token);
        next();
    }catch(error) {
        error.message = "not Athenticated";
        next(error);
    }

}

module.exports.isAdmin = (req, res, next) => {
    if(req.token.role === "admin")
        next();
    else
        next(new Error("not Authorizatied"));
    
}
module.exports.isAdminOrSameTeacher = (req, res, next) => {
    if(req.token.role === "admin")
        next();
    else if(req.token.id==req.body._id){
        req.params.id=req.body._id; 
        next();}
    else if(req.token.id==req.params.id){
        next();}
    else
        next(new Error("not Authorizatied"));
    
}