import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.css'
import logo from '../../../assets/download.png'
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react'
import { useCart } from '../../context/useCart'
import { useToast } from '../../context/useToast'
import { motion, AnimatePresence } from 'framer-motion'
import AuthModal from '../Auth/AuthModal'

function Navbar() {
  const { cartCount, setIsCartOpen } = useCart()
  const { showToast } = useToast()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const handleAuthChange = () => {
      const savedUser = localStorage.getItem('user');
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange'));
    showToast('Logged out successfully!', 'success');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={style.header}>
        {/* Mobile Menu Toggle */}
        <button 
          className={style.mobileMenuBtn}
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className={style.logoContainer} >
          <Link to="/">
            <img className={style.logo} src={logo} alt="ThriftStore Logo" />
          </Link>
        </div>

        {/* Nav Links (Desktop) */}
        <ul className={`${style.navlinks} ${isMobileMenuOpen ? style.navActive : ''}`}>
          <li>
            <Link to="/" className={style.navlink} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
          </li>

          {/* Products Dropdown */}
          <li className={style.dropdownContainer}>
            <Link to='/products' className={style.navlink} onClick={() => setIsMobileMenuOpen(false)}>
              Products
            </Link>
            <ul className={style.dropdownMenu}>
              <li className={style.dropdownItem}>
                <Link to="/products/sneakers" className={style.dropdownLink} onClick={() => setIsMobileMenuOpen(false)}>Sneakers</Link>
              </li>
              <li className={style.dropdownItem}>
                <Link to="/products/jogers" className={style.dropdownLink} onClick={() => setIsMobileMenuOpen(false)}>Jogers</Link>
              </li>
              <li className={style.dropdownItem}>
                <Link to="/products/converse" className={style.dropdownLink} onClick={() => setIsMobileMenuOpen(false)}>Converse</Link>
              </li>
              <li className={style.dropdownItem}>
                <Link to="/products/slides" className={style.dropdownLink} onClick={() => setIsMobileMenuOpen(false)}>Slides</Link>
              </li>
              <li className={style.dropdownItem}>
                <Link to="/products/urbanshoes" className={style.dropdownLink} onClick={() => setIsMobileMenuOpen(false)}>UrbanShoes</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/getallaccessories" className={style.navlink} onClick={() => setIsMobileMenuOpen(false)}>
              Accessories
            </Link>
          </li>

          <li>
            <Link to="/about" className={style.navlink} onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className={style.authbuttons}>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer hover:opacity-70 transition"
          >
            <ShoppingCart color="#000000" strokeWidth={1.75}/>
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
              >
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {cartCount}
                </motion.span>
              </motion.div>
            )}
          </button>
          
          {user ? (
            <div className="relative group cursor-pointer flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="hidden lg:block text-sm font-medium text-gray-700">
                {user.username}
              </span>
              
              {/* Dropdown for logged in user */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-4 py-2 border-b border-gray-100 mb-2">
                  <p className="text-sm font-semibold text-gray-800">{user.username}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setIsAuthModalOpen(true)} className="cursor-pointer hover:opacity-70 transition flex items-center gap-2">
              <User color="#000000" strokeWidth={1.75} />
              <span className="hidden lg:block text-sm font-medium text-gray-700">Sign In</span>
            </button>
          )}
        </div>
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}

export default Navbar

