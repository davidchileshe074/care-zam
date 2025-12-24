import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserGroupIcon,
  AcademicCapIcon,
  HeartIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  XMarkIcon,
  BellIcon
} from "@heroicons/react/24/outline";
import { getChildren } from "../services/firestore";

const Children = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const data = await getChildren();
      setChildren(data);
    } catch (error) {
      console.error("Error fetching children:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredChildren = children.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || child.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-40 pb-24">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-blue-50/50 rounded-full blur-[100px]" />
      </div>

      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-8 relative z-10 mb-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-50 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-6 shadow-sm border border-indigo-100/50"
            >
              <SparklesIcon className="h-4 w-4" /> The Beneficiary Registry
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
              The Smiles <br /> We <span className="gradient-text">Cultivate.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
              Meet the vibrant young souls of Zambia. Each profile represents a bridge to a better tomorrow, waiting for your hands to help build it.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group flex-grow lg:w-80">
              <MagnifyingGlassIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-white border border-slate-100 shadow-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold text-slate-900 placeholder:text-slate-300 transition-all"
              />
            </div>
            <div className="relative group">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none pl-6 pr-14 py-5 rounded-[2rem] bg-white border border-slate-100 shadow-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-black text-[11px] uppercase tracking-widest text-slate-700 cursor-pointer transition-all"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Looking for Hope</option>
                <option value="Sponsored">Fully Supported</option>
              </select>
              <AdjustmentsHorizontalIcon className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <main className="max-w-7xl mx-auto px-8 relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[600px] bg-white rounded-[3rem] animate-pulse shadow-sm border border-slate-100" />
            ))}
          </div>
        ) : filteredChildren.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[4rem] p-24 text-center border border-dashed border-slate-200 shadow-xl"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <UserGroupIcon className="h-12 w-12 text-slate-200" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">No Profiles Found</h3>
            <p className="text-slate-400 font-bold max-w-sm mx-auto">We couldn't find any children matching your current search criteria. Try a different term or filter.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredChildren.map((child) => (
              <motion.div
                key={child._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700"
              >
                {/* Image Section */}
                <div className="relative h-[400px] overflow-hidden">
                  <img
                    src={child.photoUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"}
                    alt={child.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="absolute top-8 left-8">
                    <span className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest backdrop-blur-xl shadow-2xl border-2 ${child.status === 'Available'
                        ? 'bg-red-500/80 text-white border-white/20'
                        : 'bg-emerald-500/80 text-white border-white/20'
                      }`}>
                      {child.status}
                    </span>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="px-5 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Grade Level</p>
                      <p className="text-xs font-black text-slate-900">{child.school?.grade || 'Primary'}</p>
                    </div>
                    <button
                      onClick={() => setSelectedChild(child)}
                      className="p-4 bg-white text-indigo-600 rounded-[1.5rem] shadow-2xl hover:bg-indigo-600 hover:text-white transition-all transform hover:rotate-12"
                    >
                      <BookOpenIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">{child.name}</h2>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                        <CalendarDaysIcon className="h-4 w-4" /> {child.age} Years Journey
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-500 font-medium text-[15px] leading-relaxed mb-10 line-clamp-2 italic opacity-80">
                    "{child.background || "A bright and talented child waiting for their unique story to unfold."}"
                  </p>

                  <div className="space-y-8">
                    {/* Progress Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-5 rounded-3xl flex flex-col gap-3 group/stat hover:bg-white transition-colors border border-transparent hover:border-slate-100">
                        <div className="p-2 bg-blue-100 rounded-xl w-fit group-hover/stat:rotate-12 transition-transform">
                          <AcademicCapIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Academic</p>
                          <p className="text-xs font-black text-slate-900 uppercase">{child.school?.academicPerformance || 'Solid'}</p>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-3xl flex flex-col gap-3 group/stat hover:bg-white transition-colors border border-transparent hover:border-slate-100">
                        <div className="p-2 bg-red-100 rounded-xl w-fit group-hover/stat:rotate-12 transition-transform">
                          <HeartIcon className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Health</p>
                          <p className="text-xs font-black text-slate-900 uppercase">{child.healthStatus || 'Great'}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn-primary w-full !rounded-[1.5rem] !py-5 shadow-indigo-100"
                      onClick={() => window.location.href = '/donate'}
                    >
                      {child.status === 'Available' ? 'Offer Sponsorship' : 'Send Support'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Impact Journal Modal */}
      <AnimatePresence>
        {selectedChild && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedChild(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="bg-white rounded-[3.5rem] max-w-4xl w-full relative z-10 shadow-2xl flex flex-col lg:flex-row max-h-[90vh] overflow-hidden border border-white/20"
            >
              <button
                onClick={() => setSelectedChild(null)}
                className="absolute top-8 right-8 z-50 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-slate-900 lg:text-white rounded-full transition-all group"
              >
                <XMarkIcon className="h-6 w-6 group-hover:rotate-90 transition-transform" />
              </button>

              {/* Modal Sidebar - Image */}
              <div className="w-full lg:w-[40%] h-64 lg:h-auto relative">
                <img src={selectedChild.photoUrl} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <h2 className="text-4xl font-black tracking-tighter mb-2">{selectedChild.name}</h2>
                  <p className="text-xs font-black uppercase tracking-widest opacity-80">Life Journey Log</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-grow flex flex-col overflow-hidden bg-[#fcfdfe]">
                <div className="p-12 overflow-y-auto custom-scrollbar flex-grow space-y-12">
                  {/* Summary Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-[2rem] text-center shadow-sm border border-slate-100">
                      <p className="text-3xl font-black text-indigo-600 mb-1 leading-none">{selectedChild.school?.grade || 'N/A'}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Level</p>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] text-center shadow-sm border border-slate-100">
                      <p className="text-3xl font-black text-indigo-600 mb-1 leading-none">{selectedChild.progressReports?.length || 0}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reports</p>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] text-center shadow-sm border border-slate-100">
                      <p className="text-xl font-black text-emerald-600 mb-1 leading-none">ZMW {selectedChild.sponsorshipCost}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly</p>
                    </div>
                  </div>

                  {/* Activity Timeline */}
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                      <span className="w-8 h-px bg-slate-200" /> Development Timeline
                    </h4>

                    <div className="space-y-10 relative">
                      <div className="absolute left-7 top-4 bottom-4 w-px bg-slate-100" />

                      {selectedChild.progressReports && selectedChild.progressReports.length > 0 ? (
                        selectedChild.progressReports.map((report, i) => (
                          <div key={i} className="flex gap-8 relative z-10 group/item">
                            <div className="w-14 h-14 rounded-2xl bg-white border-4 border-slate-50 shadow-sm flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 group-hover/item:bg-indigo-600 transition-all duration-500">
                              <BellIcon className="h-6 w-6 text-indigo-500 group-hover/item:text-white" />
                            </div>
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex-grow group-hover/item:shadow-xl transition-all duration-500">
                              <div className="flex justify-between items-start mb-4">
                                <h5 className="font-black text-slate-900 tracking-tight text-sm uppercase">{report.title}</h5>
                                <span className="text-[10px] font-black text-slate-400 uppercase">{new Date(report.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                              </div>
                              <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6 italic">"{report.content}"</p>
                              <span className="px-4 py-2 bg-slate-50 rounded-xl text-[9px] font-black text-indigo-600 uppercase tracking-widest border border-slate-100/50">{report.category}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-20 opacity-30 grayscale pointer-events-none">
                          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpenIcon className="h-10 w-10 text-slate-400" />
                          </div>
                          <p className="font-black text-slate-400 text-[10px] uppercase tracking-widest">No journal entries available yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-10 bg-white border-t border-slate-50 mt-auto">
                  <button
                    className="btn-primary w-full !rounded-[2rem] !py-6 text-base tracking-[0.2em]"
                    onClick={() => window.location.href = '/donate'}
                  >
                    EMPOWER THIS FUTURE
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Children;
