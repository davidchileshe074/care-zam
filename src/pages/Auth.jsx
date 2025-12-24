import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  ChevronRightIcon,
  FingerPrintIcon
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { signup, login } from "../services/authentication";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "user"
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        navigate("/dashboard");
      } else {
        await signup({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: formData.role
        });
        // On our expert backend, signup returns the token/user, 
        // and our service already saved it. 
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err); // Interceptor already parsed the message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side: Visuals */}
      <div className="hidden lg:flex relative bg-indigo-900 overflow-hidden items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-30"
            alt="Impactful image"
          />
        </div>
        <div className="relative z-10 p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl w-fit mb-8">
              <FingerPrintIcon className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl font-black mb-6 tracking-tighter">
              Secure access to our <br />
              <span className="text-indigo-400">Admin Portal.</span>
            </h1>
            <p className="text-xl text-indigo-100/70 max-w-md leading-relaxed">
              Managing impact shouldn't be hard. Log in to access your dashboard, track sponsorships, and manage volunteer data.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex items-center justify-center p-8 bg-slate-50">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              {isLogin ? "Welcome back" : "Join the cause"}
            </h2>
            <p className="text-slate-500 font-medium">
              {isLogin
                ? "Enter your credentials to continue"
                : "Create a partner account to get started"}
            </p>
          </div>

          <div className="glass p-8 rounded-[2rem] border border-white shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
                      <div className="relative">
                        <UserIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-900 shadow-sm"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Account Type</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-4 rounded-2xl bg-white border border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-slate-900 shadow-sm appearance-none"
                      >
                        <option value="user">General Partner</option>
                        <option value="volunteer">Volunteer Lead</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <EnvelopeIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-900 shadow-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
                <div className="relative">
                  <LockClosedIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-900 shadow-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 text-center"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-5 text-lg font-black mt-6 shadow-indigo-200"
              >
                {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-8 text-center pt-8 border-t border-slate-100">
              <p className="text-slate-500 font-bold">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="mt-2 text-indigo-600 font-black hover:text-indigo-700 transition-colors flex items-center justify-center mx-auto group"
              >
                {isLogin ? "Join as a partner" : "Sign into portal"}
                <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
