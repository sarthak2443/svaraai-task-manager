"use client";

import dynamic from "next/dynamic";

const SignupClient = dynamic(() => import("./signup-client"), {
  ssr: false,
});

export default function Page() {
  return <SignupClient />;
}
