"use client";

import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function TotalVisitors({ type }: { type: "month" | "year" }) {
  const monthName = "Jun"; // bisa kamu ganti dengan month current (optional)

  // Data per tahun (Jan–Dec)
  const yearData = [
    { name: "Jan", total: Math.random() * 4000 + 1000 },
    { name: "Feb", total: Math.random() * 4000 + 1000 },
    { name: "Mar", total: Math.random() * 4000 + 1000 },
    { name: "Apr", total: Math.random() * 4000 + 1000 },
    { name: "May", total: Math.random() * 4000 + 1000 },
    { name: "Jun", total: Math.random() * 4000 + 1000 },
    { name: "Jul", total: Math.random() * 4000 + 1000 },
    { name: "Aug", total: Math.random() * 4000 + 1000 },
    { name: "Sep", total: Math.random() * 4000 + 1000 },
    { name: "Oct", total: Math.random() * 4000 + 1000 },
    { name: "Nov", total: Math.random() * 4000 + 1000 },
    { name: "Dec", total: Math.random() * 4000 + 1000 },
  ];

  // Data per bulan (Jun 1 – Jun 30)
  const monthData = Array.from({ length: 30 }, (_, i) => ({
    name: `${monthName} ${i + 1}`,
    total: Math.random() * 200 + 50,
  }));

  const chartData = type === "month" ? monthData : yearData;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <Tooltip
          cursor={{ fill: "rgba(0,0,0,0.05)" }}
          wrapperClassName="text-black rounded-md bg-white"
          formatter={(value) => [`${Math.round(Number(value))}`, "Pengunjung"]}
        />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          interval={type === "month" ? 3 : 0} // supaya tidak terlalu padat
        />

        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />

        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
