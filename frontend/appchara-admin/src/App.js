import {BrowserRouter, Route, Routes} from 'react-router-dom'
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
    <div className="App">
      <BrowserRouter>
        <ProductContextProvider>
          <div className="row g-0">
            <div className="col col-md-3">
              <SideNav/>
            </div>
            <div className="pages col col-md-9 main">
              <Notification/>
              <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/product' element={<Product/>}/>
                <Route path='/orders' element={<Order/>}/>
                <Route path='/report' element={<Report/>}/>
                <Route path='/pos' element={<POS/>}/>
              </Routes>
            </div>
          </div>
        </ProductContextProvider>  
      </BrowserRouter>
    </div>
  );
}

export default App;
