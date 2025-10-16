"use client";
import { motion } from "framer-motion";

type Props = {
  label: string;
  value: string;
  delta?: string;
  tone?: "ok" | "warn" | "bad" | "info";
  spark?: number[];
};

const toneMap: Record<NonNullable<Props["tone"]>, string> = {
  ok: "text-green-700",
  warn: "text-amber-700",
  bad: "text-rose-700",
  info: "text-blue-700",
};

export default function KpiCard({ label, value, delta, tone = "info", spark = [] }: Props) {
  return (
    <motion.div whileHover={{ y: -2 }} className="glass rounded-xl border border-gray-200 shadow-sm p-5">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-1 flex items-end gap-2">
        <div className="text-2xl font-semibold">{value}</div>
        {delta && <div className={`text-xs ${toneMap[tone]}`}>{delta}</div>}
      </div>
      {spark.length > 0 && (
        <svg viewBox="0 0 100 24" className="mt-3 w-full h-6">
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-600"
            points={spark.map((v, i) => `${(i * 100) / (spark.length - 1)},${24 - Math.max(0, Math.min(24, v))}`).join(" ")}
          />
        </svg>
      )}
    </motion.div>
  );
}


