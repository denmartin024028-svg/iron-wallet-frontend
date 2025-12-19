import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Phone, Mail } from 'lucide-react';

function PublicFooter() {
  return (
    <footer className="py-16 px-6 md:px-12 bg-void border-t border-white/5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-white">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-7 h-7 text-gold" />
            <h3 className="text-2xl font-bold text-gold font-['Outfit']">
              Iron Wallet Investment
            </h3>
          </div>
          <p className="text-white/60">
            Secure and transparent crypto investment platform designed to grow your wealth with confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gold">
            Quick Links
          </h4>
          <ul className="space-y-3 text-white/70">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/products" className="hover:text-gold">Products</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gold">
            Contact
          </h4>
          <ul className="space-y-3 text-white/70">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-gold" />
              <a href="tel:+1 (505) 456-0334">+15054560334</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-gold" />
              <a href="mailto:support@ironwalletinvestment.com">
                info@ironwalletinvestments.com
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gold">
            Legal
          </h4>
          <p className="text-white/60">
            © 2025 Iron Wallet Investment <br />
            All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default PublicFooter;
