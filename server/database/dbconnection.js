import mongoose from "mongoose";


export const connection  = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName: "AUTH_DB",

    }).then(()=>{
        console.log("db Connected Successfully")
    }).catch((err)=>{
        console.log(`error while connecting DB ${err}`)
    })
}