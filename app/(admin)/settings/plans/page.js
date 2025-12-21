"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";

const mockPlans = [
  {
    id: 1,
    name: "Monthly",
    duration: 30,
    price: 1500,
    active: true,
    members: 120,
    freezeAllowed: false,
  },
  {
    id: 2,
    name: "Quarterly",
    duration: 90,
    price: 4000,
    active: true,
    members: 85,
    freezeAllowed: true,
    freezeDays: 7,
  },
  {
    id: 3,
    name: "Half-Yearly",
    duration: 180,
    price: 7500,
    active: true,
    members: 35,
    freezeAllowed: true,
    freezeDays: 14,
  },
  {
    id: 4,
    name: "Annual",
    duration: 365,
    price: 12000,
    active: true,
    members: 16,
    freezeAllowed: true,
    freezeDays: 30,
  },
  {
    id: 5,
    name: "Trial",
    duration: 7,
    price: 500,
    active: false,
    members: 0,
    freezeAllowed: false,
  },
];

export default function PlansSettingsPage() {
  const router = useRouter();
  const [plans, setPlans] = useState(mockPlans);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const togglePlanStatus = (id) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Membership Plans" />

      <main className="px-4 py-4 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-blue-600 text-sm">Active Plans</p>
            <p className="text-2xl font-bold text-blue-700">
              {plans.filter((p) => p.active).length}
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-green-600 text-sm">Total Members</p>
            <p className="text-2xl font-bold text-green-700">
              {plans.reduce((sum, p) => sum + p.members, 0)}
            </p>
          </div>
        </div>

        {/* Plans List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">All Plans</h3>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 bg-black text-white rounded-lg text-sm font-medium"
            >
              + Add Plan
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-4 ${!plan.active ? "opacity-60" : ""}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        plan.active ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      <span className="text-lg">📋</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{plan.name}</p>
                      <p className="text-sm text-gray-500">
                        {plan.duration} days • {plan.members} members
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{plan.price}</p>
                    <button
                      onClick={() => togglePlanStatus(plan.id)}
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        plan.active
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {plan.active ? "Active" : "Inactive"}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {plan.freezeAllowed ? (
                      <span className="text-blue-600">
                        ❄️ Freeze: {plan.freezeDays} days allowed
                      </span>
                    ) : (
                      <span>No freeze option</span>
                    )}
                  </div>
                  <button
                    onClick={() => setEditingPlan(plan)}
                    className="text-sm text-blue-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Add/Edit Plan Modal */}
      {(showAddModal || editingPlan) && (
        <PlanModal
          plan={editingPlan}
          onClose={() => {
            setShowAddModal(false);
            setEditingPlan(null);
          }}
          onSave={(plan) => {
            if (editingPlan) {
              setPlans((prev) =>
                prev.map((p) => (p.id === plan.id ? plan : p))
              );
            } else {
              setPlans((prev) => [
                ...prev,
                { ...plan, id: Date.now(), members: 0 },
              ]);
            }
            setShowAddModal(false);
            setEditingPlan(null);
          }}
        />
      )}
    </div>
  );
}

// Plan Modal Component
function PlanModal({ plan, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: plan?.name || "",
    duration: plan?.duration || "",
    price: plan?.price || "",
    active: plan?.active ?? true,
    freezeAllowed: plan?.freezeAllowed || false,
    freezeDays: plan?.freezeDays || 0,
  });

  const updateForm = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...plan, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {plan ? "Edit Plan" : "Add New Plan"}
          </h3>
          <button onClick={onClose} className="text-gray-400">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan Name *
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
              placeholder="e.g., Monthly, Quarterly"
              value={formData.name}
              onChange={(e) => updateForm("name", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (days) *
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                placeholder="30"
                value={formData.duration}
                onChange={(e) =>
                  updateForm("duration", parseInt(e.target.value))
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                placeholder="1500"
                value={formData.price}
                onChange={(e) => updateForm("price", parseInt(e.target.value))}
                required
              />
            </div>
          </div>

          {/* Freeze Options */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Allow Freeze</span>
              <button
                type="button"
                onClick={() =>
                  updateForm("freezeAllowed", !formData.freezeAllowed)
                }
                className={`w-12 h-6 rounded-full transition ${
                  formData.freezeAllowed ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition transform ${
                    formData.freezeAllowed ? "translate-x-6" : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>

            {formData.freezeAllowed && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Max Freeze Days
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none"
                  placeholder="7"
                  value={formData.freezeDays}
                  onChange={(e) =>
                    updateForm("freezeDays", parseInt(e.target.value))
                  }
                />
              </div>
            )}
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">Active Status</span>
            <button
              type="button"
              onClick={() => updateForm("active", !formData.active)}
              className={`w-12 h-6 rounded-full transition ${
                formData.active ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transition transform ${
                  formData.active ? "translate-x-6" : "translate-x-1"
                }`}
              ></div>
            </button>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-black text-white rounded-xl font-medium"
            >
              {plan ? "Save Changes" : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
