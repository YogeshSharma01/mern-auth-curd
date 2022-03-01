var jwt = require('jsonwebtoken');
const JWT_SECRETE = 'yogeshbro$001';



const fetchuser = (req,res,next)=>{

    // get the user from the jwt token and ID to req
    const token = req.header('auth-token');
    if(!token){
         return res.status(401).send({error:'Please authenticate using a valid token'});
    }
    try {
        const data = jwt.verify(token, JWT_SECRETE);
        req.user = data.user;
        next();

    } catch (error) {
         res.status(401).send({error:'Please....authenticate using a valid token'});        
    }
}



module.exports = fetchuser;