import Student from "../models/student.js";

export function getStudent(req, res) {
    Student.find().then(
        (data)=>{
            res.status(200).json(data);
        }
    )
}

export function saveStudent(req,res){
    console.log(req.body);


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
}