"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";

const mockWeekPlan = [
  { day: "Mon", name: "Chest & Triceps", completed: true, isToday: false },
  { day: "Tue", name: "Back & Biceps", completed: true, isToday: false },
  { day: "Wed", name: "Legs & Abs", completed: false, isToday: true },
  { day: "Thu", name: "Shoulders", completed: false, isToday: false },
  { day: "Fri", name: "Arms", completed: false, isToday: false },
  { day: "Sat", name: "Full Body", completed: false, isToday: false },
  {
    day: "Sun",
    name: "Rest Day",
    completed: false,
    isToday: false,
    isRest: true,
  },
];

const mockTodayWorkout = {
  name: "Legs & Abs",
  duration: "45-60 min",
  exercises: [
    {
      id: 1,
      name: "Squats",
      sets: 4,
      reps: "12",
      rest: "60s",
      completed: false,
    },
    {
      id: 2,
      name: "Leg Press",
      sets: 3,
      reps: "15",
      rest: "60s",
      completed: false,
    },
    {
      id: 3,
      name: "Lunges",
      sets: 3,
      reps: "12 each",
      rest: "45s",
      completed: false,
    },
    {
      id: 4,
      name: "Leg Curls",
      sets: 3,
      reps: "15",
      rest: "45s",
      completed: false,
    },
    {
      id: 5,
      name: "Calf Raises",
      sets: 4,
      reps: "20",
      rest: "30s",
      completed: false,
    },
    {
      id: 6,
      name: "Planks",
      sets: 3,
      reps: "60s",
      rest: "30s",
      completed: false,
    },
    {
      id: 7,
      name: "Crunches",
      sets: 3,
      reps: "20",
      rest: "30s",
      completed: false,
    },
  ],
};

export default function WorkoutPage() {
  const router = useRouter();
  const [exercises, setExercises] = useState(mockTodayWorkout.exercises);

  const completedCount = exercises.filter((e) => e.completed).length;
  const progress = (completedCount / exercises.length) * 100;

  const toggleExercise = (id) => {
    setExercises((prev) =>
      prev.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Workout" showBack={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Week Overview */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">This Week</h3>
          <div className="flex justify-between">
            {mockWeekPlan.map((day) => (
              <div
                key={day.day}
                className={`flex flex-col items-center ${
                  day.isToday ? "scale-110" : ""
                }`}
              >
                <span className="text-xs text-gray-500 mb-1">{day.day}</span>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    day.isToday
                      ? "bg-black text-white"
                      : day.completed
                      ? "bg-green-100 text-green-600"
                      : day.isRest
                      ? "bg-gray-100 text-gray-400"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {day.completed ? "✓" : day.isRest ? "😴" : day.day.charAt(0)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Workout Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-blue-100 text-sm">Today's Workout</p>
              <h2 className="text-xl font-bold">{mockTodayWorkout.name}</h2>
            </div>
            <span className="text-3xl">💪</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-blue-100">
            <span>⏱️ {mockTodayWorkout.duration}</span>
            <span>🏋️ {exercises.length} exercises</span>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>
                {completedCount}/{exercises.length}
              </span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Exercise List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Exercises</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className={`p-4 flex items-center gap-4 ${
                  exercise.completed ? "bg-green-50" : ""
                }`}
              >
                <button
                  onClick={() => toggleExercise(exercise.id)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    exercise.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {exercise.completed && "✓"}
                </button>
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      exercise.completed
                        ? "text-green-700 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {index + 1}. {exercise.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {exercise.sets} sets × {exercise.reps} • Rest{" "}
                    {exercise.rest}
                  </p>
                </div>
                <button
                  onClick={() =>
                    router.push(`/workout/exercise/${exercise.id}`)
                  }
                  className="text-blue-600 text-sm"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Workout Button */}
        {progress === 100 && (
          <button className="w-full py-4 bg-green-500 text-white rounded-xl font-semibold">
            🎉 Workout Complete!
          </button>
        )}
      </main>
    </div>
  );
}
