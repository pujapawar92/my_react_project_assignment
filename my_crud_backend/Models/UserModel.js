
const mongoose = require("mongoose");


const UserModel = new mongoose.Schema({

    firstName : {type :  String , require :[ true, "First Name is require"], trim: true,
    minlength: [1, "Name cannot be empty"]},
    lastName : {type : String , require : [true ," Last name is require"], trim: true,
    minlength: [1, "Name cannot be empty"]},
    address: { type: String , require : [true, "Address is require"], trim: true,
    minlength: [1, "Address cannot be empty"] },
    email : {type: String,require: [true, "Email is required"],trim: true,unique: true,
    minlength: [1, "Email cannot be empty"] },
    phone : { type : String , require : [true, "Phone Number s require"], trim: true,
    minlength: [1, "Phone number cannot be empty"]}


},

    {timestamps : true}
);

module.exports = mongoose.model("User",UserModel)