"use client";
import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

const toastStyles: Record<string, React.CSSProperties> = {
  base: {
    position: "fixed",
    bottom: 28,
    right: 28,
    zIndex: 9999,
    minWidth: 220,
    padding: "16px 24px",
    borderRadius: 8,
    boxShadow: "0 2px 16px rgba(0,0,0,0.14)",
    fontWeight: 500,
    fontSize: "1.08rem",
    color: "#fff",
    animation: "fadein 0.4s",
    transition: "opacity 0.3s",
  },
  success: {
    background: "#22c55e",
  },
  error: {
    background: "#ef4444",
  },
};

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2800);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{ ...toastStyles.base, ...toastStyles[type] }}>
      {message}
    </div>
  );
}
