import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface PopupProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

const Popup: React.FC<PopupProps> = ({
  open,
  onClose,
  title,
  children,
  className,
}) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const node = (
    <div
      className="popup-overlay"
      onMouseDown={(e) => {
        // close when clicking the overlay (but not when clicking the dialog itself)
        if (e.target === e.currentTarget) onClose?.();
      }}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.4)",
        zIndex: 1000,
      }}
    >
      <div
        className={["popup", className].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Dialog"}
        style={{
          background: "white",
          borderRadius: 8,
          maxWidth: "90%",
          maxHeight: "90%",
          width: 480,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          overflow: "auto",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className="popup-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: "1px solid #eee",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 600 }}>{title}</div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "transparent",
              border: "none",
              fontSize: 20,
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
        <div className="popup-body" style={{ padding: 16 }}>
          {children}
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(node, document.body)
    : node;
};

export default Popup;
