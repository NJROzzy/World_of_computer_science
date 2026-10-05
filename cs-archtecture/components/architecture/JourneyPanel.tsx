"use client";

import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { categoryStyles } from "@/lib/categories";
import { getNode } from "@/lib/graph";
import { cn } from "@/lib/utils";
import type { ComputationJourney } from "@/types/architecture";

interface JourneyPanelProps {
  journey: ComputationJourney;
  step: number;
  onStep: (step: number) => void;
  onExit: () => void;
  /* Leave the journey and open the details for a concept. */
  onInspect: (id: string) => void;
}

export default function JourneyPanel({
  journey,
  step,
  onStep,
  onExit,
  onInspect,
}: JourneyPanelProps) {
  const current = journey.steps[step];
  const currentNode = getNode(current.nodeId);
  const style = categoryStyles[currentNode.category];
  const isFirst = step === 0;
  const isLast = step === journey.steps.length - 1;

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Follow the computation
          </p>
          <h2 className="text-lg leading-snug font-semibold tracking-tight">
            {journey.question}
          </h2>
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onExit}
          aria-label="Exit journey"
        >
          <X />
        </Button>
      </div>

      {/* Progress */}
      <div
        className="flex gap-1"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={journey.steps.length}
        aria-valuenow={step + 1}
      >
        {journey.steps.map((journeyStep, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onStep(index)}
            aria-label={`Step ${index + 1}: ${journeyStep.title}`}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              index <= step ? "bg-foreground" : "bg-muted hover:bg-muted-foreground/30"
            )}
          />
        ))}
      </div>

      {/* Current step */}
      <article
        key={step}
        className="space-y-3 rounded-2xl border bg-background p-4 shadow-sm animate-in fade-in slide-in-from-bottom-1 duration-300"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Step {step + 1} of {journey.steps.length}
          </span>
          <button
            type="button"
            onClick={() => onInspect(currentNode.id)}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium hover:underline",
              style.badge
            )}
          >
            {currentNode.title}
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <h3 className="text-xl font-semibold tracking-tight">
          {current.title}
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">
          {current.explanation}
        </p>
      </article>

      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          onClick={() => onStep(step - 1)}
          disabled={isFirst}
        >
          <ChevronLeft />
          Back
        </Button>
        <span className="hidden text-xs text-muted-foreground sm:inline">
          ← → to step
        </span>
        {isLast ? (
          <Button onClick={onExit}>Finish</Button>
        ) : (
          <Button onClick={() => onStep(step + 1)}>
            Next
            <ChevronRight />
          </Button>
        )}
      </div>

      {/* All steps */}
      <ol className="space-y-1 border-t pt-4">
        {journey.steps.map((journeyStep, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => onStep(index)}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted",
                index === step && "bg-muted font-medium",
                index > step && "text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                  index <= step
                    ? "bg-foreground text-background"
                    : "border text-muted-foreground"
                )}
              >
                {index + 1}
              </span>
              {journeyStep.title}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
