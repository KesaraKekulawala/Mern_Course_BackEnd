import e from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export function createUser(req, res) {
    if(req.body.role = "admin"){
        if(req.user != null){
            if(req.user.role != "admin"){
                res.status(403).json({
                    message: "Unauthorized to create admin account please login first"
                })
                return
            }
            }
        }else{
            res.status(403).json({
                message: "Unauthorized to create admin account please login first"
            })
            return
        }
    


    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User(
        {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        role: req.body.role,
        }
    )

    user.save().then(
        () => {
            res.json({
                message: "User added successfully"
            })
        }
    ).catch(
        () => {
            res.json({
                message: "Error adding user"
            })
        }      
    )
}

export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}).then(
        (user) => {
            if(user == null){
                res.status(401).json({
                    message: "User not found"
                })
            }else{
                const isPasswordValid = bcrypt.compareSync(password, user.password);
                if(isPasswordValid){
                    const token = jwt.sign(
                       {
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        role : user.role,
                        img : user.img
                    },
                    "cbc-batch-five@2025Online"

                    )
                    res.status(200).json({
                        message: "Login successful",
                        token : token
                    })
                }else{
                    res.status(401).json({
                        message: "Invalid password"
                    })
                }
            }
        }
    )
}

export function isAdmin(req) {
    if(req.user == null){
        return false
    }

    if(req.user.role != "admin"){
        return false
    }

    return true
}
