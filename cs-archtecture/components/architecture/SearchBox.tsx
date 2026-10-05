"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";

import { categoryStyles } from "@/lib/categories";
import { getAncestorIds, getNode, searchNodes } from "@/lib/graph";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  rootId: string;
  onPick: (id: string) => void;
}

export default function SearchBox({ rootId, onPick }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const results = useMemo(() => searchNodes(query, rootId), [query, rootId]);

  /* Press "/" anywhere to jump to search. */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;

      if (event.key !== "/" || target?.closest("input, textarea")) return;

      event.preventDefault();
      inputRef.current?.focus();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function pick(id: string) {
    onPick(id);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  }

  const showResults = open && query.trim().length > 0;

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        ref={inputRef}
        type="search"
        value={query}
        placeholder="Search concepts…"
        aria-label="Search concepts"
        role="combobox"
        aria-expanded={showResults}
        aria-controls={listId}
        aria-activedescendant={
          showResults && results[activeIndex]
            ? `${listId}-${results[activeIndex].id}`
            : undefined
        }
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((index) => Math.min(index + 1, results.length - 1));
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((index) => Math.max(index - 1, 0));
          } else if (event.key === "Enter" && results[activeIndex]) {
            pick(results[activeIndex].id);
          } else if (event.key === "Escape") {
            setQuery("");
            inputRef.current?.blur();
          }
        }}
        className="h-10 w-full rounded-xl border bg-background/90 pr-10 pl-9 text-sm shadow-sm backdrop-blur outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/30"
      />
      <kbd className="pointer-events-none absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded border bg-muted px-1.5 font-mono text-[11px] text-muted-foreground">
        /
      </kbd>

      {showResults && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-12 max-h-80 overflow-y-auto rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg"
        >
          {results.length === 0 && (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              No concepts match “{query}”.
            </li>
          )}

          {results.map((node, index) => {
            const style = categoryStyles[node.category];
            const Icon = style.icon;
            const parent = getAncestorIds(node.id).at(-1);

            return (
              <li
                key={node.id}
                id={`${listId}-${node.id}`}
                role="option"
                aria-selected={index === activeIndex}
                /* mousedown fires before the input's blur closes the list */
                onMouseDown={(event) => {
                  event.preventDefault();
                  pick(node.id);
                }}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5",
                  index === activeIndex && "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                    style.badge
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {node.title}
                  </span>
                  {parent && (
                    <span className="block truncate text-xs text-muted-foreground">
                      in {getNode(parent).title}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
