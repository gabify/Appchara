import { Routes, Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import Dashboard from './Dashboard'
import Product from './Product';
import Order from './Order';
import Report from './Report';
import POS from './POS';
import SideNav from '../component/SideNav';
import Notification from '../component/Notification';
import { ProductContextProvider } from '../context/ProductContext';

const MainRoutes = () => {
    return (
        <ProductContextProvider> 
            <Row className='g-0'>
                <Col xs={3}>
                    <SideNav/>
                </Col>
                <Col xs={9} className='pages main'>
                <Notification/>
                <Routes>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/product' element={<Product/>}/>
                    <Route path='/orders' element={<Order/>}/>
                    <Route path='/report' element={<Report/>}/>
                    <Route path='/pos' element={<POS/>}/>
                </Routes>
                </Col>
          </Row>
        </ProductContextProvider>
     );
}
 
export default MainRoutes;