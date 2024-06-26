import { useContext, useEffect, useState } from 'react'
//import CheckoutStep from '../Componet/CheckoutStep'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import { Store } from '../Store'

const PaymentScreen = () => {
    const navigate = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const {
        cart: {
            shippingAddress, paymentMethod
        }
    } = state;
    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'googlepay')
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder')
    }
    return (
        <div>
            {/* <CheckoutStep step1 step2 step3></CheckoutStep> */}
            <div className='container small-container'>
                <Helmet>
                    <title>Payment Method</title>
                </Helmet>
                <h1 className='my-3'>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <div className='mb-3'>
                        <Form.Check
                            type="radio"
                            id="googlepay"
                            label="Google Pay"
                            value="googlepay"
                            checked={paymentMethodName === 'googlepay'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </div>
                    <div className='mb-3'>
                        <Form.Check
                            type="radio"
                            id="paytm"
                            label="Paytm"
                            value="paytm"
                            checked={paymentMethodName === 'paytm'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </div>
                    <div className='mb-3'>
                        <Button type='submit'>Continue</Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}

export default PaymentScreen

