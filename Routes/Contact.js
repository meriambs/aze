const express = require("express");
const ContactSchema = require("../Models/Contact");
const {
    register,
    login,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
} = require("../Controllers/Contact");
const { loginValidator, registerValidator, validation } = require("../Middleware/RegisterValidation");
const { isAuth } = require("../Middleware/isAuth");

const ContactRouter = express.Router();
//post for register
ContactRouter.post("/login", register, registerValidator, validation);

//post for login
ContactRouter.post("/login", login, loginValidator);

//get route
ContactRouter.get("/getalluser", getAllUsers);
ContactRouter.get("/getuser", isAuth, (req, res) => {
    try {
        res.send(req.user)
    } catch (err) {
        res.send({ msg: "something wrong", err });
    }
}),

//put route
ContactRouter.put("/updateuser/:id", updateUser);

//delete route
ContactRouter.delete("/deleteuser/:id", deleteUser);

//get by id route
ContactRouter.get("/getuser/:id", getUser);

module.exports = ContactRouter;
