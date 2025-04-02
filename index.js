import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Student from './models/student.js';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoute.js';
import jwt from 'jsonwebtoken'; 

const app = express();
app.use(bodyParser.json())

app.use(
    (req, res, next) => {
        const tokenString = req.header("Authorization");	
        if(tokenString != null){
            const token = tokenString.replace("Bearer ", "");
            console.log(token);

            jwt.verify(token, "cbc-batch-five@2025Online", 
                (err, decoded)=>{
                    if(decoded != null){
                        console.log(decoded);
                        req.user=decoded;
                        next();

                    }else{
                        console.log("Token is not valid");  
                        res.status(403).json({
                            message: "Token is not valid"
                        })
                    }
                        
                    }
                )
                }else{
                    next();
                }
            }
        
        
        )
        
        
        
    


mongoose.connect("mongodb+srv://admin:123@cluster0.4b8a1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to database")
}).catch(()=>{
    console.log("Error connecting to database")
})

app.use('/students', studentRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);

app.listen(5000, () =>{
    console.log('Server is running on port 5000')
    }
);