/* eslint-disable react/prop-types */
//import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Rating from './Rating'

const Product = (props) => {
    const { product } = props;
    return (
        <div>
            <Card className='productCard'>
                <Link to={`product/${product.slug}`} className='card-img-top' alt={`product.name`}>
                    <img src={product.image} alt={product.name} />
                </Link>
                <Card.Body className='productInfo'>
                    <Link to={`product/${product.slug}`} alt={`product.name`}>
                        <Card.Title>
                            {product.name}
                        </Card.Title>
                    </Link>
                    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                    <Card.Text>₹{product.price}</Card.Text>
                    {/* <Button>Add to cart</Button> */}
                </Card.Body>

            </Card>
        </div>
    )
}

export default Product;
