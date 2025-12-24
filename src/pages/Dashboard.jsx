import React, { useEffect, useState } from "react";
import { getDashboardAnalytics, getChildren, getVolunteers } from "../services/firestore";
import { getCurrentUser } from "../services/authentication";
import {
  UserGroupIcon,
  HandRaisedIcon,
  GiftIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  BellIcon,
  CheckBadgeIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="card-premium p-6 bg-white overflow-hidden relative">
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-${color}-50 rounded-full opacity-50`} />
    <div className="flex items-center justify-between relative z-10">
      <div>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
      </div>
      <div className={`p-4 bg-${color}-100 rounded-2xl`}>
        <Icon className={`h-8 w-8 text-${color}-600`} />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-xs font-bold text-green-600 space-x-1">
        <ArrowTrendingUpIcon className="h-4 w-4" />
        <span>{trend} from last month</span>
      </div>
    )}
  </div>
);

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [recentChildren, setRecentChildren] = useState([]);
  const [recentVolunteers, setRecentVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  const GOAL_AMOUNT = 50000; // Monthly Target

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [stats, children, volunteers] = await Promise.all([
          getDashboardAnalytics(),
          getChildren(),
          getVolunteers()
        ]);
        setAnalytics(stats);
        setRecentChildren(children.slice(0, 5));
        setRecentVolunteers(volunteers.slice(0, 5));
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading || !analytics) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
    </div>
  );

  const progressPercent = Math.min((analytics.revenue.totalRevenue / GOAL_AMOUNT) * 100, 100).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-lg">Management Console</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-bold text-slate-400">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
              Ayo, <span className="gradient-text">{user?.name || "Partner"}</span> 👋
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative group">
              <BellIcon className="h-6 w-6 text-slate-600 group-hover:rotate-12 transition-transform" />
              <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-12 w-px bg-slate-200 mx-2" />
            <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-indigo-100 uppercase">
                {user?.name?.charAt(0) || "P"}
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 leading-none mb-1">{user?.name || "Partner"}</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{user?.role || "Member"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Volunteers" value={analytics.counts.volunteers} icon={HandRaisedIcon} color="indigo" trend="+4" />
          <StatCard title="Active Sponsors" value={analytics.counts.sponsors} icon={GiftIcon} color="blue" trend="+2" />
          <StatCard title="Children in Care" value={analytics.counts.children} icon={UserGroupIcon} color="emerald" trend="+1" />
          <StatCard title="Funds Raised" value={`ZMW ${analytics.revenue.totalRevenue.toLocaleString()}`} icon={ArrowTrendingUpIcon} color="amber" trend="+18%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Analytics View */}
          <div className="lg:col-span-2 space-y-8">
            {/* Impact Goals Tracker */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight mb-2">Monthly Impact Goal</h2>
                    <p className="text-indigo-300 font-bold">Helping more children access nutrition and education.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Target</p>
                    <p className="text-2xl font-black">ZMW {GOAL_AMOUNT.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <p className="text-4xl font-black">{progressPercent}% <span className="text-lg text-indigo-300 font-bold tracking-normal ml-2">Reached</span></p>
                    <p className="font-black text-indigo-400">ZMW {analytics.revenue.totalRevenue.toLocaleString()} raised</p>
                  </div>
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden p-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full shadow-lg shadow-indigo-500/40"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Category Allocation */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900">Fund Allocation</h3>
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                  <ArrowTrendingUpIcon className="h-4 w-4" /> Live Distribution
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {analytics.categories.map((cat, idx) => (
                  <div key={idx} className="group p-5 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-3 py-1 bg-white rounded-lg text-[10px] font-black text-slate-900 border border-slate-100 uppercase tracking-wider">{cat._id}</span>
                      <p className="text-sm font-black text-indigo-600">ZMW {cat.total.toLocaleString()}</p>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(cat.total / analytics.revenue.totalRevenue) * 100}%` }} />
                    </div>
                    <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cat.count} Individual Donations</p>
                  </div>
                ))}
                {analytics.categories.length === 0 && <p className="col-span-2 text-center py-10 text-slate-400 font-bold italic">No allocation data available.</p>}
              </div>
            </div>
          </div>

          {/* Side Panel: Recent Activity */}
          <div className="space-y-8">
            {/* Recent Children */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6">In Our Care</h3>
              <div className="space-y-6">
                {recentChildren.map((child) => (
                  <div key={child._id} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden ring-4 ring-slate-50 border-2 border-white shadow-sm">
                        <img src={child.photoUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 leading-none mb-1">{child.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grade {child.school?.grade || '1'}</p>
                      </div>
                    </div>
                    <ChevronRightIcon className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                ))}
                <button className="w-full py-4 mt-2 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-100 transition-colors border border-slate-100/50">
                  Explore All Profiles
                </button>
              </div>
            </div>

            {/* Community Badge Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
              <CheckBadgeIcon className="absolute -bottom-10 -right-10 h-40 w-40 text-white/10 rotate-12" />
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-4 leading-tight">Elite Community <br /> Status Achieved</h4>
                <p className="text-indigo-100 text-sm font-medium leading-relaxed mb-6 opacity-80">Your contributions have placed us in the top 5% of impactful initiatives in the region this month.</p>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-slate-200" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">+ {analytics.counts.volunteers} Allies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
