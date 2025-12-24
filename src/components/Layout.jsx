import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
    const location = useLocation();
    // Hide Navbar and Footer on Auth page
    const isAuthPage = location.pathname === "/auth";
    // HomePage and Dashboard handle their own top padding for visual effects
    const isSpecialPage = location.pathname === "/" || location.pathname === "/dashboard";

    return (
        <div className="flex flex-col min-h-screen">
            {!isAuthPage && <Navbar />}
            <main className={`flex-grow ${!isAuthPage && !isSpecialPage ? "pt-24" : ""}`}>
                {children}
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
};

export default Layout;
