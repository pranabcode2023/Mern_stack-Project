// import UserModel from "../models/userModels.js"

// const testingRoute = (req, res) => {
//     res.send('testing users route....')
// }

// const getUsers = async (req, res) => {
//     try {
//         const users = await UserModel.find({})
//         console.log(users)
//         res.status(200).json({
//             usersNumber: users.length,
//             users
//         })
//     } catch (error) {
//         res.status(500).json({
//             error: "something went wrong"
//         })
//         console.log("error", error)
//     }
// }

// const getUser = async (req, res) => {
//     const id = req.params;
//     try {
//         const user = await UserModel.findOne({ _id: id });
//         res.status(200).json(user)
//     } catch (error) {
//         // console.log(error)
//         res.status(500).json({ error: "somthing went wrong" })

//     }
// }

// export { testingRoute, getUsers, getUser }

import UserModel from "../models/userModels.js";
import { imageUpload } from "../utils/imageManagement.js";

const testingRoute = (req, res) => {
    res.send('testing users route....')
}

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        console.log(users);
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ error: "something went wrong..." })
        console.log(e);
    }
}

const getUser = async (req, res) => {
    const params = req.params;
    console.log(params); // should show { id: blahblah }
    const id = req.params.id;
    console.log(id); // will show just "blahblah"
    try {
        const user = await UserModel.findById(id).populate("pets");
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong.." })
    }
}

const createUser = async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.status(406).json({ error: "Please fill out all fields" })
    }
    const avatar = await imageUpload(req.file, "user_avatars")

    const newUser = new UserModel({
        // email: req.body.email,
        // username: req.body.username,
        // password: req.body.password

        // alternative with spreadoperator
        ...req.body,
        avatar: avatar
    });

    try {
        const registeredUser = await newUser.save();
        res.status(200).json({
            message: "Registration Successfull",
            newUser: registeredUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json("something went wrong...")

        //   recomended
        // error.code === 11000 ? res.status(406).json({ error: "That email is already registered" })
        //     : res.status(500).json({ error: "Unknown error occured", ...e })
    }
}

const updateUser = async (req, res) => {

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message);
    }

}

export { testingRoute, getUsers, getUser, createUser, updateUser }