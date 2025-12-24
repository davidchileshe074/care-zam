import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  HeartIcon,
  ChartBarIcon,
  GlobeAltIcon,
  GiftIcon,
  HandRaisedIcon,
  UserIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-[#fcfdfe] overflow-hidden">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-24 overflow-hidden">
        {/* Advanced Atmoshere */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[140px] opacity-60 animate-float" />
        <div className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-50" />

        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div
              className="lg:col-span-12 xl:col-span-7 text-center lg:text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-indigo-100/50 mb-10">
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.34em] text-slate-500">The ZamCare Protocol v2.0</span>
              </div>

              <h1 className="text-7xl md:text-9xl font-black text-slate-900 leading-[0.85] tracking-tighter mb-10">
                Architecting <br />
                <span className="gradient-text">Human Hope.</span>
              </h1>

              <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl mb-14 mx-auto lg:mx-0">
                We're not just an orphanage initiative. We are building the digital infrastructure to empower the next generation of Zambian leaders.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link to="/donate" className="btn-primary !py-6 !px-12 !text-lg !rounded-[1.5rem] group shadow-2xl shadow-indigo-100">
                  Engineer Change
                  <ArrowRightIcon className="h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link to="/children" className="inline-flex items-center justify-center px-10 py-6 text-slate-900 font-black tracking-tighter text-xl hover:text-indigo-600 transition-all group">
                  Meet the Beneficiaries
                  <UserGroupIcon className="h-6 w-6 ml-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-12 xl:col-span-5 relative"
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 rounded-[4rem] blur-2xl group-hover:scale-105 transition-transform duration-700" />
                <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-white group-hover:-rotate-1 transition-transform duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                    className="w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-1000"
                    alt="Zambian child smiling"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end text-white">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-70">Impact Zone</p>
                      <h3 className="text-3xl font-black italic tracking-tighter">Lusaka District</h3>
                    </div>
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Network Segment */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 items-center opacity-30 grayscale filter invert brightness-0 transition-opacity hover:opacity-100">
            <div className="text-3xl font-black italic tracking-tighter">UNICEF</div>
            <div className="text-2xl font-black uppercase tracking-[0.4em]">WHO</div>
            <div className="text-3xl font-black underline decoration-indigo-500">ZAM.GOV</div>
            <div className="text-2xl font-black opacity-80">OXFAM</div>
            <div className="text-2xl font-black tracking-widest text-indigo-600 block lg:hidden xl:block">WFP FOUNDATION</div>
          </div>
        </div>
      </section>

      {/* The Core Protocol (Features) */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-28">
            <div className="max-w-2xl">
              <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-8">Integrated <br /> <span className="gradient-text">Systems of Care.</span></h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed italic border-l-4 border-indigo-100 pl-8">
                We've redesigned the social safety net to be transparent, efficient, and direct. Every interaction is architected for maximum human impact.
              </p>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: "Direct Registry", icon: UserGroupIcon, desc: "A live ecosystem of child profiles with real-time progress logging.", color: "indigo" },
              { title: "Skill Matrix", icon: GlobeAltIcon, desc: "Vocational training pipelines designed for the Zambian economy.", color: "emerald" },
              { title: "Vault Security", icon: HeartIcon, desc: "Bank-grade transparency for every kwacha committed to the cause.", color: "blue" },
              { title: "Communcity OS", icon: ChartBarIcon, desc: "Networking protocols connecting local leads with global donors.", color: "rose" }
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group p-10 bg-white rounded-[3rem] border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-700"
              >
                <div className={`w-16 h-16 rounded-[1.5rem] bg-${f.color}-50 flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform group-hover:bg-indigo-600`}>
                  <f.icon className={`h-8 w-8 text-${f.color}-600 group-hover:text-white`} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter">{f.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Global CTA Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto relative group">
          <div className="absolute inset-0 bg-slate-900 rounded-[4rem] group-hover:rotate-1 transition-transform duration-700" />
          <div className="relative bg-[#0F172A] rounded-[4rem] px-12 py-24 text-center overflow-hidden border border-white/5 shadow-2xl">
            {/* Dynamic Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -ml-48 -mb-48" />

            <div className="relative z-10 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-10 leading-[0.85]">
                  The Future <br /> Is <span className="gradient-text">Open Source.</span>
                </h2>
                <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-12">DECENTRALIZING COMPASSION IN ZAMBIA</p>

                <div className="flex flex-wrap justify-center gap-8">
                  <Link to="/auth" className="btn-primary !py-8 !px-16 !text-xl !rounded-[2.5rem] !shadow-indigo-500/20">
                    Access Portal
                  </Link>
                  <Link to="/donate" className="px-16 py-8 rounded-[2.5rem] bg-white/5 border border-white/10 text-white font-black text-xl hover:bg-white/10 transition-all flex items-center gap-4 group">
                    Invest Now
                    <ArrowRightIcon className="h-6 w-6 opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Refined Footer */}
      <footer className="py-20 border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <p className="text-2xl font-black text-slate-900 tracking-tighter italic">ZamCare.</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Impact Protocol v2.0.4.Z</p>
          </div>

          <div className="flex gap-10">
            {['Nexus', 'Network', 'Transparency', 'Privacy'].map(link => (
              <a key={link} href="#" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">{link}</a>
            ))}
          </div>

          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-relaxed">
            © 2024 THE ZAMCARE INITIATIVE. <br />
            DISTRIBUTED BY COMMUNITY TRUSTS.
          </p>
        </div>
      </footer>
    </div>
  );
};


export default HomePage;
