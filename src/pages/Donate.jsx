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
    { amount: "25", label: "Seedling", impact: "Supplies for a student" },
    { amount: "50", label: "Sapling", impact: "Meals for a month" },
    { amount: "100", label: "Guardian", impact: "Medical checkups" },
    { amount: "250", label: "Hero", impact: "Vocational training" },
  ];

  const categories = [
    { id: "General", name: "Core", icon: SparklesIcon },
    { id: "Education", name: "School", icon: AcademicCapIcon },
    { id: "Health", name: "Care", icon: BeakerIcon },
    { id: "Nutrition", name: "Food", icon: TruckIcon },
    { id: "Infrastructure", name: "Build", icon: HomeModernIcon },
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
      alert("Please login to proceed with your donation.");
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
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-24">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-50">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-blue-50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 items-center mb-20">
          <div className="lg:col-span-12 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-50 text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em] mb-8 border border-indigo-100/50 shadow-sm"
            >
              <HeartIcon className="h-4 w-4" /> Global Giving Initiative
            </motion.div>
            <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter mb-10 leading-[0.85]">
              Fueling <span className="gradient-text">Ambition.</span>
            </h1>
            <p className="text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Your contribution isn't a gift; it's an investment in the architects of Zambia's future. 100% impact, zero overhead.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left: Financial Impact Insight */}
          <div className="lg:col-span-5 space-y-12">
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="text-3xl font-black mb-10 tracking-tight relative z-10">Network Growth</h3>

              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Impact Capital</p>
                    <p className="text-5xl font-black tracking-tighter italic">ZMW {stats?.overall?.totalAmount?.toLocaleString() || "12.4K"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Growth</p>
                    <p className="text-xl font-black text-emerald-400">+24%</p>
                  </div>
                </div>

                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-gradient-to-r from-indigo-400 to-blue-400" />
                </div>

                <div className="flex justify-between text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">
                  <span>{stats?.overall?.count || "142"} Contributions</span>
                  <span>Quarterly Goal</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-xl font-black text-slate-900 tracking-tight">Standard of Security</h4>
              <div className="grid gap-6">
                {[
                  { icon: ShieldCheckIcon, title: "Vault Protocol", desc: "Military-grade encryption for all financial transmissions.", color: "indigo" },
                  { icon: CheckBadgeIcon, title: "Verified NGO", desc: "Audited quarterly by international transparency partners.", color: "emerald" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                    <div className={`flex-shrink-0 w-14 h-14 bg-${item.color}-50 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                      <item.icon className={`h-7 w-7 text-${item.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Payment Terminal */}
          <div className="lg:col-span-7">
            <motion.div
              className="bg-white rounded-[3.5rem] p-12 shadow-2xl shadow-indigo-100 border border-slate-100 relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center"
                  >
                    <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-emerald-100/50">
                      <HandThumbUpIcon className="h-16 w-16 text-emerald-600" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter">Contribution Locked.</h2>
                    <p className="text-slate-500 font-bold mb-12 max-w-sm mx-auto leading-relaxed text-lg italic">"You haven't just sent money; you've sent a message of belief to a child in Zambia."</p>
                    <button onClick={() => setSuccess(false)} className="btn-primary !w-full !rounded-[1.5rem] !py-6">Submit Another Entry</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Frequency Engine */}
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 block">Legacy Frequency</label>
                      <div className="flex bg-slate-50 p-2 rounded-[1.5rem] border border-slate-100">
                        {["One-time", "Monthly", "Annual"].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, type })}
                            className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${formData.type === type ? "bg-white text-indigo-600 shadow-xl shadow-indigo-100 border border-slate-100" : "text-slate-400 hover:text-slate-600"
                              }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Capital Allocation */}
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 block">Capital Deployment</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                        {categories.map(cat => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, category: cat.id })}
                            className={`flex flex-col items-center gap-3 p-5 rounded-[1.5rem] border-2 transition-all duration-500 ${formData.category === cat.id ? "bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-200" : "bg-white border-slate-50 text-slate-500 hover:border-indigo-100"
                              }`}
                          >
                            <cat.icon className="h-6 w-6" />
                            <span className="text-[9px] font-black uppercase tracking-widest">{cat.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Amount Integration */}
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 block">Allocation Amount (ZMW)</label>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {tiers.map(tier => (
                          <button
                            key={tier.amount}
                            type="button"
                            onClick={() => setFormData({ ...formData, amount: tier.amount })}
                            className={`p-6 rounded-[2rem] border-2 transition-all duration-500 text-left relative overflow-hidden group ${formData.amount === tier.amount ? "border-indigo-600 bg-indigo-50/30" : "border-slate-50 bg-slate-50/30 hover:border-indigo-100"
                              }`}
                          >
                            <p className={`text-4xl font-black mb-1 tracking-tighter italic ${formData.amount === tier.amount ? "text-indigo-600" : "text-slate-900"}`}>{tier.amount}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">{tier.label}</p>
                          </button>
                        ))}
                      </div>
                      <div className="relative group">
                        <BanknotesIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                          type="number"
                          value={formData.amount}
                          onChange={e => setFormData({ ...formData, amount: e.target.value })}
                          placeholder="Custom Amount"
                          className="input-premium pl-16 py-6 !rounded-[2rem] !text-2xl !font-black !italic"
                        />
                      </div>
                    </div>

                    {/* Identity Toggle */}
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <div>
                        <p className="text-sm font-black text-slate-900 mb-1">Stealth Contribution</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Keep your identity private from public feeds</p>
                      </div>
                      <div
                        className={`w-14 h-8 rounded-full relative transition-all duration-500 cursor-pointer p-1 ${formData.isAnonymous ? "bg-indigo-600" : "bg-slate-200"}`}
                        onClick={() => setFormData({ ...formData, isAnonymous: !formData.isAnonymous })}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-500 ${formData.isAnonymous ? "translate-x-6" : "translate-x-0"}`} />
                      </div>
                    </div>

                    <button
                      disabled={loading}
                      className="btn-primary w-full !rounded-[2rem] !py-8 !text-lg !shadow-indigo-200"
                    >
                      {loading ? "ESTABLISHING CONNECTON..." : `AUTHORIZE ZMW ${formData.amount || "0"} IMPACT`}
                    </button>

                    <div className="flex items-center justify-center gap-6 opacity-30 grayscale saturate-0">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="" />
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
