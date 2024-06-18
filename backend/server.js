import mongoose from 'mongoose';
import express from 'express';
import cors from "cors";
import dotenv from 'dotenv'
//import User from './models/userModel.js';
//import data from './data.js';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
//import expressAsyncHandler from 'express-async-handler';

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,

    })
    .then(() => { console.log('Connected to db') })
    .catch(err => {
        console.log(err);
    })


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.get('/api/products', cors(), (req, res) => {
    res.send(data.products);
})



// app.get('/api/products', cors(), async (req, res) => {
//     //res.send(data.products);
//     await Product.deleteMany({});
//     const createdProducts = await Product.insertMany(data.products);
//     res.send({ createdProducts });
// })

// app.get('/api/products/slug/:slug', cors(), (req, res) => {

//     const product = data.products.find(x => x.slug === req.params.slug)
//     if (product) {
//         res.send(product);

//     } else {
//         res.status(404).send({ message: 'Product is not found' });
//     }
// })
// app.get('/api/products/:_id', cors(), (req, res) => {

//     const product = data.products.find(x => x._id === req.params.id)
//     if (product) {
//         res.send(product);

//     } else {
//         res.status(404).send({ message: 'Product is not found' });
//     }
// })

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server at connect at http://localhost:${port}`);
})