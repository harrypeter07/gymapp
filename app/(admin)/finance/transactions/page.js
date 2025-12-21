"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";

const mockTransactions = [
  {
    id: 1,
    name: "John Doe",
    type: "membership",
    amount: 2500,
    mode: "upi",
    date: "2025-01-15",
    status: "paid",
  },
  {
    id: 2,
    name: "Jane Smith",
    type: "personal_training",
    amount: 5000,
    mode: "cash",
    date: "2025-01-15",
    status: "paid",
  },
  {
    id: 3,
    name: "Mike Johnson",
    type: "membership",
    amount: 1000,
    mode: "card",
    date: "2025-01-14",
    status: "partial",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    type: "supplements",
    amount: 1500,
    mode: "upi",
    date: "2025-01-14",
    status: "paid",
  },
  {
    id: 5,
    name: "Tom Brown",
    type: "membership",
    amount: 2500,
    mode: "cash",
    date: "2025-01-13",
    status: "paid",
  },
  {
    id: 6,
    name: "Emily Davis",
    type: "membership",
    amount: 2500,
    mode: "upi",
    date: "2025-01-12",
    status: "paid",
  },
  {
    id: 7,
    name: "Chris Lee",
    type: "personal_training",
    amount: 3000,
    mode: "card",
    date: "2025-01-11",
    status: "paid",
  },
];

export default function TransactionsPage() {
  const [filterMode, setFilterMode] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const filteredTransactions = mockTransactions.filter((txn) => {
    const matchesMode = filterMode === "all" || txn.mode === filterMode;
    const matchesType = filterType === "all" || txn.type === filterType;
    return matchesMode && matchesType;
  });

  const totalAmount = filteredTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="All Transactions" />

      <main className="px-4 py-4 space-y-4">
        {/* Summary */}
        <div className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
              Total ({filteredTransactions.length} transactions)
            </p>
            <p className="text-2xl font-bold text-green-600">
              ₹{totalAmount.toLocaleString()}
            </p>
          </div>
          <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm">
            Export
          </button>
        </div>

        {/* Filters */}
        <div className="space-y-2">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["all", "cash", "upi", "card"].map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize whitespace-nowrap ${
                  filterMode === mode
                    ? "bg-black text-white"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["all", "membership", "personal_training", "supplements"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize whitespace-nowrap ${
                    filterType === type
                      ? "bg-black text-white"
                      : "bg-white text-gray-600 border border-gray-200"
                  }`}
                >
                  {type.replace("_", " ")}
                </button>
              )
            )}
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {filteredTransactions.map((txn) => (
              <div
                key={txn.id}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">₹</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{txn.name}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {txn.type.replace("_", " ")} • {txn.mode} •{" "}
                      {formatDate(txn.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+₹{txn.amount}</p>
                  {txn.status === "partial" && (
                    <span className="text-xs text-orange-500">Partial</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions found</p>
          </div>
        )}
      </main>
    </div>
  );
}
