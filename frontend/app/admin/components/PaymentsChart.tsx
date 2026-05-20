"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 6000 },
  { month: "Mar", revenue: 8000 },
];

export default function PaymentsChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">

      <h2 className="font-semibold mb-4">Revenue</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}