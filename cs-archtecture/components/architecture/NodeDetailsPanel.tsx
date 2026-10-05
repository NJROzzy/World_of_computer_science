"use client";

import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Footprints,
  Link2,
  Maximize,
  X,
} from "lucide-react";

import NodeChip from "@/components/architecture/NodeChip";
import { Button } from "@/components/ui/button";
import { ROOT_NODE_ID } from "@/data/nodes";
import { categoryStyles } from "@/lib/categories";
import {
  getAncestorIds,
  getChildren,
  getConnections,
  getDescendantIds,
  getJourneysThrough,
  getNode,
  type Connection,
} from "@/lib/graph";
import { cn } from "@/lib/utils";

interface NodeDetailsPanelProps {
  nodeId: string;
  rootId: string;
  expanded: boolean;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onExpandSubtree: (id: string) => void;
  onRevealConnections: (id: string) => void;
  onStartJourney: (id: string) => void;
  onClose: () => void;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2.5">
      <h3 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
}

/*
 * A list of relationships that reads as a sentence:
 * "<subject> <label> <object>".
 */
function ConnectionList({
  connections,
  direction,
  subject,
  rootId,
  onSelect,
}: {
  connections: Connection[];
  direction: "outgoing" | "incoming";
  subject: string;
  rootId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="space-y-2">
      {connections.map(({ relationship, node }) => (
        <li
          key={relationship.id}
          className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm"
        >
          {direction === "outgoing" ? (
            <>
              <span className="text-muted-foreground">{subject}</span>
              <span className="font-medium">{relationship.label}</span>
              <NodeChip node={node} rootId={rootId} onSelect={onSelect} />
            </>
          ) : (
            <>
              <NodeChip node={node} rootId={rootId} onSelect={onSelect} />
              <span className="font-medium">{relationship.label}</span>
              <span className="text-muted-foreground">{subject}</span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function NodeDetailsPanel({
  nodeId,
  rootId,
  expanded,
  onSelect,
  onToggle,
  onExpandSubtree,
  onRevealConnections,
  onStartJourney,
  onClose,
}: NodeDetailsPanelProps) {
  const node = getNode(nodeId);
  const style = categoryStyles[node.category];
  const Icon = style.icon;

  const ancestors = getAncestorIds(nodeId).map(getNode);
  const children = getChildren(nodeId);
  const { outgoing, incoming } = getConnections(nodeId);
  const journeys = getJourneysThrough(nodeId);
  const hasDeepDescendants =
    getDescendantIds(nodeId).length > children.length;

  return (
    <div className="space-y-6 p-5">
      {/* Breadcrumb */}
      <div className="flex items-start justify-between gap-3">
        <nav
          aria-label="Location in the architecture"
          className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground"
        >
          {ancestors.map((ancestor) => (
            <span key={ancestor.id} className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => onSelect(ancestor.id)}
                className="rounded hover:text-foreground hover:underline"
              >
                {ancestor.title}
              </button>
              <ChevronRight className="h-3 w-3" />
            </span>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close details"
        >
          <X />
        </Button>
      </div>

      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
              style.badge
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {style.label}
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              {node.title}
            </h2>
          </div>
        </div>

        <p className="text-sm leading-6 font-medium">{node.description}</p>

        {node.details && (
          <p className="text-sm leading-6 text-muted-foreground">
            {node.details}
          </p>
        )}
      </header>

      {/* Actions */}
      {(children.length > 0 || outgoing.length + incoming.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {children.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggle(nodeId)}
            >
              {expanded ? <ChevronUp /> : <ChevronDown />}
              {expanded ? "Collapse" : `Expand ${children.length} inside`}
            </Button>
          )}
          {hasDeepDescendants && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExpandSubtree(nodeId)}
            >
              <Maximize />
              Expand everything
            </Button>
          )}
          {outgoing.length + incoming.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRevealConnections(nodeId)}
            >
              <Link2 />
              Show connections
            </Button>
          )}
        </div>
      )}

      {node.examples && node.examples.length > 0 && (
        <Section title="Examples">
          <ul className="flex flex-wrap gap-1.5">
            {node.examples.map((example) => (
              <li
                key={example}
                className="rounded-md bg-muted px-2 py-1 font-mono text-xs"
              >
                {example}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {children.length > 0 && (
        <Section title={`Made of (${children.length})`}>
          <div className="flex flex-wrap gap-1.5">
            {children.map((child) => (
              <NodeChip
                key={child.id}
                node={child}
                rootId={rootId}
                onSelect={onSelect}
              />
            ))}
          </div>
        </Section>
      )}

      {outgoing.length > 0 && (
        <Section title="What is underneath this?">
          <ConnectionList
            connections={outgoing}
            direction="outgoing"
            subject={node.title}
            rootId={rootId}
            onSelect={onSelect}
          />
        </Section>
      )}

      {incoming.length > 0 && (
        <Section title="What depends on this?">
          <ConnectionList
            connections={incoming}
            direction="incoming"
            subject={node.title}
            rootId={rootId}
            onSelect={onSelect}
          />
        </Section>
      )}

      {journeys.length > 0 && (
        <Section title="Follow the computation through here">
          <ul className="space-y-2">
            {journeys.map((journey) => (
              <li key={journey.id}>
                {rootId === ROOT_NODE_ID ? (
                  <button
                    type="button"
                    onClick={() => onStartJourney(journey.id)}
                    className="flex w-full items-start gap-2 rounded-xl border p-3 text-left text-sm transition-colors hover:bg-muted"
                  >
                    <Footprints className="mt-0.5 h-4 w-4 shrink-0" />
                    {journey.question}
                  </button>
                ) : (
                  <Link
                    href={`/?journey=${journey.id}`}
                    className="flex items-start gap-2 rounded-xl border p-3 text-sm transition-colors hover:bg-muted"
                  >
                    <Footprints className="mt-0.5 h-4 w-4 shrink-0" />
                    {journey.question}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
