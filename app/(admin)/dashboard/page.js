"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import StatCard from "@/components/shared/StatCard";
import Header from "@/components/layout/Header";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user || data.user.role !== "admin") {
        router.push("/auth/login");
        return;
      }
      setUser(data.user);
    };
    checkAuth();
  }, [router]);

  if (!user) return null;

  const stats = [
    { title: "Total Members", value: "256", change: "+12%", icon: "👥" },
    { title: "Active Today", value: "45", change: "+5%", icon: "🏃" },
    { title: "Revenue", value: "₹1.2L", change: "+8%", icon: "💰" },
    { title: "Pending Dues", value: "₹15K", change: "-3%", icon: "📋" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Dashboard" />

      <main className="px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back! 👋</h2>
          <p className="text-gray-500">Here's what's happening at your gym</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Add Member", icon: "➕", href: "/members" },
              { label: "Mark Attendance", icon: "✅", href: "/attendance" },
              { label: "Collect Payment", icon: "💳", href: "/finance" },
              { label: "View Reports", icon: "📊", href: "/analytics" },
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => router.push(action.href)}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition"
              >
                <span className="text-2xl mb-1">{action.icon}</span>
                <span className="text-xs text-gray-600 text-center">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { text: "John Doe checked in", time: "2 min ago", icon: "🟢" },
              {
                text: "Payment received from Jane",
                time: "15 min ago",
                icon: "💰",
              },
              { text: "New member registered", time: "1 hour ago", icon: "🆕" },
              {
                text: "Equipment maintenance due",
                time: "2 hours ago",
                icon: "🔧",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span>{activity.icon}</span>
                  <span className="text-sm text-gray-700">{activity.text}</span>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
