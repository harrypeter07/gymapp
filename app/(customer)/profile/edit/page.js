"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "9876543210",
    gender: "Male",
    age: "28",
    address: "123 Main St, Mumbai",
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

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Edit Profile" />

      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
        {/* Profile Photo */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3">
            {formData.name.charAt(0)}
          </div>
          <button type="button" className="text-sm text-blue-600 font-medium">
            Change Photo
          </button>
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
              value={formData.name}
              onChange={(e) => updateForm("name", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none bg-gray-50"
              value={formData.phone}
              disabled
            />
            <p className="text-xs text-gray-400 mt-1">
              Contact admin to change phone number
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
              value={formData.email}
              onChange={(e) => updateForm("email", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                value={formData.gender}
                onChange={(e) => updateForm("gender", e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                value={formData.age}
                onChange={(e) => updateForm("age", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none"
              rows={2}
              value={formData.address}
              onChange={(e) => updateForm("address", e.target.value)}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 bg-black text-white rounded-xl font-medium disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
