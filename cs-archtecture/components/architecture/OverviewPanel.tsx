"use client";

import Link from "next/link";
import { Footprints, MousePointerClick } from "lucide-react";

import NodeChip from "@/components/architecture/NodeChip";
import { computationJourneys } from "@/data/journeys";
import { ROOT_NODE_ID } from "@/data/nodes";
import { categoryStyles } from "@/lib/categories";
import { getChildren, getNode, isWithin } from "@/lib/graph";
import { cn } from "@/lib/utils";

interface OverviewPanelProps {
  rootId: string;
  onSelect: (id: string) => void;
  onStartJourney: (id: string) => void;
}

/*
 * What the side panel shows when nothing is selected: an introduction,
 * the computation journeys and a colour legend.
 */
export default function OverviewPanel({
  rootId,
  onSelect,
  onStartJourney,
}: OverviewPanelProps) {
  const root = getNode(rootId);
  const isFullArchitecture = rootId === ROOT_NODE_ID;

  /* On a domain page, show the journeys that pass through that domain. */
  const journeys = isFullArchitecture
    ? computationJourneys
    : computationJourneys.filter((journey) =>
        journey.steps.some((step) => isWithin(step.nodeId, rootId))
      );

  return (
    <div className="space-y-7 p-5">
      <header className="space-y-2">
        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {isFullArchitecture ? "Start exploring" : "Domain"}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">{root.title}</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          {root.details ?? root.description}
        </p>
      </header>

      <div className="flex gap-3 rounded-2xl border bg-background p-4 text-sm leading-6">
        <MousePointerClick className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">Click a node</span> to
          see what it depends on and what depends on it.{" "}
          <span className="font-medium text-foreground">Expand</span> to look
          inside. Press{" "}
          <kbd className="rounded border bg-muted px-1 font-mono text-xs">/</kbd>{" "}
          to search.
        </p>
      </div>

      {journeys.length > 0 && (
        <section className="space-y-3">
          <div>
            <h3 className="font-semibold tracking-tight">
              Follow the computation
            </h3>
            <p className="text-sm text-muted-foreground">
              Trace a real operation step by step through the layers.
            </p>
          </div>

          <ul className="space-y-2">
            {journeys.map((journey) => {
              const className =
                "group flex w-full items-start gap-3 rounded-xl border bg-background p-3 text-left transition-colors hover:border-foreground/30 hover:bg-muted/50";
              const content = (
                <>
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted transition-transform group-hover:scale-105">
                    <Footprints className="h-4 w-4" />
                  </span>
                  <span className="space-y-0.5">
                    <span className="block text-sm font-medium">
                      {journey.question}
                    </span>
                    <span className="block text-xs leading-5 text-muted-foreground">
                      {journey.steps.length} steps · {journey.summary}
                    </span>
                  </span>
                </>
              );

              return (
                <li key={journey.id}>
                  {isFullArchitecture ? (
                    <button
                      type="button"
                      onClick={() => onStartJourney(journey.id)}
                      className={className}
                    >
                      {content}
                    </button>
                  ) : (
                    <Link href={`/?journey=${journey.id}`} className={className}>
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="space-y-3">
        <h3 className="font-semibold tracking-tight">
          {isFullArchitecture ? "Domains" : "Inside this domain"}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {getChildren(rootId).map((child) => (
            <NodeChip
              key={child.id}
              node={child}
              rootId={rootId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold tracking-tight">Legend</h3>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {Object.entries(categoryStyles)
            .filter(([category]) => category !== "root")
            .map(([category, style]) => {
              const Icon = style.icon;

              return (
                <li key={category} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md",
                      style.badge
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {style.label}
                </li>
              );
            })}
        </ul>
        <div className="space-y-1.5 pt-1 text-xs text-muted-foreground">
          <p className="flex items-center gap-2">
            <span className="h-px w-6 bg-border" /> contains
          </p>
          <p className="flex items-center gap-2">
            <span className="w-6 border-t-2 border-dashed border-muted-foreground" />{" "}
            depends on / connects to (shown on selection)
          </p>
        </div>
      </section>

      {!isFullArchitecture && (
        <p className="text-xs text-muted-foreground">
          <Link href="/" className="underline underline-offset-4">
            Open the full architecture
          </Link>{" "}
          to see how this domain connects to everything else.
        </p>
      )}
    </div>
  );
}
