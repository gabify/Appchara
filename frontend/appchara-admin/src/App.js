import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'

import Dashboard from './pages/Dashboard'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
