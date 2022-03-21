import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Items from './pages/Items'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Login from './pages/Login'
import Bills from './pages/Bills'
import Customers from './pages/Customers'

import 'antd/dist/antd.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/items' element={<ProtectedRoute><Items /></ProtectedRoute>} />
          <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/bills' element={<ProtectedRoute><Bills /></ProtectedRoute>} />
          <Route path='/customers' element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App

export function ProtectedRoute({ children }) {
  if (localStorage.getItem('pos-user')) {
    return children
  } else {
    return <Navigate to='/login' />
  }
}