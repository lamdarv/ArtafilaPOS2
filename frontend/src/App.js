import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import 'antd/dist/antd.min.css';
import Dash from './pages/dash/Dash';
import Products from './pages/products/Products';
import Cart from './pages/order/cart/Cart'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Customers from './pages/customers/Customers';
import '../src/App.css'
import Order from './pages/order/Order';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/home" element={
              <Dash />
            } />
          <Route path="/products" element={
              <Products />
            } />
          <Route path="/cart" element={
              <Cart />
            } />
            <Route path="/order" element={
              <Order />
            } />
            <Route path="/customers" element={
              <Customers />
            } />
            <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
  );
}

export default App;