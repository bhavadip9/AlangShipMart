import React from 'react'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const CheckoutStep = () => {
    return (
        <>
            <Row className="checkout-steps">
                <Col className={props.steps1 ? 'active' : ''}>Sign-In</Col>
                <Col className={props.steps2 ? 'active' : ''}>Shipping</Col>
                <Col className={props.steps3 ? 'active' : ''}>Payment</Col>
                <Col className={props.steps4 ? 'active' : ''}>Place Order</Col>
            </Row>

        </>
    )
}

export default CheckoutStep
