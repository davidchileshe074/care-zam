import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartIcon,
  CreditCardIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  SparklesIcon,
  AcademicCapIcon,
  BeakerIcon,
  HomeModernIcon,
  TruckIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { createDonation, getDonationStats } from "../services/firestore";
import { getCurrentUser } from "../services/authentication";

const Donate = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    amount: "50",
    type: "One-time",
    category: "General",
    isAnonymous: false,
    notes: ""
  });

  const tiers = [
    { amount: "25", label: "Supporter", impact: "Provides basic school supplies for one child." },
    { amount: "50", label: "Caregiver", impact: "Covers a month of nutritious meals for a child." },
    { amount: "100", label: "Guardian", impact: "Funds healthcare and checkups for 3 children." },
    { amount: "250", label: "Hero", impact: "Sponsors a full year of vocational training." },
  ];

  const categories = [
    { id: "General", name: "Greatest Need", icon: SparklesIcon },
    { id: "Education", name: "Scholarships", icon: AcademicCapIcon },
    { id: "Health", name: "Medical Care", icon: BeakerIcon },
    { id: "Nutrition", name: "Daily Meals", icon: TruckIcon },
    { id: "Infrastructure", name: "Shelter", icon: HomeModernIcon },
  ];

  useEffect(() => {
    const init = async () => {
      setUser(getCurrentUser());
      try {
        const data = await getDonationStats();
        setStats(data);
      } catch (err) {
        console.error("Stats fetch error:", err);
      }
    };
    init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to complete your donation.");
      navigate("/auth");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await createDonation({
        ...formData,
        amount: parseFloat(formData.amount),
        donorName: user.name
      });
      setSuccess(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              Invest in <span className="text-blue-400">Potential.</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">
              Your generosity provides more than just survival—it provides a future. 100% of your donation goes directly to the children.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left Column: Context & Stats */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6 font-display tracking-tight">Our Collective Impact</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Raised</p>
                  <p className="text-3xl font-black text-indigo-600">ZMW {stats?.overall?.totalAmount?.toLocaleString() || "0"}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Donations</p>
                  <p className="text-3xl font-black text-blue-600">{stats?.overall?.count || "0"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-xl font-black text-slate-900">Why ZamCare?</h3>
              <div className="space-y-6">
                {[
                  { icon: ShieldCheckIcon, title: "Verified Transparency", desc: "Every kwacha is tracked and we publish quarterly financial reports." },
                  { icon: HeartIcon, title: "Community Centric", desc: "We work with local leaders to ensure support goes exactly where it's needed." },
                  { icon: CreditCardIcon, title: "Secure Processing", desc: "Bank-level encryption for all transactions and data privacy." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 mb-1">{item.title}</h4>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Donation Form */}
          <motion.div
            className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-blue-100 border border-slate-100 relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckBadgeIcon className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Thank You!</h2>
                  <p className="text-slate-500 font-bold mb-8">Your contribution has been successfully processed. A receipt has been sent to your email.</p>
                  <button onClick={() => setSuccess(false)} className="btn-primary">Make Another Donation</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Frequency Switch */}
                  <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                    {["One-time", "Monthly", "Annual"].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, type })}
                        className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${formData.type === type ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 block">Select Amount (ZMW)</label>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {tiers.map(tier => (
                        <button
                          key={tier.amount}
                          type="button"
                          onClick={() => setFormData({ ...formData, amount: tier.amount })}
                          className={`p-5 rounded-2xl border-2 transition-all text-left group ${formData.amount === tier.amount ? "border-blue-600 bg-blue-50" : "border-slate-100 hover:border-blue-200"
                            }`}
                        >
                          <p className={`text-2xl font-black mb-1 ${formData.amount === tier.amount ? "text-blue-700" : "text-slate-900"}`}>ZMW {tier.amount}</p>
                          <p className={`text-xs font-bold ${formData.amount === tier.amount ? "text-blue-600" : "text-slate-400"}`}>{tier.label}</p>
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <BanknotesIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="number"
                        value={formData.amount}
                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                        placeholder="Custom Amount"
                        className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-black text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 block">Where should we use it?</label>
                    <div className="flex flex-wrap gap-3">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat.id })}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-bold text-sm transition-all ${formData.category === cat.id ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "bg-white text-slate-600 border-slate-100 hover:border-blue-200"
                            }`}
                        >
                          <cat.icon className="h-5 w-5" />
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Anonymous Toggle */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-6 rounded-full relative transition-colors cursor-pointer ${formData.isAnonymous ? "bg-blue-600" : "bg-slate-300"}`} onClick={() => setFormData({ ...formData, isAnonymous: !formData.isAnonymous })}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isAnonymous ? "left-5" : "left-1"}`} />
                      </div>
                      <span className="text-sm font-black text-slate-700">Make donation anonymous</span>
                    </div>
                    <ShieldCheckIcon className="h-5 w-5 text-slate-400" />
                  </div>

                  <button
                    disabled={loading}
                    className="btn-primary w-full py-6 text-xl font-black shadow-blue-200"
                  >
                    {loading ? "Processing..." : `Donate ZMW ${formData.amount || "0"}`}
                  </button>

                  <p className="text-center text-[10px] font-bold text-slate-400 leading-relaxed">
                    By clicking "Donate" you agree to our Terms of Service and Privacy Policy. <br />
                    All transactions are 256-bit SSL encrypted.
                  </p>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
