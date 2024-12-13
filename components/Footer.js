// components/Footer.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'; // Import FontAwesome icons
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-section">
        <h3>SHOP</h3>
        <ul>
          <li><Link href="#">Men's sneakers</Link></li>
          <li><Link href="#">Women's sneakers</Link></li>
          <li><Link href="#">Kid's sneakers</Link></li>
          <li><Link href="#">Sale items</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>ABOUT US</h3>
        <ul>
          <li><Link href="#">Our story</Link></li>
          <li><Link href="#">Our team</Link></li>
          <li><Link href="#">Press</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>CUSTOMER SERVICE</h3>
        <ul>
          <li><Link href="#">Shipping & Delivery</Link></li>
          <li><Link href="#">Returns & Exchanges</Link></li>
          <li><Link href="#">FAQs</Link></li>
          <li><Link href="#">Contact Us</Link></li>
        </ul>
      </div>
      <div className="footer-socials">
        <div className="social-icon-container">
          <Link href="#"><FontAwesomeIcon icon={faFacebookF} size="2x" /></Link> {/* Facebook Icon */}
        </div>
        <div className="social-icon-container">
          <Link href="#"><FontAwesomeIcon icon={faInstagram} size="2x" /></Link> {/* Instagram Icon */}
        </div>
        <div className="social-icon-container">
          <Link href="#"><FontAwesomeIcon icon={faTwitter} size="2x" /></Link> {/* Twitter Icon */}
        </div>
        <div className="social-icon-container">
          <Link href="https://share.hsforms.com/10e2076D8T5eAJ8q7uN7zlQsudj8">
            <img 
              src="https://th.bing.com/th/id/OIP.gUGkQsv8SjrIb-6SLWzOdgHaHa?rs=1&pid=ImgDetMain" 
              alt="Subscriber" 
              className="subscriber-icon" 
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
