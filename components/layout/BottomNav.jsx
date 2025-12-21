"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNav = [
  { label: "Dashboard", icon: "🏠", href: "/dashboard" },
  { label: "Members", icon: "👥", href: "/members" },
  { label: "Attendance", icon: "✅", href: "/attendance" },
  { label: "Finance", icon: "💰", href: "/finance" },
  { label: "More", icon: "⚙️", href: "/settings" },
];

const customerNav = [
  { label: "Home", icon: "🏠", href: "/profile" },
  { label: "Attendance", icon: "✅", href: "/attendance" },
  { label: "Workout", icon: "💪", href: "/workout" },
  { label: "Diet", icon: "🥗", href: "/diet" },
  { label: "More", icon: "📚", href: "/knowledge" },
];

export default function BottomNav({ role = "customer" }) {
  const pathname = usePathname();
  const navItems = role === "admin" ? adminNav : customerNav;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition ${
                isActive ? "text-black" : "text-gray-400"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
