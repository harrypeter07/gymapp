"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";

// Mock data
const mockMemberGrowth = {
  weekly: [
    { label: "Mon", value: 3 },
    { label: "Tue", value: 1 },
    { label: "Wed", value: 2 },
    { label: "Thu", value: 0 },
    { label: "Fri", value: 4 },
    { label: "Sat", value: 2 },
    { label: "Sun", value: 1 },
  ],
  monthly: [
    { label: "Week 1", value: 12 },
    { label: "Week 2", value: 8 },
    { label: "Week 3", value: 15 },
    { label: "Week 4", value: 10 },
  ],
  total: 45,
  change: 12.5,
};

const mockAttendance = {
  data: [
    { label: "Mon", value: 45 },
    { label: "Tue", value: 52 },
    { label: "Wed", value: 48 },
    { label: "Thu", value: 55 },
    { label: "Fri", value: 60 },
    { label: "Sat", value: 70 },
    { label: "Sun", value: 35 },
  ],
  avgDaily: 52,
  peakDay: "Saturday",
  peakTime: "6:00 AM - 8:00 AM",
};

const mockDropoffs = [
  {
    id: 1,
    name: "John Doe",
    lastVisit: "Jan 05",
    daysMissed: 10,
    status: "warning",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastVisit: "Dec 28",
    daysMissed: 18,
    status: "critical",
  },
  {
    id: 3,
    name: "Mike Johnson",
    lastVisit: "Jan 08",
    daysMissed: 7,
    status: "warning",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    lastVisit: "Dec 20",
    daysMissed: 26,
    status: "critical",
  },
];

const mockRevenue = {
  monthly: [
    { month: "Oct", revenue: 95000, attendance: 1200 },
    { month: "Nov", revenue: 110000, attendance: 1350 },
    { month: "Dec", revenue: 125000, attendance: 1500 },
    { month: "Jan", revenue: 98000, attendance: 1100 },
  ],
  correlation: 0.87,
};

const mockPlanPopularity = [
  { plan: "Monthly", members: 120, percentage: 47, color: "bg-blue-500" },
  { plan: "Quarterly", members: 85, percentage: 33, color: "bg-green-500" },
  { plan: "Half-Yearly", members: 35, percentage: 14, color: "bg-purple-500" },
  { plan: "Annual", members: 16, percentage: 6, color: "bg-orange-500" },
];

