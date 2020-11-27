const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/steveprojectinstaclone/image/upload/v1605617298/uploads/yxeryjdf6rh81tidvhja.png"
    },
    followers:[
        {
            type:ObjectId,
            ref:"User"
        }
    ],
    following:[
        {
            type:ObjectId,
            ref:"User"
        }
    ]
})


const User = mongoose.model('User',userSchema);
module.exports = User;