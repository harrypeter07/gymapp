"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";

const mockSchedule = [
  {
    date: "2025-01-13",
    day: "Mon",
    workout: "Chest & Triceps",
    time: "6:00 AM",
    completed: true,
  },
  {
    date: "2025-01-14",
    day: "Tue",
    workout: "Back & Biceps",
    time: "6:00 AM",
    completed: true,
  },
  {
    date: "2025-01-15",
    day: "Wed",
    workout: "Legs & Abs",
    time: "6:00 AM",
    completed: false,
    isToday: true,
  },
  {
    date: "2025-01-16",
    day: "Thu",
    workout: "Shoulders",
    time: "6:00 AM",
    completed: false,
  },
  {
    date: "2025-01-17",
    day: "Fri",
    workout: "Arms",
    time: "6:00 AM",
    completed: false,
  },
  {
    date: "2025-01-18",
    day: "Sat",
    workout: "Full Body",
    time: "7:00 AM",
    completed: false,
  },
  {
    date: "2025-01-19",
    day: "Sun",
    workout: "Rest Day",
    time: "-",
    completed: false,
    isRest: true,
  },
];

const mockGymTimings = {
  weekday: "5:00 AM - 11:00 PM",
  weekend: "6:00 AM - 10:00 PM",
  mySlot: "6:00 AM - 7:30 AM",
};

const mockUpcoming = [
  {
    id: 1,
    title: "PT Session",
    date: "Jan 18",
    time: "7:00 AM",
    type: "training",
  },
  {
    id: 2,
    title: "Body Measurement",
    date: "Jan 20",
    time: "8:00 AM",
    type: "checkup",
  },
  { id: 3, title: "Plan Renewal", date: "Jun 30", time: "-", type: "payment" },
];

export default function SchedulePage() {
  const [selectedWeek, setSelectedWeek] = useState(0);

  const getCurrentDate = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.getDate();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Schedule" showBack={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Week Selector */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setSelectedWeek((prev) => prev - 1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              ←
            </button>
            <h3 className="font-semibold text-gray-900">
              {selectedWeek === 0
                ? "This Week"
                : selectedWeek > 0
                ? "Next Week"
                : "Last Week"}
            </h3>
            <button
              onClick={() => setSelectedWeek((prev) => prev + 1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              →
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1">
            {mockSchedule.map((day) => (
              <div
                key={day.date}
                className={`text-center p-2 rounded-lg ${
                  day.isToday
                    ? "bg-black text-white"
                    : day.completed
                    ? "bg-green-100"
                    : day.isRest
                    ? "bg-gray-50"
                    : ""
                }`}
              >
                <p className="text-xs mb-1">{day.day}</p>
                <p
                  className={`text-lg font-bold ${
                    day.isToday ? "" : "text-gray-900"
                  }`}
                >
                  {getCurrentDate(mockSchedule.indexOf(day) - 2)}
                </p>
                {day.completed && !day.isToday && (
                  <span className="text-green-600 text-xs">✓</span>
                )}
                {day.isRest && <span className="text-xs">😴</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-5 text-white">
          <p className="text-purple-100 text-sm">Today - Wednesday</p>
          <h2 className="text-xl font-bold mb-3">Legs & Abs</h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <span>🕐</span> 6:00 AM
            </span>
            <span className="flex items-center gap-1">
              <span>⏱️</span> 45-60 min
            </span>
          </div>
        </div>

        {/* Weekly Schedule List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Weekly Plan</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {mockSchedule.map((day) => (
              <div
                key={day.date}
                className={`p-4 flex items-center justify-between ${
                  day.isToday ? "bg-purple-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      day.isToday
                        ? "bg-purple-600 text-white"
                        : day.completed
                        ? "bg-green-100 text-green-600"
                        : day.isRest
                        ? "bg-gray-100 text-gray-400"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {day.completed ? "✓" : day.isRest ? "😴" : day.day}
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        day.isToday ? "text-purple-900" : "text-gray-900"
                      }`}
                    >
                      {day.workout}
                    </p>
                    <p className="text-sm text-gray-500">{day.time}</p>
                  </div>
                </div>
                {day.isToday && (
                  <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                    Today
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Gym Timings */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">🏋️ Gym Timings</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Weekdays (Mon-Fri)</span>
              <span className="font-medium">{mockGymTimings.weekday}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Weekends (Sat-Sun)</span>
              <span className="font-medium">{mockGymTimings.weekend}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-100">
              <span className="text-gray-500">My Preferred Slot</span>
              <span className="font-medium text-purple-600">
                {mockGymTimings.mySlot}
              </span>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">📅 Upcoming</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {mockUpcoming.map((event) => (
              <div key={event.id} className="p-4 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    event.type === "training"
                      ? "bg-blue-100"
                      : event.type === "checkup"
                      ? "bg-green-100"
                      : "bg-orange-100"
                  }`}
                >
                  {event.type === "training"
                    ? "💪"
                    : event.type === "checkup"
                    ? "📏"
                    : "💳"}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-500">
                    {event.date} • {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
