"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "@/components/layout/Header";

export default function AddPaymentPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    type: "membership",
    mode: "cash",
    notes: "",
    date: new Date().toISOString().split("T")[0],
  });

  const updateForm = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    router.back();
  };

  const memberInfo = {
    name: "John Doe",
    dueAmount: 500,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Add Payment" />

      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
        {/* Member Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
              {memberInfo.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{memberInfo.name}</p>
              {memberInfo.dueAmount > 0 && (
                <p className="text-sm text-red-500">
                  Due: ₹{memberInfo.dueAmount}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount *
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none text-xl font-semibold"
              placeholder="₹ 0"
              value={formData.amount}
              onChange={(e) => updateForm("amount", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["membership", "personal_training", "supplements", "other"].map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateForm("type", type)}
                    className={`py-2 px-4 rounded-lg text-sm font-medium capitalize transition ${
                      formData.type === type
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {type.replace("_", " ")}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Mode
            </label>
            <div className="flex gap-2">
              {["cash", "upi", "card", "bank"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => updateForm("mode", mode)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition ${
                    formData.mode === mode
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none"
              value={formData.date}
              onChange={(e) => updateForm("date", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none resize-none"
              rows={2}
              placeholder="Payment notes..."
              value={formData.notes}
              onChange={(e) => updateForm("notes", e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.amount || loading}
              className="flex-1 py-3 bg-black text-white rounded-xl font-medium disabled:opacity-50"
            >
              {loading ? "Processing..." : "Record Payment"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
