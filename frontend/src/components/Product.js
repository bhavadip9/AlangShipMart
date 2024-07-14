import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import Rating from './Rating';


function Product(props) {
  const { product } = props;



  return (
    <Card>
      {/* <Link to={`/product/${product.slug}`}>
        <img src={product.image} className=" w-100 h-100" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title className='productname'>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>₹{product.price}</Card.Text>

      </Card.Body> */}
      <div className="product-card">
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} className=" w-100 h-100" alt={product.name} />
        </Link>
        <div className="product-details">
          <h2>{product.title}</h2>
          <p><strong>ISBN:</strong> {product.isbn}</p>
          <p><strong>Author:</strong> {product.author}</p>
          <p><strong>Publication:</strong> {product.publication}</p>
          {/* <p><strong>year:</strong> {book.year}</p> */}

          <Rating rating={product.rating} numReviews={product.numReviews} />
        </div>
      </div>
    </Card>
  );
}
export default Product;