const mockStats = {
  totalMembers: 256,
  activeMembers: 198,
  retentionRate: 78,
  avgAttendance: 4.2,
};

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("month");
  const [activeSection, setActiveSection] = useState("overview");

  const maxAttendance = Math.max(...mockAttendance.data.map((d) => d.value));

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Analytics" showBack={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Date Range Filter */}
        <div className="flex gap-2">
          {["week", "month", "quarter", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                dateRange === range
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["overview", "members", "attendance", "revenue"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap ${
                activeSection === section
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Overview Section */}
        {activeSection === "overview" && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                title="Total Members"
                value={mockStats.totalMembers}
                icon="👥"
                change="+12"
                changeType="positive"
              />
              <MetricCard
                title="Active Members"
                value={mockStats.activeMembers}
                icon="✅"
                change="+8"
                changeType="positive"
              />
              <MetricCard
                title="Retention Rate"
                value={`${mockStats.retentionRate}%`}
                icon="🔄"
                change="-2%"
                changeType="negative"
              />
              <MetricCard
                title="Avg. Visits/Week"
                value={mockStats.avgAttendance}
                icon="📅"
                change="+0.3"
                changeType="positive"
              />
            </div>

            {/* Plan Popularity */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">
                Plan Popularity
              </h3>
              <div className="space-y-3">
                {mockPlanPopularity.map((plan) => (
                  <div key={plan.plan}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{plan.plan}</span>
                      <span className="font-medium">
                        {plan.members} members ({plan.percentage}%)
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${plan.color} rounded-full`}
                        style={{ width: `${plan.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Insights */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-4 text-white">
              <h3 className="font-semibold mb-3">💡 Quick Insights</h3>
              <ul className="space-y-2 text-sm text-purple-100">
                <li>• Saturday has highest attendance (70 avg)</li>
                <li>• Monthly plans are most popular (47%)</li>
                <li>• 4 members haven't visited in 7+ days</li>
                <li>• Revenue correlates 87% with attendance</li>
              </ul>
            </div>
          </>
        )}

        {/* Members Section */}
        {activeSection === "members" && (
          <>
            {/* Member Growth Chart */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Member Growth</h3>
                <span className="text-green-600 text-sm font-medium">
                  +{mockMemberGrowth.change}%
                </span>
              </div>
              <div className="flex items-end justify-between h-32 gap-2">
                {mockMemberGrowth.weekly.map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{
                        height: `${(day.value / 5) * 100}%`,
                        minHeight: day.value > 0 ? "8px" : "0",
                      }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {day.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">New Members</p>
                  <p className="text-xl font-bold text-gray-900">
                    {mockMemberGrowth.total}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="text-xl font-bold text-green-600">+13</p>
                </div>
              </div>
            </div>

            {/* Drop-off Detection */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  ⚠️ Drop-off Alert
                </h3>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  {mockDropoffs.length} members
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {mockDropoffs.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          member.status === "critical"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Last: {member.lastVisit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          member.status === "critical"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {member.daysMissed} days
                      </p>
                      <p className="text-xs text-gray-500">missed</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Attendance Section */}
        {activeSection === "attendance" && (
          <>
            {/* Attendance Chart */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">
                Weekly Attendance
              </h3>
              <div className="flex items-end justify-between h-40 gap-2">
                {mockAttendance.data.map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <span className="text-xs font-medium text-gray-900 mb-1">
                      {day.value}
                    </span>
                    <div
                      className="w-full bg-green-500 rounded-t"
                      style={{
                        height: `${(day.value / maxAttendance) * 100}%`,
                      }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {day.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-green-600 text-sm">Avg Daily</p>
                <p className="text-2xl font-bold text-green-700">
                  {mockAttendance.avgDaily}
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-blue-600 text-sm">Peak Day</p>
                <p className="text-2xl font-bold text-blue-700">
                  {mockAttendance.peakDay}
                </p>
              </div>
            </div>

            {/* Peak Hours */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Peak Hours</h3>
              <div className="space-y-3">
                {[
                  {
                    time: "6:00 AM - 8:00 AM",
                    percentage: 35,
                    label: "Morning Rush",
                  },
                  {
                    time: "5:00 PM - 7:00 PM",
                    percentage: 40,
                    label: "Evening Rush",
                  },
                  {
                    time: "8:00 AM - 12:00 PM",
                    percentage: 15,
                    label: "Mid Morning",
                  },
                  {
                    time: "12:00 PM - 5:00 PM",
                    percentage: 10,
                    label: "Afternoon",
                  },
                ].map((slot, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{slot.time}</span>
                      <span className="font-medium">{slot.percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${slot.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consistency Score */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Consistency Score</p>
                  <p className="text-3xl font-bold">78%</p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
              <p className="text-sm text-green-100 mt-2">
                78% of active members visit 3+ times per week
              </p>
            </div>
          </>
        )}

        {/* Revenue Section */}
        {activeSection === "revenue" && (
          <>
            {/* Revenue vs Attendance */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">
                Revenue vs Attendance
              </h3>
              <div className="space-y-4">
                {mockRevenue.monthly.map((month, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{month.month}</span>
                      <span className="text-gray-500">
                        ₹{(month.revenue / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div
                        className="h-3 bg-blue-500 rounded-l"
                        style={{ width: `${(month.revenue / 130000) * 50}%` }}
                      ></div>
                      <div
                        className="h-3 bg-green-500 rounded-r"
                        style={{ width: `${(month.attendance / 1600) * 50}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">Attendance</span>
                </div>
              </div>
            </div>

            {/* Correlation Card */}
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm">
                    Revenue-Attendance Correlation
                  </p>
                  <p className="text-3xl font-bold text-blue-700">
                    {mockRevenue.correlation * 100}%
                  </p>
                </div>
                <span className="text-4xl">📈</span>
              </div>
              <p className="text-sm text-blue-600 mt-2">
                Strong positive correlation - more attendance = more revenue
              </p>
            </div>

            {/* Revenue Breakdown */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">
                Revenue Sources
              </h3>
              <div className="space-y-3">
                {[
                  { source: "Memberships", amount: 95000, percentage: 76 },
                  {
                    source: "Personal Training",
                    amount: 18000,
                    percentage: 14,
                  },
                  { source: "Supplements", amount: 8000, percentage: 6 },
                  { source: "Other", amount: 4000, percentage: 4 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.source}</span>
                      <span className="font-medium">
                        ₹{(item.amount / 1000).toFixed(0)}K ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Download Report Button */}
        <button className="w-full py-3 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-2">
          <span>📥</span>
          Download Report
        </button>
      </main>
    </div>
  );
}

// Metric Card Component
function MetricCard({ title, value, icon, change, changeType }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl">{icon}</span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            changeType === "positive"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{title}</p>
    </div>
  );
}
