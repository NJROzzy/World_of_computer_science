import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ArchitectureExplorer from "@/components/architecture/ArchitectureExplorer";
import SiteHeader from "@/components/SiteHeader";
import { ROOT_NODE_ID } from "@/data/nodes";
import { categoryStyles } from "@/lib/categories";
import {
  crossRelationships,
  getChildren,
  getDescendantIds,
  getNode,
  isWithin,
  nodeById,
} from "@/lib/graph";
import { cn } from "@/lib/utils";
import type { ArchitectureNode } from "@/types/architecture";

/* Only the top-level domains get a page. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getChildren(ROOT_NODE_ID).map((domain) => ({ domain: domain.id }));
}

function getDomain(id: string): ArchitectureNode {
  const domain = nodeById.get(id);

  if (!domain || domain.parent !== ROOT_NODE_ID) notFound();

  return domain;
}

export async function generateMetadata(
  props: PageProps<"/[domain]">
): Promise<Metadata> {
  const { domain: domainId } = await props.params;
  const domain = getDomain(domainId);

  return {
    title: `${domain.title} · CS Architecture`,
    description: domain.description,
  };
}

/* A nested, readable outline of everything inside a node. */
function Outline({ node, depth = 0 }: { node: ArchitectureNode; depth?: number }) {
  const children = getChildren(node.id);

  if (children.length === 0) return null;

  return (
    <ul className={cn("space-y-4", depth > 0 && "mt-4 border-l pl-5")}>
      {children.map((child) => (
        <li key={child.id} id={child.id} className="scroll-mt-20">
          <p className="font-medium">{child.title}</p>
          <p className="mt-0.5 text-sm leading-6 text-muted-foreground">
            {child.description}
          </p>
          <Outline node={child} depth={depth + 1} />
        </li>
      ))}
    </ul>
  );
}

export default async function DomainPage(props: PageProps<"/[domain]">) {
  const { domain: domainId } = await props.params;
  const domain = getDomain(domainId);
  const style = categoryStyles[domain.category];
  const Icon = style.icon;

  /* Which other domains this one connects to, and how often. */
  const connectedDomains = new Map<string, number>();

  crossRelationships.forEach(({ source, target }) => {
    const sourceInside = isWithin(source, domain.id);
    const targetInside = isWithin(target, domain.id);

    if (sourceInside === targetInside) return;

    const outside = sourceInside ? target : source;
    const outsideDomain = getChildren(ROOT_NODE_ID).find((candidate) =>
      isWithin(outside, candidate.id)
    );

    if (outsideDomain) {
      connectedDomains.set(
        outsideDomain.id,
        (connectedDomains.get(outsideDomain.id) ?? 0) + 1
      );
    }
  });

  const sortedConnections = [...connectedDomains.entries()].sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <>
      <SiteHeader activeId={domain.id} />

      <main className="flex-1">
        <section className="mx-auto max-w-[1600px] px-4 pt-10 pb-8 sm:px-6">
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground hover:underline">
              Computer Science
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{domain.title}</span>
          </nav>

          <div className="flex items-start gap-4">
            <span
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
                style.badge
              )}
            >
              <Icon className="h-7 w-7" />
            </span>
            <div className="max-w-3xl">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                {domain.title}
              </h1>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {domain.details ?? domain.description}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] px-4 sm:px-6">
          <ArchitectureExplorer key={domain.id} rootId={domain.id} />
        </section>

        <section className="mx-auto grid max-w-[1600px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">
              Everything in {domain.title}
              <span className="ml-2 text-base font-normal text-muted-foreground">
                {getDescendantIds(domain.id).length} concepts
              </span>
            </h2>
            <Outline node={domain} />
          </div>

          {sortedConnections.length > 0 && (
            <aside>
              <h2 className="mb-2 text-lg font-semibold tracking-tight">
                Connected domains
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Links between {domain.title.toLowerCase()} and the rest of
                computer science.
              </p>
              <ul className="space-y-2">
                {sortedConnections.map(([id, count]) => {
                  const other = getNode(id);
                  const otherStyle = categoryStyles[other.category];
                  const OtherIcon = otherStyle.icon;

                  return (
                    <li key={id}>
                      <Link
                        href={`/${id}`}
                        className="flex items-center gap-3 rounded-xl border p-3 text-sm transition-colors hover:bg-muted"
                      >
                        <span
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-md",
                            otherStyle.badge
                          )}
                        >
                          <OtherIcon className="h-4 w-4" />
                        </span>
                        <span className="flex-1 font-medium">{other.title}</span>
                        <span className="text-muted-foreground tabular-nums">
                          {count}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </aside>
          )}
        </section>
      </main>
    </>
  );
}
