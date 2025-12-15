"use client";

import dynamic from "next/dynamic";

const KanbanClient = dynamic(() => import("./kanban-client"), {
  ssr: false
});

export default function Page() {
  return <KanbanClient />;
}
