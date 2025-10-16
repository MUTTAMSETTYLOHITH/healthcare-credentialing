"use client";
import { motion } from "framer-motion";

export default function MetricCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: string;
  icon: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col items-center text-center"
    >
      <div className={`text-3xl ${color}`}>{icon}</div>
      <h2 className={`text-2xl font-bold mt-2 ${color}`}>{value}</h2>
      <p className="text-gray-500">{label}</p>
    </motion.div>
  );
}
