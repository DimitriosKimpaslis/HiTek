import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BusinessIcon from '@mui/icons-material/Business';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Auth, Cart } from './App';
import supabase from '../Client';

const Navigation = () => {

   const [isNavOpen, setNavOpen] = useState(false);
   const { cart } = useContext(Cart)
   const { auth } = useContext(Auth)

   // Function to toggle the navbar collapse state
   const toggleNavbar = () => {
      setNavOpen(true);
   };

   const navigation = useRef(null);
   const button = useRef(null);

   useEffect(() => {
      function handleClickOutside(e) {

         if (navigation.current && !navigation.current.contains(e.target) && !button.current.contains(e.target)) {
            // The click was outside the div; hide the div
            setNavOpen(false);
         }
      }

      document.addEventListener('click', handleClickOutside);
      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
   }, []);

   const logout = async () => {
      await supabase.auth.signOut();
      window.location.reload();
   }

   return (
      <>
         <button ref={button} id='toggleButton' type="button" onClick={toggleNavbar} className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " >
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>

         <aside ref={navigation} className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isNavOpen ? '' : '-translate-x-full'} sm:translate-x-0 shadow-md`}>
            <div className="h-full px-3 py-4 overflow-y-auto bg-white ">
               <ul className="space-y-2 font-medium">
                  <li>
                     <NavLink to="/" className="flex items-center p-2 text-white rounded-lg bg-black hover:text-gray-300" onClick={() => setNavOpen(false)}>
                        <HomeIcon />
                        <span className="ml-3">HiTek</span>
                     </NavLink>
                  </li>
                  <li>
                     <NavLink to="/products" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100" onClick={() => setNavOpen(false)}>
                        <CategoryIcon />
                        <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                     </NavLink>
                  </li>
                  <li>
                     <NavLink to="/cart" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 " onClick={() => setNavOpen(false)}>
                        <ShoppingCartIcon />
                        <span className="flex-1 ml-3 whitespace-nowrap">Cart</span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">{cart.length}</span>
                     </NavLink>
                  </li>
                  <li>
                     <NavLink to="/about" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100" onClick={() => setNavOpen(false)}>
                        <BusinessIcon />
                        <span className="flex-1 ml-3 whitespace-nowrap">About us</span>
                     </NavLink>
                  </li>
                  {auth ?
                     <>
                        <li>
                           <NavLink to="/orders" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100" onClick={() => setNavOpen(false)}>
                              <ReceiptLongIcon />
                              <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
                           </NavLink>
                        </li>
                        <li>
                           <NavLink to="#" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-red-500  " onClick={logout}>
                              <LogoutIcon />
                              <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
                           </NavLink>
                        </li>
                     </>
                     :
                     <>
                        <li>
                           <NavLink to="/signin" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100" onClick={() => setNavOpen(false)}>
                              <LoginIcon />
                              <span className="flex-1 ml-3 whitespace-nowrap">Sign in</span>
                           </NavLink>
                        </li>
                        <li>
                           <NavLink to="/signup" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 " onClick={() => setNavOpen(false)}>
                              <PersonAddAltIcon />
                              <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                           </NavLink>
                        </li>
                     </>
                  }
               </ul>
            </div>
         </aside>

      </>

   )
}

export default Navigation