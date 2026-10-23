import React from "react";

type IconProps = {
  className?: string;
  size?: number;
};

// Icônes dessinées sur mesure en traits fins (stroke-width: 1.5, style logo Neodomotique)
// Pas d'icônes génériques de bibliothèque.

export function IconAmpoule({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="10" y1="11" x2="14" y2="11" />
    </svg>
  );
}

export function IconPrise({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="9" cy="11" r="1.25" fill="currentColor" />
      <circle cx="15" cy="11" r="1.25" fill="currentColor" />
      <path d="M12 15v2" />
    </svg>
  );
}

export function IconTelecommande({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect x="7" y="2" width="10" height="20" rx="3" />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      <circle cx="10" cy="12" r="0.75" fill="currentColor" />
      <circle cx="14" cy="12" r="0.75" fill="currentColor" />
      <circle cx="10" cy="15" r="0.75" fill="currentColor" />
      <circle cx="14" cy="15" r="0.75" fill="currentColor" />
      <circle cx="12" cy="18" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function IconWifi({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.86a10 10 0 0 1 14 0" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconMicro({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

export function IconSmartphone({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <line x1="11" y1="5" x2="13" y2="5" />
      <circle cx="12" cy="18" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function IconFermer({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function IconFlecheDroite({ className = "w-4 h-4", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function IconCheck({ className = "w-4 h-4", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function IconAttention({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function IconCalendrier({ className = "w-4 h-4", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
