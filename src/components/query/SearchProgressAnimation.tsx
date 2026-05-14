"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";

type StageStatus = "pending" | "active" | "completed";

interface Stage {
  id: string;
  icon: string;
  label: string;
  status: StageStatus;
}

interface SearchProgressAnimationProps {
  onComplete?: () => void;
}

export function SearchProgressAnimation({
  onComplete,
}: SearchProgressAnimationProps) {
  const [stages, setStages] = useState<Stage[]>([
    {
      id: "youtube",
      icon: "🎥",
      label: "Searching YouTube videos",
      status: "active",
    },
    {
      id: "reddit",
      icon: "💬",
      label: "Fetching Reddit discussions",
      status: "pending",
    },
    {
      id: "analysis",
      icon: "🧠",
      label: "Analyzing results",
      status: "pending",
    },
  ]);

  useEffect(() => {
    // Progress through stages with delays
    const timer1 = setTimeout(() => {
      setStages((prev) =>
        prev.map((stage) =>
          stage.id === "youtube"
            ? { ...stage, status: "completed" }
            : stage.id === "reddit"
              ? { ...stage, status: "active" }
              : stage,
        ),
      );
    }, 2500);

    const timer2 = setTimeout(() => {
      setStages((prev) =>
        prev.map((stage) =>
          stage.id === "reddit"
            ? { ...stage, status: "completed" }
            : stage.id === "analysis"
              ? { ...stage, status: "active" }
              : stage,
        ),
      );
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-primary">
            Analyzing your search
          </h2>
          <p className="text-secondary text-sm">
            Gathering insights from multiple sources...
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border" />

        {/* Progress Stages */}
        <div className="space-y-6">
          {stages.map((stage, index) => (
            <StageItem key={stage.id} stage={stage} index={index} />
          ))}
        </div>

        {/* Footer hint */}
        {stages[2].status === "active" && (
          <div className="text-center text-sm text-secondary animate-fade-in">
            This might take a moment...
          </div>
        )}
      </div>
    </div>
  );
}

interface StageItemProps {
  stage: Stage;
  index: number;
}

function StageItem({ stage, index }: StageItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 transition-all duration-500",
        stage.status === "active" && "scale-105",
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Status Icon */}
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
        {stage.status === "completed" && (
          <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center animate-scale-in">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
        {stage.status === "active" && (
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        )}
        {stage.status === "pending" && (
          <div className="w-6 h-6 border-2 border-border rounded-full" />
        )}
      </div>

      {/* Stage Info */}
      <div className="flex-1 flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          {stage.icon}
        </span>
        <span
          className={cn(
            "text-base font-medium transition-colors",
            stage.status === "completed" && "text-primary",
            stage.status === "active" && "text-accent",
            stage.status === "pending" && "text-secondary",
          )}
        >
          {stage.label}
        </span>
      </div>

      {/* Status Badge */}
      <div className="flex-shrink-0">
        <span
          className={cn(
            "text-xs font-medium px-2 py-1 rounded-full transition-all",
            stage.status === "completed" &&
              "bg-success/10 text-success border border-success/20",
            stage.status === "active" &&
              "bg-accent/10 text-accent border border-accent/20 animate-pulse",
            stage.status === "pending" &&
              "bg-border-light text-secondary border border-border",
          )}
        >
          {stage.status === "completed" && "Done"}
          {stage.status === "active" && "Active"}
          {stage.status === "pending" && "Pending"}
        </span>
      </div>
    </div>
  );
}
