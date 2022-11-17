const jwt = require('jsonwebtoken')
const User = require('../models/user')


const verifyToken = (req, res, next) => {

    try {
        const token = req.header('Authorization');

        if(token) {
            jwt.verify(token, process.env.JWT_SEC, (err, user) => {
                if(err)     return res.status(403).json("Token is not valid");

                req.user = user;
                next();
            })
        }
        else {
            return res.status(401).json("You are not authenticated!");
        }
    }
    catch(err) {
        return res.status(500).json({msg: err.message})
    }
}


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else{
            res.status(403).json("You are not allowed to do that!");
        }
    })
}


const verifyAdmin = async (req, res, next) => {
    
    try {
        const user = await User.findOne({
            _id: req.user.id
        });

        if(!user.isAdmin)    
            return res.status(400).json({msg: "You are not allowed to do that!"})

        next();

    } catch (err) {
        return res.status(500).json({msg: err.message});
    }

    
    // verifyToken(req, res, ()=>{
    //     if(req.user.isAdmin) {
    //         next();
    //     }
    //     else{
    //         res.status(403).json("You are not allowed to do that!");
    //     }
    // })
}

module.exports = { verifyToken, verifyTokenAndAuthorization , verifyAdmin }