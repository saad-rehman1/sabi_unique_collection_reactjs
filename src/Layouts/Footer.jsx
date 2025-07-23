import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaTiktok,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-pink-200 text-white pt-12 pb-6 px-6 md:px-20">
      {/* Top Section */}
      <div className="grid md:grid-cols-4 gap-10 border-b border-gray-700 pb-8">
        {/* Sabi Unique Collection */}
        <div>
          <h2 className="text-xl font-bold mb-4">Sabi Unique Collection</h2>
          <p className="text-sm text-pink-600 mb-4">
            Discover luxury fashion at Sabi Unique Collection. We bring you premium quality clothing and accessories, crafted with excellence and styled for the modern wardrobe.
          </p>
          <p className="text-sm">📧 info@sabiuniquecollection.com</p>
          <p className="text-sm">📞 +971 567413806</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-pink-600">
            <li>Shipping Info</li>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Track Order</li>
          </ul>
        </div>

        {/* Collections */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Collections</h3>
          <ul className="space-y-2 text-sm text-pink-600">
            <li>Latest Collection</li>
            <li>Unstitched</li>
            <li>New Arrivals</li>
            <li>Brands</li>
          </ul>
        </div>

        {/* Shipping/Returns */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Service Info</h3>
          <ul className="space-y-2 text-sm text-pink-600">
            <li><strong>Packaging/Shipping:</strong> Sturdy & smart for the package's safe journey</li>
            <li><strong>Exchange & Returns:</strong> 07 days from purchase</li>
            <li><strong>Delivery Commitment:</strong> We ensure correct delivery</li>
            <li><strong>Replace & Refund:</strong> Not happy? We’ve got your back</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-pink-600">© 2025 Sabi Unique Collection. All rights reserved.</p>

        {/* Social Media Icons */}
        <div className="flex gap-4 text-white">
          <a href="#"><FaFacebookF className="hover:text-pink-800 transition duration-300" /></a>
          <a href="#"><FaInstagram className="hover:text-pink-800 transition duration-300" /></a>
          <a href="#"><FaTwitter className="hover:text-pink-800 transition duration-300" /></a>
          <a href="#"><FaPinterest className="hover:text-pink-800 transition duration-300" /></a>
          <a href="#"><FaTiktok className="hover:text-pink-800 transition duration-300" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
