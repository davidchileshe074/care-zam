import React, { useEffect, useState } from "react";
import { getStories } from "../services/firestore";
import { motion } from "framer-motion";
import { BookOpenIcon, UserCircleIcon, CalendarIcon } from "@heroicons/react/24/outline";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const data = await getStories();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Section */}
      <section className="bg-indigo-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Backdrop" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6 tracking-tighter"
          >
            Success <span className="text-indigo-400">Stories</span>
          </motion.h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto font-medium">
            Real impact, real lives. Discover how your contributions are transforming the futures of orphaned children in Zambia.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
          </div>
        ) : stories.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-20 text-center shadow-xl border border-slate-100">
            <BookOpenIcon className="h-16 w-16 text-slate-300 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-slate-900 mb-2">No stories yet</h2>
            <p className="text-slate-500 font-bold">We're currently writing beautiful new chapters. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <motion.article
                key={story._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="card-premium bg-white group cursor-pointer"
              >
                <div className="h-64 overflow-hidden relative rounded-t-2xl">
                  <img
                    src={story.imageUrl || "https://images.unsplash.com/photo-1526662092594-e98c1e356d6a?q=80&w=2071&auto=format&fit=crop"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={story.title}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black text-indigo-600 uppercase tracking-widest shadow-lg">
                    {story.category}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-slate-900 mb-4 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-slate-500 line-clamp-3 mb-6 font-medium leading-relaxed">
                    {story.content}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <UserCircleIcon className="h-5 w-5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">ZamCare Admin</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-500">
                        {new Date(story.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
