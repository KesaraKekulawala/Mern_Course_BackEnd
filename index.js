import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import e from 'express';

const app = express();
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://admin:123@cluster0.4b8a1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to database")
}).catch(()=>{
    console.log("Error connecting to database")
})

//mongodb+srv://admin:123@cluster0.4b8a1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.get("/",(req,res)=>{
    
    console.log(req.body.name)
    
    res.json({
        message: "This is a get request"
        
    })
   
})

app.delete("/", (req,res)=>{
    res.json({
        message: "This is a delete request"
    })
})

app.post("/", (req,res)=>{
    console.log(req.body);

    const studentSchema = mongoose.Schema({
        name: String,
        age: Number,
        gender: String,
        stream: String,
        email: String
    }
)

const Student = mongoose.model("students", studentSchema);

const student = new Student({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    stream: req.body.stream,
    email: req.body.email
})

student.save().then(()=>{
    res.json({
        message: "Student add successfully"})
    }).catch(()=>{
        res.json({
            message: "Error adding student"})
    })
})

app.put("/", (req,res)=>{
    res.json({
        message: "This is a put request"
    })
})

app.listen(5000, () =>{
    console.log('Server is running on port 5000')
    }
);