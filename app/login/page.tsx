"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan, coba lagi.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Tidak bisa terhubung ke server.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center p-6 antialiased">
      <div className="w-full md:w-md bg-white border border-stone-100 rounded-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-serif font-medium tracking-tight text-taupe-800">
            Login ke Dashboard Tamu
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wider text-taupe-800/80">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
              className="w-full px-0 py-2.5 bg-transparent border-b border-stone-200 text-stone-800 placeholder-stone-300 text-sm transition-colors duration-200 focus:outline-none focus:border-taupe-800"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wider text-taupe-800/80">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-0 py-2.5 bg-transparent border-b border-stone-200 text-stone-800 placeholder-stone-300 text-sm transition-colors duration-200 focus:outline-none focus:border-taupe-800"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-100 text-rose-700 text-xs text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-taupe-800 hover:bg-taupe-800/90 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </main>
  );
}
