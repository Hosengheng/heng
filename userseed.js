import User from "./models/User.js"
import brcy from 'bcrypt'
import connectToDatabase from "./Database/database.js";

const userRegister = async ()=>{
    connectToDatabase()
    try{
        const hashPassword = await brcy.hash("admin", 10)
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"
        })
        await newUser.save()
    }catch(error){
        console.log(error)
    }
}

userRegister();