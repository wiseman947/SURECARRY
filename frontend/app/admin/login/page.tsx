"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@surecarry.com" && password === "admin123") {
      router.push("/admin");
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >

        <h1 className="text-xl font-bold mb-6">
          Sure Carry Admin Login
        </h1>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
          Login
        </button>

      </form>

    </div>
  );
}