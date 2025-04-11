import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-teal-500" />
              <span className="text-2xl font-bold text-white">SAMA</span>
            </div>
            <p className="mt-4 text-gray-400">
              Empowering you to take control of your health journey with comprehensive digital healthcare solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Services</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/pharmacy" className="text-gray-300 hover:text-white">E-Pharmacy</a></li>
              <li><a href="/symptoms" className="text-gray-300 hover:text-white">Symptom Checker</a></li>
              <li><a href="/doctors" className="text-gray-300 hover:text-white">Find Doctors</a></li>
              <li><a href="/articles" className="text-gray-300 hover:text-white">Health Articles</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
              <li><a href="/careers" className="text-gray-300 hover:text-white">Careers</a></li>
              <li><a href="/press" className="text-gray-300 hover:text-white">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-white">Terms of Service</a></li>
              <li><a href="/cookies" className="text-gray-300 hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} SAMA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}