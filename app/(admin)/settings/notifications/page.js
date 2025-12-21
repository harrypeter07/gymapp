"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";

export default function NotificationsSettingsPage() {
  const [settings, setSettings] = useState({
    // Attendance Alerts
    attendanceReminder: true,
    attendanceReminderTime: "06:00",
    noShowAlert: true,
    noShowDays: 3,

    // Payment Reminders
    paymentReminder: true,
    paymentReminderDays: 3,
    overdueAlert: true,

    // Member Notifications
    welcomeMessage: true,
    birthdayWishes: true,
    expiryReminder: true,
    expiryReminderDays: 7,

    // Channels
    whatsappEnabled: true,
    smsEnabled: false,
    pushEnabled: true,
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Notifications" />

      <main className="px-4 py-4 space-y-4">
        {/* Notification Channels */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900">Notification Channels</h3>

          <ToggleItem
            icon="💬"
            title="WhatsApp"
            description="Send notifications via WhatsApp"
            enabled={settings.whatsappEnabled}
            onToggle={() =>
              updateSetting("whatsappEnabled", !settings.whatsappEnabled)
            }
          />

          <ToggleItem
            icon="📱"
            title="SMS"
            description="Send notifications via SMS"
            enabled={settings.smsEnabled}
            onToggle={() => updateSetting("smsEnabled", !settings.smsEnabled)}
            badge="Extra charges apply"
          />

          <ToggleItem
            icon="🔔"
            title="Push Notifications"
            description="In-app push notifications"
            enabled={settings.pushEnabled}
            onToggle={() => updateSetting("pushEnabled", !settings.pushEnabled)}
          />
        </div>

        {/* Attendance Alerts */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900">Attendance Alerts</h3>

          <ToggleItem
            icon="⏰"
            title="Daily Reminder"
            description="Remind members to visit gym"
            enabled={settings.attendanceReminder}
            onToggle={() =>
              updateSetting("attendanceReminder", !settings.attendanceReminder)
            }
          />

          {settings.attendanceReminder && (
            <div className="ml-12">
              <label className="text-sm text-gray-600">Reminder Time</label>
              <input
                type="time"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none mt-1"
                value={settings.attendanceReminderTime}
                onChange={(e) =>
                  updateSetting("attendanceReminderTime", e.target.value)
                }
              />
            </div>
          )}

          <ToggleItem
            icon="⚠️"
            title="No-Show Alert"
            description="Alert when member misses gym"
            enabled={settings.noShowAlert}
            onToggle={() => updateSetting("noShowAlert", !settings.noShowAlert)}
          />

          {settings.noShowAlert && (
            <div className="ml-12">
              <label className="text-sm text-gray-600">Alert after days</label>
              <select
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none mt-1"
                value={settings.noShowDays}
                onChange={(e) =>
                  updateSetting("noShowDays", parseInt(e.target.value))
                }
              >
                <option value={2}>2 days</option>
                <option value={3}>3 days</option>
                <option value={5}>5 days</option>
                <option value={7}>7 days</option>
              </select>
            </div>
          )}
        </div>

        {/* Payment Reminders */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900">Payment Reminders</h3>

          <ToggleItem
            icon="💳"
            title="Payment Reminder"
            description="Remind before plan expires"
            enabled={settings.paymentReminder}
            onToggle={() =>
              updateSetting("paymentReminder", !settings.paymentReminder)
            }
          />

          {settings.paymentReminder && (
            <div className="ml-12">
              <label className="text-sm text-gray-600">
                Days before expiry
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none mt-1"
                value={settings.paymentReminderDays}
                onChange={(e) =>
                  updateSetting("paymentReminderDays", parseInt(e.target.value))
                }
              >
                <option value={1}>1 day</option>
                <option value={3}>3 days</option>
                <option value={5}>5 days</option>
                <option value={7}>7 days</option>
              </select>
            </div>
          )}

          <ToggleItem
            icon="🔴"
            title="Overdue Alert"
            description="Alert for overdue payments"
            enabled={settings.overdueAlert}
            onToggle={() =>
              updateSetting("overdueAlert", !settings.overdueAlert)
            }
          />
        </div>

        {/* Member Notifications */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900">Member Notifications</h3>

          <ToggleItem
            icon="👋"
            title="Welcome Message"
            description="Send welcome on registration"
            enabled={settings.welcomeMessage}
            onToggle={() =>
              updateSetting("welcomeMessage", !settings.welcomeMessage)
            }
          />

          <ToggleItem
            icon="🎂"
            title="Birthday Wishes"
            description="Send birthday greetings"
            enabled={settings.birthdayWishes}
            onToggle={() =>
              updateSetting("birthdayWishes", !settings.birthdayWishes)
            }
          />

          <ToggleItem
            icon="📅"
            title="Expiry Reminder"
            description="Remind about plan expiry"
            enabled={settings.expiryReminder}
            onToggle={() =>
              updateSetting("expiryReminder", !settings.expiryReminder)
            }
          />

          {settings.expiryReminder && (
            <div className="ml-12">
              <label className="text-sm text-gray-600">
                Days before expiry
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none mt-1"
                value={settings.expiryReminderDays}
                onChange={(e) =>
                  updateSetting("expiryReminderDays", parseInt(e.target.value))
                }
              >
                <option value={3}>3 days</option>
                <option value={5}>5 days</option>
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
              </select>
            </div>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-3 bg-black text-white rounded-xl font-medium"
        >
          Save Settings
        </button>
      </main>
    </div>
  );
}

// Toggle Item Component
function ToggleItem({ icon, title, description, enabled, onToggle, badge }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-gray-900">{title}</p>
            {badge && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`w-12 h-6 rounded-full transition ${
          enabled ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow transition transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        ></div>
      </button>
    </div>
  );
}
