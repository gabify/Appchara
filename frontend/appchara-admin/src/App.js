import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'


import Dashboard from './pages/Dashboard'; 
import Product from './pages/Product';
import Purchase from './pages/Purchase';
import Report from './pages/Report';
import Sale from './pages/Sale';
import SideNav from './component/SideNav';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="row g-0">
          <div className="col col-md-3 vh-100">
            <SideNav/>
          </div>
          <div className="pages col col-md-9">
            <Navbar/>
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/product' element={<Product/>}/>
              <Route path='/purchase' element={<Purchase/>}/>
              <Route path='/report' element={<Report/>}/>
              <Route path='/sale' element={<Sale/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
