import express from 'express';
import bcrypt from 'bcryptjs';
import cors from "cors";
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils.js';

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

export default userRouter;