import React, { useState } from "react";
import { Heart, Menu, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/login', { replace: false });
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-teal-600" />
              <span className="text-2xl font-bold text-gray-900">SAMA</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/epharmacy">E-Pharmacy</Link>
            <Link to="/symptoms-checker">Symptom Checker</Link>
            <Link to="/news">Health Articles</Link>
            <Link to="/doctors">Find Doctors</Link>
            <Link to="/careers">Careers</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <Link 
              to="/login"
              className="p-2 hover:bg-gray-100 rounded-full inline-flex items-center justify-center"
            >
              <User className="h-5 w-5 text-gray-600" />
            </Link>
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setOpen(!open)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col space-y-2">
            <Link to="/epharmacy" className="block py-2">E-Pharmacy</Link>
            <Link to="/symptoms-checker" className="block py-2"><b>Symptom Checker</b></Link>
            <Link to="/news" className="block py-2">Health Articles</Link>
            <Link to="/doctors" className="block py-2">Find Doctors</Link>
            <Link to="/careers" className="block py-2">Careers</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
