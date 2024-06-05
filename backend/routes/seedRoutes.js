import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import cors from "cors";
import User from '../models/userModel.js';


const seedRouter = express.Router();

seedRouter.get('/', cors(), async (req, res) => {


    //await Product.deleteMany({});
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);

    await User.remove({});
    const createdUser = await User.insertMany(data.users);
    res.send({ createdProducts, createdUser });

    // } catch (error) {
    //     res.status(500).send({ message: 'Failed to seed products', error });
    // }
})

export default seedRouter; 