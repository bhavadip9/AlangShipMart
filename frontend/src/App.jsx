import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import Navbar from 'react-bootstrap/Navbar';

import Container from 'react-bootstrap/Container'
import LinkContainer from 'react-router-bootstrap/LinkContainer'


function App() {


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
              </Container>
            </Navbar>
          </header>
        </div>
        <main>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen></HomeScreen>}></Route>
              <Route path='/product/:slug' element={<ProductScreen></ProductScreen>}></Route>
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
