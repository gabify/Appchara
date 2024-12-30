import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import './App.css'

import LoginSignup from './pages/Login';
import Main from './pages/MainRoutes';

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigate to='/main/dashboard'/>} />
            <Route path='/main/*' element={<Main/>}/>
            <Route path='/login' element={<LoginSignup/>}/>
        </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App;
