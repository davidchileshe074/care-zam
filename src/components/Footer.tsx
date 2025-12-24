import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">ZamCare</h2>
          <p className="text-sm text-gray-400 max-w-xs">
            Empowering communities and supporting children for a brighter future.
          </p>
        </div>
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Contact Us</a>
        </div>
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ZamCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
