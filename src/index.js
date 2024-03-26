import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Home from './components/Home';
import Products from './components/Products';
import Signin from './components/Signin';
import Signup from './components/Signup';
import CartPage from './components/Cart';
import About from './components/About';
import ProductPage from './components/ProductPage';
import Orders from './components/Orders';
import ProtectedRoutes from './useful/ProtectedRoutes';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path='products/:id' element={<ProductPage />} />
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='about' element={<About />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='orders' element={<Orders />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
