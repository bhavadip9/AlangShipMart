//import { Link } from 'react-router-dom'
//import data from '../data'
import { useEffect, useReducer } from 'react'
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Product from '../Componet/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from "../Componet/LoadingBox"
import MessageBox from "../Componet/MessageBox"
import { getError } from '../utils';



const logger = (reducer) => {
    return (state, action) => {
        console.log('Prev State:', state);
        console.log('Action:', action);
        const nextState = reducer(state, action);
        console.log('Next State:', nextState);
        return nextState;
    };
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}


function HomeScreen() {

    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), { products: [], loading: true, error: "", });

    // const [products, setProducts] = useState([]);
    useEffect(() => {
        //Hear give link is call to backend and fetch the data for the front end run;
        // await axios.get('http://localhost:5000/api/products')
        //     .then((response) => {
        //         setProducts(response.data);
        //     }).catch((error) => {
        //         console.log(error);
        //     })
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            try {
                const result = await axios.get('http://localhost:5000/api/products');
                dispatch({ type: "FETCH_SUCCESS", payload: result.data });
            }
            catch (err) {

                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }

        };
        console.log("Hello6");
        fetchData();
    }, [])
    return (
        <div>
            <Helmet>
                <title>AlangShipMart</title>
            </Helmet>
            <h1>Featured Products </h1>
            <div className='productsCard'>
                {
                    loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    )
                        : (
                            <Row>{
                                products.map(product =>

                                (<Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
                                    <Product product={product}></Product>
                                </Col>)
                                )
                            }</Row>
                        )
                }

            </div>

        </div>
    )
}

export default HomeScreen
