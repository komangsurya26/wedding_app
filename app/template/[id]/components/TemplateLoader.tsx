"use client";

import React, { Suspense, lazy } from "react";
import { Invitation } from "@/src/types";

// lazy-load komponen template (komponen harus diekspor default atau named yang sesuai)
const Template1 = lazy(() => import("../components/template1/TemplateMain"));
const Template2 = lazy(() => import("../components/template2/TemplateMain"));

// map id -> komponen lazy
const MAP: Record<string, React.ComponentType<{ config: Invitation }>> = {
  "1": Template1,
  "2": Template2,
};

export default function TemplateLoader({
  id,
  config,
}: {
  id: string;
  config: Invitation;
}) {
  const Comp = MAP[id] ?? MAP["1"];

  return (
    <Suspense fallback={<Fallback />}>
      <Comp config={config} />
    </Suspense>
  );
}

function Fallback() {
  return <div className="fixed inset-0 bg-black z-[9999]"></div>;
}
