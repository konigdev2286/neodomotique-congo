import React from "react";
import Link from "next/link";

export type ButtonVariant = "primaire" | "secondaire" | "neutre";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = "primaire",
  size = "md",
  href,
  isExternal,
  children,
  icon,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  // Styles de base stricts (Jost, capitales espacées, grille de 8 px, angles très peu arrondis)
  const baseStyles =
    "inline-flex items-center justify-center font-titre uppercase transition-colors select-none font-medium text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-or focus-visible:ring-offset-2 focus-visible:ring-offset-noir rounded-none";

  // Tailles conformes à la grille de 8 px
  const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-9 px-4 text-[11px] tracking-accroche gap-2",
    md: "h-11 px-6 text-xs tracking-accroche gap-2.5",
    lg: "h-13 px-8 text-sm tracking-logo gap-3",
  };

  // Variantes sans JAMAIS d'opacité au survol (changement de bordure ou de teinte uniquement)
  const variantStyles: Record<ButtonVariant, string> = {
    primaire: disabled
      ? "bg-noir-700 text-ivoire-800 border border-noir-600 cursor-not-allowed"
      : "bg-or text-noir border border-or hover:bg-or-clair hover:border-or-clair active:bg-or-fonce active:border-or-fonce",
    secondaire: disabled
      ? "bg-transparent text-ivoire-800 border border-noir-700 cursor-not-allowed"
      : "bg-transparent text-or border border-or hover:bg-or hover:text-noir active:bg-or-fonce active:border-or-fonce active:text-noir",
    neutre: disabled
      ? "bg-noir-900 text-ivoire-800 border border-noir-800 cursor-not-allowed"
      : "bg-noir-800 text-ivoire border border-noir-700 hover:border-or hover:text-or active:bg-noir-700",
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  if (href && !disabled) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
