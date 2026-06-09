"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip
} from "recharts";

const API_BASE = "https://meettrack-api.onrender.com";

const COLORS = ["#7c3aed", "#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

export default function Dashboard() {
  const [meetings, setMeetings] = useState([]);
  const [stats, setStats] = useState({
    totalMeetings: 0,
    totalItems: 0,
    completedItems: 0,
    overdueItems: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch(`${API_BASE}/meetings`);
      const data = await res.json();
      setMeetings(data);

      let totalItems = 0;
      let completedItems = 0;
      let overdueItems = 0;

      for (const meeting of data) {
        const itemsRes = await fetch(`${API_BASE}/meetings/${meeting.id}/items`);
        const items = await itemsRes.json();
        totalItems += items.length;
        completedItems += items.filter((i: any) => i.status === "done").length;
        overdueItems += items.filter((i: any) => i.status === "pending").length;
      }

      setStats({
        totalMeetings: data.length,
        totalItems,
        completedItems,
        overdueItems,
        completionRate: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
      });

      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  const pieData = [
    { name: "Completed", value: stats.completedItems },
    { name: "Pending", value: stats.overdueItems },
    { name: "Other", value: stats.totalItems - stats.completedItems - stats.overdueItems }
  ].filter(d => d.value > 0);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-purple-400 text-xl">Loading dashboard...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
          MeetTrack Analytics
        </h1>
        <p className="text-slate-400 mt-1">Track your team accountability and progress</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Meetings", value: stats.totalMeetings, icon: "📅", color: "from-purple-600 to-indigo-600" },
          { label: "Action Items", value: stats.totalItems, icon: "📋", color: "from-blue-600 to-cyan-600" },
          { label: "Completed", value: stats.completedItems, icon: "✅", color: "from-green-600 to-emerald-600" },
          { label: "Completion Rate", value: `${stats.completionRate}%`, icon: "📈", color: "from-orange-600 to-amber-600" }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
            <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-purple-300">Action Items Status</h2>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1e1e2e", border: "1px solid #3a3a5a", borderRadius: "8px" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48 text-slate-500">
              No action items yet
            </div>
          )}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-purple-300">Recent Meetings</h2>
          {meetings.length > 0 ? (
            <div className="space-y-3">
              {meetings.slice(0, 5).map((m: any, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-white">{m.title}</div>
                    <div className="text-xs text-slate-400 mt-1">
                      {new Date(m.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-purple-400 text-xs bg-purple-900/30 px-2 py-1 rounded-full">
                    tracked
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-slate-500">
              No meetings yet
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 text-purple-300">Team Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Meetings This Week", value: stats.totalMeetings, color: "text-purple-400" },
            { label: "Pending Items", value: stats.overdueItems, color: "text-red-400" },
            { label: "Done Items", value: stats.completedItems, color: "text-green-400" }
          ].map((item, i) => (
            <div key={i} className="text-center p-4 bg-slate-800 rounded-lg">
              <div className={`text-3xl font-bold ${item.color}`}>{item.value}</div>
              <div className="text-slate-400 text-sm mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <a href="/" className="text-purple-400 hover:text-purple-300 text-sm">
          Back to Home
        </a>
      </div>
    </div>
  );
}