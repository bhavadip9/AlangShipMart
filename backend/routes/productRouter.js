import express from "express";
import Product from "../models/productModel.js";
import cors from "cors";
import data from "../data.js";

const productRouter = express.Router();

productRouter.use(cors());


productRouter.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        return res.send(products);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
    // res.send(data.products);
})
productRouter.get('/slug/:slug', async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
        if (product) {
            res.send(product);

        } else {
            res.status(404).send({ message: 'Product is not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})
productRouter.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.send(product);

        } else {
            res.status(404).send({ message: 'Product is not found' });
        }
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
})



export default productRouter; 