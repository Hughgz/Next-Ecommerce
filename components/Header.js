'use client';  // Đảm bảo đây là Client Component

import Link from 'next/link';  // Sử dụng Link từ Next.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <nav className="bg-white shadow-md">
      <div className="header-second bg-gray-100 py-2">
        <div className="header-second-msg flex justify-center space-x-8 text-sm">
          <p><span>SECURE</span> PAYMENT THROUGH PAYPAL & VNPAY</p>
          <p><span>FREE</span> SHIPPING ON ORDERS OVER 1.000.000 VND</p>
          <p><span>100%</span> AUTHENTIC</p>
        </div>
      </div>
      
      <div className="header-container flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link className="header-main" href="/">
          <img
            src="https://res.cloudinary.com/dahzoj4fy/image/upload/v1733244037/fg6rbhwjrx2cyrq6uc7i.png"
            style={{ width: '100px', height: 'auto' }}
            alt="Logo"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          <li><Link href="/shop">SHOP</Link></li>
          <li><Link href="/contact">CONTACT US</Link></li>
          <li><Link href="/about">ABOUT US</Link></li>
        </ul>

        {/* Header Tools (Account, Wishlist, Cart, etc.) */}
        <div className="header-tools flex space-x-6">
          <Link href="/account">
            <div className="svg-icon">
            <FontAwesomeIcon icon={faUser} />
            </div>
          </Link>
          <Link href="/wishlist">
            <div className="svg-icon">
            <FontAwesomeIcon icon={faHeart} />
            </div>
          </Link>
          <Link href="/cart">
            <div className="svg-icon">
            <FontAwesomeIcon icon={faShoppingCart} />
            </div>
          </Link>
          {/* Hamburger Icon */}
          <div className="burger">
          <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="header-search py-2 px-6">
        <div className="input-wrapper flex items-center bg-gray-100 p-2 rounded-lg">
        <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            id="search"
            placeholder="Search..."
            name="search"
            className="w-full bg-transparent border-none focus:outline-none"
          />
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="header-line bg-gray-200 h-1"></div>
    </nav>
  );
}

export default Header;
