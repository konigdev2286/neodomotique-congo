import { NextResponse } from "next/server";
import { calculerTokenSession, verifierTokenSession } from "@/lib/auth";

// Mot de passe configuré via variable d'environnement ou valeur par défaut sécurisée
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "neodomotique2026";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Le mot de passe est obligatoire." },
        { status: 400 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Mot de passe d'administration incorrect." },
        { status: 401 }
      );
    }

    const token = await calculerTokenSession();
    const response = NextResponse.json({ success: true });

    // Cookie de session HTTP-Only sécurisé
    response.cookies.set({
      name: "neodomotique_admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 heures
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Erreur lors du traitement de la requête." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Déconnexion réussie." });
  response.cookies.delete("neodomotique_admin_session");
  return response;
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/neodomotique_admin_session=([^;]+)/);
  const token = match ? match[1] : null;

  const estValide = await verifierTokenSession(token);
  if (estValide) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
