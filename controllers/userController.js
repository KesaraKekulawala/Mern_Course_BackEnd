import User from "../models/user.js";
export function createUser(req, res) {
    const user = new User(
        {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        role: req.body.role,
        isBlocked: req.body.isBlocked
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
