"use client";
import { motion } from "framer-motion";

const metrics = [
  { label: "System Uptime", value: "99.99%", color: "text-green-700", icon: "🩺" },
  { label: "Manual Checks Reduced", value: "72%", color: "text-blue-700", icon: "⚙️" },
  { label: "Providers Onboarded", value: "12,480", color: "text-purple-700", icon: "👨‍⚕️" },
];

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {metrics.map((m) => (
        <motion.div
          key={m.label}
          whileHover={{ scale: 1.04 }}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center"
        >
          <div className={`text-3xl ${m.color}`}>{m.icon}</div>
          <h2 className={`text-2xl font-bold mt-2 ${m.color}`}>{m.value}</h2>
          <p className="text-gray-500">{m.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
