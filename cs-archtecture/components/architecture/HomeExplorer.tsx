"use client";

import { useSearchParams } from "next/navigation";

import ArchitectureExplorer from "@/components/architecture/ArchitectureExplorer";

/*
 * The full architecture, opened at whatever ?node= or ?journey= the URL
 * asks for. Must be rendered inside a <Suspense> boundary.
 */
export default function HomeExplorer() {
  const searchParams = useSearchParams();

  return (
    <ArchitectureExplorer
      initialNodeId={searchParams.get("node")}
      initialJourneyId={searchParams.get("journey")}
      syncUrl
    />
  );
}
