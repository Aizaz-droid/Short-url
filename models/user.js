//USer model bna rhe
const mongoose= require ('mongoose');

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        },
}, { timestamps: true });

const User=mongoose.model("user",userSchema) //model name user aur isme userSchema pass krdenge

module.exports= User;