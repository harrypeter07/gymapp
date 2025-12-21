"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";

export default function GymSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "FitZone Gym",
    address: "456 Fitness Road, Mumbai - 400001",
    phone: "9876543200",
    email: "info@fitzone.com",
    website: "www.fitzone.com",
    weekdayOpen: "05:00",
    weekdayClose: "23:00",
    weekendOpen: "06:00",
    weekendClose: "22:00",
    qrEnabled: true,
    qrType: "dynamic",
  });

  const updateForm = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Gym Settings" />

      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
        {/* Basic Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900">Basic Information</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gym Name *
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
              value={formData.name}
              onChange={(e) => updateForm("name", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none"
              rows={2}
              value={formData.address}
              onChange={(e) => updateForm("address", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                value={formData.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
              />
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
              placeholder="https://"
              value={formData.website}
              onChange={(e) => updateForm("website", e.target.value)}
            />
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900">Operating Hours</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weekdays (Mon - Fri)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Opening</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  value={formData.weekdayOpen}
                  onChange={(e) => updateForm("weekdayOpen", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Closing</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  value={formData.weekdayClose}
                  onChange={(e) => updateForm("weekdayClose", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weekends (Sat - Sun)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Opening</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  value={formData.weekendOpen}
                  onChange={(e) => updateForm("weekendOpen", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Closing</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  value={formData.weekendClose}
                  onChange={(e) => updateForm("weekendClose", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Settings */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">QR Code Attendance</h3>
            <button
              type="button"
              onClick={() => updateForm("qrEnabled", !formData.qrEnabled)}
              className={`w-12 h-6 rounded-full transition ${
                formData.qrEnabled ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transition transform ${
                  formData.qrEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              ></div>
            </button>
          </div>

          {formData.qrEnabled && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  QR Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["static", "dynamic"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateForm("qrType", type)}
                      className={`py-3 rounded-xl text-sm font-medium capitalize ${
                        formData.qrType === type
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {formData.qrType === "dynamic"
                    ? "QR changes every 5 minutes for security"
                    : "Single QR code for all attendance"}
                </p>
              </div>

              {/* QR Preview */}
              <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center">
                <div className="w-32 h-32 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-3">
                  <span className="text-4xl">📱</span>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 font-medium"
                >
                  Generate New QR
                </button>
              </div>
            </>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white rounded-xl font-medium disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
