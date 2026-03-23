"use client";
import { forwardRef } from "react";

const ProgressBar = forwardRef<HTMLDivElement>(function ProgressBar(_, ref) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3px",
        zIndex: 100,
        background: "rgba(255, 255, 255, 0.08)",
      }}
    >
      <div
        ref={ref}
        style={{
          height: "100%",
          width: "0%",
          background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
          borderRadius: "0 2px 2px 0",
          transition: "none",
          boxShadow: "0 0 12px rgba(99, 102, 241, 0.6)",
        }}
      />
    </div>
  );
});

export default ProgressBar;
