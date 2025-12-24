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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setMobileMenuOpen(false);
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled ? "py-4 glass mx-4 mt-4 rounded-3xl" : "py-8 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex items-center space-x-3 group"
        >
          <div className="p-2.5 bg-indigo-600 rounded-2xl group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-indigo-200">
            <HeartIcon className="h-6 w-6 text-white" />
          </div>
          <span className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
            Zam<span className="text-indigo-600">Care</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-5 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all duration-500 hover:bg-slate-50 hover:text-indigo-600 ${location.pathname === link.path ? "text-indigo-600 bg-indigo-50/50" : "text-slate-600"
                }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="h-4 w-px bg-slate-200 mx-4" />

          {user ? (
            <div className="flex items-center space-x-2">
              <Link
                to="/dashboard"
                className={`px-5 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all duration-500 hover:bg-slate-50 ${location.pathname === "/dashboard" ? "text-slate-900 bg-slate-50" : "text-slate-500"
                  }`}
              >
                Overview
              </Link>

              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`px-5 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all duration-500 hover:bg-slate-50 ${location.pathname === "/admin" ? "text-slate-900 bg-slate-50" : "text-slate-500"
                    }`}
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="ml-2 flex items-center space-x-2 bg-red-50 text-red-600 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-sm"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="btn-primary !py-3.5 !px-8 !text-[11px]"
            >
              Partner Access
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-3 text-slate-900 bg-white/50 backdrop-blur-md rounded-2xl border border-white shadow-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden fixed inset-x-4 top-24 z-[90] bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl p-8"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-2xl font-black transition-colors ${location.pathname === link.path ? 'text-indigo-600' : 'text-slate-800'}`}
                >
                  {link.name}
                </Link>
              ))}

              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className={`text-2xl font-black transition-colors ${location.pathname === "/dashboard" ? 'text-indigo-600' : 'text-slate-800'}`}
                  >
                    Overview
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className={`text-2xl font-black transition-colors ${location.pathname === "/admin" ? 'text-indigo-600' : 'text-slate-800'}`}
                    >
                      Admin Panel
                    </Link>
                  )}
                </>
              )}

              <div className="h-px bg-slate-100 my-4" />
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-red-100"
                >
                  Terminate Session
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs text-center shadow-xl shadow-indigo-100"
                >
                  Get Involved
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
