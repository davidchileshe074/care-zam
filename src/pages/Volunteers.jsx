import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HandRaisedIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  HeartIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { createVolunteer, getTasks } from "../services/firestore";
import { getCurrentUser } from "../services/authentication";

const VolunteerPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    skills: [],
    interests: []
  });

  const skillOptions = ["Teaching", "Medical", "Maintenance", "Social Media", "Fundraising", "Event Planning"];
  const interestOptions = ["Children Support", "Education", "Healthcare", "Infrastructure", "Administration"];

  useEffect(() => {
    const init = async () => {
      setUser(getCurrentUser());
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleSelection = (field, value) => {
    const current = [...formData[field]];
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter(item => item !== value) });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to volunteer");
      navigate("/auth");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await createVolunteer(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "", skills: [], interests: [] });
    } catch (err) {
      setError(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-indigo-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1559027615-cd264c707bb8?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
              <HandRaisedIcon className="h-12 w-12 text-indigo-300" />
            </div>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            Join the <span className="text-indigo-400">Movement.</span>
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto font-medium">
            Be the hands and feet of change. Whether you have an hour or a week, your skills can transform lives in our community.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-16">

        {/* Left Column: Tasks Feed */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Open Opportunities</h2>
            <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-xs font-black uppercase">
              {tasks.length} Active Tasks
            </div>
          </div>

          <div className="space-y-6">
            {loading ? (
              [1, 2, 3].map(i => <div key={i} className="h-48 bg-slate-50 rounded-3xl animate-pulse" />)
            ) : tasks.length === 0 ? (
              <div className="bg-slate-50 rounded-[2rem] p-12 text-center border-2 border-dashed border-slate-200">
                <CheckBadgeIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-bold">No specific tasks at the moment, but general applications are open!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <motion.div
                  key={task._id}
                  layout
                  className="card-premium p-8 bg-white border border-slate-100 hover:border-indigo-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${task.difficulty === 'Easy' ? 'bg-green-50 text-green-600' :
                            task.difficulty === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                          }`}>
                          {task.difficulty}
                        </span>
                        <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">{task.category}</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">{task.title}</h3>
                      <p className="text-slate-500 font-medium mb-6 leading-relaxed">{task.description}</p>

                      <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="h-5 w-5 text-indigo-500" />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5 text-indigo-500" />
                          <span>{new Date(task.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ClockIcon className="h-5 w-5 text-indigo-500" />
                          <span>{task.duration}</span>
                        </div>
                      </div>
                    </div>
                    <button className="btn-primary whitespace-nowrap !py-4 shadow-indigo-100">
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Sign up Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-32">
            <motion.div
              className="glass p-8 rounded-[2rem] border border-white shadow-2xl relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">General Application</h3>

              <AnimatePresence>
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 p-6 rounded-2xl border border-green-100 text-center"
                  >
                    <CheckBadgeIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h4 className="text-lg font-black text-green-900 mb-2">Application Received!</h4>
                    <p className="text-green-700 font-medium text-sm">Our volunteer coordinator will review your profile and reach out within 48 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Your Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {skillOptions.map(skill => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSelection('skills', skill)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${formData.skills.includes(skill)
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100'
                                : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'
                              }`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Interests</label>
                      <div className="flex flex-wrap gap-2">
                        {interestOptions.map(interest => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleSelection('interests', interest)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${formData.interests.includes(interest)
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100'
                                : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'
                              }`}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <input
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-slate-900"
                        required
                      />
                      <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-slate-900"
                        required
                      />
                      <textarea
                        name="message"
                        placeholder="Anything else we should know?"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-slate-900"
                        rows={3}
                      />
                    </div>

                    {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full py-5 text-lg font-black shadow-indigo-100 mt-4"
                    >
                      {submitting ? "Processing..." : "Submit Application"}
                    </button>
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

export default VolunteerPage;
