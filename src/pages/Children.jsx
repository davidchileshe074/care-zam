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
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-black text-[10px] uppercase tracking-widest mb-4"
            >
              <SparklesIcon className="h-4 w-4" /> Beneficiary Gallery
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
              The Smiles <br /> We <span className="gradient-text">Protect.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              Every child has a story. Meet the amazing young individuals currently supported by the ZamCare community and find out how you can help.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-grow">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Find a child..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm outline-none focus:border-blue-500 font-bold text-slate-900"
              />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none pl-6 pr-12 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm outline-none focus:border-blue-500 font-bold text-slate-700 cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Available">Looking for Support</option>
                <option value="Sponsored">Now Supported</option>
              </select>
              <AdjustmentsHorizontalIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <main className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[500px] bg-white rounded-[2.5rem] animate-pulse shadow-sm" />
            ))}
          </div>
        ) : filteredChildren.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-dashed border-slate-200">
            <UserGroupIcon className="h-16 w-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-slate-900">No matching profiles found.</h3>
            <p className="text-slate-500 font-bold">Try adjusting your search or filter settings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredChildren.map((child) => (
              <motion.div
                key={child._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={child.photoUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"}
                    alt={child.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg ${child.status === 'Available' ? 'bg-red-500/90 text-white' : 'bg-green-500/90 text-white'
                      }`}>
                      {child.status}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Grade</p>
                      <p className="text-sm font-black text-slate-900">{child.school?.grade || 'Grade 1'}</p>
                    </div>
                    <button
                      onClick={() => setSelectedChild(child)}
                      className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-indigo-700 transition-colors"
                    >
                      <BookOpenIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{child.name}</h2>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                        <CalendarDaysIcon className="h-4 w-4" /> {child.age} Years Old
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 line-clamp-3 italic">
                    "{child.background || "A bright and talented child waiting for their story to unfold."}"
                  </p>

                  <div className="space-y-6">
                    {/* Progress Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                        <AcademicCapIcon className="h-6 w-6 text-blue-500" />
                        <div>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Academic</p>
                          <p className="text-xs font-black text-slate-900">{child.school?.academicPerformance || 'Excellent'}</p>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                        <HeartIcon className="h-6 w-6 text-red-500" />
                        <div>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Health</p>
                          <p className="text-xs font-black text-slate-900">{child.healthStatus || 'Good'}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn-primary w-full !py-4 text-sm font-black shadow-blue-100 tracking-widest"
                      onClick={() => window.location.href = '/donate'}
                    >
                      {child.status === 'Available' ? 'SPONSOR NOW' : 'SEND A GIFT'}
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedChild(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[3rem] max-w-2xl w-full relative z-10 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-5">
                  <img src={selectedChild.photoUrl} className="w-16 h-16 rounded-2xl object-cover shadow-lg" alt="" />
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedChild.name}'s Journal</h2>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Life Progress & Updates</p>
                  </div>
                </div>
                <button onClick={() => setSelectedChild(null)} className="p-3 bg-white rounded-full shadow-sm hover:bg-slate-100 transition-colors">
                  <XMarkIcon className="h-6 w-6 text-slate-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-10 overflow-y-auto space-y-10 custom-scrollbar">
                {/* Summary Section */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-black text-indigo-600 mb-1">{selectedChild.school?.grade || 'N/A'}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">School <br /> Year</p>
                  </div>
                  <div className="text-center border-x border-slate-100">
                    <p className="text-2xl font-black text-indigo-600 mb-1">{selectedChild.progressReports?.length || 0}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Reports <br /> Filed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-green-600 mb-1">ZMW {selectedChild.sponsorshipCost}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Monthly <br /> Cost</p>
                  </div>
                </div>

                {/* Reports Timeline */}
                <div className="space-y-8 relative">
                  <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-slate-100" />

                  {selectedChild.progressReports && selectedChild.progressReports.length > 0 ? (
                    selectedChild.progressReports.map((report, i) => (
                      <div key={i} className="flex gap-8 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white border-4 border-slate-50 shadow-sm flex items-center justify-center flex-shrink-0">
                          <BellIcon className="h-5 w-5 text-indigo-500" />
                        </div>
                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex-grow">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-black text-slate-900 tracking-tight uppercase text-xs">{report.title}</h4>
                            <span className="text-[10px] font-black text-slate-400">{new Date(report.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm font-medium text-slate-500 leading-relaxed mb-4">{report.content}</p>
                          <span className="px-3 py-1 bg-white rounded-lg text-[9px] font-black text-indigo-600 uppercase border border-slate-100">{report.category}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 grayscale opacity-40">
                      <BookOpenIcon className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                      <p className="font-black text-slate-400 text-sm">Waiting for the first entry in {selectedChild.name}'s journey...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 bg-slate-50 border-t border-slate-100">
                <button
                  className="btn-primary w-full !py-5 text-lg font-black shadow-indigo-100"
                  onClick={() => window.location.href = '/donate'}
                >
                  SUPPORT THIS JOURNEY
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Children;
