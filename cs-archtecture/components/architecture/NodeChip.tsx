import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { categoryStyles } from "@/lib/categories";
import { isWithin } from "@/lib/graph";
import { cn } from "@/lib/utils";
import type { ArchitectureNode } from "@/types/architecture";

interface NodeChipProps {
  node: ArchitectureNode;
  rootId: string;
  onSelect: (id: string) => void;
  className?: string;
}

/*
 * A small clickable reference to another concept. Concepts outside the
 * subtree being explored link out to the full architecture instead.
 */
export default function NodeChip({
  node,
  rootId,
  onSelect,
  className,
}: NodeChipProps) {
  const style = categoryStyles[node.category];
  const Icon = style.icon;
  const chipClassName = cn(
    "inline-flex max-w-full items-center gap-1.5 rounded-lg border bg-background px-2 py-1 text-left text-xs font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
    className
  );

  const content = (
    <>
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded",
          style.badge
        )}
      >
        <Icon className="h-3 w-3" />
      </span>
      <span className="truncate">{node.title}</span>
    </>
  );

  if (!isWithin(node.id, rootId)) {
    return (
      <Link
        href={`/?node=${node.id}`}
        className={chipClassName}
        title="Open in the full architecture"
      >
        {content}
        <ArrowUpRight className="h-3 w-3 shrink-0 text-muted-foreground" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(node.id)}
      className={chipClassName}
    >
      {content}
    </button>
  );
}
