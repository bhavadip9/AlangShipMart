import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

// orderRouter.get(
//     '/',
//     isAuth,
//     isAdmin,
//     expressAsyncHandler(async (req, res) => {
//         const orders = await Order.find().populate('user', 'name');
//         res.send(orders);
//     })
// );

// orderRouter.post(
//     '/',
//     isAuth,
//     expressAsyncHandler(async (req, res) => {

//         const newOrder = new Order({
//             orderItems: req.body.orderItems.map((x) => { return { ...x, product: x._id } }),
//             shippingAddress: req.body.shippingAddress,
//             paymentMethod: req.body.paymentMethod,
//             itemsPrice: req.body.itemsPrice,
//             shippingPrice: req.body.shippingPrice,
//             taxPrice: req.body.taxPrice,
//             totalPrice: req.body.totalPrice,
//             user: req.user._id,
//         });
//         console.log("Heeeeeee")
//         const order = await newOrder.save();
//         res.status(201).send({ message: 'New Order Created', order });
//         console.log("Create database")
//     })
// );
orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            // Log the incoming request body for debugging
            console.log('Request Body:', JSON.stringify(req.body, null, 20));

            const newOrder = new Order({
                orderItems: req.body.orderItems.map((item) => {
                    // Log each order item for debugging
                    console.log('Order Item:', JSON.stringify(item, null, 20));
                    return { ...item, product: item._id };
                }),
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
            });

            console.log("Before saving the order");
            const order = await newOrder.save();
            console.log("After saving the order");

            res.status(201).send({ message: 'New Order Created', order });
        } catch (error) {
            // Log the error
            console.error("Error creating order:", error);
            res.status(500).send({ message: 'Error creating order', error });
        }
    })
);


// orderRouter.get(
//     '/summary',
//     isAuth,
//     isAdmin,
//     expressAsyncHandler(async (req, res) => {
//         const orders = await Order.aggregate([
//             {
//                 $group: {
//                     _id: null,
//                     numOrders: { $sum: 1 },
//                     totalSales: { $sum: '$totalPrice' },
//                 },
//             },
//         ]);
//         const users = await User.aggregate([
//             {
//                 $group: {
//                     _id: null,
//                     numUsers: { $sum: 1 },
//                 },
//             },
//         ]);
//         const dailyOrders = await Order.aggregate([
//             {
//                 $group: {
//                     _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
//                     orders: { $sum: 1 },
//                     sales: { $sum: '$totalPrice' },
//                 },
//             },
//             { $sort: { _id: 1 } },
//         ]);
//         const productCategories = await Product.aggregate([
//             {
//                 $group: {
//                     _id: '$category',
//                     count: { $sum: 1 },
//                 },
//             },
//         ]);
//         res.send({ users, orders, dailyOrders, productCategories });
//     })
// );


orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id });
        res.send(orders);
    })
);



orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        console.log("data is found")
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);

// orderRouter.put(
//     '/:id/deliver',
//     isAuth,
//     expressAsyncHandler(async (req, res) => {
//         const order = await Order.findById(req.params.id);
//         if (order) {
//             order.isDelivered = true;
//             order.deliveredAt = Date.now();
//             await order.save();
//             res.send({ message: 'Order Delivered' });
//         } else {
//             res.status(404).send({ message: 'Order Not Found' });
//         }
//     })
// );

// orderRouter.put(
//     '/:id/pay',
//     isAuth,
//     expressAsyncHandler(async (req, res) => {
//         const order = await Order.findById(req.params.id).populate(
//             'user',
//             'email name'
//         );
//         if (order) {
//             order.isPaid = true;
//             order.paidAt = Date.now();
//             order.paymentResult = {
//                 id: req.body.id,
//                 status: req.body.status,
//                 update_time: req.body.update_time,
//                 email_address: req.body.email_address,
//             };

//             const updatedOrder = await order.save();
//             mailgun()
//                 .messages()
//                 .send(
//                     {
//                         from: 'Alang <alang@mg.alangshipmart.com>',
//                         to: `${order.user.name} <${order.user.email}>`,
//                         subject: `New order ${order._id}`,
//                         html: payOrderEmailTemplate(order),
//                     },
//                     (error, body) => {
//                         if (error) {
//                             console.log(error);
//                         } else {
//                             console.log(body);
//                         }
//                     }
//                 );

//             res.send({ message: 'Order Paid', order: updatedOrder });
//         } else {
//             res.status(404).send({ message: 'Order Not Found' });
//         }
//     })
// );

// orderRouter.delete(
//     '/:id',
//     isAuth,
//     isAdmin,
//     expressAsyncHandler(async (req, res) => {
//         const order = await Order.findById(req.params.id);
//         if (order) {
//             await order.remove();
//             res.send({ message: 'Order Deleted' });
//         } else {
//             res.status(404).send({ message: 'Order Not Found' });
//         }
//     })
// );

export default orderRouter;
