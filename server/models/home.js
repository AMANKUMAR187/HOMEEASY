import mongoose  from "mongoose";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { stringify } from "querystring";


const homeSchema = new mongoose.Schema({
    useremail : String,
    image :{
        public_id: {
            type : String,
            require :true
        },
        url : {
            type : String,
            require: true,
        }
    },
    price : Number,
    location : String,
    description : String,
    email : String,

});

export const Home = mongoose.model("Home", homeSchema);
