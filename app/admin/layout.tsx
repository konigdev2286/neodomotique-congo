import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace Administration | Neodomotique Congo",
  description: "Portail sécurisé d'administration et de gestion opérationnelle.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
