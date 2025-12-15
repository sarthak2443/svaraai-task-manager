"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../auth.css";

export default function SignupClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await api("/auth/signup", "POST", { email, password });
      alert("Signup successful! Please login.");
      router.push("/login");
    } catch (err) {
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrapper">
      {/* BIG APP HEADING */}
      <h1 className="app-title">Task Manager</h1>

      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>

        <form onSubmit={handleSignup}>
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link href="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
