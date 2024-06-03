import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import Navbar from 'react-bootstrap/Navbar';

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import LinkContainer from 'react-router-bootstrap/LinkContainer'
import Badge from 'react-bootstrap/esm/Badge';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';


function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <>
      <BrowserRouter>
        <div className='d-flex flex-column set-container'>
          <header>
            <Navbar >
              <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>
                    AlangShipMart
                  </Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto">
                  <Link to='/cart' className="nav-link">
                    Cart{
                      cart.cartItems.length > 0 && (
                        <Badge pill bg="danger">
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      )
                    }
                  </Link>
                </Nav>
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
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center bottom-50'>
            All are reserved
          </div>
        </footer>
      </BrowserRouter>
    </>
  )
}

export default App
