import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1 - Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">FreshCart</h2>
            <p className="mt-2 text-sm text-gray-400">
              Your one-stop shop for fresh groceries, delivered fast!
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/about" className="hover:text-green-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-green-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-green-400">
                  Shop Now
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-green-400">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact & Socials */}
          <div>
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            <p className="text-sm text-gray-400 flex items-center justify-center md:justify-start gap-2">
              <Mail size={18} /> support@freshcart.com
            </p>
            <p className="text-sm text-gray-400 flex items-center justify-center md:justify-start gap-2 mt-2">
              <Phone size={18} /> +1 234 567 890
            </p>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          © {new Date().getFullYear()} FreshCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
