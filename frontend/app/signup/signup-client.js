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

  async function handleSignup(e) {
    e.preventDefault();

    try {
      await api("/auth/signup", "POST", { email, password });
      alert("Signup successful! Please login.");
      router.push("/login");
    } catch (err) {
      alert(err.message || "Signup failed");
    }
  }

  return (
    <div className="auth-wrapper">
      {/* 🔥 App Heading */}
      <h1 className="app-title">Task Manager</h1>

      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>

        <form onSubmit={handleSignup}>
          <input
            className="auth-input"
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

          <button className="auth-button" type="submit">
            Create Account
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
