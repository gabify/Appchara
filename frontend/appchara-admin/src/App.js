import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import './App.css'

import LoginSignup from './pages/Login';
import Main from './pages/MainRoutes';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigate to='/main/dashboard'/>} />
            <Route path='/main/*' element={user ? <Main/> : <Navigate to="/login" />}/>
            <Route path='/login' element={!user ? <LoginSignup/> : <Navigate to="/main/dashboard" />}/>
        </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App;
