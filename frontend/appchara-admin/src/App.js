import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'

import Dashboard from './pages/Dashboard'; 
import Product from './pages/Product';
import Purchase from './pages/Purchase';
import Report from './pages/Report';
import Sale from './pages/Sale';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/product' element={<Product/>}/>
            <Route path='/purchase' element={<Purchase/>}/>
            <Route path='/report' element={<Report/>}/>
            <Route path='/sale' element={<Sale/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
