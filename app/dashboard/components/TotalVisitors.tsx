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
    { name: "Jan", total: 1000 },
    { name: "Feb", total: 4000 },
    { name: "Mar", total: 3000 },
    { name: "Apr", total: 2000 },
    { name: "May", total: 1500 },
    { name: "Jun", total: 1800 },
    { name: "Jul", total: 1900 },
    { name: "Aug", total: 1700 },
    { name: "Sep", total: 1600 },
    { name: "Oct", total: 1200 },
    { name: "Nov", total: 7000 },
    { name: "Dec", total: 9000 },
  ];

  // Data per bulan (Jun 1 – Jun 30)
  const monthData = Array.from({ length: 30 }, (_, i) => ({
    name: `${monthName} ${i + 1}`,
    total: 10 + i * 2,
  }));

  const chartData = type === "month" ? monthData : yearData;

  return (
    <div className="overflow-x-auto">
      <div className="w-[600px] sm:w-full h-[350px]">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              wrapperClassName="text-black rounded-md bg-white"
              formatter={(value) => [
                `${Math.round(Number(value))}`,
                "Pengunjung",
              ]}
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
      </div>
    </div>
  );
}
