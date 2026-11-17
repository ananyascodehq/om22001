"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { BarChart3, Layers } from "lucide-react";
import { useIsClient } from "@/hooks/useIsClient";
import type { UnitStat } from "@/components/papers/topics/types";

interface UnitBarChartCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  data: UnitStat[];
  dataKey: "marks" | "questions";
  /** Singular noun used in the tooltip: "Marks" or "Questions". */
  unitLabel: string;
  /** Tooltip row label: "Total Marks" or "Questions Count". */
  seriesLabel: string;
}

function UnitBarChartCard({
  icon,
  title,
  description,
  data,
  dataKey,
  unitLabel,
  seriesLabel,
}: UnitBarChartCardProps) {
  const isClient = useIsClient();

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">{description}</p>

      {isClient ? (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <XAxis dataKey="unit" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                formatter={(val: number) => [`${val} ${unitLabel}`, seriesLabel]}
              />
              <Bar dataKey={dataKey} radius={[6, 6, 0, 0]}>
                {data.map((entry) => (
                  <Cell key={entry.unitNum} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-xs text-slate-400">
          Loading charts...
        </div>
      )}
    </div>
  );
}

interface TopicsAnalyticsProps {
  unitStats: UnitStat[];
  /** Called when a unit progress card is clicked. */
  onSelectUnit: (unit: number) => void;
}

/** Unit weightage charts and per-unit revision progress cards. */
export function TopicsAnalytics({ unitStats, onSelectUnit }: TopicsAnalyticsProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UnitBarChartCard
          icon={<BarChart3 className="w-5 h-5 text-sky-500" />}
          title="Unit Marks Weightage (Across 4 Papers)"
          description="Total marks allotted per unit across all 4 Anna University papers (~90 marks per unit total, ~22.5 marks per exam)."
          data={unitStats}
          dataKey="marks"
          unitLabel="Marks"
          seriesLabel="Total Marks"
        />
        <UnitBarChartCard
          icon={<Layers className="w-5 h-5 text-indigo-500" />}
          title="Total Questions Count per Unit"
          description="Breakdown of 124 questions distributed across the 5 course units (Part A 2M and Part B/C 10M)."
          data={unitStats}
          dataKey="questions"
          unitLabel="Questions"
          seriesLabel="Questions Count"
        />
      </div>

      {/* Unit Revision Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {unitStats.map((u) => (
          <div
            key={u.unitNum}
            onClick={() => onSelectUnit(u.unitNum)}
            className="cursor-pointer group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 hover:border-sky-500 dark:hover:border-sky-400 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${u.color}20`, color: u.color }}
              >
                Unit {u.unitNum}
              </span>
              <span className="text-xs font-bold text-slate-500">{u.percent}%</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-sky-600 transition">
              {u.name}
            </h4>
            <div className="text-[11px] text-slate-400 mt-1 mb-3">
              {u.completed} / {u.questions} questions done
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${u.percent}%`, backgroundColor: u.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
