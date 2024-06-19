import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import 'react-toastify/dist/ReactToastify.css'
import ProductScreen from './screens/ProductScreen'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import LinkContainer from 'react-router-bootstrap/LinkContainer'
import Badge from 'react-bootstrap/esm/Badge';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { ToastContainer } from 'react-toastify'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import SignupScreen from './screens/SingupScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderHistory from './screens/OrderHistory'
import ProfileScreen from './screens/ProfileScreen'


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  }

  return (
    <>
      <BrowserRouter>
        <div className='d-flex flex-column set-container'>
          <ToastContainer position='bottom-center' limit={1} />
          <header>
            <Navbar expand="lg" >
              <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>
                    AlangShipMart
                  </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className="me-auto w-100 justify-content-end">
                    <Link to='/cart' className="nav-link">
                      Cart{
                        cart.cartItems.length > 0 && (
                          <Badge pill bg="danger">
                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                          </Badge>
                        )
                      }
                    </Link>
                    {userInfo ? (<NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link className='dropdown-item'
                        to='#signout'
                        onClick={signoutHandler}>
                        Sign Out</Link>

                    </NavDropdown>) : (<Link to='/signin' className='nav-link'>Sign In </Link>)}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>
        </div>
        <main>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen></HomeScreen>}></Route>
              <Route path='/product/:slug' element={<ProductScreen></ProductScreen>}></Route>
              <Route path='/cart' element={<CartScreen></CartScreen>}></Route>
              <Route path='/signin' element={<SigninScreen></SigninScreen>}></Route>
              <Route path='/profile' element={<ProfileScreen></ProfileScreen>}></Route>
              <Route path='/signup' element={<SignupScreen></SignupScreen>}></Route>
              <Route path='/shipping' element={<ShippingAddressScreen></ShippingAddressScreen>}></Route>
              <Route path='/payment' element={<PaymentScreen></PaymentScreen>}></Route>
              <Route path='/placeorder' element={<PlaceOrderScreen></PlaceOrderScreen>}></Route>
              <Route path='/order/:id' element={<OrderScreen></OrderScreen>}></Route>
              <Route path='/orderhistory' element={<OrderHistory></OrderHistory>}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center bottom-50'>
            All are reserved
          </div>
        </footer>
      </BrowserRouter >
    </>
  )
}

export default App
