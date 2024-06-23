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
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { toast, ToastContainer } from 'react-toastify'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import SignupScreen from './screens/SingupScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderHistory from './screens/OrderHistory'
import ProfileScreen from './screens/ProfileScreen'
import SearchScreen from './screens/SearchScreen'
import Button from 'react-bootstrap/esm/Button'
import { getError } from './utils'
import axios from 'axios'
import SearchBox from './Componet/SearchBox'
import ProtectedRoute from './Componet/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './Componet/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen'


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin'
  }

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const [categories, setCategorise] = useState([]);

  useEffect(() => {
    const featchCategories = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/categories`)
        setCategorise(data)
        //console.log(data)

      } catch (error) {
        toast.error(getError(error))
      }
    };
    featchCategories();
  }, [])

  return (
    <>
      <BrowserRouter>
        <div className={sidebarIsOpen ? 'd-flex flex-column ' : 'd-flex flex-column set-container'}>
          <ToastContainer position='bottom-center' limit={1} />
          <header>
            <Navbar expand="lg" >
              <Container>
                <Button variant='light'
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}><i className='fas fa-bars'></i></Button>
                <LinkContainer to="/">
                  <Navbar.Brand>
                    AlangShipMart
                  </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                  <SearchBox></SearchBox>
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
                    {userInfo && userInfo.isAdmin && (
                      <NavDropdown title="Admin" id="admin-nav-dropdown">
                        <LinkContainer to="/admin/dashboard">
                          <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/products">
                          <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/order">
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/user">
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>
        </div>
        <div className={
          sidebarIsOpen ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column' :
            'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }>
          <Nav className='flex-column text-black w-100 p-2 mt-3'>
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <Link to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}>{category}</Link>
              </Nav.Item>
            ))}

          </Nav>
        </div>
        <main>

          <Container className={sidebarIsOpen ? 'active-cont ' : ''}>
            <Routes>
              <Route path='/' element={<HomeScreen></HomeScreen>}></Route>
              <Route path='/product/:slug' element={<ProductScreen></ProductScreen>}></Route>
              <Route path='/cart' element={<CartScreen></CartScreen>}></Route>
              <Route path='/signin' element={<SigninScreen></SigninScreen>}></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route path='/signup' element={<SignupScreen></SignupScreen>}></Route>
              <Route path='/shipping' element={<ShippingAddressScreen></ShippingAddressScreen>}></Route>
              <Route path='/payment' element={<PaymentScreen></PaymentScreen>}></Route>
              <Route path='/placeorder' element={<PlaceOrderScreen></PlaceOrderScreen>}></Route>
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path='/orderhistory' element={
                <ProtectedRoute >
                  <OrderHistory />
                </ProtectedRoute>
              }></Route>
              {/* <Route path='/search' element={<SearchScreen></SearchScreen>}></Route> */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
            </Routes>
          </Container>
        </main >
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
