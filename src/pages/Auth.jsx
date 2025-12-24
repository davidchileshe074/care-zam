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
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* Visual Identity Panel */}
      <div className="lg:w-[45%] bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center p-20 text-white min-h-[40vh] lg:min-h-screen">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-slate-950/90 to-slate-950" />

        <div className="relative z-10 max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-white/10 backdrop-blur-3xl rounded-[2rem] border border-white/20 flex items-center justify-center mb-12 shadow-2xl"
          >
            <FingerPrintIcon className="h-10 w-10 text-indigo-400" />
          </motion.div>

          <h1 className="text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
            Empowerment <br /> Starts <span className="text-indigo-400">Here.</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium leading-relaxed mb-12 italic opacity-80">
            "Access the infrastructure of hope. Log in to manage your contributions and witness the evolution of our community."
          </p>

          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 flex items-center justify-center font-black text-[10px] text-slate-400">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="pl-8 flex items-center text-[10px] font-black uppercase tracking-widest text-indigo-400">
              + 4k Partners
            </div>
          </div>
        </div>

        {/* Floating Accents */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Entry Interface */}
      <div className="lg:w-[55%] flex items-center justify-center p-8 lg:p-24 bg-[#fcfdfe]">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="mb-16">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4 leading-none">
              {isLogin ? "Digital Portal Access" : "Create Impact Profile"}
            </h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">
              {isLogin ? "AUTHENTICATION REQUIRED" : "NEW PARTNER REGISTRATION"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  className="space-y-10"
                >
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Legal Full Name</label>
                    <div className="relative">
                      <UserIcon className="h-6 w-6 absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                      <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="input-premium pl-16 py-6"
                        placeholder="ALEXANDER CHAMBERS"
                      />
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Account Permission Tier</label>
                    <div className="relative">
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="input-premium px-8 py-6 appearance-none font-black text-slate-900 uppercase tracking-widest text-[11px]"
                      >
                        <option value="user">General Supporter</option>
                        <option value="volunteer">Volunteer Specialist</option>
                        <option value="admin">Institutional Admin</option>
                      </select>
                      <ChevronRightIcon className="h-5 w-5 absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Secure Email Gateway</label>
              <div className="relative">
                <EnvelopeIcon className="h-6 w-6 absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-premium pl-16 py-6"
                  placeholder="name@organization.com"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Encrypted Passphrase</label>
              <div className="relative">
                <LockClosedIcon className="h-6 w-6 absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-premium pl-16 py-6"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-red-50 text-red-600 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest border border-red-100 text-center"
              >
                ACCESS DENIED: {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !rounded-[2rem] !py-8 !text-lg !shadow-indigo-100"
            >
              {loading ? "VERIFYING CREDENTIALS..." : isLogin ? "AUTHORIZE ENTRY" : "INITIATE ACCOUNT"}
            </button>
          </form>

          <div className="mt-16 text-center pt-12 border-t border-slate-100">
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-4">
              {isLogin ? "New to the initiative?" : "Existing member?"}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-900 font-black tracking-tighter text-2xl hover:text-indigo-600 transition-all flex items-center justify-center mx-auto group"
            >
              {isLogin ? "Register Access" : "Login Portal"}
              <ChevronRightIcon className="h-6 w-6 ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


export default Auth;
