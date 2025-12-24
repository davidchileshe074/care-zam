import React from "react";
import { motion } from "framer-motion";
import { UserIcon } from "@heroicons/react/24/outline";
const Join = () => (
  <motion.main
    className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-8"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <div className="flex items-center text-pink-700 mb-6 space-x-3">
      <UserIcon className="h-8 w-8" />
      <h1 className="text-4xl font-bold">Join the ZamCare Community</h1>
    </div>
    <p className="mb-8 max-w-lg text-center text-gray-700">
      Become part of our collaborative community space to share ideas and
      support each other.
    </p>
    <form className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-4">
      <input
        type="text"
        placeholder="Username"
        className="w-full p-3 rounded border border-gray-300 focus:outline-pink-500"
        required
      />
      <input
        type="email"
        placeholder="Email Address"
        className="w-full p-3 rounded border border-gray-300 focus:outline-pink-500"
        required
      />
      <button className="w-full bg-pink-700 text-white py-3 rounded hover:bg-pink-800 transition font-semibold">
        Join Now
      </button>
    </form>
  </motion.main>
);

export default Join;
