"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "../../utils/api";
import { Wallet as WalletIcon, PlusCircle, ArrowUpRight, Activity } from "lucide-react";

export default function WalletPage() {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [fundAmount, setFundAmount] = useState<string>("");
  const [funding, setFunding] = useState(false);
  const [error, setError] = useState("");

  const loadWallet = async () => {
    try {
      const data = await fetchApi("/wallet");
      if (data && data.balance !== undefined) {
        setBalance(data.balance);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load wallet data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWallet();
  }, []);

  const handleFund = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(fundAmount);
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setFunding(true);
    setError("");

    try {
      const res = await fetchApi("/wallet/fund", {
        method: "POST",
        body: JSON.stringify({ amount }),
      });
      if (res && res.wallet) {
        setBalance(res.wallet.balance);
        setFundAmount("");
        alert("Wallet funded successfully!");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fund wallet.");
    } finally {
      setFunding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <Activity className="w-8 h-8 text-black animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-32 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Your Wallet</h1>
          <p className="text-gray-600 mt-2">Manage your funds and keep your payments smooth.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Balance Card */}
          <div className="md:col-span-1 bg-black text-white rounded-2xl p-8 flex flex-col justify-between shadow-xl">
            <div className="flex items-center gap-3 text-gray-300">
              <WalletIcon size={24} />
              <span className="font-medium">Total Balance</span>
            </div>
            <div className="mt-8">
              <p className="text-5xl font-bold">₦{balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className="text-sm text-gray-400 mt-2">Available for rides & delivery</p>
            </div>
          </div>

          {/* Fund Wallet Card */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Funds</h2>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleFund} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Fund (₦)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₦</span>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition text-lg font-medium"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button type="button" onClick={() => setFundAmount("1000")} className="py-2 border rounded-lg hover:bg-gray-50 font-medium">₦1,000</button>
                <button type="button" onClick={() => setFundAmount("5000")} className="py-2 border rounded-lg hover:bg-gray-50 font-medium">₦5,000</button>
                <button type="button" onClick={() => setFundAmount("10000")} className="py-2 border rounded-lg hover:bg-gray-50 font-medium">₦10,000</button>
              </div>

              <button
                type="submit"
                disabled={funding}
                className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:bg-gray-400"
              >
                {funding ? <Activity className="animate-spin" size={20} /> : <PlusCircle size={20} />}
                {funding ? "Processing..." : "Add Funds Securely"}
              </button>
            </form>
          </div>

        </div>

      </div>
    </main>
  );
}
