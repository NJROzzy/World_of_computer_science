import {
  Atom,
  Brain,
  Code2,
  Cpu,
  Database,
  Globe,
  Network,
  Server,
  ShieldCheck,
  Sigma,
  type LucideIcon,
} from "lucide-react";

import type { ArchitectureCategory } from "@/types/architecture";

export interface CategoryStyle {
  label: string;
  icon: LucideIcon;
  /* Raw colour, used for SVG strokes and the minimap. */
  color: string;
  /* Tailwind classes for the icon badge. */
  badge: string;
  /* Tailwind class for the accent bar at the top of a card. */
  bar: string;
}

/*
 * Class names are written out in full so Tailwind can find them.
 */
export const categoryStyles: Record<ArchitectureCategory, CategoryStyle> = {
  root: {
    label: "Architecture",
    icon: Network,
    color: "oklch(0.55 0 0)",
    badge: "bg-foreground text-background",
    bar: "bg-foreground",
  },
  hardware: {
    label: "Hardware",
    icon: Cpu,
    color: "oklch(0.75 0.16 70)",
    badge: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    bar: "bg-amber-500",
  },
  software: {
    label: "Software",
    icon: Code2,
    color: "oklch(0.62 0.17 250)",
    badge: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
    bar: "bg-blue-500",
  },
  theory: {
    label: "Theory",
    icon: Sigma,
    color: "oklch(0.6 0.2 295)",
    badge: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
    bar: "bg-violet-500",
  },
  networking: {
    label: "Networking",
    icon: Globe,
    color: "oklch(0.65 0.15 160)",
    badge: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    bar: "bg-emerald-500",
  },
  data: {
    label: "Data",
    icon: Database,
    color: "oklch(0.7 0.13 215)",
    badge: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
    bar: "bg-cyan-500",
  },
  systems: {
    label: "Systems",
    icon: Server,
    color: "oklch(0.55 0.2 275)",
    badge: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
    bar: "bg-indigo-500",
  },
  security: {
    label: "Security",
    icon: ShieldCheck,
    color: "oklch(0.63 0.2 15)",
    badge: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
    bar: "bg-rose-500",
  },
  intelligence: {
    label: "Intelligence",
    icon: Brain,
    color: "oklch(0.65 0.22 330)",
    badge: "bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300",
    bar: "bg-fuchsia-500",
  },
  emerging: {
    label: "Emerging",
    icon: Atom,
    color: "oklch(0.75 0.18 130)",
    badge: "bg-lime-500/15 text-lime-700 dark:text-lime-300",
    bar: "bg-lime-500",
  },
};
