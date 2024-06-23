import express from "express";
import Product from "../models/productModel.js";
import cors from "cors";
import data from "../data.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from '../utils.js';

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
productRouter.get('/categories', expressAsyncHandler(async (req, res) => {

    try {
        const categories = await Product.find().distinct('category');
        res.send(categories);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})
);
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
const PAGE_SIZE = 3;

productRouter.get(
    '/admin',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const { query } = req;
        const page = query.page || 1;
        const pageSize = query.pageSize || PAGE_SIZE;

        const products = await Product.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
        const countProducts = await Product.countDocuments();
        res.send({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
        });
    })
);

productRouter.get(
    '/search',
    expressAsyncHandler(async (req, res) => {
        const { query } = req;
        const pageSize = query.pageSize || PAGE_SIZE;
        const page = query.page || 1;
        const category = query.category || '';
        const price = query.price || '';
        const rating = query.rating || '';
        const order = query.order || '';
        const searchQuery = query.query || '';

        const queryFilter =
            searchQuery && searchQuery !== 'all'
                ? {
                    name: {
                        $regex: searchQuery,
                        $options: 'i',
                    },
                }
                : {};
        const categoryFilter = category && category !== 'all' ? { category } : {};
        const ratingFilter =
            rating && rating !== 'all'
                ? {
                    rating: {
                        $gte: Number(rating),
                    },
                }
                : {};
        const priceFilter =
            price && price !== 'all'
                ? {
                    // 1-50
                    price: {
                        $gte: Number(price.split('-')[0]),
                        $lte: Number(price.split('-')[1]),
                    },
                }
                : {};
        const sortOrder =
            order === 'featured'
                ? { featured: -1 }
                : order === 'lowest'
                    ? { price: 1 }
                    : order === 'highest'
                        ? { price: -1 }
                        : order === 'toprated'
                            ? { rating: -1 }
                            : order === 'newest'
                                ? { createdAt: -1 }
                                : { _id: -1 };

        const products = await Product.find({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        })
            .sort(sortOrder)
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        const countProducts = await Product.countDocuments({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        });
        res.send({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
        });
    })
);
// productRouter.post(
//     '/',
//     isAuth,
//     isAdmin,
//     expressAsyncHandler(async (req, res) => {
//         const newProduct = new Product({
//             name: 'sample name ' + Date.now(),
//             slug: 'sample-name-' + Date.now(),
//             image: '/images/p1.jpg',
//             price: 0,
//             category: 'sample category',
//             brand: 'sample brand',
//             countInStock: 0,
//             rating: 0,
//             numReviews: 0,
//             description: 'sample description',
//         });
//         const product = await newProduct.save();
//         res.send({ message: 'Product Created', product });
//     })
// );

productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        try {
            const newProduct = new Product({
                name: 'sample name ' + Date.now(),
                slug: 'sample-name-' + Date.now(),
                image: '/images/p1.jpg',
                price: 0,
                category: 'sample category',
                brand: 'sample brand',
                countInStock: 0,
                rating: 0,
                numReviews: 0,
                description: 'sample description',
            });

            const product = await newProduct.save();
            res.status(201).send({ message: 'Product Created', product }); // Correct status code
        } catch (error) {
            res.status(500).send({ message: 'Error in creating product', error: error.message }); // Error handling
        }
    })
);



export default productRouter; 