import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authentication";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setMobileMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { name: "Children", path: "/children" },
    { name: "Volunteer", path: "/volunteer" },
    { name: "Stories", path: "/stories" },
    { name: "Donate", path: "/donate" },
  ];

  const adminLinks = [
    { name: "Overview", path: "/dashboard" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? "py-3 glass" : "py-6 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex items-center space-x-2 group"
        >
          <div className="p-2 bg-indigo-600 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-200">
            <HeartIcon className="h-6 w-6 text-white" />
          </div>
          <span className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-slate-900' : 'text-indigo-900'}`}>
            Zam<span className="text-indigo-600">Care</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 ${location.pathname === link.path ? "text-indigo-600" : "text-slate-600"
                }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="h-6 w-px bg-slate-200 mx-4" />

          {user ? (
            <div className="flex items-center space-x-4">
              {adminLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-slate-100 ${location.pathname === link.path ? "text-slate-900" : "text-slate-500"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-sm"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="bg-indigo-600 text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              Partner Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 space-y-4">
              {[...navLinks, ...(user ? adminLinks : [])].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-lg font-bold text-slate-800 hover:text-indigo-600"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-100"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-center shadow-lg shadow-indigo-100"
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
