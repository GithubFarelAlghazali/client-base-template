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
    <main className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="p-12 rounded-md gap-5 shadow-xl flex flex-col *:flex-col *:flex [&_input]:focus:outline-none [&_input]:border-0 [&_input]:border-b [&_input]:border-b-taupe-700 [&_input]:rounded-none"
      >
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Masukkan email terdaftar"
          />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Masukkan password yang diberikan"
          />
        </label>
        {error && <p>{error}</p>}

        <button
          className="bg-taupe-700 text-taupe-100 w-full py-3 rounded-xl"
          type="submit"
          disabled={loading}
        >
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>
    </main>
  );
}
