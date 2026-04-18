"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", revenue: 400 },
  { name: "Tue", revenue: 800 },
  { name: "Wed", revenue: 600 },
  { name: "Thu", revenue: 900 },
  { name: "Fri", revenue: 1200 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
      <h2 className="font-semibold mb-4">Revenue Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}