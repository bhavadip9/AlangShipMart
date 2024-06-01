import express from 'express';
import data from './data.js';
import cors from "cors"

const app = express();

app.get('/api/products', cors(), (req, res) => {
    res.send(data.products);
})

app.get('/api/products/slug/:slug', cors(), (req, res) => {

    const product = data.products.find(x => x.slug === req.params.slug)
    if (product) {
        res.send(product);

    } else {
        res.status(404).send({ message: 'Product is not found' });
    }
})
app.get('/api/products/:_id', cors(), (req, res) => {

    const product = data.products.find(x => x._id === req.params.id)
    if (product) {
        res.send(product);

    } else {
        res.status(404).send({ message: 'Product is not found' });
    }
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server at connect at http://localhost:${port}`);
})