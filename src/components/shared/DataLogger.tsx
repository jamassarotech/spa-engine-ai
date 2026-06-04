"use client";

import { useEffect } from "react";

interface DataLoggerProps {
  data: any;
  label?: string;
}

export function DataLogger({ data, label = "Data" }: DataLoggerProps) {
  useEffect(() => {
    console.log(`${label}:`, data);
  }, [data, label]);

  return null;
}
