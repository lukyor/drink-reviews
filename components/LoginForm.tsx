"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push("/");
    } catch (err: any) {
      setMessage(err.message || "Error signing in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      setMessage("Check your email for a confirmation link (if required).");
    } catch (err: any) {
      setMessage(err.message || "Error signing up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md">
      <form className="space-y-4" onSubmit={handleSignIn}>
        <div>
          <label className="block text-sm font-medium text-stone">Email</label>
          <input
            className="mt-1 block w-full rounded-md border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone">Password</label>
          <input
            className="mt-1 block w-full rounded-md border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>

        {message && <p className="text-sm text-red-600">{message}</p>}

        <div className="flex items-center gap-3">
          <button
            className="rounded bg-ink px-4 py-2 text-paper"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <button
            className="rounded border px-3 py-2 text-sm"
            onClick={handleSignUp}
            disabled={loading}
            type="button"
          >
            {loading ? "..." : "Create account"}
          </button>
        </div>
      </form>
    </div>
  );
}
