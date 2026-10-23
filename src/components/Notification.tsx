"use client";

import React from "react";
import { IconCheck, IconAttention, IconFermer } from "./Icons";

export type NotificationType = "succes" | "info" | "erreur";

export interface NotificationProps {
  type?: NotificationType;
  titre: string;
  message?: string;
  onFermer?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function Notification({
  type = "info",
  titre,
  message,
  onFermer,
  action,
  className = "",
}: NotificationProps) {
  const styles = {
    succes: {
      border: "border-or",
      icone: <IconCheck className="w-4 h-4 text-or" />,
      accent: "text-or",
    },
    info: {
      border: "border-noir-700",
      icone: <span className="h-2 w-2 bg-or point-or-init rounded-none" />,
      accent: "text-ivoire",
    },
    erreur: {
      border: "border-red-500/70",
      icone: <IconAttention className="w-4 h-4 text-red-400" />,
      accent: "text-red-400",
    },
  }[type];

  return (
    <div
      role="alert"
      className={`relative flex items-start justify-between gap-4 border ${styles.border} bg-noir-900 p-4 rounded-none text-ivoire ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{styles.icone}</div>
        <div className="flex flex-col">
          <span className={`font-titre text-xs uppercase tracking-accroche font-medium ${styles.accent}`}>
            {titre}
          </span>
          {message && (
            <p className="font-texte text-xs text-ivoire-700 mt-1 leading-normal">
              {message}
            </p>
          )}
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="font-titre text-[11px] uppercase tracking-wide text-or hover:underline mt-2 self-start"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>

      {onFermer && (
        <button
          type="button"
          onClick={onFermer}
          className="flex h-6 w-6 items-center justify-center text-ivoire-800 hover:text-ivoire transition-colors shrink-0"
          aria-label="Fermer la notification"
        >
          <IconFermer className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
