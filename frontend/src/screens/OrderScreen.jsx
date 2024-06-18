import { useContext, useEffect, useReducer } from 'react'
import LoadingBox from '../Componet/LoadingBox'
import MessageBox from '../Componet/MessageBox'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';
//import Button from 'react-bootstrap/esm/Button';
import GooglePayButton from "@google-pay/button-react"

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}



const OrderScreen = () => {
    const { state } = useContext(Store)
    const { userInfo } = state;
    const navigate = useNavigate()
    //const { id } = useParams();
    const params = useParams();
    const { id: orderId } = params
    const [{ loding, error, order }, dispatch] = useReducer(reducer, {
        loding: true,
        order: {},
        error: '',
    })
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });

                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer${userInfo.token}` }
                })
                //console.log(data);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });



            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        }
        if (!userInfo) {
            return navigate('/login')
        }
        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder()
        }
    }, [order, userInfo, orderId, navigate])
    return (
        loding ?
            (<LoadingBox>Heeeeeee</LoadingBox>)
            : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) :
                <div>
                    <Helmet>
                        <title>Order </title>
                    </Helmet>
                    <h1 className="my-3">Order </h1>

                    {/* <Row>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                <strong>Address: </strong> {order.shippingAddress.address},
                                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                ,{order.shippingAddress.country}
                                &nbsp;

                            </Card.Text>
                            {order.isDelivered ? (
                                <MessageBox variant="success">
                                    Delivered at {order.deliveredAt}
                                </MessageBox>
                            ) : (
                                <MessageBox variant="danger">Not Delivered</MessageBox>
                            )}
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method:</strong> {order.paymentMethod}
                            </Card.Text>
                            {order.isPaid ? (
                                <MessageBox variant="success">
                                    Paid at {order.paidAt}
                                </MessageBox>
                            ) : (
                                <MessageBox variant="danger">Not Paid</MessageBox>
                            )}
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            <ListGroup variant="flush">
                                {order.orderItems.map((item) => (
                                    <ListGroup.Item key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="img-fluid rounded img-thumbnail"
                                                ></img>{' '}
                                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <span>{item.quantity}</span>
                                            </Col>
                                            <Col md={3}>${item.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong> Order Total</strong>
                                        </Col>
                                        <Col>
                                            <strong>${order.totalPrice.toFixed(2)}</strong>
                                        </Col>
                                        <Col>
                                            <GooglePayButton
                                                environment="TEST"
                                                paymentRequest={{
                                                    apiVersion: 2,
                                                    apiVersionMinor: 0,
                                                    allowedPaymentMethods: [
                                                        {
                                                            type: 'CARD',
                                                            parameters: {
                                                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                                allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                            },
                                                            tokenizationSpecification: {
                                                                type: 'PAYMENT_GATEWAY',
                                                                parameters: {
                                                                    gateway: 'example',
                                                                    gatewayMerchantId: 'exampleGatewayMerchantId',
                                                                },
                                                            },
                                                        },
                                                    ],
                                                    merchantInfo: {
                                                        merchantId: '12345678901234567890',
                                                        merchantName: 'Demo Merchant',
                                                    },
                                                    transactionInfo: {
                                                        totalPriceStatus: 'FINAL',
                                                        totalPriceLabel: 'Total',
                                                        totalPrice: '100.00',
                                                        currencyCode: 'INR',
                                                        countryCode: 'IN',
                                                    },
                                                }}
                                                onLoadPaymentData={paymentRequest => {
                                                    console.log('load payment data', paymentRequest);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}
                </div>
    )

}

export default OrderScreen
