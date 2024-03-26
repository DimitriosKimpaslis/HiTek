import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { createContext, useEffect, useState } from 'react';
import supabase from '../Client';

export const Cart = createContext()
export const Auth = createContext()

function App() {
  const [cart, setCart] = useState([])
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('cart')){
      setCart(JSON.parse(localStorage.getItem('cart')))
      window.localStorage.removeItem('cart')
    }
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (user) {
        setAuth(true)
      }
    }
    getUser()
  }, [])

  return (
    <Auth.Provider value={{ auth, setAuth }}>
      <Cart.Provider value={{ cart, setCart }}>
        <div>
          <Navigation />
          <div className='px-2 sm:ml-64 bg-gray-50 min-h-screen'>
            <Outlet />
          </div>
        </div>
      </Cart.Provider>
    </Auth.Provider>

  );
}

export default App;
