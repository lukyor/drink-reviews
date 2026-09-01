"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function AuthStatus() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!mounted) return;
      setEmail(user?.email ?? null);
    }

    load();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (email) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-paper/90">{email}</span>
        <button
          onClick={signOut}
          className="rounded border px-3 py-1 text-sm text-paper/90"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="text-sm text-paper/80 hover:text-brass">
      Sign in
    </Link>
  );
}
