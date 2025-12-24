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
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gradient-to-b from-indigo-50/50 to-white">
        {/* Animated Orbs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl animate-pulse delay-700" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span>Impactful Community Empowerment</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
                Bridging Hope for <br />
                <span className="gradient-text">Zambia's Future</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                ZamCare is more than an orphanage support system. We're a digital bridge connecting orphaned children with the resources and community they need to thrive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/donate" className="btn-primary group">
                  Start Donating
                  <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/volunteer" className="btn-secondary">
                  Join as Volunteer
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-200 border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                  alt="Children smiling"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent" />
              </div>

              {/* Floating Stat Card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-indigo-50 z-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">500+</h3>
                    <p className="text-sm font-bold text-slate-500">Children Supported</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-y border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Trusted by Global Partners</p>
          <div className="flex flex-wrap justify-between items-center opacity-40 grayscale gap-8 px-10">
            <span className="text-2xl font-black italic">UNICEF</span>
            <span className="text-2xl font-black">WHO</span>
            <span className="text-2xl font-black underline">ZambiaGov</span>
            <span className="text-2xl font-black">OXFAM</span>
            <span className="text-2xl font-black">SaveTheChildren</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-slate-900 text-4xl lg:text-5xl font-black mb-6 tracking-tight">Focusing on what truly matters</h2>
            <p className="text-slate-500 text-lg">Our holistic approach ensures every child and community member receives the specific care and support they deserve.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Orphanage Support",
                desc: "Real-time profiles and tracking of needs for orphaned children.",
                icon: UserGroupIcon,
                color: "indigo"
              },
              {
                title: "Empowerment",
                desc: "Vocational and entrepreneurial programs for the local community.",
                icon: GlobeAltIcon,
                color: "blue"
              },
              {
                title: "User Engagement",
                desc: "Social networking and feedback systems to stay connected.",
                icon: HeartIcon,
                color: "pink"
              },
              {
                title: "Transparency",
                desc: "Real-time impact tracking and financial accountability reports.",
                icon: ChartBarIcon,
                color: "emerald"
              }
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group card-premium p-8 h-full bg-white"
              >
                <div className={`p-4 bg-${f.color}-50 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform`}>
                  <f.icon className={`h-8 w-8 text-${f.color}-600`} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-white text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
            Ready to change a life today?
          </h2>
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
            Your support provides more than just essential needs—it provides the foundation for a lifetime of success.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/join" className="btn-primary !py-5 !px-12 text-lg">
              Join the Community
            </Link>
            <Link to="/donate" className="bg-white/10 backdrop-blur-md text-white border border-white/20 py-5 px-12 rounded-2xl font-bold hover:bg-white hover:text-slate-900 transition-all text-lg">
              Donate Now
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 font-bold text-sm">© 2024 ZamCare Initiative. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
