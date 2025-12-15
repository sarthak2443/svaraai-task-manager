"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";

const COLUMNS = [
  { key: "todo", title: "Todo" },
  { key: "in-progress", title: "In Progress" },
  { key: "done", title: "Done" }
];

export default function KanbanClient() {
  const { id } = useParams();
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    loadTasks();
  }, [id]);

  async function loadTasks() {
    const data = await api(`/tasks?projectId=${id}`);
    setTasks(data);
  }

  async function createTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    await api("/tasks", "POST", {
      title: title.trim(),
      priority,
      status: "todo",
      projectId: id
    });

    setTitle("");
    setPriority("medium");
    loadTasks();
  }

  async function updateStatus(taskId, status) {
    await api(`/tasks/${taskId}`, "PUT", { status });
    loadTasks();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>

      <form onSubmit={createTask} className="flex gap-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {COLUMNS.map((col) => (
          <div key={col.key} className="kanban-column">
            <h2 className="font-semibold mb-3">{col.title}</h2>

            {tasks
              .filter((t) => t.status === col.key)
              .map((task) => (
                <div key={task._id} className="task-card">
                  <p className="font-medium">{task.title}</p>

                  <div className="flex justify-between items-center mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        task.priority === "high"
                          ? "bg-red-600"
                          : task.priority === "medium"
                          ? "bg-yellow-600"
                          : "bg-green-600"
                      }`}
                    >
                      {task.priority}
                    </span>

                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateStatus(task._id, e.target.value)
                      }
                      className="text-xs"
                    >
                      <option value="todo">Todo</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
