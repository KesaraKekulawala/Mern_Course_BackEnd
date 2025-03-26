import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Student from './models/student.js';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoute.js';

const app = express();
app.use(bodyParser.json())

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