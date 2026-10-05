import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import HomeExplorer from "@/components/architecture/HomeExplorer";
import SiteHeader from "@/components/SiteHeader";
import { architectureNodes, ROOT_NODE_ID } from "@/data/nodes";
import { computationJourneys } from "@/data/journeys";
import { categoryStyles } from "@/lib/categories";
import { crossRelationships, getChildren, getDescendantIds } from "@/lib/graph";
import { cn } from "@/lib/utils";

function ExplorerFallback() {
  return (
    <div className="flex h-[70vh] min-h-[480px] items-center justify-center rounded-3xl border bg-muted/30 text-sm text-muted-foreground lg:h-[calc(100vh-6rem)]">
      Loading the architecture…
    </div>
  );
}

export default function Home() {
  const domains = getChildren(ROOT_NODE_ID);

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-[1600px] px-4 pt-12 pb-8 sm:px-6 sm:pt-16">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              CS ARCHITECTURE
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Explore how computers
              <br />
              actually work.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              An interactive architecture of Computer Science — from physical
              hardware and digital logic to software, algorithms, and
              intelligent systems.
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {[
                { label: "Concepts", value: architectureNodes.length },
                { label: "Connections", value: crossRelationships.length },
                { label: "Domains", value: domains.length },
                { label: "Journeys", value: computationJourneys.length },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight tabular-nums">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          id="explore"
          className="mx-auto max-w-[1600px] scroll-mt-16 px-4 sm:px-6"
        >
          <Suspense fallback={<ExplorerFallback />}>
            <HomeExplorer />
          </Suspense>
        </section>

        <section className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">
              Every abstraction rests on another
            </h2>
            <p className="mt-3 text-muted-foreground">
              Dive into a single domain to explore it in depth, or follow its
              connections back into the rest of the architecture.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {domains.map((domain) => {
              const style = categoryStyles[domain.category];
              const Icon = style.icon;

              return (
                <li key={domain.id}>
                  <Link
                    href={`/${domain.id}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <span
                      className={cn("absolute inset-x-0 top-0 h-1", style.bar)}
                    />
                    <span
                      className={cn(
                        "mb-4 flex h-10 w-10 items-center justify-center rounded-xl",
                        style.badge
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-semibold tracking-tight">
                      {domain.title}
                    </span>
                    <span className="mt-1 mb-4 text-sm leading-6 text-muted-foreground">
                      {domain.description}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium">
                      {getDescendantIds(domain.id).length} concepts
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
