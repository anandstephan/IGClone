const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = (req,res,next) =>{
    // console.log(req)
    const {authorization} = req.headers;
    // console.log(authorization)
    if(!authorization){
        return res.status(401).json({error:'You must be logged in'})
    }

    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,payload) =>{
        if(err){
            return res.status(401).json({error:'You must be logged in'})
        }else{
            const {_id} = payload
            User.findById(_id)
                .then(userdata =>{
                    req.user = userdata,
                    next();
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    })
}