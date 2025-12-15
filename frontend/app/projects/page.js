"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await api("/projects");
      setProjects(data);
    } catch (err) {
      alert(err.message);
    }
  }

  async function createProject(e) {
    e.preventDefault();
    await api("/projects", "POST", { name, description });
    setName("");
    setDescription("");
    loadProjects();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {/* CREATE PROJECT */}
      <form onSubmit={createProject} className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
          required
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <button>Add</button>
      </form>

      {/* PROJECT LIST */}
      <div className="grid gap-3">
        {projects.map((p) => (
          <div
            key={p._id}
            className="card cursor-pointer hover:bg-gray-800 transition"
            onClick={() => router.push(`/projects/${p._id}`)}
          >
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-400">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
