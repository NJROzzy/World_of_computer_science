import Link from "next/link";
import { Network } from "lucide-react";

import { ROOT_NODE_ID } from "@/data/nodes";
import { categoryStyles } from "@/lib/categories";
import { getChildren } from "@/lib/graph";
import { cn } from "@/lib/utils";

export default function SiteHeader({ activeId }: { activeId?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background">
            <Network className="h-4 w-4" />
          </span>
          CS Architecture
        </Link>

        <nav
          aria-label="Domains"
          className="-mx-2 flex min-w-0 gap-1 overflow-x-auto px-2 text-sm [scrollbar-width:none]"
        >
          {getChildren(ROOT_NODE_ID).map((domain) => {
            const Icon = categoryStyles[domain.category].icon;

            return (
              <Link
                key={domain.id}
                href={`/${domain.id}`}
                aria-current={domain.id === activeId ? "page" : undefined}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  domain.id === activeId && "bg-muted font-medium text-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {domain.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
