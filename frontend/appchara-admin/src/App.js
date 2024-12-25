import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Row, Col } from 'react-bootstrap';
import './App.css'


import Dashboard from './pages/Dashboard'; 
import Product from './pages/Product';
import Order from './pages/Order';
import Report from './pages/Report';
import POS from './pages/POS';
import SideNav from './component/SideNav';
import Notification from './component/Notification';
import { ProductContextProvider } from './context/ProductContext';

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <ProductContextProvider>
          <Row className='g-0'>
            <Col xs={3}>
              <SideNav/>
            </Col>
            <Col xs={9} className='pages main'>
              <Notification/>
              <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/product' element={<Product/>}/>
                <Route path='/orders' element={<Order/>}/>
                <Route path='/report' element={<Report/>}/>
                <Route path='/pos' element={<POS/>}/>
              </Routes>
            </Col>
          </Row>
        </ProductContextProvider>  
      </BrowserRouter>
    </div>
  );
}

export default App;
