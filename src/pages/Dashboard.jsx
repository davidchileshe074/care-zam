import React, { useEffect, useState } from "react";
import { getVolunteers, getSponsors, getChildren, getDonationStats } from "../services/firestore";
import { getCurrentUser } from "../services/authentication";
import {
  UserGroupIcon,
  HandRaisedIcon,
  GiftIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  BellIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, color }) => (
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
    <div className="mt-4 flex items-center text-xs font-bold text-green-600 space-x-1">
      <ArrowTrendingUpIcon className="h-4 w-4" />
      <span>+12% from last month</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState({
    volunteers: [],
    sponsors: [],
    children: [],
    stats: { overall: { totalAmount: 0, count: 0 }, categories: [] }
  });
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [volunteers, sponsors, children, stats] = await Promise.all([
          getVolunteers(),
          getSponsors(),
          getChildren(),
          getDonationStats()
        ]);
        setData({ volunteers, sponsors, children, stats });
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">
              Welcome back, <span className="gradient-text">{user?.name || "Partner"}</span> 👋
            </h1>
            <p className="text-slate-500 font-bold">Here's a quick overview of our community impact today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors relative">
              <BellIcon className="h-6 w-6 text-slate-600" />
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-12 w-px bg-slate-200 mx-2" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-indigo-100">
                {user?.name?.charAt(0) || "P"}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-black text-slate-900">{user?.name || "Partner"}</p>
                <p className="text-xs font-bold text-slate-400 capitalize">{user?.role || "Member"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard title="Volunteers" value={data.volunteers.length} icon={HandRaisedIcon} color="indigo" />
          <StatCard title="Active Sponsors" value={data.sponsors.length} icon={GiftIcon} color="blue" />
          <StatCard title="Total Children" value={data.children.length} icon={UserGroupIcon} color="emerald" />
          <StatCard title="Total Raised" value={`ZMW ${data.stats.overall.totalAmount.toLocaleString()}`} icon={ArrowTrendingUpIcon} color="indigo" />
        </div>

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Latest Children */}
          <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-slate-900">Recently Registered Children</h2>
              <button className="text-indigo-600 font-black text-sm hover:underline">View All</button>
            </div>
            <div className="space-y-6">
              {data.children.slice(0, 4).map((child) => (
                <div key={child._id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-sm">
                      <img
                        src={child.photoUrl || `https://ui-avatars.com/api/?name=${child.name}&background=random`}
                        alt={child.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900">{child.name}</h4>
                      <p className="text-xs font-bold text-slate-400">Age {child.age} • Joined {new Date(child.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${child.status === 'Sponsored' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                    {child.status}
                  </span>
                </div>
              ))}
              {data.children.length === 0 && <p className="text-slate-400 font-bold italic py-4">No recent children added.</p>}
            </div>
          </section>

          {/* Latest Interactions */}
          <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-slate-900">Community Support</h2>
              <CalendarDaysIcon className="h-6 w-6 text-slate-400" />
            </div>
            <div className="custom-timeline space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
              {data.volunteers.slice(0, 4).map((v) => (
                <div key={v._id} className="relative pl-12 flex flex-col gap-1">
                  <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-white border-4 border-indigo-600 z-10 shadow-sm" />
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="font-extrabold text-slate-800">{v.name} signed up as a volunteer</h4>
                    <span className="text-[10px] font-black text-slate-400 whitespace-nowrap">2H AGO</span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 italic bg-slate-50 p-2 rounded-xl mt-1">"{v.message?.substring(0, 60)}..."</p>
                </div>
              ))}
              {data.sponsors.slice(0, 2).map((s) => (
                <div key={s._id} className="relative pl-12 flex flex-col gap-1">
                  <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-white border-4 border-blue-600 z-10 shadow-sm" />
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="font-extrabold text-slate-800">{s.name} made a contribution</h4>
                    <span className="text-[10px] font-black text-slate-400 whitespace-nowrap">8H AGO</span>
                  </div>
                </div>
              ))}
              {data.volunteers.length === 0 && data.sponsors.length === 0 && (
                <p className="text-slate-400 font-bold italic py-4">No community activity yet.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
