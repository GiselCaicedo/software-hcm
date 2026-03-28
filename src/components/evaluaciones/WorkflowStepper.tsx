"use client";
import { EstadoEvaluacion } from "@/types";
import { WORKFLOW_STEPS, WORKFLOW_LABELS, getStepIndex } from "@/lib/utils/workflow";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowStepperProps {
  currentState: EstadoEvaluacion;
  compact?: boolean;
}

export function WorkflowStepper({ currentState, compact = false }: WorkflowStepperProps) {
  const currentIdx = getStepIndex(currentState);

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {WORKFLOW_STEPS.map((step, idx) => (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                idx < currentIdx ? "bg-blue-600" :
                idx === currentIdx ? "bg-blue-400 ring-2 ring-blue-200" :
                "bg-gray-200"
              )}
            />
            {idx < WORKFLOW_STEPS.length - 1 && (
              <div className={cn("h-0.5 w-4", idx < currentIdx ? "bg-blue-300" : "bg-gray-200")} />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-0">
      {WORKFLOW_STEPS.map((step, idx) => {
        const isDone = idx < currentIdx;
        const isCurrent = idx === currentIdx;
        const isPending = idx > currentIdx;

        return (
          <div key={step} className="flex-1 flex flex-col items-center">
            <div className="flex w-full items-center">
              {/* Line left */}
              <div className={cn("flex-1 h-0.5", idx === 0 ? "bg-transparent" : isDone ? "bg-blue-500" : "bg-gray-200")} />
              {/* Circle */}
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all",
                  isDone ? "bg-blue-600 text-white" :
                  isCurrent ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                  "bg-gray-100 text-gray-400"
                )}
              >
                {isDone ? <Check className="h-3.5 w-3.5" /> : idx + 1}
              </div>
              {/* Line right */}
              <div className={cn("flex-1 h-0.5", idx === WORKFLOW_STEPS.length - 1 ? "bg-transparent" : isDone ? "bg-blue-500" : "bg-gray-200")} />
            </div>
            <p
              className={cn(
                "mt-1.5 text-center text-xs leading-tight",
                isCurrent ? "text-blue-700 font-semibold" :
                isDone ? "text-gray-600" :
                "text-gray-400"
              )}
            >
              {WORKFLOW_LABELS[step]}
            </p>
          </div>
        );
      })}
    </div>
  );
}
