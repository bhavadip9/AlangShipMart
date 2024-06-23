import express from 'express';
import bcrypt from 'bcryptjs';
import cors from "cors";
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.post('/signin', cors(), expressAsyncHandler(async (req, res) => {
    console.log("Heelooo")
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
        } else {
            res.status(401).send({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}))

userRouter.post(
    '/signup',
    expressAsyncHandler(async (req, res) => {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })
        const user = await newUser.save();
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
        });
    })
)
userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id)
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8)
            }

            const updateUser = await user.save();
            res.send({
                _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                isAdmin: updateUser.isAdmin,
                token: generateToken(updateUser),
            });
        } else {
            res.status(404).send({ message: 'User is not Found' })
        }
    })

)

export default userRouter;