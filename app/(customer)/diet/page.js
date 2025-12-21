"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";

const mockDietPlan = {
  totalCalories: 2200,
  protein: 150,
  carbs: 220,
  fats: 70,
  meals: [
    {
      id: 1,
      name: "Breakfast",
      time: "7:00 AM",
      calories: 450,
      items: [
        "4 Egg Whites + 1 Whole Egg",
        "2 Whole Wheat Toast",
        "1 Banana",
        "Green Tea",
      ],
      completed: true,
    },
    {
      id: 2,
      name: "Mid-Morning Snack",
      time: "10:00 AM",
      calories: 200,
      items: ["Greek Yogurt (200g)", "Mixed Nuts (30g)"],
      completed: true,
    },
    {
      id: 3,
      name: "Lunch",
      time: "1:00 PM",
      calories: 550,
      items: [
        "Grilled Chicken (150g)",
        "Brown Rice (1 cup)",
        "Mixed Vegetables",
        "Salad",
      ],
      completed: false,
    },
    {
      id: 4,
      name: "Pre-Workout",
      time: "4:30 PM",
      calories: 250,
      items: ["1 Apple", "Peanut Butter (2 tbsp)", "Black Coffee"],
      completed: false,
    },
    {
      id: 5,
      name: "Post-Workout",
      time: "6:30 PM",
      calories: 300,
      items: ["Whey Protein Shake", "1 Banana"],
      completed: false,
    },
    {
      id: 6,
      name: "Dinner",
      time: "8:30 PM",
      calories: 450,
      items: [
        "Fish/Paneer (150g)",
        "Quinoa/Roti (2)",
        "Steamed Vegetables",
        "Dal (1 cup)",
      ],
      completed: false,
    },
  ],
};

const mockWaterIntake = {
  target: 3000,
  current: 1500,
  glasses: 6,
};

export default function DietPage() {
  const [meals, setMeals] = useState(mockDietPlan.meals);
  const [water, setWater] = useState(mockWaterIntake.current);

  const completedMeals = meals.filter((m) => m.completed).length;
  const consumedCalories = meals
    .filter((m) => m.completed)
    .reduce((sum, m) => sum + m.calories, 0);

  const toggleMeal = (id) => {
    setMeals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const addWater = () => {
    if (water < mockWaterIntake.target) {
      setWater((prev) => Math.min(prev + 250, mockWaterIntake.target));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Diet Plan" showBack={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Macros Overview */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm">Today's Target</p>
              <p className="text-2xl font-bold">
                {mockDietPlan.totalCalories} kcal
              </p>
            </div>
            <div className="text-right">
              <p className="text-green-100 text-sm">Consumed</p>
              <p className="text-xl font-semibold">{consumedCalories} kcal</p>
            </div>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <p className="text-lg font-bold">{mockDietPlan.protein}g</p>
              <p className="text-xs text-green-100">Protein</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <p className="text-lg font-bold">{mockDietPlan.carbs}g</p>
              <p className="text-xs text-green-100">Carbs</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <p className="text-lg font-bold">{mockDietPlan.fats}g</p>
              <p className="text-xs text-green-100">Fats</p>
            </div>
          </div>
        </div>

        {/* Water Tracker */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💧</span>
              <div>
                <p className="font-medium text-blue-900">Water Intake</p>
                <p className="text-sm text-blue-600">
                  {water}ml / {mockWaterIntake.target}ml
                </p>
              </div>
            </div>
            <button
              onClick={addWater}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
            >
              + 250ml
            </button>
          </div>
          <div className="h-3 bg-blue-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${(water / mockWaterIntake.target) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Meals Progress */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">Meals Completed</span>
            <span className="text-green-600 font-semibold">
              {completedMeals}/{meals.length}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${(completedMeals / meals.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Meal List */}
        <div className="space-y-3">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className={`bg-white rounded-xl p-4 shadow-sm ${
                meal.completed ? "border-l-4 border-green-500" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleMeal(meal.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      meal.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {meal.completed && "✓"}
                  </button>
                  <div>
                    <p className="font-medium text-gray-900">{meal.name}</p>
                    <p className="text-sm text-gray-500">{meal.time}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {meal.calories} kcal
                </span>
              </div>
              <div className="ml-9">
                <ul className="text-sm text-gray-600 space-y-1">
                  {meal.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Trainer Notes */}
        <div className="bg-yellow-50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">📝</span>
            <div>
              <p className="font-medium text-yellow-900">Trainer's Note</p>
              <p className="text-sm text-yellow-700">
                Focus on protein intake today. Avoid sugar and processed foods.
                Stay hydrated throughout the day.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
