import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/userContext';
import { cartContext } from '../../Context/cartContext';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const { isLogin,setLogin } = useContext(userContext);
  let {cartNumber}= useContext(cartContext)

  let navaiget= useNavigate()

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMobileMenuOpen(false); // close menu on mobile after click
  };

  function handlelogOut(){
    localStorage.removeItem('UserToken')
    setLogin(null)
    navaiget('/login')
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Toggle */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          {/* Logo & Links */}
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <h1 className="text-white font-bold text-2xl">
              <Link to="/" onClick={() => handleLinkClick('/')}>
                <i className="fa-solid fa-e"></i> - <i className="fa-solid fa-c"></i>ommerce
              </Link>
            </h1>

            <div className="hidden sm:ml-6 sm:flex space-x-4">
              <Link
                to="/"
                onClick={() => handleLinkClick('/')}
                className={`${
                  activeLink === '/' ? 'bg-gray-900' : 'text-gray-300 hover:bg-gray-700'
                } text-white px-3 py-2 rounded-md text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                to="/cart"
                onClick={() => handleLinkClick('/cart')}
                className={`${
                  activeLink === '/cart' ? 'bg-gray-900' : 'text-gray-300 hover:bg-gray-700'
                } text-white px-3 py-2 rounded-md text-sm font-medium relative`}
              >
                Cart
                <span className='absolute top-[-3px] start-9 rounded-full bg-gray-300 text-black px-2'>{cartNumber}</span>
              </Link>
              <Link
                to="/brand"
                onClick={() => handleLinkClick('/brand')}
                className={`${
                  activeLink === '/brand' ? 'bg-gray-900' : 'text-gray-300 hover:bg-gray-700'
                } text-white px-3 py-2 rounded-md text-sm font-medium`}
              >
                Brand
              </Link>
              <Link
                to="/about"
                onClick={() => handleLinkClick('/about')}
                className={`${
                  activeLink === '/about' ? 'bg-gray-900' : 'text-gray-300 hover:bg-gray-700'
                } text-white px-3 py-2 rounded-md text-sm font-medium`}
              >
                About
              </Link>
              <Link
                to="/allorders"
                onClick={() => handleLinkClick('/about')}
                className={`${
                  activeLink === '/about' ? 'bg-gray-900' : 'text-gray-300 hover:bg-gray-700'
                } text-white px-3 py-2 rounded-md text-sm font-medium`}
              >
                All Orders
              </Link>
            </div>
          </div>

          {/* Profile */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <Link to={'/wishlist'}><i class="fa-solid fa-heart text-2xl text-white m-0 hover:text-red-500 transition-all duration-300 ease hover:cursor-pointer"></i></Link>

            <div className="relative ml-3">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Open user menu</span>
                <i class="fa-solid fa-user-large text-xl text-gray-700 bg-gray-200 rounded-full p-2 transition-all duration-300 ease hover:cursor-pointer hover:text-blue-500"></i>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black/5">
                  <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer">Sign in</Link>
                  <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer">Sign up</Link>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:cursor-pointer" onClick={()=>{handlelogOut()}}>LogOut</button>
                </div>
              )}
            </div>
            
          </div>
          
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {['/', '/about', '/cart', '/brand' , '/allorders'].map((path) => (
              <Link
                key={path}
                to={path}
                onClick={() => handleLinkClick(path)}
                className={`${
                  activeLink === path ? 'bg-gray-900' : 'text-gray-300 hover:bg-gray-700'
                } block px-3 py-2 rounded-md text-base font-medium text-white`}
              >
                {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
