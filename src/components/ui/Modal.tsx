"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Modal({ open, onClose, title, description, children, size = "md" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const widths = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Panel */}
      <div className={cn(
        "relative w-full bg-white/90 backdrop-blur-xl border border-white/80 shadow-2xl rounded-2xl flex flex-col",
        widths[size]
      )}>
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-black/6">
          <div>
            <h2 className="text-base font-bold text-[#1A1A1A]">{title}</h2>
            {description && <p className="text-xs text-[#6B6B6B] mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#A0A0A0] hover:text-[#1A1A1A] hover:bg-black/5 transition-colors -mr-1 -mt-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto max-h-[70vh]">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Subcomponentes de formulario ───────────────────────────────────────
export function FormField({ label, required, children }: {
  label: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#5A5A5A]">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export const inputCls = "w-full px-3 py-2 text-sm bg-white/70 border border-black/10 rounded-xl focus:outline-none focus:border-black/30 transition-colors placeholder:text-[#C0C0C0]";
export const selectCls = "w-full px-3 py-2 text-sm bg-white/70 border border-black/10 rounded-xl focus:outline-none focus:border-black/30 transition-colors text-[#1A1A1A] appearance-none";

export function ModalActions({ onClose, submitLabel = "Guardar", onSubmit }: {
  onClose: () => void; submitLabel?: string; onSubmit?: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-2 pt-4 border-t border-black/6 mt-2">
      <button
        onClick={onClose}
        className="px-4 py-2 text-sm font-medium text-[#5A5A5A] bg-white/60 border border-black/10 rounded-xl hover:bg-white/90 transition-colors"
      >
        Cancelar
      </button>
      <button
        onClick={onSubmit ?? onClose}
        className="px-4 py-2 text-sm font-medium text-white bg-[#1C1C1E] rounded-xl hover:bg-black transition-colors"
      >
        {submitLabel}
      </button>
    </div>
  );
}
