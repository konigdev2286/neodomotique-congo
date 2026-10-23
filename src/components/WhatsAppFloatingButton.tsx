import React from "react";
import { site, lienWhatsApp } from "@/data/site";

export interface WhatsAppFloatingButtonProps {
  message?: string;
  className?: string;
}

export function WhatsAppFloatingButton({
  message = "Bonjour, je souhaite un devis gratuit pour mon logement.",
  className = "",
}: WhatsAppFloatingButtonProps) {
  return (
    <a
      href={lienWhatsApp(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex h-13 w-13 items-center justify-center border border-or bg-noir-900 hover:bg-or text-or hover:text-noir transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-or ${className}`}
      title={`WhatsApp : ${site.whatsapp.affichage}`}
      aria-label="Contacter Neodomotique sur WhatsApp"
    >
      <svg
        className="h-6 w-6 fill-current transition-colors"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
      </svg>
    </a>
  );
}
