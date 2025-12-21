"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/layout/Header";

export default function CustomerProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/auth/login");
        return;
      }
      setUser(data.user);
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  if (!user) return null;

  const membershipInfo = {
    plan: "Premium",
    validTill: "Dec 31, 2025",
    daysLeft: 180,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Profile" showBack={false} />

      <main className="px-4 py-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Member</h2>
              <p className="text-gray-500">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Active Member
              </span>
            </div>
          </div>
        </div>

        {/* Membership Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-6 text-white mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-300 text-sm">Membership</p>
              <p className="text-2xl font-bold">{membershipInfo.plan}</p>
            </div>
            <span className="text-3xl">🏋️</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-gray-300 text-sm">Valid Till</p>
              <p className="font-medium">{membershipInfo.validTill}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-300 text-sm">Days Left</p>
              <p className="font-medium">{membershipInfo.daysLeft}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Workouts", value: "24", icon: "💪" },
            { label: "This Month", value: "12", icon: "📅" },
            { label: "Streak", value: "5 days", icon: "🔥" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 text-center shadow-sm"
            >
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {[
            { label: "My Attendance", icon: "📋", href: "/attendance" },
            { label: "Workout Plans", icon: "🏋️", href: "/workout" },
            { label: "Diet Plans", icon: "🥗", href: "/diet" },
            { label: "Class Schedule", icon: "📅", href: "/schedule" },
            { label: "Knowledge Base", icon: "📚", href: "/knowledge" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.href)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-gray-700">{item.label}</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 py-3 text-red-500 font-medium hover:bg-red-50 rounded-xl transition"
        >
          Sign Out
        </button>
      </main>
    </div>
  );
}
