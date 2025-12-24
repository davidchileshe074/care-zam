import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    UserGroupIcon,
    HandRaisedIcon,
    GiftIcon,
    PlusIcon,
    TrashIcon,
    CheckCircleIcon,
    ClockIcon,
    BriefcaseIcon,
    EnvelopeIcon,
    PhoneIcon,
    SparklesIcon,
    BanknotesIcon,
    ChatBubbleBottomCenterTextIcon,
    DocumentTextIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
    getVolunteers,
    getChildren,
    deleteChild,
    getTasks,
    createTask,
    updateVolunteer,
    logVolunteerHours,
    getDonations,
    addChildReport
} from "../services/firestore";

const Admin = () => {
    const [data, setData] = useState({
        volunteers: [],
        donations: [],
        children: [],
        tasks: []
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("volunteers");

    // Task Modal State
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [taskFormData, setTaskFormData] = useState({
        title: "", description: "", location: "", date: "", duration: "2 hours", category: "General", difficulty: "Medium"
    });

    // Report Modal State
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedChild, setSelectedChild] = useState(null);
    const [reportFormData, setReportFormData] = useState({
        title: "", content: "", category: "Personal"
    });

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [v, d, c, t] = await Promise.all([
                getVolunteers(),
                getDonations(),
                getChildren(),
                getTasks()
            ]);
            setData({ volunteers: v, donations: d, children: c, tasks: t });
        } catch (error) {
            console.error("Admin fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateVolunteerStatus = async (id, status) => {
        try {
            await updateVolunteer(id, { status });
            fetchAllData();
        } catch (err) { alert("Failed to update status"); }
    };

    const handleLogHours = async (id) => {
        const hours = prompt("Enter hours to add:");
        if (hours && !isNaN(hours)) {
            try {
                await logVolunteerHours(id, hours);
                fetchAllData();
            } catch (err) { alert("Failed to log hours"); }
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await createTask(taskFormData);
            setShowTaskModal(false);
            fetchAllData();
        } catch (err) { alert("Failed to create task"); }
    };

    const handleDeleteChild = async (id) => {
        if (window.confirm("Are you sure you want to delete this profile?")) {
            try {
                await deleteChild(id);
                fetchAllData();
            } catch (err) { alert("Failed to delete beneficiary"); }
        }
    };

    const handleCreateReport = async (e) => {
        e.preventDefault();
        try {
            await addChildReport(selectedChild._id, reportFormData);
            setShowReportModal(false);
            setReportFormData({ title: "", content: "", category: "Personal" });
            alert(`Progress report published for ${selectedChild.name}!`);
        } catch (err) { alert("Failed to post progress report"); }
    };

    const TabButton = ({ name, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(name)}
            className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-black transition-all duration-300 ${activeTab === name
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-105"
                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                }`}
        >
            <Icon className="h-5 w-5" />
            <span className="tracking-tight">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">Admin <span className="gradient-text">Command.</span></h1>
                        <p className="text-slate-500 font-bold">Comprehensive oversight of community impact and operations.</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-4 mb-10">
                    <TabButton name="volunteers" label="Volunteers" icon={HandRaisedIcon} />
                    <TabButton name="tasks" label="Work Tasks" icon={BriefcaseIcon} />
                    <TabButton name="donations" label="Audit Donations" icon={BanknotesIcon} />
                    <TabButton name="children" label="Beneficiaries" icon={UserGroupIcon} />
                </div>

                {/* Content Area */}
                <div className="space-y-8">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div>
                            <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Syncing Data...</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            {activeTab === "volunteers" && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid gap-6">
                                    {data.volunteers.map(v => (
                                        <div key={v._id} className="card-premium p-8 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-8 group">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center font-black text-indigo-600 text-xl border-2 border-white shadow-sm group-hover:bg-indigo-50 transition-colors">
                                                    {v.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{v.name}</h3>
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${v.status === 'Approved' || v.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                                                            }`}>
                                                            {v.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400">
                                                        <span className="flex items-center gap-1"><EnvelopeIcon className="h-4 w-4" />{v.email}</span>
                                                        <span className="flex items-center gap-1"><PhoneIcon className="h-4 w-4" />{v.phone || 'No phone'}</span>
                                                        <span className="flex items-center gap-1 text-indigo-500"><ClockIcon className="h-4 w-4" />{v.totalHours} Hours Logged</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                {v.status === 'Pending' && (
                                                    <button onClick={() => handleUpdateVolunteerStatus(v._id, 'Approved')} className="px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-black shadow-lg shadow-green-100 hover:bg-green-700 transition-all">APPROVE</button>
                                                )}
                                                <button onClick={() => handleLogHours(v._id)} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black hover:bg-indigo-100 transition-all">LOG HOURS</button>
                                                <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-black hover:bg-slate-100 transition-all">VIEW STORY</button>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {activeTab === "tasks" && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Operations</h2>
                                        <button onClick={() => setShowTaskModal(true)} className="btn-primary !py-3 flex items-center gap-2">
                                            <PlusIcon className="h-5 w-5" /> CREATE TASK
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {data.tasks.map(t => (
                                            <div key={t._id} className="card-premium p-6 bg-white border border-slate-100">
                                                <div className="flex justify-between mb-4">
                                                    <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.category}</span>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${t.status === 'Open' ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'}`}>{t.status}</span>
                                                </div>
                                                <h3 className="text-xl font-black text-slate-900 mb-2 truncate">{t.title}</h3>
                                                <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-2">{t.description}</p>
                                                <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                                                    <div className="flex -space-x-2">
                                                        {t.assignedVolunteers?.slice(0, 3).map((v, i) => (
                                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-600">{v.name?.charAt(0)}</div>
                                                        ))}
                                                        {t.assignedVolunteers?.length > 3 && <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white">+{t.assignedVolunteers.length - 3}</div>}
                                                    </div>
                                                    <span className="text-xs font-black text-slate-400 flex items-center gap-1"><ClockIcon className="h-4 w-4" /> {t.duration}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "donations" && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid gap-6">
                                    {data.donations.map(d => (
                                        <div key={d._id} className="card-premium p-8 bg-white flex items-center justify-between border border-slate-100 group">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                                                    <BanknotesIcon className="h-7 w-7 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-slate-900 tracking-tight">
                                                        {d.isAnonymous ? "Anonymous Donor" : (d.donorName || d.donor?.name || "Partner")}
                                                    </h3>
                                                    <div className="flex gap-4 text-xs font-bold text-slate-400">
                                                        <span className="text-blue-500 uppercase tracking-widest">{d.category}</span>
                                                        <span>{new Date(d.createdAt).toLocaleDateString()}</span>
                                                        <span className="bg-slate-50 px-2 rounded-md font-mono">{d.transactionId}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-slate-900">ZMW {d.amount.toLocaleString()}</p>
                                                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">{d.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {data.donations.length === 0 && (
                                        <div className="text-center py-20 grayscale opacity-50">
                                            <SparklesIcon className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                                            <p className="font-black text-slate-400">No donation records found.</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === "children" && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <div className="flex justify-between items-center mb-10">
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Vulnerable Beneficiaries</h2>
                                        <Link to="/add-child" className="btn-primary !py-3 flex items-center gap-2">
                                            <PlusIcon className="h-5 w-5" /> REGISTER CHILD
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {data.children.map(c => (
                                            <div key={c._id} className="card-premium overflow-hidden bg-white group">
                                                <div className="h-48 bg-slate-100 relative">
                                                    <img src={c.photoUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={c.name} />
                                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black text-indigo-600 uppercase shadow-lg">AGE {c.age}</div>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="text-xl font-black text-slate-900 mb-1">{c.name}</h3>
                                                    <p className="text-xs text-slate-400 font-bold mb-4 italic truncate">"{c.background?.substring(0, 60)}..."</p>
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${c.status === 'Sponsored' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                                            }`}>
                                                            {c.status}
                                                        </span>
                                                        <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                            H: {c.healthStatus || 'Good'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => { setSelectedChild(c); setShowReportModal(true); }}
                                                                className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"
                                                                title="Post Progress Report"
                                                            >
                                                                <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                                                            </button>
                                                            <button onClick={() => handleDeleteChild(c._id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><TrashIcon className="h-5 w-5" /></button>
                                                        </div>
                                                        <Link to={`/children`} className="text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest">VIEW PUBLIC</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </div>

            {/* Task Creation Modal */}
            <AnimatePresence>
                {showTaskModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowTaskModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white rounded-[2rem] p-10 max-w-xl w-full relative z-10 shadow-2xl">
                            <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Deploy New Operation</h2>
                            <form onSubmit={handleCreateTask} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input placeholder="Task Title" value={taskFormData.title} onChange={e => setTaskFormData({ ...taskFormData, title: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-900" required />
                                    <select value={taskFormData.category} onChange={e => setTaskFormData({ ...taskFormData, category: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-900 appearance-none">
                                        <option value="General">General Category</option>
                                        <option value="Education">Education</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Fundraising">Fundraising</option>
                                    </select>
                                </div>
                                <textarea placeholder="Service Description" value={taskFormData.description} onChange={e => setTaskFormData({ ...taskFormData, description: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-900" rows={3} required />
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input type="date" value={taskFormData.date} onChange={e => setTaskFormData({ ...taskFormData, date: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-900" required />
                                    <input placeholder="Duration (e.g. 4 hrs)" value={taskFormData.duration} onChange={e => setTaskFormData({ ...taskFormData, duration: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-900" />
                                </div>
                                <button type="submit" className="btn-primary w-full py-5 text-lg font-black shadow-indigo-100 mt-4">DEPLOY TASK</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Progress Report Modal */}
            <AnimatePresence>
                {showReportModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowReportModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white rounded-[2rem] p-10 max-w-xl w-full relative z-10 shadow-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <DocumentTextIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Publish Progress Update</h2>
                                    <p className="text-xs font-bold text-slate-400">Recording growth for <span className="text-indigo-600">{selectedChild?.name}</span></p>
                                </div>
                            </div>
                            <form onSubmit={handleCreateReport} className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Report Title</label>
                                    <input
                                        placeholder="e.g. End of Term Results"
                                        value={reportFormData.title}
                                        onChange={e => setReportFormData({ ...reportFormData, title: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-900"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Category</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Personal', 'Academic', 'Health', 'Social'].map(cat => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setReportFormData({ ...reportFormData, category: cat })}
                                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${reportFormData.category === cat ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Detailed Content</label>
                                    <textarea
                                        placeholder="Describe the child's recent developments..."
                                        value={reportFormData.content}
                                        onChange={e => setReportFormData({ ...reportFormData, content: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-900"
                                        rows={4}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn-primary w-full py-5 text-lg font-black shadow-indigo-100 mt-4">POST BENEFEICIARY REPORT</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Admin;
