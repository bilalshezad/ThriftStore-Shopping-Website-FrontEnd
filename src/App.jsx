import React, { useEffect, useState } from 'react'
import {Route, Routes, useLocation} from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Footer from './components/footer/footer';
import Sneaker from './pages/Sneaker/Sneaker';
import Jogers from './pages/jogers/Jogers';
import Converse from './pages/Converse/Converse';
import Slides from './pages/Slides/Slides';
import UrbanShoes from './pages/UrbanShoes/UrbanShoes';
import ProductDetail from './pages/ProductDetailPage/ProductDetail';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import CartSidebar from './components/CartSidebar';
import Accessories from './pages/Accessories/Accessories';
import About from './pages/About/About';
import { ShieldAlert, LogOut } from 'lucide-react';

function App() {
  const location = useLocation();
  const [isDeleted, setIsDeleted] = useState(false);

  // REAL-TIME SESSION VALIDATION (Logout if deleted)
  useEffect(() => {
    const validateSession = async () => {
      const savedUser = localStorage.getItem('user');
      if (!savedUser) return;

      try {
        const user = JSON.parse(savedUser);
        if (user.id) {
          const response = await fetch(`https://thrift-store-shopping-website-backe.vercel.app/user/check-existence/${user.id}`);
          
          if (response.status === 404) {
            // USER DELETED - SHOW STYLISH ALERT
            setIsDeleted(true);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.dispatchEvent(new Event('authChange'));
          }
        }
      } catch (error) {
        console.error("Session validation failed:", error);
      }
    };

    const interval = setInterval(validateSession, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
      <ToastProvider>
      <CartProvider>
      <Navbar/>
      <CartSidebar/>
      
      <AnimatePresence>
        {isDeleted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              className="w-full max-w-md bg-white rounded-[2.5rem] p-10 text-center space-y-6 shadow-2xl border border-gray-100"
            >
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 animate-pulse">
                  <ShieldAlert size={40} />
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Access Revoked</h2>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  Your account has been permanently removed by the administrator. Any active sessions have been terminated for security reasons.
                </p>
              </div>

              <button 
                onClick={() => window.location.href = '/'}
                className="w-full py-4 bg-black text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
              >
                Acknowledge & Exit
                <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Error Code: SEC_USER_TERMINATED</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/products/sneakers' element={<Sneaker/>}/>
          <Route path='/products/jogers' element={<Jogers/>}/>
          <Route path='/products/converse' element={<Converse/>}/>
          <Route path='/products/slides' element={<Slides/>}/>
          <Route path='/products/urbanshoes' element={<UrbanShoes/>}/>
          <Route path='/products/:id' element={<ProductDetail/>}/>
          <Route path='/getallaccessories' element={<Accessories/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </AnimatePresence>
      <div className='pt-15 bg-black'>
      <Footer/>
      </div>
      </CartProvider>
      </ToastProvider>
  )
}

export default App
