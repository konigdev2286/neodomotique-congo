import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifierTokenSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ne s'applique qu'aux routes sous /admin
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("neodomotique_admin_session")?.value;
    const estConnecte = await verifierTokenSession(sessionCookie);

    // 1. Si on est sur la page de connexion
    if (pathname === "/admin/connexion") {
      if (estConnecte) {
        // Déjà connecté -> redirection vers le dashboard admin
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    // 2. Pour toute autre page /admin (dashboard, leads, etc.)
    if (!estConnecte) {
      // Non connecté -> redirection immédiate vers la page de connexion
      const urlConnexion = new URL("/admin/connexion", request.url);
      return NextResponse.redirect(urlConnexion);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
